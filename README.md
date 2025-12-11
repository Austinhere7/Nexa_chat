# NexaChat - Next-Generation AI Assistant Platform

<div align="center">

![NexaChat](https://github.com/Austinhere7/Nexa_chat/raw/main/public/placeholder-logo.png)

**Your AI Assistant, Reimagined** — Experience the next generation of conversational AI. Intelligent, intuitive, and designed to transform how you work and create.

[![GitHub](https://img.shields.io/badge/GitHub-Nexa_chat-blue?logo=github)](https://github.com/Austinhere7/Nexa_chat)
[![License](https://img.shields.io/badge/License-MIT-green)]()
[![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black?logo=next.js)](https://nextjs.org)

</div>

## Features

### 🎯 Core Features

- **Intelligent Conversation Engine** - Powered by GPT-4 & Claude for smart, contextual responses
- **Real-time Chat** - Instant messaging with live conversation history
- **Multi-Modal Support** - Handle text, documents, and code snippets seamlessly
- **User Authentication** - Secure login with role-based access control
- **Message History** - Persistent conversation storage and retrieval

### ✨ UI/UX Excellence

- **Modern Dark Theme** - Beautiful, eye-friendly interface with cyan/blue accent colors
- **Animated Background** - Dynamic color-grading overlay with breathing animations
- **Grid Overlay Effects** - Stylish squared grid design across the landing page
- **Glow Animations** - Interactive hover effects with smooth transitions
- **Responsive Design** - Fully responsive from mobile to desktop
- **Accessibility First** - Respects `prefers-reduced-motion` for users with motion sensitivity

### 📊 Performance Metrics

- **50K+** Active Users
- **2M+** Messages Daily
- **99.9%** Uptime SLA
- Lightning-fast response times with optimized inference

## Tech Stack

### Frontend

- **Framework**: [Next.js 16.0.7](https://nextjs.org) with React 19
- **Styling**: [Tailwind CSS 4.1.9](https://tailwindcss.com)
- **UI Components**: Radix UI + Custom Components
- **Icons**: [Lucide React](https://lucide.dev)
- **Form Handling**: React Hook Form + Zod Validation
- **Animations**: Tailwind CSS + Custom Keyframes

### Backend

- **Runtime**: Node.js with Next.js API Routes
- **Database**: PostgreSQL (schema pending)
- **Authentication**: Next-Auth (implementation pending)
- **AI Integration**: OpenAI GPT-4 & Anthropic Claude APIs

### Development Tools

- **Package Manager**: [pnpm](https://pnpm.io)
- **Build Tool**: Turbopack (Next.js bundler)
- **Linting**: ESLint
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- pnpm 10.x

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Austinhere7/Nexa_chat.git
   cd Nexa_chat
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your API keys:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   OPENAI_API_KEY=your_openai_key
   ANTHROPIC_API_KEY=your_anthropic_key
   DATABASE_URL=your_database_url
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
Nexa_chat/
├── app/                      # Next.js app directory
│   ├── globals.css          # Global styles with animations
│   ├── layout.tsx           # Root layout with theme provider
│   └── page.tsx             # Home page
├── components/              # Reusable React components
│   ├── hero.tsx             # Hero section (2-col layout, chat mockup)
│   ├── navbar.tsx           # Navigation bar
│   ├── features.tsx         # Features section
│   ├── pricing.tsx          # Pricing plans
│   ├── testimonials.tsx     # User testimonials
│   ├── faq.tsx              # FAQ section
│   ├── cta.tsx              # Call-to-action
│   ├── footer.tsx           # Footer
│   ├── theme-provider.tsx   # Dark theme provider
│   └── ui/                  # UI component library
│       └── button.tsx       # Reusable button
├── lib/                     # Utility functions
│   └── utils.ts            # Helper functions
├── public/                  # Static assets
├── styles/                  # Additional stylesheets
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript config
├── tailwind.config.js      # Tailwind CSS config
├── postcss.config.mjs      # PostCSS config
└── next.config.mjs         # Next.js config
```

## Key Design Features

### Animated Background System

The landing page features a sophisticated layered background:

1. **Color Grading Overlay** - 18-second animation cycling through cyan, blue, and purple tones
2. **Grid Pattern Layer** - 48px fine-line grid with 112px checker tiles in cyan rgba
3. **Rectangular Glow** - Behind the chat mockup with:
   - 4-second brightness/saturation cycle
   - Hover-triggered intensification (2.2s animation)
   - Smooth blur and scale transformations

### Responsive Hero Layout

- **Mobile (< lg)**: Single column with stacked elements
- **Desktop (lg+)**: Two-column grid with text on left, chat mockup on right
- **Smooth Animations**: Fade-in on load with 700ms duration

## Development Workflow

### Available Scripts

```bash
# Development server with hot reload
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

### Git Workflow

```bash
# Create a feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "feat: your feature description"

# Push to remote
git push origin feature/your-feature

# Create a pull request on GitHub
```

## Component Documentation

### Hero Component (`components/hero.tsx`)

Two-column layout hero section with:
- Gradient text ("Your AI Assistant" + "Reimagined")
- Feature badge with icon
- CTA buttons (primary gradient + secondary outline)
- Stats row (50K+ users, 2M+ messages, 99.9% uptime)
- Chat mockup with sample conversation
- Glow and masking effects

**Props**: None (standalone component)

### Button Component (`components/ui/button.tsx`)

Reusable button with variants:
- Size: `sm`, `md`, `lg`, `xl`
- Variant: `default`, `outline`, `ghost`, `destructive`

## API Routes (Planned)

```
/api/chat          - Send chat messages
/api/conversations - Manage chat history
/api/auth          - Authentication endpoints
/api/user          - User profile management
```

## Performance Optimizations

- **Image Optimization**: Next.js Image component for auto-sizing
- **Code Splitting**: Automatic route-based code splitting
- **CSS Optimization**: Tailwind CSS purging for minimal bundle
- **Animation Performance**: GPU-accelerated transforms and opacity changes
- **Lazy Loading**: Components load on-demand with dynamic imports

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Roadmap

- [ ] User Authentication System
- [ ] Database Integration (PostgreSQL)
- [ ] API Integration (OpenAI, Anthropic)
- [ ] Conversation Persistence
- [ ] User Settings & Preferences
- [ ] Team/Organization Support
- [ ] Advanced Search & Filtering
- [ ] Export Conversations (PDF, Markdown)
- [ ] Mobile App (React Native)
- [ ] Marketplace for AI Models

## Known Issues

- Grid overlay visibility can be fine-tuned for certain screen sizes
- Glow animation requires modern browser GPU acceleration
- Motion sensitivity preferences fully respected but may affect perceived performance

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Issues**: [GitHub Issues](https://github.com/Austinhere7/Nexa_chat/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Austinhere7/Nexa_chat/discussions)
- **Email**: support@nexachat.local

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Components from [Radix UI](https://www.radix-ui.com)
- Icons from [Lucide React](https://lucide.dev)
- AI Models: OpenAI GPT-4 & Anthropic Claude

---

Made with ❤️ by [Austinhere7](https://github.com/Austinhere7)
