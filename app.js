import { tools } from "./data/tools.js";

const toolCount = document.getElementById("tool-count");
const categoryCount = document.getElementById("category-count");
const favoriteCount = document.getElementById("favorite-count");
const toolList = document.getElementById("tool-list");
const toolDetails = document.getElementById("tool-details");
const searchInput = document.getElementById("search");
const categoryFilters = document.getElementById("category-filters");
const filtersContainer = document.querySelector(".tool-panel__filters");
const sortSelect = document.getElementById("sort");
const favoritesOnlyToggle = document.getElementById("favorites-only");
const recentTools = document.getElementById("recent-tools");
const clearRecentButton = document.getElementById("clear-recent");

const sortedTools = [...tools].sort((a, b) => a.name.localeCompare(b.name));
const categories = [...new Set(sortedTools.map((tool) => tool.category))].sort();

const state = {
  filter: "all",
  search: "",
  activeToolId: null,
  sort: "featured",
  favoritesOnly: false,
  lastResult: "",
};

const store = {
  favorites: new Set(JSON.parse(localStorage.getItem("favorites") || "[]")),
  recent: JSON.parse(localStorage.getItem("recentTools") || "[]"),
};

const updateStats = () => {
  toolCount.textContent = sortedTools.length.toLocaleString();
  categoryCount.textContent = categories.length.toLocaleString();
  favoriteCount.textContent = store.favorites.size.toLocaleString();
};

const saveFavorites = () => {
  localStorage.setItem("favorites", JSON.stringify([...store.favorites]));
  updateStats();
};

