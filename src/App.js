import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Admin from "./components/Admin";
import Order from "./components/Order";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RequireAuth from "./components/RequireAuth";
import Termekek from "./pages/Termekek";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Editor from "./components/Editor";
import Basket from "./components/Basket";
import Message from "./components/Message";
import Newproduct from "./components/Newproduct";
import Checkout from "./components/Checkout";
import Finish from "./components/Finish";
import Change from "./components/Change";
import Allorder from "./components/Allorder";

const ROLES = {
  User: "2000",
  Admin: "2001",
};

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/termekek" element={<Termekek />} />
        <Route path="/contact" element={<Contact />} />
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/finish" element={<Finish />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/editor" element={<Editor />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/message" element={<Message />} />
          <Route path="/new" element={<Newproduct />} />
          <Route path="/change" element={<Change />} />
          <Route path="/order" element={<Order />} />
          <Route path="/allorder" element={<Allorder />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
