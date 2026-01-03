# Contributing to All Online Tools Hub

Thank you for your interest in contributing to All Online Tools Hub! This document provides guidelines for contributing to the project.

## Ways to Contribute

### 1. Report Bugs

If you find a bug, please create an issue with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser and OS information

### 2. Suggest New Tools

We're always looking to add new tools! Submit an issue with:
- Tool name and description
- What problem it solves
- Similar tools for reference
- Category it belongs to

### 3. Improve Documentation

Help us improve:
- README.md
- Code comments
- Setup guides
- User documentation

### 4. Enhance Performance

- Optimize load times
- Reduce bundle sizes
- Improve Web Vitals scores
- Better caching strategies

### 5. Fix Issues

Look for issues labeled:
- `good first issue` - Great for newcomers
- `help wanted` - We need assistance
- `bug` - Something isn't working
- `enhancement` - New feature or request

## Development Setup

### Prerequisites

- Node.js 18+ and npm 9+
- Git
- Code editor (VS Code recommended)

### Getting Started

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/allonlinetoolshub.git

# Navigate to the project
cd allonlinetoolshub

# Create a branch for your changes
git checkout -b feature/your-feature-name

# Make your changes
# ...

# Test the build
npm run build

# Validate changes
npm run validate

# Preview locally
npm run preview
```

## Pull Request Process

### Before Submitting

1. **Test your changes** locally
2. **Validate** that build succeeds
3. **Update documentation** if needed
4. **Check performance** impact
5. **Ensure security** best practices

### PR Guidelines

1. **Branch naming**:
   - `feature/` - New features
   - `fix/` - Bug fixes
   - `docs/` - Documentation
   - `perf/` - Performance improvements

2. **Commit messages**:
   ```
   type(scope): Brief description

   Longer explanation if needed

   Fixes #issue-number
   ```

   Types: `feat`, `fix`, `docs`, `perf`, `refactor`, `test`, `chore`

3. **PR description**:
   - What changes were made
   - Why these changes are needed
   - How to test the changes
   - Screenshots for UI changes
   - Link to related issues

### Review Process

1. Automated checks must pass
2. Code review by maintainers
3. Address feedback
4. Approval and merge

## Code Standards

### HTML

- Semantic HTML5
- Proper meta tags
- Accessibility attributes (ARIA)
- Valid structured data (JSON-LD)

### CSS

- Mobile-first approach
- Use Tailwind utility classes
- Responsive design
- Dark mode support

### JavaScript

- ES6+ syntax
- Async/await over promises
- Error handling
- Performance optimization
- Security best practices

### Security

- No XSS vulnerabilities
- Proper CSP headers
- Input validation
- HTTPS only
- No sensitive data in client

### Performance

- Lazy load resources
- Optimize images
- Minimize bundle size
- Efficient caching
- Core Web Vitals targets

## File Organization

```
allonlinetoolshub/
├── assets/           # Built assets (don't modify directly)
├── *.html           # HTML pages
├── *.js             # JavaScript files
├── *.css            # Stylesheets
├── _headers         # Security headers
├── _redirects       # URL redirects
└── docs/            # Documentation
```

## Testing Checklist

Before submitting a PR, verify:

- [ ] Build succeeds (`npm run build`)
- [ ] Validation passes (`npm run validate`)
- [ ] Preview works (`npm run preview`)
- [ ] All tools function correctly
- [ ] Responsive on mobile/tablet/desktop
- [ ] Works in Chrome, Firefox, Safari
- [ ] No console errors
- [ ] Performance not degraded
- [ ] Security headers intact
- [ ] SEO not negatively impacted

## Security Issues

**DO NOT** create public issues for security vulnerabilities.

Instead:
1. Email: security@allonlinetoolshub.com
2. Include detailed description
3. Steps to reproduce
4. Potential impact

We'll respond within 48 hours.

## Tool Addition Guidelines

### Criteria for New Tools

Tools should be:
- **Useful**: Solves a real problem
- **Privacy-focused**: Runs client-side
- **Fast**: Loads and executes quickly
- **Reliable**: Works consistently
- **Accessible**: Easy to use

### Tool Implementation

1. **Create tool component**
   - Input/output UI
   - Processing logic
   - Error handling
   - Loading states

2. **Add to navigation**
   - Category assignment
   - Search keywords
   - Tool description

3. **Create sitemap entry**
   - Add to appropriate sitemap-*.xml
   - Set priority and changefreq

4. **Update documentation**
   - Tool description
   - Usage instructions
   - Examples

5. **Test thoroughly**
   - Various inputs
   - Edge cases
   - Error conditions
   - Performance

## Documentation Standards

- Clear and concise
- Examples for complex topics
- Screenshots where helpful
- Up-to-date with code
- Proper grammar and spelling

## Community Guidelines

### Be Respectful

- Professional communication
- Constructive feedback
- No harassment or discrimination
- Assume good intentions

### Be Helpful

- Answer questions
- Share knowledge
- Mentor newcomers
- Review code thoughtfully

### Be Patient

- Contributors have varying skill levels
- Reviews take time
- Not all PRs will be merged
- Discussion leads to better solutions

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Credited in release notes
- Thanked in project updates

## Questions?

- **General questions**: GitHub Discussions
- **Bug reports**: GitHub Issues
- **Security**: security@allonlinetoolshub.com
- **Other**: support@allonlinetoolshub.com

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for making All Online Tools Hub better! 🎉
