# SpiceFusion Website Style Guide

## Introduction

This style guide defines the visual language and design system for the SpiceFusion restaurant website. It ensures consistency across all pages and components, creating a cohesive and elegant user experience that reflects the premium positioning of the North Indian restaurant.

## Brand Identity

### Logo

The SpiceFusion logo combines elegant typography with subtle Indian-inspired elements:

- **Primary Logo**: Gold on black background
- **Secondary Logo**: Black on gold background
- **Minimum Size**: 120px width for desktop, 80px for mobile
- **Clear Space**: Maintain padding equal to the height of the "S" in "SpiceFusion" around the logo

### Brand Voice

- **Tone**: Sophisticated, warm, authentic
- **Personality**: Elegant, knowledgeable, passionate
- **Language**: Professional but approachable, using culinary terminology where appropriate

## Color Palette

### Primary Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Gold | #D4AF37 | rgb(212, 175, 55) | Primary accent color |
<!-- | Pepper (Black) | #1F1C1A | rgb(31, 28, 26) | Primary background | -->
| Basmati (Off-white) | #F8F0E3 | rgb(248, 240, 227) | Primary text color |

### Extended Palette

#### Gold Variations

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Gold-400 | #E5C158 | rgb(229, 193, 88) | Lighter accents |
| Gold-500 | #D4AF37 | rgb(212, 175, 55) | Primary gold |
| Gold-600 | #C09B29 | rgb(192, 155, 41) | Darker accents, hover states |

#### Pepper Variations

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Pepper-700 | #2A2724 | rgb(42, 39, 36) | Lighter background |
| Pepper-800 | #262220 | rgb(38, 34, 32) | Medium background |
| Pepper-900 | #1F1C1A | rgb(31, 28, 26) | Dark background |

#### Basmati Variations

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Basmati-100 | #F8F0E3 | rgb(248, 240, 227) | Primary text |
| Basmati-200 | #EFE6D9 | rgb(239, 230, 217) | Secondary text |
| Basmati-300 | #E6DCC9 | rgb(230, 220, 201) | Tertiary text |

### Accent Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Burgundy-500 | #800020 | rgb(128, 0, 32) | Accent for special elements |
| Saffron-500 | #F4C430 | rgb(244, 196, 48) | Accent for warnings/notifications |
| Cardamom-500 | #4B5320 | rgb(75, 83, 32) | Accent for success states |

## Typography

### Font Families

- **Headings**: Playfair Display (Serif)
- **Body Text**: Inter (Sans-serif)

### Font Weights

- **Light**: 300 - Used for body text
- **Regular**: 400 - Used for emphasis in body text
- **Medium**: 500 - Used for subheadings and UI elements
- **Bold**: 700 - Used for headings and important UI elements

### Font Sizes

| Element | Size (Desktop) | Size (Mobile) | Weight | Line Height |
|---------|----------------|---------------|--------|-------------|
| H1 | 4rem (64px) | 2.5rem (40px) | 700 | 1.2 |
| H2 | 3rem (48px) | 2rem (32px) | 700 | 1.2 |
| H3 | 2rem (32px) | 1.5rem (24px) | 700 | 1.3 |
| H4 | 1.5rem (24px) | 1.25rem (20px) | 700 | 1.3 |
| Body | 1rem (16px) | 1rem (16px) | 300-400 | 1.5 |
| Small | 0.875rem (14px) | 0.875rem (14px) | 300 | 1.4 |

### Typography Examples

```html
<h1 class="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gold-500">
  Heading 1
</h1>

<h2 class="text-3xl font-serif font-bold text-gold-500">
  Heading 2
</h2>

<h3 class="text-2xl font-serif font-bold text-gold-400">
  Heading 3
</h3>

<p class="text-basmati-300 font-light">
  Body text with light weight
</p>

<p class="text-basmati-200">
  Body text with regular weight
</p>

<span class="text-sm text-basmati-300 font-light">
  Small text
</span>
```

## Spacing System