const saveRecent = () => {
  localStorage.setItem("recentTools", JSON.stringify(store.recent.slice(0, 12)));
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

const renderRecentTools = () => {
  if (!recentTools) return;
  if (!store.recent.length) {
    recentTools.innerHTML = `<p class="placeholder">No recent tools yet.</p>`;
    return;
  }

  const items = store.recent
    .map((id) => sortedTools.find((tool) => tool.id === id))
    .filter(Boolean);

  recentTools.innerHTML = items
    .map(
      (tool) => `
        <button class="recent-tool" data-tool-id="${tool.id}">
          <span>${tool.name}</span>
          <span class="tool-card__meta">${tool.category}</span>
        </button>
      `
    )
    .join("");
};

const getFuse = (collection) =>
  new window.Fuse(collection, {
    keys: ["name", "description", "category", "tags", "keywords"],
    threshold: 0.3,
  });

const applySorting = (collection) => {
  if (state.sort === "az") {
    return [...collection].sort((a, b) => a.name.localeCompare(b.name));
  }
  if (state.sort === "za") {
    return [...collection].sort((a, b) => b.name.localeCompare(a.name));
  }
  if (state.sort === "demand") {
    return [...collection].sort((a, b) => (b.demand || 0) - (a.demand || 0));
  }
  return [...collection].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
};

const getFilteredTools = () => {
  const search = state.search.trim().toLowerCase();
  let collection = [...sortedTools];

  if (state.filter !== "all") {
    collection = collection.filter((tool) => tool.category === state.filter);
  }

  if (state.favoritesOnly) {
    collection = collection.filter((tool) => store.favorites.has(tool.id));
  }

  if (search) {
    const fuse = getFuse(collection);
    collection = fuse.search(search).map((result) => result.item);
  }

  return applySorting(collection);
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
      <div class="tool-card__footer">
        <span>${tool.category}</span>
        <span class="tool-card__meta">Demand ${tool.demand ?? 70}</span>
      </div>
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

const formatResult = (value, format) => {
  if (!Number.isFinite(value)) return "-";
  if (format === "currency") {
    return `$${formatNumber(value, 2)}`;
  }
  if (format === "percent") {
    return `${formatNumber(value, 2)}%`;
  }
  return formatNumber(value, 2);
};

const updateMeta = (tool) => {
  if (!tool) return;
  document.title = `${tool.name} | All Online Tools Hub`;
  const meta = document.querySelector("meta[name='description']");
  if (meta) {
    meta.setAttribute("content", tool.description);
  }
};

const addRecent = (tool) => {
  store.recent = [tool.id, ...store.recent.filter((id) => id !== tool.id)].slice(0, 12);
  saveRecent();
  renderRecentTools();
};

const setToolHash = (toolId) => {
  if (!toolId) return;
  const nextHash = `tool=${toolId}`;
  if (window.location.hash === `#${nextHash}`) return;
  window.location.hash = nextHash;
};

const toggleFavorite = (tool) => {
  if (store.favorites.has(tool.id)) {
    store.favorites.delete(tool.id);
  } else {
    store.favorites.add(tool.id);
  }
  saveFavorites();
  renderToolList();
  renderToolDetails(tool);
};

const renderToolDetails = (tool) => {
  if (!tool) {
    toolDetails.innerHTML = `<p class="placeholder">Select a tool to view details and start calculating.</p>`;
    return;
  }

  state.activeToolId = tool.id;
  updateMeta(tool);
  const isFavorite = store.favorites.has(tool.id);
  const metaTags = [tool.category, tool.type, "Exclusive"].map(
    (tag) => `<span>${tag}</span>`
  );

  toolDetails.innerHTML = `
    <h2>${tool.name}<span class="badge">Exclusive</span></h2>
    <p>${tool.description}</p>
    <div class="tool-meta">${metaTags.join("")}</div>
    <div class="tool-actions">
      <button class="button" id="favorite-button">${
        isFavorite ? "Remove favorite" : "Save to favorites"
      }</button>
      <button class="button secondary" id="share-button">Copy share link</button>
      <button class="button secondary" id="copy-result">Copy result</button>
    </div>
    <div id="tool-form"></div>
    <div id="tool-sections"></div>
  `;

  const formContainer = document.getElementById("tool-form");

  if (tool.type === "converter") {
    formContainer.appendChild(renderConverterForm(tool));
    renderToolSections(tool);
    return;
  }

  if (tool.type === "temperature") {
    formContainer.appendChild(renderTemperatureForm());
    renderToolSections(tool);
    return;
  }

  if (tool.type === "formula") {
    formContainer.appendChild(renderFormulaTool(tool));
    renderToolSections(tool);
    return;
  }

  if (tool.type === "age") {
    formContainer.appendChild(renderAgeTool());
    renderToolSections(tool);
    return;
  }

  formContainer.innerHTML = `
    <p class="placeholder">This high-demand tool is scheduled for a specialized release. Join the waitlist to get
    notified when it launches.</p>
  `;
  renderToolSections(tool);
};

const renderToolSections = (tool) => {
  const sections = document.getElementById("tool-sections");
  if (!sections) return;
  const faqItems = (tool.faqs || []).map(
    (item) => `
      <div class="tool-faq">
        <strong>${item.q}</strong>
        <span>${item.a}</span>
      </div>
    `
  );

  sections.innerHTML = `
    ${
      tool.formula
        ? `<div class="tool-section">
            <h3>How it works</h3>
            <p>${tool.extra || "This tool uses a direct formula to compute results."}</p>
            <code>${tool.formula}</code>
          </div>`
        : ""
    }
    ${
      tool.example
        ? `<div class="tool-section">
            <h3>Example</h3>
            <p>${tool.example}</p>
          </div>`
        : ""
    }
    ${
      faqItems.length
        ? `<div class="tool-section">
            <h3>FAQs</h3>
            ${faqItems.join("")}
          </div>`
        : ""
    }
  `;
};

const setResultState = (value) => {
  state.lastResult = value;
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
    if (!Number.isFinite(value)) {
      result.innerHTML = `<span class="error">Enter a valid number to convert.</span>`;
      setResultState("");
      return;
    }
    const base = value * tool.units[from];
    const converted = base / tool.units[to];
    result.innerHTML = `
      <strong>${formatNumber(converted, 4)} ${to}</strong>
      <span>${formatNumber(value)} ${from} = ${formatNumber(converted, 4)} ${to}</span>
    `;
    setResultState(`${formatNumber(converted, 4)} ${to}`);
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
    if (!Number.isFinite(value)) {
      result.innerHTML = `<span class="error">Enter a valid temperature.</span>`;
      setResultState("");
      return;
    }
    const celsius = toCelsius(value, from);
    const converted = fromCelsius(celsius, to);
    result.innerHTML = `
      <strong>${formatNumber(converted, 2)}° ${to.toUpperCase()}</strong>
      <span>${formatNumber(value)}° ${from.toUpperCase()} = ${formatNumber(
      converted,
      2
    )}° ${to.toUpperCase()}</span>
    `;
    setResultState(`${formatNumber(converted, 2)}° ${to.toUpperCase()}`);
  };

  [valueInput, fromUnit, toUnit].forEach((el) => el.addEventListener("input", update));
  update();
  return wrapper;
};

const renderAgeTool = () => {
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
      setResultState("");
      return;
    }
    const today = new Date();
    let age = today.getFullYear() - dateValue.getFullYear();
    const monthDiff = today.getMonth() - dateValue.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateValue.getDate())) {
      age -= 1;
    }
    result.innerHTML = `<strong>${age} years old</strong>`;
    setResultState(`${age} years old`);
  };

  birth.addEventListener("input", update);
  update();
  return wrapper;
};

