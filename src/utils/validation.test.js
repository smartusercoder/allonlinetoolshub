import { describe, it, expect } from 'vitest';
import {
  isValidUrl,
  isValidEmail,
  isValidFileSize,
  hasValidExtension,
  isValidHexColor,
  isInRange,
  isValidJson,
  isAlphanumeric,
  validatePassword,
  sanitizeInput
} from './validation.js';

describe('Validation Utilities', () => {
  describe('isValidUrl', () => {
    it('should return true for valid HTTP URLs', () => {
      expect(isValidUrl('http://example.com')).toBe(true);
      expect(isValidUrl('http://www.example.com')).toBe(true);
      expect(isValidUrl('http://example.com/path')).toBe(true);
      expect(isValidUrl('http://example.com:8080')).toBe(true);
    });

    it('should return true for valid HTTPS URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('https://www.example.com')).toBe(true);
      expect(isValidUrl('https://example.com/path?query=value')).toBe(true);
      expect(isValidUrl('https://subdomain.example.com')).toBe(true);
    });

    it('should return false for invalid URLs', () => {
      expect(isValidUrl('not a url')).toBe(false);
      expect(isValidUrl('ftp://example.com')).toBe(false);
      expect(isValidUrl('//example.com')).toBe(false);
      expect(isValidUrl('example.com')).toBe(false);
    });

    it('should return false for empty or whitespace strings', () => {
      expect(isValidUrl('')).toBe(false);
      expect(isValidUrl('   ')).toBe(false);
    });

    it('should return false for non-string inputs', () => {
      expect(isValidUrl(null)).toBe(false);
      expect(isValidUrl(undefined)).toBe(false);
      expect(isValidUrl(123)).toBe(false);
      expect(isValidUrl({})).toBe(false);
      expect(isValidUrl([])).toBe(false);
    });

    it('should handle URLs with special characters', () => {
      expect(isValidUrl('https://example.com/path?foo=bar&baz=qux')).toBe(true);
      expect(isValidUrl('https://example.com/path#section')).toBe(true);
      expect(isValidUrl('https://user:pass@example.com')).toBe(true);
    });
  });

  describe('isValidEmail', () => {
    it('should return true for valid email addresses', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('test.user@example.com')).toBe(true);
      expect(isValidEmail('user+tag@example.co.uk')).toBe(true);
      expect(isValidEmail('user_name@example-domain.com')).toBe(true);
      expect(isValidEmail('123@example.com')).toBe(true);
    });

    it('should return false for invalid email addresses', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('invalid@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('user @example.com')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
      expect(isValidEmail('user@.com')).toBe(false);
    });

    it('should return false for empty or whitespace strings', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('   ')).toBe(false);
    });

    it('should return false for non-string inputs', () => {
      expect(isValidEmail(null)).toBe(false);
      expect(isValidEmail(undefined)).toBe(false);
      expect(isValidEmail(123)).toBe(false);
      expect(isValidEmail({})).toBe(false);
    });

    it('should handle emails with multiple dots', () => {
      expect(isValidEmail('first.last@example.com')).toBe(true);
      expect(isValidEmail('user@mail.example.com')).toBe(true);
    });
  });

  describe('isValidFileSize', () => {
    it('should return true for file sizes within limit', () => {
      expect(isValidFileSize(1024, 1)).toBe(true); // 1KB < 1MB
      expect(isValidFileSize(5 * 1024 * 1024, 10)).toBe(true); // 5MB < 10MB
      expect(isValidFileSize(0, 1)).toBe(true); // Empty file
    });

    it('should return true for file size exactly at limit', () => {
      expect(isValidFileSize(10 * 1024 * 1024, 10)).toBe(true); // Exactly 10MB
    });

    it('should return false for file sizes exceeding limit', () => {
      expect(isValidFileSize(11 * 1024 * 1024, 10)).toBe(false); // 11MB > 10MB
      expect(isValidFileSize(100 * 1024 * 1024, 50)).toBe(false); // 100MB > 50MB
    });

    it('should use default max size of 10MB when not specified', () => {
      expect(isValidFileSize(5 * 1024 * 1024)).toBe(true); // 5MB < 10MB default
      expect(isValidFileSize(15 * 1024 * 1024)).toBe(false); // 15MB > 10MB default
    });

    it('should return false for invalid file sizes', () => {
      expect(isValidFileSize(-1, 10)).toBe(false);
      expect(isValidFileSize('1024', 10)).toBe(false);
      expect(isValidFileSize(null, 10)).toBe(false);
      expect(isValidFileSize(undefined, 10)).toBe(false);
    });

    it('should return false for invalid max size parameters', () => {
      expect(isValidFileSize(1024, -1)).toBe(false);
      expect(isValidFileSize(1024, 0)).toBe(false);
      expect(isValidFileSize(1024, '10')).toBe(false);
      expect(isValidFileSize(1024, null)).toBe(false);
    });
  });

  describe('hasValidExtension', () => {
    it('should return true for allowed extensions', () => {
      expect(hasValidExtension('image.jpg', ['.jpg', '.png', '.gif'])).toBe(true);
      expect(hasValidExtension('document.pdf', ['.pdf', '.doc'])).toBe(true);
      expect(hasValidExtension('archive.ZIP', ['.zip', '.rar'])).toBe(true); // Case insensitive
    });

    it('should return false for disallowed extensions', () => {
      expect(hasValidExtension('script.exe', ['.jpg', '.png'])).toBe(false);
      expect(hasValidExtension('file.txt', ['.pdf', '.doc'])).toBe(false);
    });

    it('should handle files without extensions', () => {
      expect(hasValidExtension('noextension', ['.txt'])).toBe(false);
    });

    it('should handle multiple dots in filename', () => {
      expect(hasValidExtension('archive.tar.gz', ['.gz'])).toBe(true);
      expect(hasValidExtension('backup.2024.01.01.zip', ['.zip'])).toBe(true);
    });

    it('should return false for empty filename or whitespace', () => {
      expect(hasValidExtension('', ['.txt'])).toBe(false);
      expect(hasValidExtension('   ', ['.txt'])).toBe(false);
    });

    it('should return false for invalid inputs', () => {
      expect(hasValidExtension('file.txt', [])).toBe(false);
      expect(hasValidExtension('file.txt', null)).toBe(false);
      expect(hasValidExtension('file.txt', 'txt')).toBe(false);
      expect(hasValidExtension(null, ['.txt'])).toBe(false);
      expect(hasValidExtension(123, ['.txt'])).toBe(false);
    });

    it('should be case insensitive for both filename and extensions', () => {
      expect(hasValidExtension('Image.JPG', ['.jpg'])).toBe(true);
      expect(hasValidExtension('image.jpg', ['.JPG'])).toBe(true);
      expect(hasValidExtension('IMAGE.JPG', ['.jpg'])).toBe(true);
    });
  });

  describe('isValidHexColor', () => {
    it('should return true for valid 3-digit hex colors', () => {
      expect(isValidHexColor('#fff')).toBe(true);
      expect(isValidHexColor('#000')).toBe(true);
      expect(isValidHexColor('#ABC')).toBe(true);
      expect(isValidHexColor('#1a2')).toBe(true);
    });

    it('should return true for valid 6-digit hex colors', () => {
      expect(isValidHexColor('#ffffff')).toBe(true);
      expect(isValidHexColor('#000000')).toBe(true);
      expect(isValidHexColor('#ABCDEF')).toBe(true);
      expect(isValidHexColor('#123456')).toBe(true);
    });

    it('should return true for valid 4-digit hex colors with alpha', () => {
      expect(isValidHexColor('#ffff')).toBe(true);
      expect(isValidHexColor('#0008')).toBe(true);
    });

    it('should return true for valid 8-digit hex colors with alpha', () => {
      expect(isValidHexColor('#ffffff00')).toBe(true);
      expect(isValidHexColor('#00000080')).toBe(true);
    });

    it('should return false for invalid hex colors', () => {
      expect(isValidHexColor('ffffff')).toBe(false); // Missing #
      expect(isValidHexColor('#ff')).toBe(false); // Too short
      expect(isValidHexColor('#fffff')).toBe(false); // 5 digits
      expect(isValidHexColor('#gggggg')).toBe(false); // Invalid characters
      expect(isValidHexColor('#12345')).toBe(false); // 5 digits
    });

    it('should return false for empty or whitespace strings', () => {
      expect(isValidHexColor('')).toBe(false);
      expect(isValidHexColor('   ')).toBe(false);
    });

    it('should return false for non-string inputs', () => {
      expect(isValidHexColor(null)).toBe(false);
      expect(isValidHexColor(undefined)).toBe(false);
      expect(isValidHexColor(123)).toBe(false);
    });

    it('should handle mixed case', () => {
      expect(isValidHexColor('#FfFfFf')).toBe(true);
      expect(isValidHexColor('#aBcDeF')).toBe(true);
    });
  });

  describe('isInRange', () => {
    it('should return true for values within range', () => {
      expect(isInRange(5, 0, 10)).toBe(true);
      expect(isInRange(0, 0, 10)).toBe(true); // Min boundary
      expect(isInRange(10, 0, 10)).toBe(true); // Max boundary
      expect(isInRange(-5, -10, 0)).toBe(true);
      expect(isInRange(0.5, 0, 1)).toBe(true);
    });

    it('should return false for values outside range', () => {
      expect(isInRange(11, 0, 10)).toBe(false);
      expect(isInRange(-1, 0, 10)).toBe(false);
      expect(isInRange(100, 0, 50)).toBe(false);
    });

    it('should handle negative ranges', () => {
      expect(isInRange(-5, -10, -1)).toBe(true);
      expect(isInRange(-11, -10, -1)).toBe(false);
      expect(isInRange(0, -10, -1)).toBe(false);
    });

    it('should handle decimal values', () => {
      expect(isInRange(3.14, 0, 10)).toBe(true);
      expect(isInRange(0.001, 0, 0.01)).toBe(true);
      expect(isInRange(10.1, 0, 10)).toBe(false);
    });

    it('should return false for invalid min/max', () => {
      expect(isInRange(5, 10, 0)).toBe(false); // Min > Max
      expect(isInRange(5, 'a', 10)).toBe(false);
      expect(isInRange(5, 0, 'b')).toBe(false);
      expect(isInRange(5, null, 10)).toBe(false);
    });

    it('should return false for non-number values', () => {
      expect(isInRange('5', 0, 10)).toBe(false);
      expect(isInRange(null, 0, 10)).toBe(false);
      expect(isInRange(undefined, 0, 10)).toBe(false);
      expect(isInRange(NaN, 0, 10)).toBe(false);
    });

    it('should handle same min and max values', () => {
      expect(isInRange(5, 5, 5)).toBe(true);
      expect(isInRange(4, 5, 5)).toBe(false);
      expect(isInRange(6, 5, 5)).toBe(false);
    });
  });

  describe('isValidJson', () => {
    it('should return true for valid JSON strings', () => {
      expect(isValidJson('{}')).toBe(true);
      expect(isValidJson('[]')).toBe(true);
      expect(isValidJson('{"key": "value"}')).toBe(true);
      expect(isValidJson('[1, 2, 3]')).toBe(true);
      expect(isValidJson('null')).toBe(true);
      expect(isValidJson('true')).toBe(true);
      expect(isValidJson('false')).toBe(true);
      expect(isValidJson('123')).toBe(true);
      expect(isValidJson('"string"')).toBe(true);
    });

    it('should return true for complex nested JSON', () => {
      const complexJson = JSON.stringify({
        users: [
          { id: 1, name: 'John', active: true },
          { id: 2, name: 'Jane', active: false }
        ],
        settings: {
          theme: 'dark',
          notifications: true
        }
      });
      expect(isValidJson(complexJson)).toBe(true);
    });

    it('should return false for invalid JSON strings', () => {
      expect(isValidJson('{key: value}')).toBe(false); // Unquoted keys
      expect(isValidJson("{'key': 'value'}")).toBe(false); // Single quotes
      expect(isValidJson('{key: "value"}')).toBe(false);
      expect(isValidJson('{"key": undefined}')).toBe(false);
      expect(isValidJson('{ trailing comma: true, }')).toBe(false);
    });

    it('should return false for empty or whitespace strings', () => {
      expect(isValidJson('')).toBe(false);
      expect(isValidJson('   ')).toBe(false);
    });

    it('should return false for non-string inputs', () => {
      expect(isValidJson(null)).toBe(false);
      expect(isValidJson(undefined)).toBe(false);
      expect(isValidJson({})).toBe(false);
      expect(isValidJson([])).toBe(false);
      expect(isValidJson(123)).toBe(false);
    });

    it('should handle JSON with whitespace', () => {
      expect(isValidJson('  { "key": "value" }  ')).toBe(true);
      expect(isValidJson('\n{\n  "key": "value"\n}\n')).toBe(true);
    });
  });

  describe('isAlphanumeric', () => {
    it('should return true for alphanumeric strings', () => {
      expect(isAlphanumeric('abc123')).toBe(true);
      expect(isAlphanumeric('ABC123')).toBe(true);
      expect(isAlphanumeric('test')).toBe(true);
      expect(isAlphanumeric('12345')).toBe(true);
      expect(isAlphanumeric('a')).toBe(true);
      expect(isAlphanumeric('1')).toBe(true);
    });

    it('should return false for strings with special characters', () => {
      expect(isAlphanumeric('abc-123')).toBe(false);
      expect(isAlphanumeric('test@email')).toBe(false);
      expect(isAlphanumeric('hello!')).toBe(false);
      expect(isAlphanumeric('test_value')).toBe(false);
    });

    it('should handle spaces based on allowSpaces parameter', () => {
      expect(isAlphanumeric('hello world', false)).toBe(false);
      expect(isAlphanumeric('hello world', true)).toBe(true);
      expect(isAlphanumeric('test 123', true)).toBe(true);
      expect(isAlphanumeric('  spaces  ', true)).toBe(true);
    });

    it('should return false for empty strings', () => {
      expect(isAlphanumeric('')).toBe(false);
    });

    it('should return false for non-string inputs', () => {
      expect(isAlphanumeric(null)).toBe(false);
      expect(isAlphanumeric(undefined)).toBe(false);
      expect(isAlphanumeric(123)).toBe(false);
    });

    it('should handle mixed case', () => {
      expect(isAlphanumeric('AbC123')).toBe(true);
      expect(isAlphanumeric('TeSt')).toBe(true);
    });
  });

  describe('validatePassword', () => {
    it('should validate strong passwords with default options', () => {
      const result = validatePassword('SecurePass123!');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should return errors for weak passwords', () => {
      const result = validatePassword('weak');
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should check minimum length', () => {
      const result = validatePassword('Short1!', { minLength: 10 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password must be at least 10 characters long');
    });

    it('should check for uppercase letters', () => {
      const result = validatePassword('lowercase123!');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one uppercase letter');
    });

    it('should check for lowercase letters', () => {
      const result = validatePassword('UPPERCASE123!');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one lowercase letter');
    });

    it('should check for numbers', () => {
      const result = validatePassword('NoNumbers!');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one number');
    });

    it('should check for special characters', () => {
      const result = validatePassword('NoSpecial123');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one special character');
    });

    it('should allow disabling specific requirements', () => {
      const result = validatePassword('simplepass', {
        requireUppercase: false,
        requireNumber: false,
        requireSpecial: false
      });
      expect(result.isValid).toBe(true);
    });

    it('should handle custom minimum length', () => {
      const result1 = validatePassword('Abc123!', { minLength: 6 });
      expect(result1.isValid).toBe(true);

      const result2 = validatePassword('Abc123!', { minLength: 10 });
      expect(result2.isValid).toBe(false);
    });

    it('should return multiple errors for very weak passwords', () => {
      const result = validatePassword('a');
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThanOrEqual(4);
    });

    it('should handle non-string inputs', () => {
      const result = validatePassword(123);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password must be a string');
    });

    it('should validate with all options disabled except length', () => {
      const result = validatePassword('anypassword', {
        minLength: 5,
        requireUppercase: false,
        requireLowercase: false,
        requireNumber: false,
        requireSpecial: false
      });
      expect(result.isValid).toBe(true);
    });
  });

  describe('sanitizeInput', () => {
    it('should remove angle brackets', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe('scriptalert(xss)/script');
      expect(sanitizeInput('Hello <b>World</b>')).toBe('Hello bWorld/b');
    });

    it('should remove quotes', () => {
      expect(sanitizeInput('Hello "World"')).toBe('Hello World');
      expect(sanitizeInput("Hello 'World'")).toBe('Hello World');
    });

    it('should remove javascript: protocol', () => {
      expect(sanitizeInput('javascript:alert(1)')).toBe('alert(1)');
      expect(sanitizeInput('JAVASCRIPT:alert(1)')).toBe('alert(1)');
      expect(sanitizeInput('JaVaScRiPt:alert(1)')).toBe('alert(1)');
    });

    it('should trim whitespace', () => {
      expect(sanitizeInput('  hello  ')).toBe('hello');
      expect(sanitizeInput('\n\ttest\n\t')).toBe('test');
    });

    it('should handle combined malicious inputs', () => {
      const malicious = '  <script>javascript:alert("test")</script>  ';
      const sanitized = sanitizeInput(malicious);
      expect(sanitized).not.toContain('<');
      expect(sanitized).not.toContain('>');
      expect(sanitized).not.toContain('"');
      expect(sanitized).not.toContain('javascript:');
    });

    it('should return empty string for non-string inputs', () => {
      expect(sanitizeInput(null)).toBe('');
      expect(sanitizeInput(undefined)).toBe('');
      expect(sanitizeInput(123)).toBe('');
      expect(sanitizeInput({})).toBe('');
      expect(sanitizeInput([])).toBe('');
    });

    it('should preserve safe content', () => {
      expect(sanitizeInput('Hello World')).toBe('Hello World');
      expect(sanitizeInput('user@example.com')).toBe('user@example.com');
      expect(sanitizeInput('123-456-7890')).toBe('123-456-7890');
    });

    it('should handle empty strings', () => {
      expect(sanitizeInput('')).toBe('');
      expect(sanitizeInput('   ')).toBe('');
    });

    it('should handle strings with only malicious content', () => {
      expect(sanitizeInput('<<<>>>')).toBe('');
      expect(sanitizeInput('"\'"')).toBe('');
      expect(sanitizeInput('javascript:javascript:')).toBe('');
    });
  });
});
