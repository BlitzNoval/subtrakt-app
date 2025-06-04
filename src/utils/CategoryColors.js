// Centralized color management for subscription categories
// Ensures consistent theming across charts and UI


// Main color palette for category visualization
export const categoryColors = {
  // Main categories
  'Entertainment': '#e17055',
  'Software': '#f39c12',
  'Gaming': '#fd79a8',
  'Cloud Storage': '#a29bfe',
  'News & Media': '#00cec9',
  'Car Subscriptions': '#6c5ce7',
  'Mobile Data': '#fdcb6e',
  'Developer Tools': '#74b9ff',
  'Health & Fitness': '#55efc4',
  'Other': '#b2bec3'
};

// Icon background colors for when the icon isnt assigned (darker shades)
export const categoryIconColors = {
  'Entertainment': '#d63031',
  'Software': '#e67e22',
  'Gaming': '#e84393',
  'Cloud Storage': '#6c5ce7',
  'News & Media': '#00b894',
  'Car Subscriptions': '#5f3dc4',
  'Mobile Data': '#f39c12',
  'Developer Tools': '#0984e3',
  'Health & Fitness': '#00b894',
  'Other': '#636e72'
};

// Get category color with fallback, Prevents undefined colors from breaking UI
export const getCategoryColor = (category) => {
  return categoryColors[category] || categoryColors['Other'];
};

// Get category icon color with fallback
export const getCategoryIconColor = (category) => {
  return categoryIconColors[category] || categoryIconColors['Other'];
};

// Get chart colors array for multiple categories
// Maps category lists to consistent color schemes
// ITS ALIVE! It can be seen across the app.
export const getChartColors = (categories) => {
  return categories.map(cat => getCategoryColor(cat));
};