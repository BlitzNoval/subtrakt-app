import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Subscriptions from './pages/Subscriptions';
import Budget from './pages/Budget';
import Usage from './pages/Usage';
import Settings from './pages/Settings';
import './App.css';

function App() {
  const [currentSection, setCurrentSection] = useState('dashboard');

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'subscriptions':
        return <Subscriptions />;
      case 'budget':
        return <Budget />;
      case 'usage':
        return <Usage />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      <Sidebar setCurrentSection={setCurrentSection} />
      <div className="content">
        {renderSection()}
      </div>
    </div>
  );
}

export default App;