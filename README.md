# Unified Theme

A comprehensive, framework-agnostic design system that works seamlessly with any technology stack. Build beautiful, consistent user interfaces with minimal effort.

## ✨ Features

- 🎨 **Complete Design System**: Colors, typography, spacing, and components
- 🔧 **Framework Agnostic**: Works with React, Vue, Angular, or vanilla HTML/CSS
- 🌙 **Dark Mode Support**: Built-in theme switching capabilities
- 📱 **Responsive**: Mobile-first design with comprehensive breakpoint system
- ♿ **Accessible**: WCAG 2.1 compliant components with proper ARIA support
- 🎯 **Utility-First**: Comprehensive utility classes for rapid development
- 🚀 **Performance**: Optimized CSS with minimal runtime overhead
- 📦 **Modular**: Use individual components or the complete system

## 🚀 Quick Start

### Installation

```bash
npm install unified-theme
```

### CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/unified-theme/dist/unified-theme.css">
<script src="https://cdn.jsdelivr.net/npm/unified-theme/dist/unified-theme.js"></script>
```

### Basic Usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My App</title>
    <link rel="stylesheet" href="node_modules/unified-theme/dist/unified-theme.css">
</head>
<body>
    <div class="container">
        <h1 class="text-heading-xl text-primary-600 mb-4">Welcome to Unified Theme</h1>
        <p class="text-body-lg text-neutral-700 mb-6">
            A beautiful, consistent design system for modern web applications.
        </p>
        <button class="btn btn-primary btn-lg">Get Started</button>
    </div>
    
    <script src="node_modules/unified-theme/dist/unified-theme.js"></script>
</body>
</html>
```

## 🎨 Design Tokens

Unified Theme is built on a foundation of design tokens that ensure consistency across your application.

### Colors

```scss
// Primary colors
$color-primary-500: #0ea5e9;
$color-primary-600: #0284c7;

// Semantic colors  
$color-success-500: #22c55e;
$color-warning-500: #f59e0b;
$color-error-500: #ef4444;
```

### Typography

```html
<h1 class="text-display-lg">Display Large</h1>
<h2 class="text-heading-xl">Heading XL</h2>
<p class="text-body-md">Body text</p>
<small class="text-caption">Caption text</small>
```

### Spacing

```html
<div class="p-4 m-2">Padding 1rem, Margin 0.5rem</div>
<div class="px-6 py-3">Horizontal padding 1.5rem, Vertical padding 0.75rem</div>
```

## 🧩 Components

### Buttons

```html
<!-- Variants -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-outline-primary">Outline</button>
<button class="btn btn-ghost-primary">Ghost</button>

<!-- Sizes -->
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary btn-md">Medium</button>
<button class="btn btn-primary btn-lg">Large</button>

<!-- States -->
<button class="btn btn-primary loading">Loading...</button>
<button class="btn btn-primary" disabled>Disabled</button>
```

### Forms

```html
<form>
    <div class="form-group">
        <label class="form-label">Email</label>
        <input type="email" class="form-control" placeholder="Enter your email">
        <div class="form-text">We'll never share your email.</div>
    </div>
    
    <div class="form-group">
        <label class="form-label">Country</label>
        <select class="form-select">
            <option>Choose a country</option>
            <option>United States</option>
            <option>Canada</option>
        </select>
    </div>
    
    <div class="form-check">
        <input class="form-check-input" type="checkbox" id="terms">
        <label class="form-check-label" for="terms">
            I agree to the terms
        </label>
    </div>
    
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

### Cards

```html
<div class="card">
    <div class="card-header">
        <h3 class="card-title">Card Title</h3>
        <p class="card-subtitle">Card subtitle</p>
    </div>
    <div class="card-body">
        <p class="card-text">Card content goes here.</p>
        <button class="btn btn-primary">Action</button>
    </div>
    <div class="card-footer">
        <small class="text-neutral-500">Last updated 3 mins ago</small>
    </div>
</div>
```

### Alerts

```html
<div class="alert alert-primary">
    <strong>Info:</strong> This is an informational alert.
</div>

<div class="alert alert-success alert-dismissible">
    <strong>Success:</strong> Operation completed successfully.
    <button class="alert-close">&times;</button>
</div>
```

## 🔧 Framework Integration

### React

```jsx
import 'unified-theme/dist/unified-theme.css';

const Button = ({ variant = 'primary', size = 'md', children, ...props }) => {
  return (
    <button 
      className={`btn btn-${variant} btn-${size}`}
      {...props}
    >
      {children}
    </button>
  );
};

function App() {
  return (
    <div className="container">
      <h1 className="text-heading-xl text-primary-600">Hello React!</h1>
      <Button variant="primary" size="lg">
        Click me
      </Button>
    </div>
  );
}
```

### Vue.js

```vue
<template>
  <div class="container">
    <h1 class="text-heading-xl text-primary-600">Hello Vue!</h1>
    <Button variant="primary" size="lg">
      Click me
    </Button>
  </div>
</template>

<script>
import 'unified-theme/dist/unified-theme.css';

export default {
  components: {
    Button: {
      props: ['variant', 'size'],
      template: `
        <button :class="['btn', 'btn-' + variant, 'btn-' + size]">
          <slot />
        </button>
      `
    }
  }
};
</script>
```

## 🌙 Dark Mode

Unified Theme includes built-in dark mode support:

```html
<!-- Toggle button -->
<button data-theme-toggle>🌙 Toggle Theme</button>

<!-- JavaScript API -->
<script>
// Toggle theme
unifiedTheme.toggleTheme();

// Set specific theme
unifiedTheme.setTheme('dark');

// Get current theme
const currentTheme = unifiedTheme.getTheme();

// Listen for theme changes
window.addEventListener('themeChanged', (e) => {
  console.log('Theme changed to:', e.detail.theme);
});
</script>
```

## 🛠️ Customization

### CSS Custom Properties

```css
:root {
  --color-primary-500: #your-brand-color;
  --font-family-sans: 'Your Font', sans-serif;
  --border-radius-base: 8px;
}
```

### Sass Variables

```scss
// Override default values
$color-primary-500: #your-brand-color;
$font-family-sans: 'Your Font', sans-serif;

// Import Unified Theme
@import 'unified-theme/src/unified-theme';
```

## 🎯 Utility Classes

Unified Theme includes comprehensive utility classes:

```html
<!-- Layout -->
<div class="flex items-center justify-between">
<div class="grid grid-cols-3 gap-4">

<!-- Spacing -->
<div class="p-4 m-2 px-6 py-3">

<!-- Colors -->
<div class="bg-primary-500 text-white">
<div class="text-success-600 border-error-300">

<!-- Typography -->
<div class="text-lg font-bold uppercase">
<div class="text-center leading-relaxed">

<!-- Effects -->
<div class="shadow-lg rounded-xl opacity-75">
```

## 📚 Documentation

Visit our [documentation site](docs/index.html) for:

- Complete component library
- Design token reference
- Integration guides
- Best practices
- Examples and templates

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Documentation](docs/index.html)
- [GitHub Repository](https://github.com/asiya-farseen/unified-theme)
- [NPM Package](https://www.npmjs.com/package/unified-theme)
- [Issues](https://github.com/asiya-farseen/unified-theme/issues)

---

Built with ❤️ by [Asiya Farseen](https://github.com/asiya-farseen)