# Contributing to SmartWealth

ขอบคุณที่สนใจร่วมพัฒนา SmartWealth! 🎉

## 🌟 How to Contribute

### 1. Fork & Clone

```bash
# Fork repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/smartwealth.git
cd smartwealth

# Add upstream remote
git remote add upstream https://github.com/original/smartwealth.git
```

### 2. Create a Branch

```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code refactoring
- `test/` - Tests
- `chore/` - Maintenance

### 3. Make Changes

#### Code Style

- Use **TypeScript** strict mode
- Follow **React best practices**
- Use **functional components** with hooks
- Keep components **small and focused**
- Write **meaningful variable names**

#### Component Structure

```tsx

import { ComponentProps } from '../types';

interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

export function MyComponent({ title, onClick }: MyComponentProps) {
  // Hooks at the top
  const [state, setState] = useState(false);

  // Event handlers
  const handleClick = () => {
    onClick?.();
  };

  // Render
  return (
    <div className="...">
      <h1>{title}</h1>
    </div>
  );
}
```

#### CSS/Tailwind Guidelines

- Use Tailwind utility classes
- Follow mobile-first approach
- Use consistent spacing scale
- Prefer semantic color names
- Keep responsive modifiers readable

```tsx
// Good ✅
<div className="p-4 md:p-6 lg:p-8 bg-white rounded-2xl shadow-sm">

// Bad ❌
<div className="p-4 bg-white rounded-2xl shadow-sm md:p-6 lg:p-8">
```

### 4. Commit Changes

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add tax calculator component"
git commit -m "fix: correct savings calculation formula"
git commit -m "docs: update API documentation"
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Tests
- `chore`: Maintenance

### 5. Push & Create PR

```bash
# Push to your fork
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

#### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation

## Testing
- [ ] Tested locally
- [ ] Added tests
- [ ] All tests passing

## Screenshots (if applicable)
...

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex parts
- [ ] Updated documentation
```

## 🐛 Reporting Bugs

### Before Submitting

1. Check existing issues
2. Try latest version
3. Search documentation

### Bug Report Template

```markdown
**Describe the bug**
Clear description

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment:**
- OS: [e.g. macOS]
- Browser: [e.g. Chrome 120]
- Version: [e.g. 1.0.0]

**Additional context**
Any other information
```

## 💡 Suggesting Features

### Feature Request Template

```markdown
**Is your feature related to a problem?**
Description of the problem

**Describe the solution**
How you'd like it to work

**Alternatives considered**
Other solutions you've thought about

**Additional context**
Screenshots, examples, etc.
```

## 📝 Documentation

### Types of Documentation

1. **Code Comments**: For complex logic
2. **Component Props**: TypeScript interfaces
3. **README**: User-facing documentation
4. **ARCHITECTURE**: Technical documentation
5. **API**: API endpoint documentation

### Documentation Style

```tsx
/**
 * Calculates insurance premium based on age and coverage amount
 * 
 * @param age - Age of the insured person (1-70)
 * @param sumAssured - Coverage amount in Thai Baht
 * @returns Annual premium amount
 * 
 * @example
 * ```ts
 * const premium = calculatePremium(35, 1000000);
 * // Returns: 82000
 * ```
 */
export function calculatePremium(age: number, sumAssured: number): number {
  // Implementation
}
```

## 🧪 Testing

### Writing Tests

```tsx
import { render, screen } from '@testing-library/react';
import { InsuranceCard } from './InsuranceCard';

describe('InsuranceCard', () => {
  it('renders title correctly', () => {
    render(
      <InsuranceCard 
        title="Test Insurance"
        // ...other props
      />
    );
    
    expect(screen.getByText('Test Insurance')).toBeInTheDocument();
  });
});
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run specific file
pnpm test InsuranceCard

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage
```

## 🔍 Code Review Process

### What We Look For

1. **Functionality**: Does it work as intended?
2. **Code Quality**: Is it clean and maintainable?
3. **Performance**: Any performance issues?
4. **Security**: Any security concerns?
5. **Tests**: Adequate test coverage?
6. **Documentation**: Properly documented?

### Review Timeline

- Initial review: Within 2 business days
- Follow-up reviews: Within 1 business day
- Merge: After approval from 1+ maintainers

## 🎨 Design Guidelines

### Colors

Primary palette:
- Red: `#DC2626` - Primary actions
- Blue: `#3B82F6` - Information
- Green: `#10B981` - Success
- Amber: `#F59E0B` - Warning
- Slate: `#64748B` - Neutral

### Typography

- Headings: Font weight 800-900 (black)
- Body: Font weight 400-500 (normal/medium)
- Small text: Font weight 600-700 (semibold/bold)

### Spacing

Use Tailwind's spacing scale:
- `4` (1rem / 16px) - Base unit
- `8` (2rem / 32px) - Section spacing
- `12` (3rem / 48px) - Page sections

## 🚀 Deployment

### Before Deploying

- [ ] All tests pass
- [ ] No console errors
- [ ] Lighthouse score > 90
- [ ] Tested on mobile
- [ ] Updated CHANGELOG

### Deployment Process

1. Update version in `package.json`
2. Create git tag
3. Push to main branch
4. CI/CD automatically deploys

## 📞 Getting Help

- **Slack**: #smartwealth-dev
- **Email**: dev@smartwealth.example.com
- **Office Hours**: Mon-Fri 9:00-17:00 ICT

## 🏆 Recognition

Contributors will be:
- Listed in README
- Mentioned in release notes
- Invited to contributor meetings

## ⚖️ Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone.

### Our Standards

**Positive behavior:**
- Using welcoming language
- Being respectful
- Accepting constructive criticism
- Focusing on what's best for the community

**Unacceptable behavior:**
- Trolling or insulting comments
- Public or private harassment
- Publishing others' private information
- Other unprofessional conduct

### Enforcement

Violations may result in:
1. Warning
2. Temporary ban
3. Permanent ban

Report issues to: conduct@smartwealth.example.com

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Guide](https://reactrouter.com)

## 🎓 Learning Resources

New to contributing? Start here:
- [First Contributions](https://github.com/firstcontributions/first-contributions)
- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Git Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows)

---

Thank you for contributing to SmartWealth! 🙏
