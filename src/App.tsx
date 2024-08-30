import { Route, Routes } from "react-router-dom";
import "./App.css";
import "animate.css";
import Home from "./components/Pages/Home";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import ForgotPassword from "./components/Pages/ForgotPassword";
import Verify from "./components/Pages/Verify";
import Product from "./components/Pages/Product";
import Checkout from "./components/Pages/Checkout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/shoes/:id" element={<Product />} />
      <Route path="/checkout/:id" element={<Checkout />} />
    </Routes>
  );
}

export default App;
