import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import { CartProvider } from './Layout/CartContext';  // Import CartProvider
import Home from './User-YSS/Home';
import About from './User-YSS/About';
import Shop from './User-YSS/Shop';
import NavBar from './Layout/NavbarLayout';
import Lookbook from './User-YSS/Lookbook';
import Contact from './User-YSS/Contact';
import FAQ from './User-YSS/FAQ';
import UserSignIn from './User-YSS/UserSignIn';
import AdminLogin from './Admin-YSS/AdminLogin';
import AdminDashboard from './Admin-YSS/AdminDashboard';
import AdminShop from './Admin-YSS/AdminShop';
import AdminLookbook from './Admin-YSS/AdminLookbook';
import AdminOrderManagement from './Admin-YSS/AdminOrderManagement';
import AdminNavbar from './Admin-YSS/Admin-Layout/AdminNavbar';
import { useState, useEffect } from 'react';
import UserSignup from './User-YSS/UserSignup';
import Checkout from './User-YSS/Checkout';
import Cart from './User-YSS/Cart';
import AdminQoutes from './Admin-YSS/AdminQuotes';
import Order from './User-YSS/Order';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUID, setUserUID] = useState(null);  // Add state for userUID

  const logInHandler = (uid) => {
    setIsLoggedIn(true);
    setUserUID(uid);  // Set the userUID when logged in
  };

  const logOutHandler = () => {
    setIsLoggedIn(false);
    setUserUID(null);  // Clear the userUID when logged out
  };

  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    const storedUID = localStorage.getItem("userUID");  // Store the userUID in localStorage
    if (storedLogin === "true" && storedUID) {
      setIsLoggedIn(true);
      setUserUID(storedUID);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    if (userUID) {
      localStorage.setItem("userUID", userUID);  // Save userUID to localStorage
    }
  }, [isLoggedIn, userUID]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* User Path */}
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="lookbook" element={<Lookbook />} />
          <Route path='cart' element={<Cart />} />
          <Route path='orders' element={<Order />} />
          <Route path="checkout" element={<Checkout/>} />
          <Route path="UserSignIn" element={<UserSignIn logInHandler={logInHandler} />} />
          <Route path="UserSignUp" element={<UserSignup />} />
          

        </Route>
      
        {/* Admin Login Route */}
        <Route path="/admin" element={<AdminLogin logInHandler={logInHandler} />} />
        
        {/* Protected Admin Routes */}
        <Route path="/admindashboard" element={isLoggedIn ? <AdminNavbar logOutHandler={logOutHandler} /> : <Navigate to="/admin" />}>
          <Route index element={<AdminDashboard />} />
          <Route path="adminshop" element={<AdminShop />} />
          <Route path="adminlookbook" element={<AdminLookbook />} />
          <Route path="adminordermanagement" element={<AdminOrderManagement />} />
          <Route path='adminquotes' element={<AdminQoutes />} />
        </Route>

        {/* Catch-all route for non-existent paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </>
    )
  );

  return (
    <CartProvider userUID={userUID}>  
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;