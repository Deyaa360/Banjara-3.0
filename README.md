# SpiceFusion Restaurant Website

A modern, elegant website for SpiceFusion, a premium North Indian restaurant, built with Next.js, React, TypeScript, and Tailwind CSS.

![SpiceFusion Website](public/images/website-preview.jpg)

## 🚀 Features

- **Responsive Design**: Optimized for all device sizes
- **Elegant UI**: Sophisticated gold and black theme
- **Online Reservations**: Table booking functionality
- **Interactive Menu**: Categorized menu with dietary indicators
- **Contact Form**: Customer inquiry submission
- **About Page**: Restaurant story and team information
- **Accessibility**: WCAG compliant components

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Form Handling**: React Hook Form
- **Linting**: ESLint
- **Formatting**: Prettier

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/spice-fusion.git
   cd spice-fusion
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## 📁 Project Structure

```
spice-fusion/
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # Reusable components
│   │   ├── reservation/  # Reservation components
│   │   └── ui/           # UI components
│   ├── lib/              # Utility functions
│   └── styles/           # Global styles
├── tailwind.config.js    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

## 🎨 Design System

### Colors

- **Gold**: `#D4AF37` - Primary accent color
- **Pepper (Black)**: `#1F1C1A` - Background color
- **Basmati (Off-white)**: `#F8F0E3` - Text color

### Typography

- **Headings**: Serif font family (Playfair Display)
- **Body**: Sans-serif font family (Inter)

## 🧩 Components

The website uses a component-based architecture with reusable UI elements:

- **Button**: Multi-variant button component
- **Input**: Form input fields
- **Card**: Content container with consistent styling
- **ReservationForm**: Table booking form
- **MenuCategory**: Menu section component
- **MenuItem**: Dish display component

## 📱 Responsive Design

The website is fully responsive with breakpoints for:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CONTACT_EMAIL=contact@example.com
```

### Tailwind Configuration

The `tailwind.config.js` file contains custom color definitions and theme extensions:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'gold': {
          400: '#E5C158',
          500: '#D4AF37',
          600: '#C09B29',
        },
        'pepper': {
          700: '#2A2724',
          800: '#262220',
          900: '#1F1C1A',
        },
        'basmati': {
          100: '#F8F0E3',
          200: '#EFE6D9',
          300: '#E6DCC9',
        },
        // Additional colors...
      },
      // Additional theme extensions...
    },
  },
  // Plugin configurations...
};
```

## 📝 Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Use functional components with hooks
- Implement proper error handling

### Component Creation

- Create reusable components for repeated UI elements
- Use composition over inheritance
- Implement proper prop validation
- Follow the single responsibility principle

### CSS Guidelines

- Use Tailwind utility classes for styling
- Create custom utility classes for repeated patterns
- Maintain consistent spacing and sizing
- Follow the color scheme defined in the design system

## 🚢 Deployment

The website is configured for deployment on Vercel:

1. Push your code to a GitHub repository
2. Import the repository in Vercel
3. Configure environment variables
4. Deploy

## 📚 Additional Documentation

For more detailed information about the project, refer to:

- [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md) - Comprehensive project documentation
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Guidelines for contributing to the project
- [CHANGELOG.md](./CHANGELOG.md) - History of changes and version updates

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Lucide Icons](https://lucide.dev/) - Beautiful & consistent icons
- [Vercel](https://vercel.com/) - Deployment platform
