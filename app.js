import { tools } from "./data/tools.js";

const toolCount = document.getElementById("tool-count");
const categoryCount = document.getElementById("category-count");
const toolList = document.getElementById("tool-list");
const toolDetails = document.getElementById("tool-details");
const searchInput = document.getElementById("search");
const categoryFilters = document.getElementById("category-filters");
const filtersContainer = document.querySelector(".tool-panel__filters");

const sortedTools = [...tools].sort((a, b) => a.name.localeCompare(b.name));
const categories = [...new Set(sortedTools.map((tool) => tool.category))].sort();

const state = {
  filter: "all",
  search: "",
  activeToolId: null,
};

const updateStats = () => {
  toolCount.textContent = sortedTools.length.toLocaleString();
  categoryCount.textContent = categories.length.toLocaleString();
};

const createFilterButtons = () => {
  categoryFilters.innerHTML = "";
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.className = "filter";
    button.dataset.filter = category;
    button.textContent = category;
    categoryFilters.appendChild(button);
  });
};

const getFilteredTools = () => {
  const search = state.search.trim().toLowerCase();
  return sortedTools.filter((tool) => {
    const matchesFilter = state.filter === "all" || tool.category === state.filter;
    const matchesSearch =
      !search ||
      tool.name.toLowerCase().includes(search) ||
      tool.description.toLowerCase().includes(search) ||
      (tool.keywords || []).some((keyword) => keyword.toLowerCase().includes(search));

    return matchesFilter && matchesSearch;
  });
};

const renderToolList = () => {
  const filtered = getFilteredTools();
  toolList.innerHTML = "";

  filtered.forEach((tool) => {
    const card = document.createElement("article");
    card.className = "tool-card";
    card.dataset.toolId = tool.id;
    card.innerHTML = `
      <h3>${tool.name}</h3>
      <p>${tool.description}</p>
      <span>${tool.category}</span>
    `;
    toolList.appendChild(card);
  });

  if (!filtered.length) {
    toolList.innerHTML = `<p class="placeholder">No tools match your search. Try a different keyword.</p>`;
  }
};

const formatNumber = (value, decimals = 2) => {
  if (!Number.isFinite(value)) return "-";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
};

const renderToolDetails = (tool) => {
  if (!tool) {
    toolDetails.innerHTML = `<p class="placeholder">Select a tool to view details and start calculating.</p>`;
    return;
  }

  const metaTags = [tool.category, tool.type, "Exclusive"].map(
    (tag) => `<span>${tag}</span>`
  );

  toolDetails.innerHTML = `
    <h2>${tool.name}<span class="badge">Exclusive</span></h2>
    <p>${tool.description}</p>
    <div class="tool-meta">${metaTags.join("")}</div>
    <div id="tool-form"></div>
  `;

  const formContainer = document.getElementById("tool-form");

  if (tool.type === "converter") {
    formContainer.appendChild(renderConverterForm(tool));
    return;
  }

  if (tool.type === "temperature") {
    formContainer.appendChild(renderTemperatureForm());
    return;
  }

  if (tool.type === "calculator") {
    const calculator = calculatorRegistry[tool.logic];
    if (calculator) {
      formContainer.appendChild(calculator());
    } else {
      formContainer.innerHTML = `<p class="placeholder">Calculator template is being finalized.</p>`;
    }
    return;
  }

  formContainer.innerHTML = `
    <p class="placeholder">This high-demand tool is scheduled for full interactive release. Join the waitlist to
    get notified when it launches.</p>
  `;
};

const renderConverterForm = (tool) => {
  const wrapper = document.createElement("div");
  wrapper.className = "tool-form";
  const unitOptions = Object.keys(tool.units)
    .map((unit) => `<option value="${unit}">${unit}</option>`)
    .join("");

  wrapper.innerHTML = `
    <label>
      Value
      <input type="number" step="any" value="1" id="value-input" />
    </label>
    <label>
      From
      <select id="from-unit">${unitOptions}</select>
    </label>
    <label>
      To
      <select id="to-unit">${unitOptions}</select>
    </label>
    <div class="tool-result" id="converter-result"></div>
  `;

  const valueInput = wrapper.querySelector("#value-input");
  const fromUnit = wrapper.querySelector("#from-unit");
  const toUnit = wrapper.querySelector("#to-unit");
  const result = wrapper.querySelector("#converter-result");

  const update = () => {
    const value = Number(valueInput.value);
    const from = fromUnit.value;
    const to = toUnit.value;
    const base = value * tool.units[from];
    const converted = base / tool.units[to];
    result.textContent = `${formatNumber(value)} ${from} = ${formatNumber(converted, 4)} ${to}`;
  };

  [valueInput, fromUnit, toUnit].forEach((el) => el.addEventListener("input", update));
  update();
  return wrapper;
};

