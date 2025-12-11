# Contributing to NexaChat

Thank you for your interest in contributing to NexaChat! We appreciate your effort and want to make the contribution process as smooth as possible. This document provides guidelines and instructions for contributing.

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the [issue list](https://github.com/Austinhere7/Nexa_chat/issues) as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps which reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots if possible**
- **Include your environment details** (OS, Node version, pnpm version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as [GitHub issues](https://github.com/Austinhere7/Nexa_chat/issues). When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and the expected behavior**
- **Explain why this enhancement would be useful**

## Development Setup

### Prerequisites

- Node.js 18.17+ or 20.x
- pnpm 10.x

### Local Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/Nexa_chat.git
   cd Nexa_chat
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Install dependencies**
   ```bash
   pnpm install
   ```

4. **Create .env.local file**
   ```bash
   cp .env.example .env.local
   # Update the values in .env.local with your configuration
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   - Navigate to http://localhost:3000

## Making Changes

### Coding Standards

- **Use TypeScript** - All new code should be written in TypeScript
- **Follow ESLint rules** - Run `pnpm lint` to check your code
- **Write meaningful comments** - Explain complex logic
- **Keep functions small** - Aim for single responsibility
- **Use descriptive variable names** - No single letters (except for loops)

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type**: feat, fix, docs, style, refactor, test, chore
**Scope**: Component or feature area (e.g., hero, navbar, auth)
**Subject**: Brief description of the change

**Examples:**
- `feat(hero): add animation to glow effect`
- `fix(chat): resolve message truncation issue`
- `docs(readme): update installation instructions`
- `refactor(button): simplify component logic`

### Testing

Before submitting a PR, make sure:

1. **Code compiles without errors**
   ```bash
   pnpm build
   ```

2. **Linting passes**
   ```bash
   pnpm lint
   ```

3. **Manual testing is complete**
   - Test on multiple browsers (Chrome, Firefox, Safari)
   - Test responsive behavior (mobile, tablet, desktop)
   - Test dark mode if applicable
   - Test animations on reduced-motion settings

## Pull Request Process

1. **Update documentation**
   - Update README.md if you change functionality
   - Add comments to complex code
   - Update .env.example if adding new variables

2. **Create descriptive PR**
   - Use a clear title following the Conventional Commits format
   - Describe what changes were made and why
   - Reference any related issues (e.g., Closes #123)
   - Include screenshots for UI changes

3. **Ensure tests pass**
   - All GitHub Actions should pass
   - No new console errors or warnings

4. **Request review**
   - At least one maintainer must review before merge
   - Be responsive to feedback

5. **Squash commits if requested**
   ```bash
   git rebase -i HEAD~n
   git push origin feature/your-feature --force-with-lease
   ```

## Project Structure Guidelines

When adding new features:

```
components/
├── feature-name/
│   ├── index.tsx          # Main component
│   ├── feature-name.tsx   # If large, split into multiple files
│   └── styles.ts          # Component-specific styles (if needed)

lib/
├── api/                   # API-related utilities
├── hooks/                 # Custom React hooks
└── utils/                 # General utilities
```

## Component Checklist

When creating new components:

- [ ] Written in TypeScript with proper types
- [ ] Uses functional components with hooks
- [ ] Includes proper prop documentation/JSDoc
- [ ] Passes ESLint checks
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Accessible (proper semantic HTML, ARIA labels)
- [ ] Respects dark mode
- [ ] Works with reduced-motion preferences

## Styling Guidelines

- **Use Tailwind CSS** - Avoid inline styles and CSS modules where possible
- **Use CSS variables** - Defined in globals.css for theme colors
- **Mobile-first** - Start with mobile styles, add larger breakpoints
- **Dark mode** - Use `dark:` prefix for dark mode specific styles
- **Animations** - Use custom keyframes in globals.css for complex animations

## Performance Checklist

- [ ] No unnecessary re-renders
- [ ] Images optimized using Next.js Image component
- [ ] Code splitting applied where appropriate
- [ ] No console errors or warnings
- [ ] Lighthouse score maintained (90+)
- [ ] Bundle size impact considered

## Questions?

Don't hesitate to ask! You can:

- Open a [GitHub Discussion](https://github.com/Austinhere7/Nexa_chat/discussions)
- Create a new issue with your question
- Contact maintainers

## License

By contributing to NexaChat, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to NexaChat! 🎉
