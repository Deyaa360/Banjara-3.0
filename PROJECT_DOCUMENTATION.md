# SpiceFusion Restaurant Website Documentation

## Project Overview

SpiceFusion is a premium North Indian restaurant website designed to showcase the restaurant's elegant ambiance, authentic cuisine, and provide essential services like online reservations, menu browsing, and contact information. The website features a sophisticated gold and black color scheme that reflects the upscale dining experience and rich culinary heritage of North Indian cuisine.

## Technologies Used

### Core Technologies

- **Next.js 14**: React framework for server-side rendering, static site generation, and building API endpoints
- **React 18**: JavaScript library for building user interfaces
- **TypeScript**: Typed superset of JavaScript for improved developer experience and code quality
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development

### UI Components and Libraries

- **Lucide Icons**: Modern icon set for UI elements
- **shadcn/ui**: Reusable UI components built with Radix UI and Tailwind CSS
- **Radix UI**: Unstyled, accessible components for building high-quality web interfaces

### Development Tools

- **ESLint**: JavaScript linting utility
- **Prettier**: Code formatter
- **PostCSS**: Tool for transforming CSS with JavaScript plugins
- **Autoprefixer**: Plugin to parse CSS and add vendor prefixes

## Project Structure

```
spice-fusion/
├── public/               # Static assets (images, fonts, etc.)
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── about/        # About page
│   │   ├── contact/      # Contact page
│   │   ├── menu/         # Menu page
│   │   ├── reservations/ # Reservations page
│   │   ├── layout.tsx    # Root layout component
│   │   └── page.tsx      # Home page
│   ├── components/       # Reusable React components
│   │   ├── reservation/  # Reservation-related components
│   │   ├── ui/           # UI components (buttons, inputs, etc.)
│   │   ├── header.tsx    # Site header component
│   │   └── footer.tsx    # Site footer component
│   ├── lib/              # Utility functions and shared code
│   └── styles/           # Global styles and Tailwind configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies and scripts
```

## Color Scheme and Design System

### Primary Colors

- **Gold**: `#D4AF37` - Used for accents, headings, and important UI elements
- **Pepper (Black)**: `#1F1C1A` - Primary background color for a sophisticated look
- **Basmati (Off-white)**: `#F8F0E3` - Used for text and subtle backgrounds

### Typography

- **Headings**: Serif font family for an elegant, upscale appearance
- **Body Text**: Sans-serif font with light weight for readability and modern feel
- **Accents**: Tracking (letter-spacing) used for small caps text in section dividers

### Design Elements

- **Gold Accents**: Thin lines, borders, and decorative elements in gold
- **Pattern Overlays**: Subtle Indian-inspired patterns with low opacity
- **Card Design**: Rounded corners with thin gold borders
- **Section Dividers**: Centered text with horizontal lines on either side

## Pages and Features

### Home Page

- Hero section with restaurant tagline and call-to-action
- Featured dishes section
- About section with brief restaurant introduction
- Testimonials carousel
- Reservation call-to-action

### Menu Page

- Hero section with menu introduction
- Sticky category navigation
- Menu items organized by categories (Appetizers, Main Courses, etc.)
- Item cards with name, description, price, and dietary indicators
- Legend for dietary indicators (vegetarian, spicy, gluten-free)

### About Page

- Hero section with restaurant story introduction
- Our Journey section with restaurant history
- Philosophy section with core values
- Team section with chef and staff profiles
- Awards and recognition section

### Contact Page

- Hero section with contact introduction
- Contact form for inquiries
- Contact information (phone, email, address)
- Opening hours
- Map location
- FAQ section with common questions

### Reservations Page

- Hero section with reservation introduction
- Reservation form
- Reservation policies and information
- Private dining and events section
- Restaurant location and hours

## Components

### UI Components

- **Button**: Customizable button component with variants (primary, outline, etc.)
- **Input**: Form input fields with validation
- **Select**: Dropdown selection component
- **Textarea**: Multi-line text input
- **Card**: Container for content with consistent styling
- **PlaceholderImage**: Temporary image placeholder for development

