
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Admin from './components/Admin';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';
import Layout from './components/Layout';
import Termekek from './pages/Termekek';

const ROLES = {
    'User': '2000',
    'Admin': '2001'
  }
  
function App() {
  return (
    <>
    <Header/>
    <Routes>
        <Route path="/" element={<Layout />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path='/home' element={<Home/>}/>
        
        
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
         
        <Route path='/termekek' element={<Termekek/>}/>
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>  
        0<Route path='/editor' element={<Termekek/>}/>
          <Route path="/admin" element={<Admin />} />
        </Route>


    </Routes>
    </>
  );
}

export default App;
