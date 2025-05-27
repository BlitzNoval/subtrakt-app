import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/subscriptions', label: 'Subscriptions', icon: '📱' },
    { path: '/budget', label: 'Budget', icon: '💰' },
    { path: '/usage', label: 'Usage', icon: '📈' },
    { path: '/settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="sidebar">
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