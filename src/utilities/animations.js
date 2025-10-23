/**
 * Unified Theme - Animation Utilities
 * Utility functions for animations and transitions
 */

class AnimationUtils {
  constructor() {
    this.defaultDuration = 300;
    this.defaultEasing = 'ease-in-out';
  }
  
  /**
   * Fade in an element
   * @param {HTMLElement} element - Element to fade in
   * @param {number} duration - Animation duration in ms
   * @param {function} callback - Callback function when animation completes
   */
  fadeIn(element, duration = this.defaultDuration, callback = null) {
    element.style.opacity = '0';
    element.style.display = 'block';
    element.style.transition = `opacity ${duration}ms ${this.defaultEasing}`;
    
    // Force reflow
    element.offsetHeight;
    
    element.style.opacity = '1';
    
    if (callback) {
      setTimeout(callback, duration);
    }
  }
  
  /**
   * Fade out an element
   * @param {HTMLElement} element - Element to fade out
   * @param {number} duration - Animation duration in ms
   * @param {function} callback - Callback function when animation completes
   */
  fadeOut(element, duration = this.defaultDuration, callback = null) {
    element.style.opacity = '1';
    element.style.transition = `opacity ${duration}ms ${this.defaultEasing}`;
    
    element.style.opacity = '0';
    
    setTimeout(() => {
      element.style.display = 'none';
      if (callback) callback();
    }, duration);
  }
  
  /**
   * Slide down an element
   * @param {HTMLElement} element - Element to slide down
   * @param {number} duration - Animation duration in ms
   * @param {function} callback - Callback function when animation completes
   */
  slideDown(element, duration = this.defaultDuration, callback = null) {
    element.style.height = '0';
    element.style.overflow = 'hidden';
    element.style.display = 'block';
    element.style.transition = `height ${duration}ms ${this.defaultEasing}`;
    
    const targetHeight = element.scrollHeight;
    
    // Force reflow
    element.offsetHeight;
    
    element.style.height = targetHeight + 'px';
    
    setTimeout(() => {
      element.style.height = '';
      element.style.overflow = '';
      if (callback) callback();
    }, duration);
  }
  
  /**
   * Slide up an element
   * @param {HTMLElement} element - Element to slide up
   * @param {number} duration - Animation duration in ms
   * @param {function} callback - Callback function when animation completes
   */
  slideUp(element, duration = this.defaultDuration, callback = null) {
    element.style.height = element.scrollHeight + 'px';
    element.style.overflow = 'hidden';
    element.style.transition = `height ${duration}ms ${this.defaultEasing}`;
    
    // Force reflow
    element.offsetHeight;
    
    element.style.height = '0';
    
    setTimeout(() => {
      element.style.display = 'none';
      element.style.height = '';
      element.style.overflow = '';
      if (callback) callback();
    }, duration);
  }
  
  /**
   * Scale in an element
   * @param {HTMLElement} element - Element to scale in
   * @param {number} duration - Animation duration in ms
   * @param {function} callback - Callback function when animation completes
   */
  scaleIn(element, duration = this.defaultDuration, callback = null) {
    element.style.transform = 'scale(0)';
    element.style.opacity = '0';
    element.style.display = 'block';
    element.style.transition = `transform ${duration}ms ${this.defaultEasing}, opacity ${duration}ms ${this.defaultEasing}`;
    
    // Force reflow
    element.offsetHeight;
    
    element.style.transform = 'scale(1)';
    element.style.opacity = '1';
    
    if (callback) {
      setTimeout(callback, duration);
    }
  }
  
  /**
   * Scale out an element
   * @param {HTMLElement} element - Element to scale out
   * @param {number} duration - Animation duration in ms
   * @param {function} callback - Callback function when animation completes
   */
  scaleOut(element, duration = this.defaultDuration, callback = null) {
    element.style.transform = 'scale(1)';
    element.style.opacity = '1';
    element.style.transition = `transform ${duration}ms ${this.defaultEasing}, opacity ${duration}ms ${this.defaultEasing}`;
    
    element.style.transform = 'scale(0)';
    element.style.opacity = '0';
    
    setTimeout(() => {
      element.style.display = 'none';
      if (callback) callback();
    }, duration);
  }
  