Based on a 4px grid system, following Tailwind CSS spacing scale:

| Size | Value | Usage |
|------|-------|-------|
| 0 | 0px | No spacing |
| 1 | 0.25rem (4px) | Minimal spacing |
| 2 | 0.5rem (8px) | Tight spacing |
| 3 | 0.75rem (12px) | Compact spacing |
| 4 | 1rem (16px) | Standard spacing |
| 6 | 1.5rem (24px) | Medium spacing |
| 8 | 2rem (32px) | Large spacing |
| 12 | 3rem (48px) | Extra large spacing |
| 16 | 4rem (64px) | 2x large spacing |
| 20 | 5rem (80px) | 3x large spacing |
| 24 | 6rem (96px) | 4x large spacing |

## UI Elements

### Buttons

#### Primary Button

```html
<button class="bg-gold-500 hover:bg-gold-600 text-pepper-900 font-medium px-4 py-2 rounded-md">
  Primary Button
</button>
```

- **Background**: Gold-500
- **Text**: Pepper-900
- **Hover**: Gold-600
- **Padding**: 0.5rem 1rem (py-2 px-4)
- **Border Radius**: 0.375rem (rounded-md)
- **Font Weight**: Medium

#### Outline Button

```html
<button class="border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-pepper-900 font-medium px-4 py-2 rounded-md">
  Outline Button
</button>
```

- **Border**: 1px Gold-500
- **Text**: Gold-500
- **Hover Background**: Gold-500
- **Hover Text**: Pepper-900
- **Padding**: 0.5rem 1rem (py-2 px-4)
- **Border Radius**: 0.375rem (rounded-md)
- **Font Weight**: Medium

#### Text Button

```html
<button class="text-gold-500 hover:text-gold-400 font-medium">
  Text Button
</button>
```

- **Text**: Gold-500
- **Hover**: Gold-400
- **Font Weight**: Medium

### Form Elements

#### Input Field

```html
<input 
  type="text" 
  class="w-full p-3 bg-pepper-800 border border-gold-500/30 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 text-basmati-100"
  placeholder="Input placeholder"
/>
```

- **Background**: Pepper-800
- **Border**: Gold-500 at 30% opacity
- **Text**: Basmati-100
- **Placeholder**: Basmati-300
- **Focus**: 2px ring Gold-500
- **Padding**: 0.75rem (p-3)
- **Border Radius**: 0.375rem (rounded-md)

#### Select Dropdown

```html
<select class="w-full p-3 bg-pepper-800 border border-gold-500/30 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 text-basmati-100">
  <option value="">Select an option</option>
</select>
```

- **Background**: Pepper-800
- **Border**: Gold-500 at 30% opacity
- **Text**: Basmati-100
- **Focus**: 2px ring Gold-500
- **Padding**: 0.75rem (p-3)
- **Border Radius**: 0.375rem (rounded-md)

#### Textarea

```html
<textarea 
  class="w-full p-3 bg-pepper-800 border border-gold-500/30 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 text-basmati-100"
  rows="5"
  placeholder="Textarea placeholder"
></textarea>
```

- **Background**: Pepper-800
- **Border**: Gold-500 at 30% opacity
- **Text**: Basmati-100
- **Placeholder**: Basmati-300
- **Focus**: 2px ring Gold-500
- **Padding**: 0.75rem (p-3)
- **Border Radius**: 0.375rem (rounded-md)

### Cards

#### Standard Card

```html
<div class="bg-pepper-800 rounded-lg p-6 border border-gold-500/20">
  <h3 class="text-xl font-serif font-bold text-gold-400 mb-3">Card Title</h3>
  <p class="text-basmati-300 font-light">Card content goes here.</p>
</div>
```

- **Background**: Pepper-800
- **Border**: Gold-500 at 20% opacity
- **Border Radius**: 0.5rem (rounded-lg)
- **Padding**: 1.5rem (p-6)

#### Feature Card

