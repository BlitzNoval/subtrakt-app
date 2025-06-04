import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Global/Sidebar.css';

const Sidebar = ({ isOpen, screenSize }) => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/subscriptions', label: 'Subscriptions' },
    { path: '/budget', label: 'Budget' },
    { path: '/usage', label: 'Usage' },
    { path: '/settings', label: 'Settings' },
    { path: '/documentation', label: 'Documentation' } // Updated nav item
  ];

  const sidebarClasses = screenSize?.breakpoint === 'xs' 
    ? `sidebar ${isOpen ? 'active' : ''}`
    : 'sidebar';

  return (
    <div className={sidebarClasses}>
      <div className="sidebar-header">
        <h2>Subtrakt</h2>
      </div>
      <ul>
        {navItems.map((item) => (
          <li key={item.path}>
            <Link 
              to={item.path} 
              className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;