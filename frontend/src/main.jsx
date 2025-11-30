import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer 
      autoClose={3000}
      position="top-right"
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      toastClassName="!bg-dark-900 !border !border-gray-800 !text-white !rounded-xl !shadow-lg"
      progressClassName="!bg-gradient-to-r !from-blue-500 !to-purple-600"
    />
  </StrictMode>,
)