```html
<div class="bg-pepper-900 rounded-lg overflow-hidden border border-gold-500/20">
  <div class="h-48 bg-pepper-700">
    <!-- Image or placeholder -->
  </div>
  <div class="p-6">
    <h3 class="text-xl font-serif font-bold text-gold-400 mb-3">Feature Title</h3>
    <p class="text-basmati-300 font-light mb-4">Feature description goes here.</p>
  </div>
</div>
```

- **Background**: Pepper-900
- **Border**: Gold-500 at 20% opacity
- **Border Radius**: 0.5rem (rounded-lg)
- **Content Padding**: 1.5rem (p-6)

### Section Dividers

#### Standard Divider

```html
<div class="flex justify-center items-center my-8">
  <span class="h-px w-12 bg-gold-500"></span>
  <span class="mx-4 text-gold-500 font-serif tracking-widest text-sm">SECTION TITLE</span>
  <span class="h-px w-12 bg-gold-500"></span>
</div>
```

- **Line**: 1px height, 3rem width (w-12), Gold-500
- **Text**: Gold-500, small caps, tracking-widest, font-serif
- **Spacing**: 1rem (mx-4) between text and lines

#### Simple Divider

```html
<div class="w-16 h-0.5 bg-gold-500/50 mx-auto my-4"></div>
```

- **Line**: 2px height, 4rem width (w-16), Gold-500 at 50% opacity
- **Alignment**: Centered (mx-auto)
- **Margin**: 1rem vertical (my-4)

## Icons

### Icon Usage

- **Navigation Icons**: 24px (h-6 w-6)
- **Feature Icons**: 40px (h-10 w-10)
- **UI Element Icons**: 16px (h-4 w-4)
- **Color**: Gold-500 for primary icons

### Icon Examples

```html
<!-- Navigation Icon -->
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <!-- SVG path -->
</svg>

<!-- Feature Icon -->
<div class="text-gold-500 mb-4 flex justify-center">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <!-- SVG path -->
  </svg>
</div>

<!-- UI Element Icon -->
<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <!-- SVG path -->
</svg>
```

## Layout Patterns

### Container

```html
<div class="container mx-auto px-4">
  <!-- Content -->
</div>
```

- **Max Width**: Based on Tailwind's container defaults
- **Horizontal Padding**: 1rem (px-4)
- **Centering**: Auto margins (mx-auto)

### Grid Layouts

#### Two Column Grid

```html
<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <div><!-- Column 1 --></div>
  <div><!-- Column 2 --></div>
</div>
```

- **Mobile**: Single column
- **Desktop**: Two columns
- **Gap**: 2rem (gap-8)

#### Three Column Grid

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <div><!-- Column 1 --></div>
  <div><!-- Column 2 --></div>
  <div><!-- Column 3 --></div>
</div>
```

- **Mobile**: Single column
- **Tablet**: Two columns
- **Desktop**: Three columns
- **Gap**: 2rem (gap-8)

### Section Spacing

```html
<section class="py-16">
  <div class="container mx-auto px-4">
    <!-- Section content -->
  </div>
</section>
```

- **Vertical Padding**: 4rem (py-16)
- **Container**: Centered with horizontal padding

## Decorative Elements

### Pattern Overlay

```html
<div class="absolute inset-0 opacity-5">
  <div class="absolute top-0 left-0 w-full h-full" 
       style="backgroundImage: url('/images/indian-pattern.png'); backgroundSize: '60px 60px'">
  </div>
