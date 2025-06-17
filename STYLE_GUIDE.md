# Banjara Restaurant Website Style Guide

## Introduction

This style guide defines the visual language and design system for the Banjara restaurant website. It ensures consistency across all pages and components, creating a cohesive and elegant user experience that reflects the heritage positioning of the Indian cuisine restaurant and its nomadic culinary philosophy.

## Brand Identity

### Logo

The Banjara logo combines elegant typography with heritage-inspired elements:

- **Primary Logo**: Walnut on light background
- **Secondary Logo**: Light on walnut background
- **Minimum Size**: 120px width for desktop, 80px for mobile
- **Clear Space**: Maintain padding equal to the height of the "B" in "Banjara" around the logo

### Brand Voice

- **Tone**: Heritage-rich, warm, storytelling
- **Personality**: Nomadic, authentic, passionate about tradition
- **Language**: Evocative and narrative, celebrating regional Indian cuisine and nomadic culture

## Color Palette

### Primary Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Walnut | #795939 | rgb(121, 89, 57) | Primary brand color |
| Tan | #c5a77d | rgb(197, 167, 125) | Light accent color |
| Charcoal | #4a4a4a | rgb(74, 74, 74) | Dark text and backgrounds |
| Muted Gold | #e6c07a | rgb(230, 192, 122) | Accent highlights |
| Beige | #c4b597 | rgb(196, 181, 151) | Background color |

### Extended Palette

#### Stone Variations (Neutral Base)

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Stone-50 | #fafaf9 | rgb(250, 250, 249) | Light backgrounds |
| Stone-100 | #f5f5f4 | rgb(245, 245, 244) | Card backgrounds |
| Stone-200 | #e7e5e4 | rgb(231, 229, 228) | Border colors |
| Stone-300 | #d6d3d1 | rgb(214, 211, 209) | Subtle text |
| Stone-600 | #57534e | rgb(87, 83, 78) | Medium text |
| Stone-900 | #1c1917 | rgb(28, 25, 23) | Dark text |

#### Yellow/Amber Accents

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Yellow-400 | #facc15 | rgb(250, 204, 21) | Bright accents |
| Amber-400 | #fbbf24 | rgb(251, 191, 36) | Warm accents |
| Amber-500 | #f59e0b | rgb(245, 158, 11) | Interactive elements |
| Amber-600 | #d97706 | rgb(217, 119, 6) | Hover states |

#### Gray Variations

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Gray-50 | #f9fafb | rgb(249, 250, 251) | Light backgrounds |
| Gray-800 | #1f2937 | rgb(31, 41, 55) | Dark backgrounds |
| Gray-900 | #111827 | rgb(17, 24, 39) | Darkest backgrounds |

### Semantic Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Success | #10b981 | rgb(16, 185, 129) | Success states |
| Warning | #f59e0b | rgb(245, 158, 11) | Warning states |
| Error | #ef4444 | rgb(239, 68, 68) | Error states |
| Info | #3b82f6 | rgb(59, 130, 246) | Information states |

## Typography

### Font Families

- **Display**: Playfair Display (Serif) - For large hero headings
- **Headings**: Cormorant Garamond (Serif) - For section headings
- **Body Text**: Inter (Sans-serif) - For body text and UI elements

### Font Weights

- **Light**: 300 - Used for body text
- **Regular**: 400 - Used for emphasis in body text
- **Medium**: 500 - Used for subheadings and UI elements
- **Bold**: 700 - Used for headings and important UI elements

### Font Sizes

| Element | Size (Desktop) | Size (Mobile) | Weight | Line Height |
|---------|----------------|---------------|--------|-------------|
| Display | 6rem-8rem (96px-128px) | 3rem-4rem (48px-64px) | 700 | 1.1 |
| H1 | 4rem-6rem (64px-96px) | 2.5rem-3rem (40px-48px) | 700 | 1.2 |
| H2 | 3rem-4rem (48px-64px) | 2rem-2.5rem (32px-40px) | 700 | 1.2 |
| H3 | 2rem-3rem (32px-48px) | 1.5rem-2rem (24px-32px) | 600 | 1.3 |
| H4 | 1.5rem-2rem (24px-32px) | 1.25rem-1.5rem (20px-24px) | 600 | 1.3 |
| Body | 1rem-1.25rem (16px-20px) | 1rem (16px) | 300-400 | 1.5 |
| Small | 0.875rem (14px) | 0.875rem (14px) | 300 | 1.4 |

