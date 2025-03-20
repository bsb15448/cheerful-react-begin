
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Check if we're in the admin context based on pathname
const isAdmin = window.location.pathname.startsWith('/admin');

// Only render the main app if we're not in admin route
// The admin app will be loaded separately from its own bundle
if (!isAdmin) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
