# Validation Utilities

This module provides comprehensive validation functions for common use cases in online tools.

## Functions

### `isValidUrl(url)`
Validates if a string is a valid HTTP or HTTPS URL.

**Parameters:**
- `url` (string): The URL to validate

**Returns:** `boolean`

**Example:**
```javascript
isValidUrl('https://example.com'); // true
isValidUrl('not a url'); // false
```

### `isValidEmail(email)`
Validates if a string is a valid email address using RFC 5322 compliant regex.

**Parameters:**
- `email` (string): The email address to validate

**Returns:** `boolean`

**Example:**
```javascript
isValidEmail('user@example.com'); // true
isValidEmail('invalid@'); // false
```

### `isValidFileSize(sizeInBytes, maxSizeInMB)`
Validates if a file size is within the allowed limit.

**Parameters:**
- `sizeInBytes` (number): The file size in bytes
- `maxSizeInMB` (number): Maximum allowed size in megabytes (default: 10)

**Returns:** `boolean`

**Example:**
```javascript
isValidFileSize(5 * 1024 * 1024, 10); // true (5MB < 10MB)
isValidFileSize(15 * 1024 * 1024, 10); // false (15MB > 10MB)
```

### `hasValidExtension(filename, allowedExtensions)`
Validates if a file has an allowed extension.

**Parameters:**
- `filename` (string): The filename to check
- `allowedExtensions` (string[]): Array of allowed extensions (e.g., ['.jpg', '.png'])

**Returns:** `boolean`

**Example:**
```javascript
hasValidExtension('photo.jpg', ['.jpg', '.png']); // true
hasValidExtension('document.pdf', ['.jpg', '.png']); // false
```

### `isValidHexColor(color)`
Validates if a string is a valid hexadecimal color code.

**Parameters:**
- `color` (string): The color string to validate

**Returns:** `boolean`

**Example:**
```javascript
isValidHexColor('#ffffff'); // true
isValidHexColor('#fff'); // true
isValidHexColor('ffffff'); // false (missing #)
```

### `isInRange(value, min, max)`
Validates if a number is within a specified range (inclusive).

**Parameters:**
- `value` (number): The value to check
- `min` (number): Minimum allowed value
- `max` (number): Maximum allowed value

**Returns:** `boolean`

**Example:**
```javascript
isInRange(5, 0, 10); // true
isInRange(15, 0, 10); // false
```

### `isValidJson(jsonString)`
Validates if a string is valid JSON.

**Parameters:**
- `jsonString` (string): The JSON string to validate

**Returns:** `boolean`

**Example:**
```javascript
isValidJson('{"key": "value"}'); // true
isValidJson('{invalid}'); // false
```

### `isAlphanumeric(str, allowSpaces)`
Validates if a string contains only alphanumeric characters.

**Parameters:**
- `str` (string): The string to validate
- `allowSpaces` (boolean): Whether to allow spaces (default: false)

**Returns:** `boolean`

**Example:**
```javascript
isAlphanumeric('abc123'); // true
isAlphanumeric('abc 123', true); // true
isAlphanumeric('abc-123'); // false
```

### `validatePassword(password, options)`
Validates password strength with customizable requirements.

**Parameters:**
- `password` (string): The password to validate
- `options` (object): Validation options
  - `minLength` (number): Minimum length (default: 8)
  - `requireUppercase` (boolean): Require uppercase letter (default: true)
  - `requireLowercase` (boolean): Require lowercase letter (default: true)
  - `requireNumber` (boolean): Require number (default: true)
  - `requireSpecial` (boolean): Require special character (default: true)

**Returns:** `{ isValid: boolean, errors: string[] }`

**Example:**
```javascript
validatePassword('SecurePass123!');
// { isValid: true, errors: [] }

validatePassword('weak');
// { isValid: false, errors: ['Password must be at least 8 characters long', ...] }
```

### `sanitizeInput(input)`
Sanitizes a string by removing potentially harmful characters.

**Parameters:**
- `input` (string): The string to sanitize

**Returns:** `string`

**Example:**
```javascript
sanitizeInput('<script>alert("xss")</script>');
// 'scriptalert(xss)/script'

sanitizeInput('  normal text  ');
// 'normal text'
```

## Testing

The validation utilities have comprehensive test coverage with 72 test cases.

### Run Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm test:coverage
```

### Watch Mode
```bash
npm test:watch
```

## Test Coverage

All functions have extensive test coverage including:
- Valid inputs
- Invalid inputs
- Edge cases
- Boundary conditions
- Type checking
- Error handling

**Test Results:**
- 72 tests passing
- 10 functions tested
- Edge cases covered
- Input validation tested
- Security scenarios tested
