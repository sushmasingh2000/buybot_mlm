import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        toastOptions={{
          className: "",
          style: {
            border: `1px solid `,
            color: "#25D366",
            fontSize: "15px",
            marginTop: "100px",
            borderRadius: "10px",
          },
        }}
        autoClose={1000}
        limit={1}
      />
    </QueryClientProvider>
  </React.StrictMode>
);

// ✅ Add this block BELOW your ReactDOM render, BEFORE reportWebVitals
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('✅ Service Worker registered: ', registration);
      }).catch((registrationError) => {
        console.error('❌ Service Worker registration failed: ', registrationError);
      });
  });
}

reportWebVitals();
