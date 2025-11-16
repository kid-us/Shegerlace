import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "animate.css";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Verify from "./routes/Verify";
import Register from "./routes/Register";
import Protected from "./components/Protected/Protected";
import MyOrders from "./components/Dashboard/Orders";
import Favorite from "./components/Dashboard/Favorite";
import Setting from "./routes/Setting";
import ForgotPassword from "./routes/ForgotPassword";
import Checkout from "./routes/Checkout";
import Mens from "./routes/Mens";
import Women from "./routes/Women";
import Kids from "./routes/Kids";
import Search from "./routes/Search";
import CheckEmail from "./routes/CheckEmail";
import About from "./routes/About";
import PrivacyPolicy from "./routes/PrivacyPolicy";
import ContactUs from "./routes/ContactUs";
import Page404 from "./routes/Page404";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-email" element={<Verify />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/my-orders"
        element={
          <Protected>
            <MyOrders />
          </Protected>
        }
      />
      <Route
        path="/my-favorites"
        element={
          <Protected>
            <Favorite />
          </Protected>
        }
      />
      <Route
        path="/setting"
        element={
          <Protected>
            <Setting />
          </Protected>
        }
      />
      <Route path="/request" element={<ForgotPassword />} />
      {/* <Route path="/shoes/:id" element={<Product />} /> */}
      <Route
        path="/checkout/:id"
        element={
          <Protected>
            <Checkout />
          </Protected>
        }
      />
      <Route path="/mens" element={<Mens />} />
      <Route path="/women" element={<Women />} />
      <Route path="/kids" element={<Kids />} />
      <Route path="/search/:id" element={<Search />} />
      <Route path="/reset-password" element={<CheckEmail />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/contact-us" element={<ContactUs />} />

      {/* 404 Page */}
      <Route path="/404" element={<Page404 />} />
      <Route path="*" element={<Navigate to="/404" />}></Route>
    </Routes>
  );
}

export default App;
