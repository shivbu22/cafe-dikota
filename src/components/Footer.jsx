import { Link } from 'react-router-dom';
import { FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__grid">
                    {/* Column 1 — Brand */}
                    <div>
                        <div className="footer__logo">Dakoti Bakers</div>
                        <p className="footer__tagline">
                            Baked with Soul. Loved by All.<br />
                            Greater Noida's beloved bakery since 2002. Artisan cakes, pastries, and everyday treats crafted fresh daily.
                        </p>
                        <div className="footer__social">
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="footer__social-icon" aria-label="Instagram">
                                <FaInstagram />
                            </a>
                            <a href="https://maps.google.com/?q=Dakoti+Bakers+Greater+Noida" target="_blank" rel="noopener noreferrer" className="footer__social-icon" aria-label="Google Maps">
                                <FaMapMarkerAlt />
                            </a>
                        </div>
                    </div>

                    {/* Column 2 — Quick Links */}
                    <div>
                        <h4 className="footer__heading">Quick Links</h4>
                        <Link to="/" className="footer__link">Home</Link>
                        <Link to="/menu" className="footer__link">Our Menu</Link>
                        <Link to="/order" className="footer__link">Order a Cake</Link>
                        <Link to="/gallery" className="footer__link">Gallery</Link>
                        <Link to="/about" className="footer__link">About Us</Link>
                        <Link to="/contact" className="footer__link">Contact</Link>
                    </div>

                    {/* Column 3 — Store Hours */}
                    <div>
                        <h4 className="footer__heading">Store Hours</h4>
                        <p className="footer__link">Monday – Sunday</p>
                        <p className="footer__link">10:00 AM – 10:00 PM</p>
                        <p className="footer__link" style={{ marginTop: '12px', opacity: 0.4, fontSize: '12px' }}>Both outlets</p>
                    </div>

                    {/* Column 4 — Contact */}
                    <div>
                        <h4 className="footer__heading">Get in Touch</h4>
                        <a href="tel:+919599255565" className="footer__link">+91 95992 55565</a>
                        <a href="tel:+919599255564" className="footer__link">+91 95992 55564</a>
                        <p className="footer__link" style={{ marginTop: '8px' }}>Alpha 1 & Beta 1</p>
                        <p className="footer__link">Greater Noida — 201310</p>
                    </div>
                </div>

                <div className="footer__bottom">
                    © 2025 Dakoti Bakers · Greater Noida. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
