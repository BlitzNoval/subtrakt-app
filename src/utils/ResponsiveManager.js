// src/utils/ResponsiveManager.js
import { useEffect, useState, useCallback } from 'react';

// Breakpoint definitions
export const BREAKPOINTS = {
  xs: 480,    // Mobile
  sm: 768,    // Tablet
  md: 1024,   // Small laptop
  lg: 1440,   // Desktop
  xl: 1920,   // Large desktop
  xxl: 2560   // Ultra-wide/4K
};

// Get current breakpoint
export const getBreakpoint = (width) => {
  if (width < BREAKPOINTS.xs) return 'xs';
  if (width < BREAKPOINTS.sm) return 'sm';
  if (width < BREAKPOINTS.md) return 'md';
  if (width < BREAKPOINTS.lg) return 'lg';
  if (width < BREAKPOINTS.xl) return 'xl';
  return 'xxl';
};

// Custom hook for responsive behavior
export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    breakpoint: getBreakpoint(window.innerWidth)
  });

  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const breakpoint = getBreakpoint(width);

    setScreenSize({ width, height, breakpoint });

    // Update CSS variables for dynamic sizing
    const root = document.documentElement;
    
    // Dynamic padding based on screen size
    let contentPadding, sidebarWidth, gridGap;
    
    switch (breakpoint) {
      case 'xs':
        contentPadding = '10px';
        sidebarWidth = '200px';
        gridGap = '8px';
        break;
      case 'sm':
        contentPadding = '15px';
        sidebarWidth = '220px';
        gridGap = '10px';
        break;
      case 'md':
        contentPadding = '20px';
        sidebarWidth = '250px';
        gridGap = '12px';
        break;
      case 'lg':
        contentPadding = '30px';
        sidebarWidth = '250px';
        gridGap = '16px';
        break;
      case 'xl':
        contentPadding = '40px';
        sidebarWidth = '280px';
        gridGap = '20px';
        break;
      case 'xxl':
        contentPadding = '60px';
        sidebarWidth = '300px';
        gridGap = '24px';
        break;
      default:
        contentPadding = '20px';
        sidebarWidth = '250px';
        gridGap = '12px';
    }

    root.style.setProperty('--content-padding', contentPadding);
    root.style.setProperty('--sidebar-width', sidebarWidth);
    root.style.setProperty('--grid-gap', gridGap);
    root.style.setProperty('--screen-width', `${width}px`);
    root.style.setProperty('--screen-height', `${height}px`);
  }, []);

  useEffect(() => {
    // Initial setup
    handleResize();

    // Listen for resize events
    window.addEventListener('resize', handleResize);
    
    // Listen for orientation changes (mobile)
    window.addEventListener('orientationchange', handleResize);

    // Check for screen changes periodically (for monitor switching)
    const intervalId = setInterval(() => {
      if (window.innerWidth !== screenSize.width || window.innerHeight !== screenSize.height) {
        handleResize();
      }
    }, 500);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      clearInterval(intervalId);
    };
  }, [handleResize, screenSize.width, screenSize.height]);

  return screenSize;
};

// HOC to wrap components with responsive behavior
export const withResponsive = (Component) => {
  return function ResponsiveComponent(props) {
    const screenSize = useResponsive();
    return <Component {...props} screenSize={screenSize} />;
  };
};

// Utility function to get responsive grid columns
export const getGridColumns = (breakpoint) => {
  const columns = {
    xs: 4,
    sm: 6,
    md: 8,
    lg: 12,
    xl: 12,
    xxl: 16
  };
  return columns[breakpoint] || 12;
};

// Utility function to get responsive font sizes
export const getFontSize = (baseSize, breakpoint) => {
  const multipliers = {
    xs: 0.85,
    sm: 0.9,
    md: 1,
    lg: 1.1,
    xl: 1.2,
    xxl: 1.3
  };
  return Math.round(baseSize * (multipliers[breakpoint] || 1));
};