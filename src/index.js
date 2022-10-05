import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ProductsProvider } from './context/Productcontext';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
<React.StrictMode>
    <BrowserRouter>
	
    	<AuthProvider> 
		<ProductsProvider> 
			<CartProvider>
			<UserProvider>
      			<Routes>
      				<Route path='/*' element={<App/>}/>
      			</Routes>
			</UserProvider>
			  </CartProvider> 
			  </ProductsProvider>
    	</AuthProvider>
	
    </BrowserRouter>
</React.StrictMode>

);