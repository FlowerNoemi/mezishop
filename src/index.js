import React from 'react';
import './index.css';
import App from './App';
import Header from './components/Header';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import { createRoot } from 'react-dom/client';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
   <BrowserRouter>
        <Header/>
        <Routes>
            <Route path='/' element={<App />} />
            <Route path='/app' element={<App />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/Login' element={<Login />} />
        </Routes>
   </BrowserRouter>
  </React.StrictMode>

);