### Layout Components

- **Header**: Site navigation with responsive mobile menu
- **Footer**: Site information, links, and social media
- **Container**: Centered content wrapper with responsive padding

### Feature Components

- **ReservationForm**: Form for booking a table with date, time, and party size
- **MenuCategory**: Section for grouping menu items
- **MenuItem**: Card displaying dish information
- **TestimonialCard**: Customer review display

## Custom Tailwind Classes

The project uses a custom Tailwind configuration with extended colors and utilities:

```javascript
// tailwind.config.js
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
        'burgundy': {
          500: '#800020',
        },
        'saffron': {
          500: '#F4C430',
        },
        'cardamom': {
          500: '#4B5320',
        },
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
};
```

## Responsive Design

The website is fully responsive with breakpoints for:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

Responsive features include:

- Mobile navigation menu
- Grid layouts that adjust columns based on screen size
- Font sizes that scale appropriately
- Flexible spacing using responsive padding and margin
- Images that maintain proper aspect ratios

## Accessibility Features

- Semantic HTML structure
- ARIA attributes for interactive elements
- Sufficient color contrast for text readability
- Keyboard navigation support
- Focus states for interactive elements
- Alt text for images
- Form labels and error messages

## Performance Optimization

- Next.js image optimization
- Component-based architecture for code reuse
- Lazy loading for off-screen content
- Optimized Tailwind CSS output
- Server-side rendering for improved initial load time

## Future Enhancements

### Planned Features

1. **Online Ordering System**:
   - Menu item customization
   - Cart functionality
   - Checkout process
   - Order tracking

2. **User Accounts**:
   - Saved preferences
   - Reservation history
   - Loyalty program

3. **Blog/News Section**:
   - Chef's recipes
   - Restaurant events
   - Culinary articles

4. **Multi-language Support**:
   - English
   - Hindi
   - Other regional languages

5. **Enhanced Reservation System**:
   - Table selection
   - Special occasion settings
   - Automated email confirmations

## Development Guidelines

### Code Style

- Use TypeScript for all new components
- Follow ESLint and Prettier configurations
- Use functional components with hooks
- Implement proper error handling
- Add comments for complex logic

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

## Deployment

The website is configured for deployment on Vercel, which provides:

- Automatic deployments from Git
- Preview deployments for pull requests
- Serverless functions for API routes
- Global CDN for fast content delivery
- Environment variable management

## Local Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd spice-fusion
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Requirements

### Functional Requirements

1. **Content Management**:
   - Display restaurant information
   - Showcase menu items with descriptions and prices
   - Present chef and staff profiles
   - Provide contact information and location

2. **User Interaction**:
   - Allow users to make table reservations
   - Enable contact form submissions
   - Provide navigation between different sections
   - Display responsive design across devices

3. **Visual Experience**:
   - Implement elegant gold and black theme
   - Showcase high-quality food and restaurant imagery
   - Create a sophisticated, upscale visual identity
   - Maintain consistent branding throughout

### Non-Functional Requirements

1. **Performance**:
   - Fast page load times (< 3 seconds)
   - Optimized images and assets
   - Efficient code structure

2. **Accessibility**:
   - WCAG 2.1 AA compliance
   - Screen reader compatibility
   - Keyboard navigation support

3. **Security**:
   - Form validation and sanitization
   - Protection against common web vulnerabilities
   - Secure API endpoints

4. **SEO**:
   - Semantic HTML structure
   - Meta tags and descriptions
   - Structured data for rich snippets
   - Sitemap and robots.txt

## Conclusion

The SpiceFusion website provides an elegant digital presence for the restaurant, effectively showcasing its upscale North Indian cuisine and ambiance. The gold and black theme creates a sophisticated visual identity that aligns with the restaurant's premium positioning. With features like online reservations, detailed menu information, and contact capabilities, the website serves as both a marketing tool and a functional service platform for customers.

The modular architecture and modern technology stack ensure the website is maintainable, extensible, and performs well across all devices. Future enhancements will focus on adding more interactive features and expanding the online services offered to customers.