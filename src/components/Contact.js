import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaCopy,
  FaCheck,
  FaGithub,
  FaLinkedin,
  FaDownload,
} from "react-icons/fa";
import { SiDatacamp, SiCodeforces } from "react-icons/si";
import ThemeSwitcher from "./ThemeSwitcher";
import "./Contacts.css";

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const emailAddress = "thomasathul089@gmail.com"; // Replace with your email

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
const handleDownloadCV = () => {
    const cvUrl = `${process.env.PUBLIC_URL}/assets/Resume athul thomas.pdf`;
    window.open(cvUrl, '_blank');
};
  const socialLinks = [
    {
      name: "GitHub",
      icon: <FaGithub />,
      url: "https://github.com/athulthomasatz",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      url: "https://linkedin.com/in/athulthomasatz",
    },
    {
      name: "DataCamp",
      icon: <SiDatacamp />,
      url: "https://www.datacamp.com/portfolio/thomasathul089",
    },
    {
      name: "CodeForces",
      icon: <SiCodeforces />,
      url: "https://codeforces.com/profile/athulthomas23",
    },
  ];

  return (
    <section id="contact" className="contact-section">
      <motion.div
        className="contact-container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Get in Touch
        </motion.h2>
        <motion.p
          className="contact-description"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          I'm always open to new opportunities and collaborations. Feel free to
          reach out!
        </motion.p>

        <motion.div
          className="email-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <FaEnvelope className="email-icon" />
          <span className="email-text">{emailAddress}</span>
          <button
            className="copy-button"
            onClick={handleCopyEmail}
            aria-label="Copy email address"
          >
            {copied ? <FaCheck /> : <FaCopy />}
          </button>
          <button
            className="download-cv-button"
            onClick={handleDownloadCV}
            aria-label="Download CV"
          >
            <FaDownload />
            <span>Download CV</span>
          </button>
        </motion.div>

        <motion.div
          className="social-links"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.icon}
              <span className="social-name">{link.name}</span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
      <ThemeSwitcher />
    </section>
  );
};

export default Contact;
