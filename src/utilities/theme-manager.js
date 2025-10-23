/**
 * Unified Theme - Theme Manager
 * JavaScript utilities for managing themes, dark mode, and component interactions
 */

class UnifiedTheme {
  constructor(options = {}) {
    this.options = {
      enableDarkMode: true,
      autoDetectPreference: true,
      storageKey: 'unified-theme-mode',
      ...options
    };
    
    this.currentTheme = 'light';
    this.init();
  }
  
  /**
   * Initialize the theme system
   */
  init() {
    this.setupThemeToggle();
    this.setupComponentInteractions();
    
    if (this.options.enableDarkMode) {
      this.initDarkMode();
    }
  }
  
  /**
   * Initialize dark mode functionality
   */
  initDarkMode() {
    // Check for saved theme preference or default to auto-detection
    const savedTheme = localStorage.getItem(this.options.storageKey);
    
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else if (this.options.autoDetectPreference) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark ? 'dark' : 'light');
    }
    
    // Listen for system theme changes
    if (this.options.autoDetectPreference) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(this.options.storageKey)) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }
  
  /**
   * Set the theme
   * @param {string} theme - 'light' or 'dark'
   */
  setTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    
    localStorage.setItem(this.options.storageKey, theme);
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme } 
    }));
  }
  
  /**
   * Toggle between light and dark themes
   */
  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
  
  /**
   * Get current theme
   */
  getTheme() {
    return this.currentTheme;
  }
  
  /**
   * Setup theme toggle functionality
   */
  setupThemeToggle() {
    const toggleButtons = document.querySelectorAll('[data-theme-toggle]');
    
    toggleButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.toggleTheme();
      });
    });
  }
  
  /**
   * Setup component interactions
   */
  setupComponentInteractions() {
    this.setupAlertDismissal();
    this.setupCollapseToggle();
    this.setupDropdowns();
    this.setupTabs();
  }
  
  /**
   * Setup alert dismissal functionality
   */
  setupAlertDismissal() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.alert-close')) {
        const alert = e.target.closest('.alert');
        if (alert) {
          this.dismissAlert(alert);
        }
      }
    });
  }
  
  /**
   * Dismiss an alert with animation
   * @param {HTMLElement} alert - The alert element to dismiss
   */
  dismissAlert(alert) {
    alert.style.transition = 'all 0.3s ease';
    alert.style.opacity = '0';
    alert.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
      alert.remove();
    }, 300);
  }
  
  /**
   * Setup collapse toggle functionality
   */
  setupCollapseToggle() {
    document.addEventListener('click', (e) => {
      const toggle = e.target.closest('[data-collapse-toggle]');
      if (toggle) {
        const targetId = toggle.getAttribute('data-collapse-toggle');
        const target = document.getElementById(targetId);
        
        if (target) {
          this.toggleCollapse(target);
        }
      }
    });
  }
  
  /**
   * Toggle collapse state of an element
   * @param {HTMLElement} element - The element to collapse/expand
   */
  toggleCollapse(element) {
    const isCollapsed = element.style.display === 'none' || 
                       element.classList.contains('collapsed');
    
    if (isCollapsed) {
      element.style.display = 'block';
      element.classList.remove('collapsed');
      element.classList.add('collapsing');
      
      // Force reflow
      element.offsetHeight;
      
      element.style.height = element.scrollHeight + 'px';
      
      setTimeout(() => {
        element.classList.remove('collapsing');
        element.style.height = '';
      }, 300);
    } else {
      element.style.height = element.scrollHeight + 'px';
      element.classList.add('collapsing');
      
      // Force reflow
      element.offsetHeight;
      
      element.style.height = '0';
      
      setTimeout(() => {
        element.style.display = 'none';
        element.classList.remove('collapsing');
        element.classList.add('collapsed');
        element.style.height = '';
      }, 300);
    }
  }
  
  /**
   * Setup dropdown functionality
   */
  setupDropdowns() {
    document.addEventListener('click', (e) => {
      const dropdown = e.target.closest('[data-dropdown]');
      
      if (dropdown) {
        e.preventDefault();
        this.toggleDropdown(dropdown);
      } else {
        // Close all dropdowns when clicking outside
        this.closeAllDropdowns();
      }
    });
  }
  
  /**
   * Toggle dropdown state
   * @param {HTMLElement} dropdown - The dropdown trigger element
   */
  toggleDropdown(dropdown) {
    const isOpen = dropdown.classList.contains('open');
    
    // Close all other dropdowns
    this.closeAllDropdowns();
    
    if (!isOpen) {
      dropdown.classList.add('open');
      dropdown.setAttribute('aria-expanded', 'true');
    }
  }
  
  /**
   * Close all open dropdowns
   */
  closeAllDropdowns() {
    const openDropdowns = document.querySelectorAll('[data-dropdown].open');
    
    openDropdowns.forEach(dropdown => {
      dropdown.classList.remove('open');
      dropdown.setAttribute('aria-expanded', 'false');
    });
  }
  
  /**
   * Setup tab functionality
   */
  setupTabs() {
    document.addEventListener('click', (e) => {
      const tab = e.target.closest('[data-tab]');
      
      if (tab) {
        e.preventDefault();
        this.switchTab(tab);
      }
    });
  }
  
  /**
   * Switch to a specific tab
   * @param {HTMLElement} tab - The tab element to switch to
   */
  switchTab(tab) {
    const targetId = tab.getAttribute('data-tab');
    const tabGroup = tab.closest('[data-tab-group]');
    
    if (!tabGroup) return;
    
    // Remove active class from all tabs in the group
    const tabs = tabGroup.querySelectorAll('[data-tab]');
    tabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    
    // Add active class to clicked tab
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    
    // Hide all tab panels
    const panels = document.querySelectorAll('[data-tab-panel]');
    panels.forEach(panel => {
      panel.style.display = 'none';
      panel.setAttribute('aria-hidden', 'true');
    });
    
    // Show target panel
    const targetPanel = document.getElementById(targetId);
    if (targetPanel) {
      targetPanel.style.display = 'block';
      targetPanel.setAttribute('aria-hidden', 'false');
    }
  }
  
  /**
   * Utility method to add CSS classes with animation
   * @param {HTMLElement} element - The element to animate
   * @param {string} className - The class to add
   * @param {number} duration - Animation duration in ms
   */
  animateClass(element, className, duration = 300) {
    element.classList.add(className);
    
    setTimeout(() => {
      element.classList.remove(className);
    }, duration);
  }
  
  /**
   * Utility method to create notifications
   * @param {string} message - The notification message
   * @param {object} options - Notification options
   */
  notify(message, options = {}) {
    const defaults = {
      type: 'info',
      duration: 5000,
      position: 'top-right',
      dismissible: true
    };
    
    const config = { ...defaults, ...options };
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${config.type} notification`;
    
    // Safely add content
    const messageSpan = document.createElement('span');
    messageSpan.textContent = message;
    notification.appendChild(messageSpan);
    
    if (config.dismissible) {
      const closeButton = document.createElement('button');
      closeButton.className = 'alert-close';
      closeButton.setAttribute('aria-label', 'Close');
      closeButton.innerHTML = '&times;';
      notification.appendChild(closeButton);
    }
    
    // Add positioning classes
    notification.classList.add(`notification-${config.position}`);
    
    // Add to DOM
    const container = this.getNotificationContainer(config.position);
    container.appendChild(notification);
    
    // Auto dismiss
    if (config.duration > 0) {
      setTimeout(() => {
        if (notification.parentNode) {
          this.dismissAlert(notification);
        }
      }, config.duration);
    }
    
    return notification;
  }
  
  /**
   * Get or create notification container
   * @param {string} position - The position for the container
   */
  getNotificationContainer(position) {
    const containerId = `notifications-${position}`;
    let container = document.getElementById(containerId);
    
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      container.className = `notifications notifications-${position}`;
      document.body.appendChild(container);
    }
    
    return container;
  }
}

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.unifiedTheme = new UnifiedTheme();
  });
} else {
  window.unifiedTheme = new UnifiedTheme();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UnifiedTheme;
}

export default UnifiedTheme;