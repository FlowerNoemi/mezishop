
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';



function App() {
  return (
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/pages/Home' element={<Home/>}/>
    <Route path="/pages/Login" element={<Login />} />
  
  <Route path="/pages/Register" element={<Register />} />
    </Routes>
  );
}

export default App;