const renderTemperatureForm = () => {
  const wrapper = document.createElement("div");
  wrapper.className = "tool-form";

  wrapper.innerHTML = `
    <label>
      Value
      <input type="number" step="any" value="0" id="temp-value" />
    </label>
    <label>
      From
      <select id="temp-from">
        <option value="c">Celsius</option>
        <option value="f">Fahrenheit</option>
        <option value="k">Kelvin</option>
      </select>
    </label>
    <label>
      To
      <select id="temp-to">
        <option value="c">Celsius</option>
        <option value="f">Fahrenheit</option>
        <option value="k">Kelvin</option>
      </select>
    </label>
    <div class="tool-result" id="temp-result"></div>
  `;

  const valueInput = wrapper.querySelector("#temp-value");
  const fromUnit = wrapper.querySelector("#temp-from");
  const toUnit = wrapper.querySelector("#temp-to");
  const result = wrapper.querySelector("#temp-result");

  const toCelsius = (value, unit) => {
    if (unit === "c") return value;
    if (unit === "f") return (value - 32) * (5 / 9);
    return value - 273.15;
  };

  const fromCelsius = (value, unit) => {
    if (unit === "c") return value;
    if (unit === "f") return value * (9 / 5) + 32;
    return value + 273.15;
  };

  const update = () => {
    const value = Number(valueInput.value);
    const from = fromUnit.value;
    const to = toUnit.value;
    const celsius = toCelsius(value, from);
    const converted = fromCelsius(celsius, to);
    result.textContent = `${formatNumber(value)}° ${from.toUpperCase()} = ${formatNumber(
      converted,
      2
    )}° ${to.toUpperCase()}`;
  };

  [valueInput, fromUnit, toUnit].forEach((el) => el.addEventListener("input", update));
  update();
  return wrapper;
};