const renderFormulaTool = (tool) => {
  const wrapper = document.createElement("div");
  wrapper.className = "tool-form";

  const fields = tool.inputs
    .map((input) => {
      const value = input.value ?? "";
      return `
        <label>
          ${input.label}
          <input type="${input.type}" step="any" id="${input.id}" value="${value}" />
        </label>
      `;
    })
    .join("");

  wrapper.innerHTML = `
    ${fields}
    <div class="tool-result" id="formula-result"></div>
    ${tool.extra ? `<p class="tool-card__meta">${tool.extra}</p>` : ""}
  `;

  const result = wrapper.querySelector("#formula-result");
  const inputs = tool.inputs.map((input) => wrapper.querySelector(`#${input.id}`));

  const update = () => {
    const scope = {};
    inputs.forEach((input, index) => {
      const key = tool.inputs[index].id;
      scope[key] = input.type === "number" ? Number(input.value) : input.value;
    });

    if (Object.values(scope).some((value) => Number.isNaN(value))) {
      result.innerHTML = `<span class="error">Please enter valid values for all inputs.</span>`;
      setResultState("");
      return;
    }

    const computed = window.math.evaluate(tool.formula, scope);
    if (!Number.isFinite(computed)) {
      result.innerHTML = `<span class="error">Check your inputs (avoid dividing by zero).</span>`;
      setResultState("");
      return;
    }
    result.innerHTML = `
      <strong>${formatResult(computed, tool.format)}</strong>
      <span>${tool.resultLabel ?? "Result"}</span>
    `;
    setResultState(formatResult(computed, tool.format));
  };

  inputs.forEach((input) => input.addEventListener("input", update));
  update();
  return wrapper;
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

sortSelect.addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderToolList();
});

favoritesOnlyToggle.addEventListener("change", (event) => {
  state.favoritesOnly = event.target.checked;
  renderToolList();
});

toolList.addEventListener("click", (event) => {
  const card = event.target.closest(".tool-card");
  if (!card) return;

  const selected = sortedTools.find((tool) => tool.id === card.dataset.toolId);
  state.activeToolId = selected?.id ?? null;
  renderToolDetails(selected);
  if (selected) {
    addRecent(selected);
    setToolHash(selected.id);
  }
});

toolDetails.addEventListener("click", (event) => {
  if (event.target.id === "favorite-button") {
    const active = sortedTools.find((tool) => tool.id === state.activeToolId);
    if (active) toggleFavorite(active);
  }
  if (event.target.id === "share-button") {
    const active = sortedTools.find((tool) => tool.id === state.activeToolId);
    if (!active) return;
    const url = `${window.location.origin}${window.location.pathname}#tool=${active.id}`;
    navigator.clipboard.writeText(url);
    event.target.textContent = "Link copied";
    setTimeout(() => {
      event.target.textContent = "Copy share link";
    }, 1500);
  }
  if (event.target.id === "copy-result") {
    if (!state.lastResult) return;
    navigator.clipboard.writeText(state.lastResult);
    event.target.textContent = "Result copied";
    setTimeout(() => {
      event.target.textContent = "Copy result";
    }, 1500);
  }
});

recentTools?.addEventListener("click", (event) => {
  const button = event.target.closest(".recent-tool");
  if (!button) return;
  const selected = sortedTools.find((tool) => tool.id === button.dataset.toolId);
  if (selected) {
    state.activeToolId = selected.id;
    renderToolDetails(selected);
    setToolHash(selected.id);
  }
});

clearRecentButton?.addEventListener("click", () => {
  store.recent = [];
  saveRecent();
  renderRecentTools();
});

const selectFromHash = () => {
  const hash = window.location.hash;
  if (!hash.includes("tool=")) return;
  const id = hash.split("tool=")[1];
  const selected = sortedTools.find((tool) => tool.id === id);
  if (selected) {
    state.activeToolId = selected.id;
    renderToolDetails(selected);
    addRecent(selected);
  }
};

updateStats();
createFilterButtons();
renderToolList();
renderToolDetails(sortedTools[0]);
renderRecentTools();
selectFromHash();
window.addEventListener("hashchange", selectFromHash);
