import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Footer from './FooterLayout';
import { useCart } from '../Layout/CartContext';
import { ShoppingCart, User, Menu, X, Package } from "lucide-react"; // Import Package icon

function NavbarLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Check if current location is /about, /contact, or /FAQ
  const isAboutActive = location.pathname === '/about' || location.pathname === '/contact' || location.pathname === '/FAQ';

  // Function to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white shadow-lg z-20">
        <nav className="container mx-auto flex justify-between items-center h-18 px-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <NavLink to="/" className="flex items-center">
              <img
                src="src/assets/YSS LOGO PNG 2.png"
                alt="Logo"
                className="h-12 w-auto"
              />
            </NavLink>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link flex items-center justify-center h-16 px-4 font-cousine font-bold text-center transition-all ease-in-out duration-300 ${isActive ? 'text-gray-700 border-b-2 border-gray-700' : 'hover:text-gray-500 border-b-2 border-transparent hover:border-gray-700'}`  
              }
            >
              HOME
            </NavLink>

            <NavLink
              to="/Shop"
              className={({ isActive }) =>
                `nav-link flex items-center justify-center h-16 px-4 font-cousine font-bold text-center transition-all ease-in-out duration-300 ${isActive ? 'text-gray-700 border-b-2 border-gray-700' : 'hover:text-gray-500 border-b-2 border-transparent hover:border-gray-700'}`  
              }
            >
              SHOP
            </NavLink>

            {/* About Us with Dropdown */}
            <div className="relative group">
              <NavLink
                to="/about"
                className={`nav-link flex items-center justify-center h-16 px-4 font-cousine font-bold text-center transition-all ease-in-out duration-300 ${isAboutActive ? 'text-gray-700 border-b-2 border-gray-700' : 'hover:text-gray-500 border-b-2 border-transparent hover:border-gray-700'}`}
              >
                ABOUT US
              </NavLink>

              {/* Dropdown Menu */}
              <ul className="absolute left-0 w-40 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto font-cousine bg-[#FAFAFA]">
                <li>
                  <NavLink
                    to="/contact"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Contact Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/FAQ"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    FAQ
                  </NavLink>
                </li>
              </ul>
            </div>

            <NavLink
              to="/lookbook"
              className={({ isActive }) =>
                `nav-link flex items-center justify-center h-16 px-4 font-cousine font-bold text-center transition-all ease-in-out duration-300 ${isActive ? 'text-gray-700 border-b-2 border-gray-700' : 'hover:text-gray-500 border-b-2 border-transparent hover:border-gray-700'}`  
              }
            >
              LOOKBOOK
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? 
              <X size={24} className="text-black" /> : 
              <Menu size={24} className="text-black" />
            }
          </button>

          <div className="flex items-center">
            {/* Order Icon */}
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `flex items-center justify-center h-16 px-2 md:px-4 relative transition-all ease-in-out duration-300 ${isActive ? 'text-gray-700 border-b-2 border-gray-700' : 'hover:text-gray-500 border-b-2 border-transparent hover:border-gray-700'}`
              }
            >
              <Package size={24} className="text-black" />
            </NavLink>

            {/* Cart Icon with Hover Effect and Active Line */}
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative flex items-center justify-center h-16 px-2 md:px-4 ${
                  isActive
                    ? 'text-gray-700 border-b-2 border-gray-700' // Active state
                    : 'hover:text-gray-500 border-b-2 border-transparent hover:border-gray-700' // Hover state
                }`
              }
            >
              <ShoppingCart size={24} className="text-black" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-black text-white text-xs rounded-full px-1">
                  {cartItems.length}
                </span>
              )}
            </NavLink>

            {/* Account Icon with Hover Effect and Active Line */}
            <NavLink
              to="/UserSignIn"
              className={({ isActive }) =>
                `flex items-center justify-center h-16 px-2 md:px-4 relative transition-all ease-in-out duration-300 ${isActive ? 'text-gray-700 border-b-2 border-gray-700' : 'hover:text-gray-500 border-b-2 border-transparent hover:border-gray-700'}`
              }
            >
              <User size={24} className="text-black" />
            </NavLink>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute w-full z-30">
            <div className="flex flex-col py-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-6 py-3 font-cousine font-bold ${isActive ? 'text-gray-700 bg-gray-100' : 'text-gray-700'}` 
                }
                onClick={closeMobileMenu}
              >
                HOME
              </NavLink>
              <NavLink
                to="/Shop"
                className={({ isActive }) =>
                  `px-6 py-3 font-cousine font-bold ${isActive ? 'text-gray-700 bg-gray-100' : 'text-gray-700'}` 
                }
                onClick={closeMobileMenu}
              >
                SHOP
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `px-6 py-3 font-cousine font-bold ${isAboutActive ? 'text-gray-700 bg-gray-100' : 'text-gray-700'}` 
                }
                onClick={closeMobileMenu}
              >
                ABOUT US
              </NavLink>
              <div className="pl-6 bg-gray-50">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block px-6 py-2 text-gray-600 ${isActive ? 'font-semibold' : ''}` 
                  }
                  onClick={closeMobileMenu}
                >
                  Contact Us
                </NavLink>
                <NavLink
                  to="/FAQ"
                  className={({ isActive }) =>
                    `block px-6 py-2 text-gray-600 ${isActive ? 'font-semibold' : ''}` 
                  }
                  onClick={closeMobileMenu}
                >
                  FAQ
                </NavLink>
              </div>
              <NavLink
                to="/lookbook"
                className={({ isActive }) =>
                  `px-6 py-3 font-cousine font-bold ${isActive ? 'text-gray-700 bg-gray-100' : 'text-gray-700'}` 
                }
                onClick={closeMobileMenu}
              >
                LOOKBOOK
              </NavLink>
            </div>
          </div>
        )}
      </header>

      {/* Content with padding for fixed header */}
      <div className="flex-grow">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}

export default NavbarLayout;