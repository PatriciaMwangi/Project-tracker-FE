import React from 'react';
import './styles.css';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h4 className="footer-title">Stay updated on Moringa School students projects</h4>
                        <form className="newsletter-form">
                            <input type="email" className="form-control" placeholder="Your email address" />
                            <button type="submit" className="btn btn-primary">Subscribe to newsletter</button>
                        </form>
                    </div>
                    <div className="col-md-2">
                        <h5 className="footer-heading">About</h5>
                        <ul className="footer-links">
                            <li><a href="#">Our Story</a></li>
                            <li><a href="#">Mission</a></li>
                            <li><a href="#">Team</a></li>
                        </ul>
                    </div>
                    <div className="col-md-2">
                        <h5 className="footer-heading">Legal</h5>
                        <ul className="footer-links">
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Use</a></li>
                        </ul>
                    </div>
                    <div className="col-md-2">
                        <h5 className="footer-heading">Get in Touch</h5>
                        <ul className="footer-links">
                            <li><a href="#">Contact</a></li>
                            <li><a href="#">Support</a></li>
                        </ul>
                    </div>
                    <div className="col-md-2">
                        <h5 className="footer-heading">Follow Us</h5>
                        <ul className="footer-social">
                            <li><a href="#"><i className="fab fa-facebook"></i></a></li>
                            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                            <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center mt-4">
                        <p>&copy; 2024 ProjectTracker. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
