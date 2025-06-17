# Banjara Restaurant Website

A modern, elegant website for Banjara, a heritage Indian cuisine restaurant, built with Next.js, React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Responsive Design**: Optimized for all device sizes
- **Heritage Theme**: Sophisticated walnut, tan, and gold color scheme
- **Online Reservations**: Complete table booking system with date/time selection
- **Interactive Menu**: Regional Indian dishes with dietary indicators and spice levels
- **Contact Form**: Customer inquiry submission with multiple inquiry types
- **About Page**: Restaurant heritage story and nomadic cuisine philosophy
- **Animations**: Smooth animations using Framer Motion
- **Image Optimization**: Advanced image handling and optimization

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) built with Radix UI
- **UI Primitives**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Form Handling**: React Hook Form
- **Date Handling**: [date-fns](https://date-fns.org/)
- **Carousel**: [Embla Carousel](https://www.embla-carousel.com/)
- **Linting**: ESLint

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Deyaa360/Banjara-3.0.git
   cd "Banjara 4.0"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## 📁 Project Structure

```
banjara-restaurant/
├── public/               # Static assets and images
│   └── images/           # Restaurant and menu images
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── about/        # About page
│   │   ├── contact/      # Contact page
│   │   ├── menu/         # Menu page
│   │   └── reservations/ # Reservations page
│   ├── components/       # Reusable components
│   │   ├── animations/   # Animation components
│   │   ├── common/       # Common components
│   │   ├── contact/      # Contact form components
│   │   ├── layout/       # Header and Footer
│   │   ├── sections/     # Page sections
│   │   └── ui/           # UI components
│   ├── context/          # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── scripts/          # Build scripts
│   ├── styles/           # Global styles
│   └── theme/            # Theme configuration
├── tailwind.config.js    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

## 🎨 Design System

### Colors

- **Walnut**: `#795939` - Primary brand color
- **Tan**: `#c5a77d` - Light accent color
- **Charcoal**: `#4a4a4a` - Dark text and backgrounds
- **Gold**: `#e6c07a` - Muted gold accents
- **Beige**: `#c4b597` - Background color

### Typography

- **Display**: Playfair Display - For large headings
- **Headings**: Cormorant Garamond - For section headings
- **Body**: Inter - For body text and UI elements

## 🧩 Components

The website uses a component-based architecture with reusable UI elements:

- **UI Components**: Button, Input, Card, Calendar, Select, etc.
- **Layout Components**: Header, Footer, responsive containers
- **Section Components**: Hero banners, featured dishes, testimonials
- **Animation Components**: Fade-in, slide-in, scroll-based animations
- **Form Components**: Contact forms, reservation system
- **Common Components**: Image optimization, error boundaries, lazy loading

## 📱 Responsive Design

The website is fully responsive with breakpoints for:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔧 Configuration

### Tailwind Configuration

The `tailwind.config.js` file contains custom color definitions and theme extensions:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#795939', // Walnut
          light: '#c5a77d',   // Tan
          dark: '#4a4a4a',    // Charcoal
          accent: '#e6c07a',  // Muted Gold
          background: '#c4b597', // Beige
        },
        walnut: {
          500: '#795939',
          // Additional shades...
        },
        tan: {
          400: '#c5a77d',
          // Additional shades...
        },
        // Additional color scales...
      },
      fontFamily: {
        'serif': ['Cormorant Garamond', 'serif'],
        'display': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      // Additional theme extensions...
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
```

## 📝 Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow ESLint configurations
- Use functional components with hooks
- Implement proper error handling and loading states
- Use custom hooks for reusable logic

### Component Creation

- Create reusable components for repeated UI elements
- Use composition over inheritance
- Implement proper prop validation with TypeScript
- Follow the single responsibility principle
- Use context providers for theme management

### CSS Guidelines

- Use Tailwind utility classes for styling
- Create custom utility classes for repeated patterns
- Maintain consistent spacing using the 4px grid system
- Follow the heritage color scheme defined in the design system
- Use responsive design patterns for all screen sizes

## 🚢 Deployment

The website is configured for deployment on Vercel:

1. Push your code to a GitHub repository
2. Import the repository in Vercel
3. Deploy automatically on commits to main branch

## 📚 Additional Documentation

For more detailed information about the project, refer to:

- [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md) - Comprehensive project documentation
- [TECHNICAL_SPECIFICATION.md](./TECHNICAL_SPECIFICATION.md) - Technical specifications
- [STYLE_GUIDE.md](./STYLE_GUIDE.md) - Design system and style guide

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide Icons](https://lucide.dev/) - Beautiful & consistent icons
- [date-fns](https://date-fns.org/) - Modern JavaScript date utility library
- [Vercel](https://vercel.com/) - Deployment platform
