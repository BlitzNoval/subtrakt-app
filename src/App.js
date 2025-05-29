import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SubscriptionProvider } from './context/SubscriptionContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Subscriptions from './pages/Subscriptions';
import Budget from './pages/Budget';
import Usage from './pages/Usage';
import Settings from './pages/Settings';
import LoginForm from './pages/LoginForm';
import './styles/App.css'; 
import './styles/DarkMode.css'; 

function App() {
  return (
    <SubscriptionProvider>
      <Router>
        <Routes>
          {/* Login route without sidebar */}
          <Route path="/login" element={<LoginForm />} />
          
          {/* Main app routes with sidebar */}
          <Route path="/*" element={
            <div className="app">
              <Sidebar />
              <div className="content">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/subscriptions" element={<Subscriptions />} />
                  <Route path="/budget" element={<Budget />} />
                  <Route path="/usage" element={<Usage />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </div>
            </div>
          } />
        </Routes>
      </Router>
    </SubscriptionProvider>
  );
}

export default App;