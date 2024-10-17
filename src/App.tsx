import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "animate.css";
import Home from "./components/Pages/Home";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import ForgotPassword from "./components/Pages/ForgotPassword";
import Verify from "./components/Pages/Verify";
import Product from "./components/Pages/ProductDetail";
import Checkout from "./components/Pages/Checkout";
import MyOrders from "./components/Dashboard/Orders";
import Favorite from "./components/Dashboard/Favorite";
import Setting from "./components/Pages/Setting";
import Page404 from "./components/Pages/Page404";
import About from "./components/Pages/About";
import PrivacyPolicy from "./components/Pages/PrivacyPolicy";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-email" element={<Verify />} />
      <Route path="/register" element={<Register />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/my-favorites" element={<Favorite />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/shoes/:id" element={<Product />} />
      <Route path="/checkout/:id" element={<Checkout />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />

      {/* 404 Page */}
      <Route path="/404" element={<Page404 />} />
      <Route path="*" element={<Navigate to="/404" />}></Route>
    </Routes>
  );
}

export default App;