### Typography Examples

```html
<h1 class="text-6xl md:text-7xl lg:text-8xl font-display font-bold text-gray-900">
  Display Heading
</h1>

<h1 class="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900">
  Heading 1
</h1>

<h2 class="text-3xl md:text-4xl font-serif font-bold text-gray-900">
  Heading 2
</h2>

<h3 class="text-2xl md:text-3xl font-serif font-semibold text-gray-800">
  Heading 3
</h3>

<p class="text-lg text-gray-600 leading-relaxed">
  Body text with comfortable reading size
</p>

<p class="text-base text-gray-700">
  Standard body text
</p>

<span class="text-sm text-gray-500">
  Small text for captions and metadata
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
<button class="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-medium px-8 py-4 rounded-2xl shadow-2xl transition-all duration-300">
  Primary Button
</button>
```

- **Background**: Gradient from Yellow-500 to Amber-500
- **Text**: White
- **Hover**: Gradient from Yellow-600 to Amber-600
- **Padding**: 2rem 1rem (py-4 px-8)
- **Border Radius**: 1rem (rounded-2xl)
- **Font Weight**: Medium
- **Shadow**: Large shadow (shadow-2xl)

#### Outline Button

```html
<button class="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 hover:border-white/30 font-medium px-8 py-4 rounded-2xl transition-all duration-300">
  Outline Button
</button>
```

- **Background**: White with 10% opacity and backdrop blur
- **Border**: White with 20% opacity
- **Text**: White
- **Hover Background**: White with 20% opacity
- **Hover Border**: White with 30% opacity
- **Padding**: 2rem 1rem (py-4 px-8)
- **Border Radius**: 1rem (rounded-2xl)
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
  class="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-900 placeholder-gray-500"
  placeholder="Input placeholder"
/>
```

- **Background**: White
- **Border**: Stone-200
- **Text**: Gray-900
- **Placeholder**: Gray-500
- **Focus**: 2px ring Yellow-400, transparent border
- **Padding**: 0.75rem 1rem (py-3 px-4)
- **Border Radius**: 0.75rem (rounded-xl)

#### Select Dropdown

```html
<select class="w-full p-3 bg-white border-2 border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500 focus:border-walnut-500 text-stone-900 transition-all">
  <option value="">Select an option</option>
</select>
```

- **Background**: White
- **Border**: 2px Stone-200
- **Text**: Stone-900
- **Focus**: 2px ring Walnut-500, border Walnut-500
- **Padding**: 0.75rem (p-3)
- **Border Radius**: 0.5rem (rounded-lg)
- **Transition**: All properties

#### Textarea

```html
<textarea 
  class="w-full p-3 bg-white border-2 border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500 focus:border-walnut-500 text-stone-900 transition-all resize-none"
  rows="5"
  placeholder="Textarea placeholder"
></textarea>
```

- **Background**: White
- **Border**: 2px Stone-200
- **Text**: Stone-900
- **Placeholder**: Stone-400
- **Focus**: 2px ring Walnut-500, border Walnut-500
- **Padding**: 0.75rem (p-3)
- **Border Radius**: 0.5rem (rounded-lg)
- **Transition**: All properties
- **Resize**: None

### Cards

#### Standard Card

```html
<div class="bg-white rounded-2xl p-8 border border-stone-200 shadow-lg hover:shadow-xl transition-all">
  <h3 class="text-2xl font-serif font-bold text-walnut-500 mb-4">Card Title</h3>
  <p class="text-stone-600 leading-relaxed">Card content goes here.</p>
</div>
```

- **Background**: White
- **Border**: 1px Stone-200
- **Border Radius**: 1rem (rounded-2xl)
- **Padding**: 2rem (p-8)
- **Shadow**: Large shadow with hover effect
- **Transition**: All properties

#### Feature Card

```html
<div class="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group">
  <div class="h-64 bg-gradient-to-br from-stone-100 to-stone-200 relative overflow-hidden">
    <!-- Image or placeholder -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-all duration-500"></div>
  </div>
  <div class="p-8">
    <h3 class="text-2xl font-serif font-bold text-walnut-500 mb-4 group-hover:text-walnut-600 transition-colors">Feature Title</h3>
    <p class="text-stone-600 leading-relaxed">Feature description goes here.</p>
  </div>
