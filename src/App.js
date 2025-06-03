import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SubscriptionProvider } from './context/SubscriptionContext';
import { useResponsive } from './utils/ResponsiveManager';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Subscriptions from './pages/Subscriptions';
import SubscriptionDetail from './pages/SubscriptionDetail';
import Budget from './pages/Budget';
import Usage from './pages/Usage';
import Settings from './pages/Settings';
import Roadmap from './pages/Changes'; // Updated import
import LoginForm from './pages/LoginForm';
import './styles/App.css'; 
import './styles/DarkMode/ComponentsDark.css';
import './styles/DarkMode/LayoutDark.css';
import './styles/DarkMode/GlobalStylesDark.css';
import './styles/Responsiveness/Responsive1.css';
import './styles/Responsiveness/Responsive2.css';
import './styles/Responsiveness/Responsive3.css';

function AppContent() {
  const screenSize = useResponsive();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <Routes>
        {/* Login route without sidebar */}
        <Route path="/login" element={<LoginForm />} />
        
        {/* Main app routes with sidebar */}
        <Route path="/*" element={
          <div className="app" data-screen-size={screenSize.breakpoint}>
            {screenSize.breakpoint === 'xs' && (
              <button className="mobile-menu-btn" onClick={toggleSidebar}>
                ☰
              </button>
            )}
            <Sidebar isOpen={sidebarOpen} screenSize={screenSize} />
            <div className="content">
              <Routes>
                <Route path="/" element={<Dashboard screenSize={screenSize} />} />
                <Route path="/dashboard" element={<Dashboard screenSize={screenSize} />} />
                <Route path="/subscriptions" element={<Subscriptions screenSize={screenSize} />} />
                <Route path="/subscription/:id" element={<SubscriptionDetail screenSize={screenSize} />} />
                <Route path="/budget" element={<Budget screenSize={screenSize} />} />
                <Route path="/usage" element={<Usage screenSize={screenSize} />} />
                <Route path="/settings" element={<Settings screenSize={screenSize} />} />
                <Route path="/roadmap" element={<Roadmap screenSize={screenSize} />} /> {/* Updated route */}
              </Routes>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <SubscriptionProvider>
      <AppContent />
    </SubscriptionProvider>
  );
}

export default App;