</div>
```

- **Opacity**: 5% (opacity-5)
- **Position**: Absolute fill (inset-0)
- **Pattern Size**: 60px repeat

### Gold Accent Borders

```html
<div class="absolute -top-4 -left-4 w-24 h-24 border-8 border-gold-500 rounded-lg z-0"></div>
```

- **Border Width**: 8px (border-8)
- **Border Color**: Gold-500
- **Position**: Absolute with negative offset
- **Size**: 6rem (w-24 h-24)
- **Border Radius**: 0.5rem (rounded-lg)

## Page-Specific Patterns

### Hero Sections

```html
<div class="relative h-[50vh] min-h-[400px] bg-pepper-800 overflow-hidden">
  <div class="absolute inset-0 bg-cover bg-center" style="backgroundImage: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))">
    <!-- Background image or placeholder -->
  </div>
  
  <!-- Pattern overlay -->
  <div class="absolute inset-0 bg-repeat opacity-5"></div>
  
  <div class="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center z-10">
    <!-- Section divider -->
    <div class="flex justify-center items-center mb-4">
      <span class="h-px w-12 bg-gold-500"></span>
      <span class="mx-4 text-gold-500 font-serif tracking-widest text-sm">SECTION TITLE</span>
      <span class="h-px w-12 bg-gold-500"></span>
    </div>
    
    <h1 class="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gold-500 mb-6">
      Hero Title
    </h1>
    
    <p class="text-xl text-basmati-200 max-w-2xl font-light">
      Hero description text
    </p>
  </div>
</div>
```

### Content Sections

```html
<section class="py-16">
  <div class="container mx-auto px-4">
    <div class="text-center mb-12">
      <!-- Section divider -->
      <div class="flex justify-center items-center mb-4">
        <span class="h-px w-12 bg-gold-500"></span>
        <span class="mx-4 text-gold-500 font-serif tracking-widest text-sm">SECTION TITLE</span>
        <span class="h-px w-12 bg-gold-500"></span>
      </div>
      
      <h2 class="text-3xl font-serif font-bold text-gold-500 mb-6">
        Section Title
      </h2>
      
      <p class="text-xl text-basmati-200 max-w-3xl mx-auto font-light">
        Section description text
      </p>
    </div>
    
    <!-- Section content -->
  </div>
</section>
```

## Responsive Design Guidelines

### Breakpoints

| Breakpoint | Size | Class Prefix |
|------------|------|-------------|
| Small | 640px | sm: |
| Medium | 768px | md: |
| Large | 1024px | lg: |
| Extra Large | 1280px | xl: |
| 2X Large | 1536px | 2xl: |

### Responsive Typography

- Use fluid typography that scales between breakpoints
- Headings should be significantly larger on desktop than mobile
- Body text should maintain readability at all sizes (minimum 16px)

### Mobile-First Approach

- Start with mobile layout and progressively enhance for larger screens
- Use Tailwind's responsive prefixes (sm:, md:, lg:, etc.)
- Consider touch targets (minimum 44px × 44px) for interactive elements on mobile

## Accessibility Guidelines

### Color Contrast

- Maintain minimum contrast ratio of 4.5:1 for normal text
- Maintain minimum contrast ratio of 3:1 for large text
- Test all color combinations with WebAIM Contrast Checker

### Focus States

```html
<button class="focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-pepper-900">
  Accessible Button
</button>
```

- Visible focus indicators for all interactive elements
- Use focus rings with sufficient contrast

### Text Alternatives

- Provide alt text for all images
- Use aria-label for interactive elements without visible text
- Include proper form labels

## Animation Guidelines

### Transitions

```html
<button class="transition-colors duration-300 ease-in-out">
  Button with Transition
</button>
```

- **Duration**: 300ms (duration-300)
- **Easing**: Ease-in-out
- **Properties**: Colors, opacity, transform

### Hover Effects

```html
<div class="transform transition-transform hover:scale-105 duration-300">
  Hover to Scale
</div>
```

- Subtle scale (1.05x maximum)
- Color shifts
- Opacity changes

## Implementation Notes

- Use Tailwind CSS utility classes for all styling
- Create custom utility classes for repeated patterns
- Follow the BEM methodology for custom CSS when needed
- Use CSS variables for theme colors to enable future theming options

## Conclusion

This style guide serves as the definitive reference for the visual design of the SpiceFusion website. By adhering to these guidelines, we ensure a consistent, elegant, and cohesive user experience that reflects the premium positioning of the restaurant.