  /**
   * Bounce an element
   * @param {HTMLElement} element - Element to bounce
   * @param {number} intensity - Bounce intensity (0-1)
   */
  bounce(element, intensity = 0.3) {
    const animation = element.animate([
      { transform: 'scale(1)', offset: 0 },
      { transform: `scale(${1 + intensity})`, offset: 0.5 },
      { transform: 'scale(1)', offset: 1 }
    ], {
      duration: 600,
      easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    });
    
    return animation;
  }
  
  /**
   * Shake an element
   * @param {HTMLElement} element - Element to shake
   * @param {number} intensity - Shake intensity in pixels
   */
  shake(element, intensity = 10) {
    const animation = element.animate([
      { transform: 'translateX(0)' },
      { transform: `translateX(-${intensity}px)` },
      { transform: `translateX(${intensity}px)` },
      { transform: `translateX(-${intensity}px)` },
      { transform: `translateX(${intensity}px)` },
      { transform: 'translateX(0)' }
    ], {
      duration: 500,
      easing: 'ease-in-out'
    });
    
    return animation;
  }
  
  /**
   * Pulse an element
   * @param {HTMLElement} element - Element to pulse
   * @param {number} scale - Scale factor for pulse
   */
  pulse(element, scale = 1.05) {
    const animation = element.animate([
      { transform: 'scale(1)' },
      { transform: `scale(${scale})` },
      { transform: 'scale(1)' }
    ], {
      duration: 1000,
      iterations: Infinity,
      easing: 'ease-in-out'
    });
    
    return animation;
  }
  
  /**
   * Create a ripple effect
   * @param {HTMLElement} element - Element to create ripple on
   * @param {Event} event - Click event for positioning
   */
  ripple(element, event) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.4);
      transform: scale(0);
      animation: ripple 600ms ease-out;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      pointer-events: none;
    `;
    
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
  
  /**
   * Animate counter from start to end value
   * @param {HTMLElement} element - Element to animate counter in
   * @param {number} start - Starting value
   * @param {number} end - Ending value
   * @param {number} duration - Animation duration in ms
   */
  animateCounter(element, start, end, duration = 2000) {
    const startTime = performance.now();
    const difference = end - start;
    
    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(start + (difference * easeOut));
      
      element.textContent = currentValue.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = end.toLocaleString();
      }
    };
    
    requestAnimationFrame(animate);
  }
  
  /**
   * Animate element into view when scrolled to
   * @param {HTMLElement} element - Element to animate
   * @param {object} options - Animation options
   */
  animateOnScroll(element, options = {}) {
    const defaults = {
      threshold: 0.1,
      animation: 'fadeIn',
      duration: 600,
      delay: 0
    };
    
    const config = { ...defaults, ...options };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            this.animate(entry.target, config.animation, config.duration);
          }, config.delay);
          
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: config.threshold
    });
    
    observer.observe(element);
  }
  
  /**
   * Generic animation method
   * @param {HTMLElement} element - Element to animate
   * @param {string} animation - Animation type
   * @param {number} duration - Animation duration
   * @param {function} callback - Callback function
   */
  animate(element, animation, duration = this.defaultDuration, callback = null) {
    switch (animation) {
      case 'fadeIn':
        this.fadeIn(element, duration, callback);
        break;
      case 'fadeOut':
        this.fadeOut(element, duration, callback);
        break;
      case 'slideDown':
        this.slideDown(element, duration, callback);
        break;
      case 'slideUp':
        this.slideUp(element, duration, callback);
        break;
      case 'scaleIn':
        this.scaleIn(element, duration, callback);
        break;
      case 'scaleOut':
        this.scaleOut(element, duration, callback);
        break;
      case 'bounce':
        this.bounce(element);
        if (callback) callback();
        break;
      case 'shake':
        this.shake(element);
        if (callback) callback();
        break;
      default:
        console.warn(`Animation "${animation}" not found`);
        if (callback) callback();
    }
  }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnimationUtils;
}

export default AnimationUtils;