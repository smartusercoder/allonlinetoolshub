/**
 * Validation utilities for online tools
 * Provides common validation functions for URLs, emails, file operations, etc.
 */

/**
 * Validates if a string is a valid URL
 * @param {string} url - The URL string to validate
 * @returns {boolean} - True if valid URL, false otherwise
 */
export function isValidUrl(url) {
  if (typeof url !== 'string' || url.trim() === '') {
    return false;
  }

  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validates if a string is a valid email address
 * @param {string} email - The email string to validate
 * @returns {boolean} - True if valid email, false otherwise
 */
export function isValidEmail(email) {
  if (typeof email !== 'string' || email.trim() === '') {
    return false;
  }

  // RFC 5322 compliant email regex (simplified)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}

/**
 * Validates file size against a maximum limit
 * @param {number} sizeInBytes - File size in bytes
 * @param {number} maxSizeInMB - Maximum allowed size in megabytes
 * @returns {boolean} - True if file size is within limit, false otherwise
 */
export function isValidFileSize(sizeInBytes, maxSizeInMB = 10) {
  if (typeof sizeInBytes !== 'number' || sizeInBytes < 0) {
    return false;
  }

  if (typeof maxSizeInMB !== 'number' || maxSizeInMB <= 0) {
    return false;
  }

  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return sizeInBytes <= maxSizeInBytes;
}

/**
 * Validates if a file extension is allowed
 * @param {string} filename - The filename to check
 * @param {string[]} allowedExtensions - Array of allowed extensions (e.g., ['.jpg', '.png'])
 * @returns {boolean} - True if extension is allowed, false otherwise
 */
export function hasValidExtension(filename, allowedExtensions) {
  if (typeof filename !== 'string' || filename.trim() === '') {
    return false;
  }

  if (!Array.isArray(allowedExtensions) || allowedExtensions.length === 0) {
    return false;
  }

  const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  return allowedExtensions.some(allowed => allowed.toLowerCase() === ext);
}

/**
 * Validates if a string is a valid hexadecimal color code
 * @param {string} color - The color string to validate
 * @returns {boolean} - True if valid hex color, false otherwise
 */
export function isValidHexColor(color) {
  if (typeof color !== 'string' || color.trim() === '') {
    return false;
  }

  // Supports both #RGB and #RRGGBB formats, with optional alpha channel
  const hexColorRegex = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;
  return hexColorRegex.test(color);
}

/**
 * Validates if a number is within a specified range
 * @param {number} value - The value to check
 * @param {number} min - Minimum allowed value (inclusive)
 * @param {number} max - Maximum allowed value (inclusive)
 * @returns {boolean} - True if value is within range, false otherwise
 */
export function isInRange(value, min, max) {
  if (typeof value !== 'number' || isNaN(value)) {
    return false;
  }

  if (typeof min !== 'number' || typeof max !== 'number' || isNaN(min) || isNaN(max)) {
    return false;
  }

  if (min > max) {
    return false;
  }

  return value >= min && value <= max;
}

/**
 * Validates if a string is a valid JSON
 * @param {string} jsonString - The JSON string to validate
 * @returns {boolean} - True if valid JSON, false otherwise
 */
export function isValidJson(jsonString) {
  if (typeof jsonString !== 'string' || jsonString.trim() === '') {
    return false;
  }

  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates if a string contains only alphanumeric characters
 * @param {string} str - The string to validate
 * @param {boolean} allowSpaces - Whether to allow spaces (default: false)
 * @returns {boolean} - True if alphanumeric, false otherwise
 */
export function isAlphanumeric(str, allowSpaces = false) {
  if (typeof str !== 'string' || str === '') {
    return false;
  }

  const pattern = allowSpaces ? /^[a-zA-Z0-9\s]+$/ : /^[a-zA-Z0-9]+$/;
  return pattern.test(str);
}

/**
 * Validates password strength
 * @param {string} password - The password to validate
 * @param {Object} options - Validation options
 * @param {number} options.minLength - Minimum length (default: 8)
 * @param {boolean} options.requireUppercase - Require uppercase letter (default: true)
 * @param {boolean} options.requireLowercase - Require lowercase letter (default: true)
 * @param {boolean} options.requireNumber - Require number (default: true)
 * @param {boolean} options.requireSpecial - Require special character (default: true)
 * @returns {Object} - Object with isValid boolean and errors array
 */
export function validatePassword(password, options = {}) {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumber = true,
    requireSpecial = true
  } = options;

  const errors = [];

  if (typeof password !== 'string') {
    return { isValid: false, errors: ['Password must be a string'] };
  }

  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }

  if (requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (requireNumber && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (requireSpecial && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Sanitizes a string by removing potentially harmful characters
 * @param {string} input - The string to sanitize
 * @returns {string} - The sanitized string
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return '';
  }

  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/['"]/g, '') // Remove quotes
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .trim();
}
