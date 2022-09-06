import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
 <Header></Header>
    <AuthProvider>
    
      <Routes>
      <Route path='/*' element={<App/>}/>

      </Routes>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>

);