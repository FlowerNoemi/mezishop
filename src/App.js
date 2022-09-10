
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Admin from './components/Admin';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';
import Layout from './components/Layout';


const ROLES = {
    'User': 2000,
    'Admin': 2001
  }
  
function App() {
  return (
    <>
    <Header/>
    <Routes>
        <Route path="/components/layout" element={<Layout />}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/pages/Home' element={<Home/>}/>
        <Route path="/pages/Login" element={<Login />} />
        <Route path="/pages/Register" element={<Register />} />
        <Route path="/components/unauthorized" element={<Unauthorized />} />

        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path='/' element={<Home/>}/>
        <Route path='/pages/Home' element={<Home/>}/>
        <Route path="/pages/Login" element={<Login />} />
        <Route path="/pages/Register" element={<Register />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/" element={<Home />} />  
          <Route path="/components/Admin" element={<Admin />} />
        </Route>


    </Routes>
    </>
  );
}

export default App;
