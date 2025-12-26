
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes.tsx';
import AIChatbot from './components/AIChatbot.tsx';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* Global Context Providers would go here (Auth, Cart, etc.) */}
      <AppRoutes />
      
      {/* Global UI Components */}
      <AIChatbot />
    </BrowserRouter>
  );
};

export default App;
