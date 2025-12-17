/**
 * Safe mathematical expression evaluator
 * Replaces unsafe eval() usage
 */
export const evaluateExpression = (expression: string): number => {
  // Remove whitespace
  const cleanExp = expression.replace(/\s+/g, '');
  
  // Validate input - only allow numbers, operators, parentheses, and decimal points
  if (!/^[0-9+\-*/.()]+$/.test(cleanExp)) {
    throw new Error('Invalid expression');
  }
  
  // Use Function constructor as safer alternative to eval
  // Still evaluates code but in a more controlled way
  try {
    const result = new Function(`'use strict'; return (${cleanExp})`)();
    
    if (typeof result !== 'number' || !isFinite(result)) {
      throw new Error('Invalid result');
    }
    
    return result;
  } catch {
    throw new Error('Calculation error');
  }
};

/**
 * Safe scientific expression evaluator
 */
export const evaluateScientificExpression = (expression: string): number => {
  try {
    // Sanitize and validate the expression
    let sanitized = expression
      .replace(/sin/g, 'Math.sin')
      .replace(/cos/g, 'Math.cos')
      .replace(/tan/g, 'Math.tan')
      .replace(/log/g, 'Math.log10')
      .replace(/ln/g, 'Math.log')
      .replace(/sqrt/g, 'Math.sqrt')
      .replace(/π/g, 'Math.PI')
      .replace(/e(?![a-z])/gi, 'Math.E')
      .replace(/\^/g, '**');
    
    // Validate - only allow safe characters
    if (!/^[0-9+\-*/.()MathsincogtaqrleEPI\s]+$/.test(sanitized)) {
      throw new Error('Invalid expression');
    }
    
    const result = new Function(`'use strict'; return (${sanitized})`)();
    
    if (typeof result !== 'number' || !isFinite(result)) {
      throw new Error('Invalid result');
    }
    
    return result;
  } catch {
    throw new Error('Calculation error');
  }
};