</div>
```

- **Background**: White
- **Border Radius**: 1.5rem (rounded-3xl)
- **Shadow**: 2xl shadow with hover effect
- **Content Padding**: 2rem (p-8)
- **Image Height**: 16rem (h-64)
- **Hover Effects**: Enhanced shadows and color transitions

### Section Dividers

#### Standard Divider

```html
<div class="flex justify-center items-center my-12">
  <span class="h-px w-16 bg-gradient-to-r from-transparent via-walnut-400 to-transparent"></span>
  <span class="mx-6 text-walnut-500 font-serif tracking-widest text-sm uppercase">Section Title</span>
  <span class="h-px w-16 bg-gradient-to-r from-transparent via-walnut-400 to-transparent"></span>
</div>
```

- **Line**: 1px height, 4rem width (w-16), gradient from transparent via Walnut-400
- **Text**: Walnut-500, uppercase, tracking-widest, font-serif
- **Spacing**: 1.5rem (mx-6) between text and lines
- **Margin**: 3rem vertical (my-12)

#### Simple Divider

```html
<div class="w-24 h-0.5 bg-gradient-to-r from-transparent via-walnut-400 to-transparent mx-auto my-8"></div>
```

- **Line**: 2px height, 6rem width (w-24), gradient from transparent via Walnut-400
- **Alignment**: Centered (mx-auto)
- **Margin**: 2rem vertical (my-8)

## Icons

### Icon Usage

- **Navigation Icons**: 24px (h-6 w-6)
- **Feature Icons**: 48px (h-12 w-12)
- **UI Element Icons**: 20px (h-5 w-5)
- **Small Icons**: 16px (h-4 w-4)
- **Color**: Walnut-500 for primary icons, Stone-600 for secondary icons

### Icon Examples

```html
<!-- Navigation Icon -->
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-walnut-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <!-- SVG path -->
</svg>

<!-- Feature Icon -->
<div class="text-walnut-500 mb-6 flex justify-center">
  <div class="w-16 h-16 bg-gradient-to-br from-walnut-100 to-walnut-200 rounded-2xl flex items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <!-- SVG path -->
    </svg>
  </div>
</div>

<!-- UI Element Icon -->
<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-walnut-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <!-- SVG path -->
</svg>
```

## Layout Patterns

### Container

```html
<div class="max-w-7xl mx-auto px-6 lg:px-8">
  <!-- Content -->
</div>
```

- **Max Width**: 80rem (max-w-7xl)
- **Horizontal Padding**: 1.5rem (px-6) on mobile, 2rem (px-8) on large screens
- **Centering**: Auto margins (mx-auto)

### Grid Layouts

#### Two Column Grid

```html
<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
  <div><!-- Column 1 --></div>
  <div><!-- Column 2 --></div>
</div>
```

- **Mobile**: Single column
- **Desktop**: Two columns
- **Gap**: 3rem (gap-12) on mobile, 4rem (gap-16) on large screens

#### Three Column Grid

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
  <div><!-- Column 1 --></div>
  <div><!-- Column 2 --></div>
  <div><!-- Column 3 --></div>
</div>
```

- **Mobile**: Single column
- **Tablet**: Two columns
- **Desktop**: Three columns
- **Gap**: 2rem (gap-8) on mobile, 3rem (gap-12) on large screens

### Section Spacing

```html
<section class="py-20 lg:py-32">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <!-- Section content -->
  </div>
</section>
```

- **Vertical Padding**: 5rem (py-20) on mobile, 8rem (py-32) on large screens
- **Container**: Max-width with responsive horizontal padding

## Decorative Elements

### Gradient Overlays

```html
<div class="absolute inset-0 bg-gradient-to-br from-walnut-900/20 via-transparent to-stone-900/10"></div>
```

- **Position**: Absolute fill (inset-0)
- **Gradient**: From walnut-900 at 20% opacity to stone-900 at 10% opacity
- **Direction**: Bottom-right diagonal

