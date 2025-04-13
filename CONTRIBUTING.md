# Contributing to xScrabbler

Thank you for your interest in contributing to xScrabbler! This document provides guidelines and information on how you can participate in the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Improvements](#suggesting-improvements)
  - [Contributing Code](#contributing-code)
- [Development Workflow](#development-workflow)
- [Style Guide](#style-guide)
- [Commit Messages](#commit-messages)
- [Pull Requests](#pull-requests)

## Code of Conduct

Our project adopts a Code of Conduct that we expect to be followed by all participants. Please read the [Code of Conduct](CODE_OF_CONDUCT.md) to understand which behaviors will and will not be tolerated.

## How Can I Contribute?

### Reporting Bugs

Bugs are tracked as [GitHub issues](https://github.com/exSnake/xscrabble-scorer/issues).

When creating a bug report, please include as many details as possible:

- **Clear and descriptive title**
- **Detailed steps to reproduce the problem**
- **Expected behavior and observed behavior**
- **Screenshots** where applicable
- **Environment** (browser, operating system, device)

### Suggesting Improvements

Improvement suggestions are also tracked as GitHub issues. When suggesting an improvement, please:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested improvement**
- **Explain why this improvement would be beneficial to most users**
- **Include mockups or examples** if possible

### Contributing Code

If you wish to contribute directly to the code:

1. Fork the repository
2. Create a new branch for your changes
3. Implement your changes
4. Ensure that the code passes tests and linting
5. Submit a pull request

## Development Workflow

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/xscrabble-scorer.git
   cd xscrabble-scorer
   ```
3. Create a branch for your work:
   ```bash
   git checkout -b feature/nome-della-feature
   ```
4. Develop your feature or fix:
5. Run tests and linting:
   ```bash
   npm run lint
   ```
6. Commit your changes (see below for commit conventions):
   ```bash
   git commit -m "feat: add new feature X"
   ```
7. Push to your fork:
   ```bash
   git push origin feature/feature-name
   ```
8. Create a Pull Request on GitHub

## Style guide

### JavaScript / Vue

- Follow the project's ESLint configuration
- Use Vue 3's Composition API
- Keep components small and specific
- Use existing helper functions when possible

### CSS

- Use Tailwind CSS for styling
- Follow the existing design for consistency
- Maintain support for both light and dark themes

## Commit message

We follow the [Conventional Commits specification](https://www.conventionalcommits.org/) for commit messages:

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

Common types:
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Changes that do not affect the meaning of the code (whitespace, formatting, etc.)
- **refactor**: Code changes that neither fix a bug nor add a feature
- **perf**: Performance improvements
- **test**: Adding or correcting tests

Example:
```
feat(scorer): add support for multiple word bonuses
```

## Pull request

- Create a pull request from your feature branch to the main branch of the original repository
- Clearly describe the changes you have made
- Link any relevant issues using the syntax "Closes #123" or "Fixes #123"
- Ensure that the PR passes all automatic checks
- Wait for a review by the maintainers


Thank you for contributing to xScrabbler! 