import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPalette } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import './ThemeSwitcher.css';

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { changeTheme, themes, currentTheme } = useTheme();

  const handleThemeChange = (themeName) => {
    changeTheme(themeName);
    setIsOpen(false);
  };

  return (
    <div className="theme-switcher">
      <motion.button
        className="theme-switcher-btn"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaPalette />
      </motion.button>

      <motion.div
        className={`theme-options ${isOpen ? 'open' : ''}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
        transition={{ duration: 0.2 }}
      >
        {Object.keys(themes).map((themeName) => (
          <motion.button
            key={themeName}
            className={`theme-option ${currentTheme === themeName ? 'active' : ''}`}
            onClick={() => handleThemeChange(themeName)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: themes[themeName].background,
              border: `2px solid ${themes[themeName].accent}`
            }}
          >
            <span style={{ color: themes[themeName].text }}>{themeName}</span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default ThemeSwitcher;