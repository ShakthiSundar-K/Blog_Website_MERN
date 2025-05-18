import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
  const profileRef = useRef(null);
  const menuRef = useRef(null);

  // Get user from session storage
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("user")) || {
      name: "JD",
      email: "user@example.com",
    };
    setUser(userData);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        window.innerWidth < 768
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Navigation links
  const navLinks = [
    { name: "Home", path: "/", active: true },
    { name: "Create Blog", path: "/create" },
    { name: "My Blogs", path: "/my-blogs" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center'>
          {/* Mobile: Hamburger Menu */}
          <div className='flex md:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='text-charcoal-800 focus:outline-none'
              aria-label='Toggle menu'
            >
              {isMenuOpen ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Logo - Left on all devices */}
          <div className='flex items-center'>
            <Logo size='small' />
          </div>

          {/* Desktop: Navigation Links - Pushed to right */}
          <div className='hidden md:flex items-center ml-auto'>
            <div className='flex space-x-8'>
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => navigate(link.path)}
                  className={`relative font-medium text-base transition-all duration-200 ${
                    link.active
                      ? "text-teal-500"
                      : "text-charcoal-800/70 hover:text-teal-500"
                  } hover:scale-105`}
                >
                  {link.name}
                  {link.active && (
                    <span className='absolute -bottom-1.5 left-0 w-full h-0.5 bg-teal-500 rounded-full'></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Profile Dropdown - Right */}
          <div className='flex items-center ml-8' ref={profileRef}>
            <div className='relative'>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className='flex items-center focus:outline-none'
                aria-label='Open user menu'
              >
                <div className='w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-coral-500 flex items-center justify-center text-white font-medium shadow-md'>
                  {user.name?.substring(0, 2) || "JD"}
                </div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className={`h-5 w-5 ml-1 text-charcoal-800/70 transition-transform duration-200 ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>

              {/* Simplified Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className='absolute right-0 mt-2 w-64 rounded-md shadow-lg py-3 bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fadeIn px-4'>
                  <div className='flex flex-col'>
                    <p className='text-sm font-medium text-charcoal-800'>
                      {user.name || "John Doe"}
                    </p>
                    <p className='text-sm text-charcoal-800/70 mt-1'>
                      {user.email || "john.doe@example.com"}
                    </p>
                  </div>
                  <div className='border-t border-gray-100 mt-3 pt-2'></div>
                  <button
                    onClick={() => {
                      sessionStorage.removeItem("user");
                      navigate("/login");
                      setIsProfileOpen(false);
                    }}
                    className='w-full text-left px-2 py-2 text-sm text-coral-500 hover:bg-coral-500/10 transition-colors rounded'
                  >
                    <div className='flex items-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4 mr-2'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                        />
                      </svg>
                      Logout
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`md:hidden transition-all duration-300 ease-in-out transform ${
          isMenuOpen
            ? "max-h-screen opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        } overflow-hidden bg-white shadow-lg absolute w-full left-0`}
      >
        <div className='px-4 py-2 space-y-1 border-t'>
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                navigate(link.path);
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium transition-colors ${
                link.active
                  ? "text-teal-500 bg-teal-500/10"
                  : "text-charcoal-800/70 hover:bg-teal-500/5 hover:text-teal-500"
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
