# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in NexaChat, please do **NOT** open a public GitHub issue. Instead, please report it responsibly to our security team.

### How to Report

Please email your vulnerability report to: **security@nexachat.local**

Include the following information:
- Description of the vulnerability
- Steps to reproduce or proof of concept
- Potential impact
- Suggested fix (if any)

We will acknowledge receipt of your report within 48 hours and provide a more detailed response within 5 business days.

## Security Best Practices

### For Users

1. **Keep Dependencies Updated** - Run `pnpm update` regularly
2. **Use Environment Variables** - Never commit `.env.local` to version control
3. **Secure API Keys** - Treat all API keys as secrets
4. **Report Issues Privately** - Don't disclose vulnerabilities publicly

### For Developers

1. **Code Review** - All contributions are peer-reviewed
2. **Dependency Auditing** - Run `pnpm audit` before commits
3. **Input Validation** - Always validate and sanitize user input
4. **XSS Prevention** - Use React's built-in escaping
5. **CSRF Protection** - Implement tokens for state-changing operations
6. **Secure Headers** - Use proper HTTP security headers

### Environment Security

- Never commit sensitive data to the repository
- Use `.env.local` for local development (listed in .gitignore)
- Rotate API keys periodically
- Use least-privilege access for database connections
- Enable 2FA for GitHub account

## Dependencies

We use the following dependencies (keep these updated):

- **Next.js** - Web framework
- **React** - UI library
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible components
- **React Hook Form** - Form management

### Dependency Updates

- Security updates: Applied immediately
- Major updates: Tested before deployment
- Minor/patch updates: Applied regularly

## Compliance

- MIT License - Permissive open-source license
- No personally identifiable information (PII) collection without consent
- GDPR considerations for EU users
- Data privacy by design

## Third-Party Services

### API Integration Security

- OpenAI API - OAuth 2.0 authentication
- Anthropic API - Bearer token authentication
- All API calls use HTTPS/TLS encryption

### Security Scanning

- GitHub's dependency scanning enabled
- CodeQL analysis enabled
- Manual code reviews on all PRs

## Incident Response

In case of a security incident:

1. We will investigate the scope and impact
2. Notify affected users (if applicable)
3. Deploy a fix or mitigation
4. Post a security advisory
5. Update documentation

## Responsible Disclosure

We appreciate responsible disclosure and will:
- Credit researchers who report vulnerabilities responsibly
- Not pursue legal action against good-faith security researchers
- Work with researchers to understand and fix issues

## Security Updates

Subscribe to GitHub repository notifications to stay informed about security updates and patches.

---

Last Updated: 2025-12-11