### Accent Elements

```html
<div class="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-walnut-200/30 to-tan-200/20 rounded-3xl blur-2xl z-0"></div>
```

- **Position**: Absolute with negative offset
- **Size**: 8rem (w-32 h-32)
- **Background**: Gradient from walnut-200 to tan-200 with opacity
- **Border Radius**: 1.5rem (rounded-3xl)
- **Effect**: Large blur (blur-2xl)

## Page-Specific Patterns

### Hero Sections

```html
<div class="relative min-h-screen flex items-center justify-center overflow-hidden">
  <!-- Background -->
  <div class="absolute inset-0">
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-stone-900" />
    <div class="absolute inset-0 bg-gradient-radial from-yellow-600/15 to-transparent" />
  </div>
  
  <!-- Content -->
  <div class="relative z-10 max-w-7xl mx-auto text-center px-6">
    <div class="max-w-5xl mx-auto">
      <!-- Badge -->
      <div class="inline-flex items-center gap-4 mb-12 px-6 py-3 bg-white/5 backdrop-blur-sm border border-yellow-400/20 rounded-full">
        <span class="text-yellow-300 text-sm font-medium tracking-wider uppercase">
          Heritage Cuisine
        </span>
      </div>
      
      <!-- Main Heading -->
      <h1 class="text-6xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight font-bold">
        Experience
        <br />
        <span class="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
          Banjara
        </span>
      </h1>
      
      <!-- Subtitle -->
      <p class="text-xl md:text-2xl text-stone-300 mb-16 max-w-4xl mx-auto leading-relaxed">
        A culinary journey through India's nomadic heritage
      </p>
    </div>
  </div>
</div>
```

### Content Sections

```html
<section class="py-20 lg:py-32 relative">
  <div class="absolute inset-0 bg-gradient-to-b from-white via-stone-50/50 to-white" />
  
  <div class="max-w-7xl mx-auto relative z-10 px-6">
    <div class="text-center mb-20">
      <!-- Badge -->
      <div class="inline-flex items-center gap-3 mb-8 px-4 py-2 bg-yellow-50 rounded-full border border-yellow-200/50">
        <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
        <span class="text-yellow-700 text-sm font-medium tracking-wider uppercase">
          Section Badge
        </span>
        <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
      </div>
      
      <h2 class="text-5xl md:text-6xl text-gray-900 mb-6 leading-tight font-bold">
        Section Title
      </h2>
      
      <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Section description text that provides context and sets expectations.
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
<button class="focus:outline-none focus:ring-2 focus:ring-walnut-500 focus:ring-offset-2 focus:ring-offset-white transition-all">
  Accessible Button
</button>
```

- Visible focus indicators for all interactive elements
- Use focus rings with sufficient contrast
- Include smooth transitions for focus states

### Text Alternatives

- Provide alt text for all images
- Use aria-label for interactive elements without visible text
- Include proper form labels

## Animation Guidelines

### Transitions

```html
<button class="transition-all duration-300 ease-in-out hover:scale-105">
  Button with Transition
</button>
```

- **Duration**: 300ms (duration-300)
- **Easing**: Ease-in-out
- **Properties**: Colors, opacity, transform

### Hover Effects

```html
<div class="group transition-all duration-500 hover:scale-105 hover:shadow-2xl">
  <div class="group-hover:translate-y-2 transition-transform duration-500">
    Hover to Scale and Lift
  </div>
</div>
```

- Subtle scale (1.05x maximum)
- Enhanced shadows on hover
- Smooth transform animations
- Group hover effects for complex interactions

## Implementation Notes

- Use Tailwind CSS utility classes for all styling
- Create custom utility classes for repeated patterns
- Leverage Framer Motion for complex animations
- Use CSS variables for theme colors to enable future theming options
- Implement responsive design with mobile-first approach
- Ensure all animations respect user preferences (prefers-reduced-motion)

## Conclusion

This style guide serves as the definitive reference for the visual design of the Banjara restaurant website. By adhering to these guidelines, we ensure a consistent, elegant, and cohesive user experience that reflects the heritage positioning of the restaurant and celebrates the rich traditions of nomadic Indian cuisine.