const calculatorRegistry = {
  bmi: () => {
    const wrapper = document.createElement("div");
    wrapper.className = "tool-form";
    wrapper.innerHTML = `
      <label>
        Weight (kg)
        <input type="number" step="any" value="70" id="bmi-weight" />
      </label>
      <label>
        Height (cm)
        <input type="number" step="any" value="170" id="bmi-height" />
      </label>
      <div class="tool-result" id="bmi-result"></div>
    `;

    const weight = wrapper.querySelector("#bmi-weight");
    const height = wrapper.querySelector("#bmi-height");
    const result = wrapper.querySelector("#bmi-result");

    const update = () => {
      const weightValue = Number(weight.value);
      const heightValue = Number(height.value) / 100;
      const bmi = weightValue / (heightValue * heightValue);
      const category =
        bmi < 18.5
          ? "Underweight"
          : bmi < 25
          ? "Normal"
          : bmi < 30
          ? "Overweight"
          : "Obese";
      result.textContent = `BMI: ${formatNumber(bmi, 1)} (${category})`;
    };

    [weight, height].forEach((el) => el.addEventListener("input", update));
    update();
    return wrapper;
  },
  loan: () => {
    const wrapper = document.createElement("div");
    wrapper.className = "tool-form";
    wrapper.innerHTML = `
      <label>
        Loan Amount
        <input type="number" step="any" value="25000" id="loan-amount" />
      </label>
      <label>
        Annual Interest Rate (%)
        <input type="number" step="any" value="4.5" id="loan-rate" />
      </label>
      <label>
        Term (years)
        <input type="number" step="1" value="5" id="loan-years" />
      </label>
      <div class="tool-result" id="loan-result"></div>
    `;

    const amount = wrapper.querySelector("#loan-amount");
    const rate = wrapper.querySelector("#loan-rate");
    const years = wrapper.querySelector("#loan-years");
    const result = wrapper.querySelector("#loan-result");

    const update = () => {
      const principal = Number(amount.value);
      const monthlyRate = Number(rate.value) / 100 / 12;
      const payments = Number(years.value) * 12;
      const monthly =
        monthlyRate === 0
          ? principal / payments
          : (principal * monthlyRate) /
            (1 - Math.pow(1 + monthlyRate, -payments));
      result.textContent = `Estimated monthly payment: $${formatNumber(monthly, 2)}`;
    };

    [amount, rate, years].forEach((el) => el.addEventListener("input", update));
    update();
    return wrapper;
  },
  tip: () => {
    const wrapper = document.createElement("div");
    wrapper.className = "tool-form";
    wrapper.innerHTML = `
      <label>
        Bill Total
        <input type="number" step="any" value="120" id="tip-bill" />
      </label>
      <label>
        Tip Percentage
        <input type="number" step="any" value="18" id="tip-percent" />
      </label>
      <label>
        People
        <input type="number" step="1" value="2" id="tip-people" />
      </label>
      <div class="tool-result" id="tip-result"></div>
    `;

    const bill = wrapper.querySelector("#tip-bill");
    const percent = wrapper.querySelector("#tip-percent");
    const people = wrapper.querySelector("#tip-people");
    const result = wrapper.querySelector("#tip-result");

    const update = () => {
      const billValue = Number(bill.value);
      const tipValue = billValue * (Number(percent.value) / 100);
      const total = billValue + tipValue;
      const perPerson = total / Math.max(Number(people.value), 1);
      result.textContent = `Total: $${formatNumber(total)} | Per person: $${formatNumber(perPerson)}`;
    };

    [bill, percent, people].forEach((el) => el.addEventListener("input", update));
    update();
    return wrapper;
  },
  percentage: () => {
    const wrapper = document.createElement("div");
    wrapper.className = "tool-form";
    wrapper.innerHTML = `
      <label>
        Base Value
        <input type="number" step="any" value="250" id="percent-base" />
      </label>
      <label>
        Percentage (%)
        <input type="number" step="any" value="15" id="percent-value" />
      </label>
      <div class="tool-result" id="percent-result"></div>
    `;

    const base = wrapper.querySelector("#percent-base");
    const percent = wrapper.querySelector("#percent-value");
    const result = wrapper.querySelector("#percent-result");

    const update = () => {
      const baseValue = Number(base.value);
      const percentValue = Number(percent.value);
      const outcome = (baseValue * percentValue) / 100;
      result.textContent = `${percentValue}% of ${formatNumber(baseValue)} = ${formatNumber(outcome)}`;
    };

    [base, percent].forEach((el) => el.addEventListener("input", update));
    update();
    return wrapper;
  },
  age: () => {
    const wrapper = document.createElement("div");
    wrapper.className = "tool-form";
    wrapper.innerHTML = `
      <label>
        Birthdate
        <input type="date" id="age-birth" />
      </label>
      <div class="tool-result" id="age-result"></div>
    `;

    const birth = wrapper.querySelector("#age-birth");
    const result = wrapper.querySelector("#age-result");

    const update = () => {
      const dateValue = birth.valueAsDate;
      if (!dateValue) {
        result.textContent = "Select a birthdate to calculate age.";
        return;
      }
      const today = new Date();
      let age = today.getFullYear() - dateValue.getFullYear();
      const monthDiff = today.getMonth() - dateValue.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateValue.getDate())) {
        age -= 1;
      }
      result.textContent = `Age: ${age} years`;
    };

    birth.addEventListener("input", update);
    update();
    return wrapper;
  },
  roi: () => {
    const wrapper = document.createElement("div");
    wrapper.className = "tool-form";
    wrapper.innerHTML = `
      <label>
        Gain from Investment
        <input type="number" step="any" value="4500" id="roi-gain" />
      </label>
      <label>
        Cost of Investment
        <input type="number" step="any" value="3000" id="roi-cost" />
      </label>
      <div class="tool-result" id="roi-result"></div>
    `;

    const gain = wrapper.querySelector("#roi-gain");
    const cost = wrapper.querySelector("#roi-cost");
    const result = wrapper.querySelector("#roi-result");

    const update = () => {
      const gainValue = Number(gain.value);
      const costValue = Number(cost.value);
      const roi = ((gainValue - costValue) / costValue) * 100;
      result.textContent = `ROI: ${formatNumber(roi, 2)}%`;
    };

    [gain, cost].forEach((el) => el.addEventListener("input", update));
    update();
    return wrapper;
  },
  unitPrice: () => {
    const wrapper = document.createElement("div");
    wrapper.className = "tool-form";
    wrapper.innerHTML = `
      <label>
        Total Cost
        <input type="number" step="any" value="12" id="unit-cost" />
      </label>
      <label>
        Quantity
        <input type="number" step="any" value="6" id="unit-qty" />
      </label>
      <div class="tool-result" id="unit-result"></div>
    `;

    const cost = wrapper.querySelector("#unit-cost");
    const qty = wrapper.querySelector("#unit-qty");
    const result = wrapper.querySelector("#unit-result");

    const update = () => {
      const totalCost = Number(cost.value);
      const quantity = Number(qty.value);
      const price = quantity ? totalCost / quantity : 0;
      result.textContent = `Unit price: $${formatNumber(price, 2)}`;
    };

    [cost, qty].forEach((el) => el.addEventListener("input", update));
    update();
    return wrapper;
  },
  squareFootage: () => {
    const wrapper = document.createElement("div");
    wrapper.className = "tool-form";
    wrapper.innerHTML = `
      <label>
        Length (ft)
        <input type="number" step="any" value="12" id="sq-length" />
      </label>
      <label>
        Width (ft)
        <input type="number" step="any" value="10" id="sq-width" />
      </label>
      <div class="tool-result" id="sq-result"></div>
    `;

    const length = wrapper.querySelector("#sq-length");
    const width = wrapper.querySelector("#sq-width");
    const result = wrapper.querySelector("#sq-result");

    const update = () => {
      const area = Number(length.value) * Number(width.value);
      result.textContent = `Area: ${formatNumber(area, 2)} sq ft`;
    };

    [length, width].forEach((el) => el.addEventListener("input", update));
    update();
    return wrapper;
  },
  pomodoro: () => {
    const wrapper = document.createElement("div");
    wrapper.className = "tool-form";
    wrapper.innerHTML = `
      <label>
        Focus minutes
        <input type="number" step="1" value="25" id="pomo-focus" />
      </label>
      <label>
        Break minutes
        <input type="number" step="1" value="5" id="pomo-break" />
      </label>
      <label>
        Sessions
        <input type="number" step="1" value="4" id="pomo-sessions" />
      </label>
      <div class="tool-result" id="pomo-result"></div>
    `;

    const focus = wrapper.querySelector("#pomo-focus");
    const rest = wrapper.querySelector("#pomo-break");
    const sessions = wrapper.querySelector("#pomo-sessions");
    const result = wrapper.querySelector("#pomo-result");

    const update = () => {
      const focusValue = Number(focus.value);
      const restValue = Number(rest.value);
      const sessionValue = Number(sessions.value);
      const totalMinutes = sessionValue * focusValue + (sessionValue - 1) * restValue;
      result.textContent = `Total session time: ${formatNumber(totalMinutes, 0)} minutes`;
    };

    [focus, rest, sessions].forEach((el) => el.addEventListener("input", update));
    update();
    return wrapper;
  },
};

filtersContainer.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  document.querySelectorAll(".filter").forEach((filter) => filter.classList.remove("is-active"));
  button.classList.add("is-active");
  state.filter = button.dataset.filter;
  renderToolList();
});

searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  renderToolList();
});

toolList.addEventListener("click", (event) => {
  const card = event.target.closest(".tool-card");
  if (!card) return;

  const selected = sortedTools.find((tool) => tool.id === card.dataset.toolId);
  state.activeToolId = selected?.id ?? null;
  renderToolDetails(selected);
});

updateStats();
createFilterButtons();
renderToolList();
renderToolDetails(sortedTools[0]);
