import React from 'react';
import '../styles/Changes.css';

const Roadmap = ({ screenSize }) => {
  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Changes</h1>
        <p>Explore changes since Assignment 2, the reasoning behind the structure, and code understanding</p>
      </div>

      <div className="section-1">
        <h2>Section 1</h2>
        <p>Since Assignment 2, the project structure has been refined. Key changes include the addition of the /utils folder for utilities like ResponsiveManager and the separation of mock data into mockData.js for better testing. The folder organization promotes modularity, maintainability, and scalability:</p>
        <ul>
          <li><strong>/components</strong>: Contains reusable UI components like Sidebar, updated to include dynamic navigation since Assignment 2.</li>
          <li><strong>/pages</strong>: Houses top-level pages (e.g., Dashboard, Subscriptions), with new pages like Architecture added for exam documentation.</li>
          <li><strong>/context</strong>: Stores SubscriptionContext, enhanced with useReducer for better state management post-Assignment 2.</li>
          <li><strong>/styles</strong>: Organized into subfolders:
            <ul>
              <li><strong>/DarkMode</strong>: Added for dark mode support since Assignment 2.</li>
              <li><strong>/Responsiveness</strong>: Includes breakpoint-specific styles for adaptive layouts.</li>
              <li><strong>/Global</strong>: Shared styles like Sidebar.css, refined for consistency.</li>
              <li><strong>/Settings</strong>: Page-specific styles, expanded for new settings features.</li>
            </ul>
          </li>
          <li><strong>/utils</strong>: New since Assignment 2, holds utilities like ResponsiveManager for screen size detection.</li>
        </ul>
      </div>

      <div className="section-2">
        <h2>Section 2</h2>
        <p>The codebase has evolved since Assignment 2 to ensure separation of concerns. Changes include integrating React Router for routing and enhancing state management. Understanding the code involves:</p>
        <ul>
          <li><strong>Component-Based Design</strong>: Components like Sidebar are reusable, with updates to support dynamic routing since Assignment 2.</li>
          <li><strong>State Management</strong>: SubscriptionContext now uses useReducer, a shift from basic state, improving scalability.</li>
          <li><strong>Routing</strong>: Added React Router post-Assignment 2 for seamless page navigation.</li>
          <li><strong>Responsive Design</strong>: The useResponsive hook, introduced since Assignment 2, adapts layouts dynamically.</li>
        </ul>
      </div>

      <div className="section-3">
        <h2>Section 3</h2>
        <p>Imports and exports have been streamlined since Assignment 2 to avoid circular dependencies and enhance clarity:</p>
        <ul>
          <li><strong>Named Exports</strong>: Components use default exports, a consistent approach since Assignment 2 (e.g., `export default Sidebar`).</li>
          <li><strong>Context Exports</strong>: SubscriptionContext exports both provider and hook, refined for better encapsulation.</li>
          <li><strong>Utility Functions</strong>: New since Assignment 2, /utils exports functions like useResponsive for explicit dependencies.</li>
          <li><strong>Styles Imports</strong>: Imported at the app or component level, with subfolders added post-Assignment 2 for organization.</li>
          <li><strong>Avoiding Circular Dependencies</strong>: Ensured one-way dependency flow, a practice strengthened since Assignment 2.</li>
        </ul>
      </div>

      <div className="section-4">
        <h2>Section 4</h2>
        <p>Design decisions have evolved since Assignment 2 to balance functionality and developer experience:</p>
        <ul>
          <li><strong>Context API over Redux</strong>: Adopted post-Assignment 2 for lightweight state management.</li>
          <li><strong>LocalStorage for Persistence</strong>: Implemented since Assignment 2 to simulate a backend.</li>
          <li><strong>Mock Data Separation</strong>: Added mockData.js with Settings buttons post-Assignment 2 for testing.</li>
          <li><strong>Responsive Styling</strong>: Introduced separate CSS files and useResponsive since Assignment 2.</li>
        </ul>
      </div>
    </div>
  );
};

export default Roadmap;