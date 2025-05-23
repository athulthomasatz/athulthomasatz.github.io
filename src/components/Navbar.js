import React, { useState, useEffect } from "react"; 
import { animateScroll as scroll } from "react-scroll";
import { Link } from "react-scroll";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";
 
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible =
        prevScrollPos > currentScrollPos || currentScrollPos < 10;

      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${visible ? "" : "navbar-hidden"}`}>
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => scroll.scrollToTop()}>
          <div className="logo-image-container">
            <img
              src="/images/profile compress.jpeg"
              alt="Logo"
              className="logo-image"
            />
          </div>
        </div>
        <div className="nav-controls">
          <ul className={`nav-menu ${isOpen ? "active" : ""}`}> 
            <li style={{ "--i": 1 }}>
              <Link to="hero" spy={true} smooth={true} offset={-80} duration={500} onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li style={{ "--i": 2 }}>
              <Link
                to="about"
                smooth={true}
                duration={500}
                onClick={toggleMenu}
              >
                About
              </Link>
            </li>
            <li style={{ "--i": 3 }}>
              <Link
                to="projects"
                smooth={true}
                duration={500}
                onClick={toggleMenu}
              >
                Projects
              </Link>
            </li>
            <li style={{ "--i": 4 }}>
              <Link
                to="contact"
                smooth={true}
                duration={500}
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </li>
          </ul>
          <div className="nav-buttons">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <div className="theme-toggle-slider">
                <FaSun className="sun-icon" />
                <FaMoon className="moon-icon" />
                <div
                  className={`slider-circle ${
                    isDarkMode ? "slide-right" : "slide-left"
                  }`}
                />
              </div>
            </button>

            <div className="menu-icon" onClick={toggleMenu}>
              {isOpen ? <FaTimes /> : <FaBars />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
