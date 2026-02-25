import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'Order a Cake', path: '/order' },
    { label: 'Find Us', path: '/find-us' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [location]);

    return (
        <>
            <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
                <div className="navbar__inner">
                    <Link to="/" className="navbar__logo">Dakoti Bakers</Link>

                    <div className="navbar__links">
                        {navLinks.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link to="/order" className="btn btn--primary btn--small">Order Now</Link>
                    </div>

                    <button
                        className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            <div className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`}>
                {navLinks.map(link => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
                    >
                        {link.label}
                    </Link>
                ))}
                <Link to="/order" className="btn btn--primary" style={{ marginTop: '16px' }}>Order Now</Link>
            </div>
        </>
    );
}
