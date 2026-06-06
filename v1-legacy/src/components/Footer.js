import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-left">
                    <p className="copyright">
                        © {new Date().getFullYear()} Athul Thomas. All rights reserved.
                    </p>
                </div>
                <div className="footer-right">
                    <div className="location">
                        <FaMapMarkerAlt className="location-icon" />
                        <h3>Calicut</h3>
                        <div className="location-text">
                            
                            <p>Kerala, India</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;