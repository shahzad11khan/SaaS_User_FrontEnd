import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import App from './App.jsx';
import store from './store/store.js';
import './index.css';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          closeOnClick
          draggable
          pauseOnHover
          theme="colored"
          limit={3}
          closeButton={false}
          toastStyle={{
            fontSize: '11px',
            fontFamily: 'Arial, sans-serif',
            color: 'white',
            width: '220px',
            minHeight: '40px',
            padding: '8px 12px',
            borderRadius: '4px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          }}
        />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
