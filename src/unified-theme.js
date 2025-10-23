/**
 * Unified Theme - Main JavaScript Entry Point
 * Exports all utilities and initializes the theme system
 */

import UnifiedTheme from './utilities/theme-manager.js';
import AnimationUtils from './utilities/animations.js';

// Create instances
const themeManager = new UnifiedTheme();
const animationUtils = new AnimationUtils();

// CSS Ripple effect keyframes
const rippleStyles = `
@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
`;

// Inject ripple styles if not already present
if (!document.querySelector('#unified-theme-animations')) {
  const style = document.createElement('style');
  style.id = 'unified-theme-animations';
  style.textContent = rippleStyles;
  document.head.appendChild(style);
}

// Add ripple effect to buttons
document.addEventListener('click', (e) => {
  const button = e.target.closest('.btn');
  if (button && !button.classList.contains('btn-link')) {
    // Ensure button has relative positioning for ripple
    const position = window.getComputedStyle(button).position;
    if (position === 'static') {
      button.style.position = 'relative';
      button.style.overflow = 'hidden';
    }
    
    animationUtils.ripple(button, e);
  }
});

// Auto-animate elements with data attributes
document.addEventListener('DOMContentLoaded', () => {
  // Animate counters
  const counters = document.querySelectorAll('[data-counter]');
  counters.forEach(counter => {
    const start = parseInt(counter.getAttribute('data-counter-start') || '0');
    const end = parseInt(counter.getAttribute('data-counter-end') || counter.textContent);
    const duration = parseInt(counter.getAttribute('data-counter-duration') || '2000');
    
    animationUtils.animateOnScroll(counter, {
      animation: 'custom',
      threshold: 0.5
    });
    
    // Override the animate method to use counter animation
    const originalAnimate = animationUtils.animate;
    animationUtils.animate = function(element, animation) {
      if (element === counter && animation === 'custom') {
        animationUtils.animateCounter(element, start, end, duration);
      } else {
        originalAnimate.call(this, element, animation);
      }
    };
  });
  
  // Animate elements on scroll
  const animateElements = document.querySelectorAll('[data-animate]');
  animateElements.forEach(element => {
    const animation = element.getAttribute('data-animate');
    const delay = parseInt(element.getAttribute('data-animate-delay') || '0');
    const duration = parseInt(element.getAttribute('data-animate-duration') || '600');
    
    animationUtils.animateOnScroll(element, {
      animation,
      delay,
      duration
    });
  });
});

// Export everything for use in other modules
export {
  UnifiedTheme,
  AnimationUtils,
  themeManager,
  animationUtils
};

// Global exports for script tag usage
if (typeof window !== 'undefined') {
  window.UnifiedTheme = UnifiedTheme;
  window.AnimationUtils = AnimationUtils;
  window.unifiedTheme = themeManager;
  window.animationUtils = animationUtils;
}