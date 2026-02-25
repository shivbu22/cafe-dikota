import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import ScrollProgress from './components/ScrollProgress';
import SEO from './components/SEO';

// Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import CustomOrder from './pages/CustomOrder';
import FindUs from './pages/FindUs';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

export default function App() {
    return (
        <HelmetProvider>
            <ToastProvider>
                <CartProvider>
                    <Router>
                        <ScrollToTop />
                        <ScrollProgress />
                        <SEO />
                        <AppContent />
                    </Router>
                </CartProvider>
            </ToastProvider>
        </HelmetProvider>
    );
}

function AppContent() {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/admin');

    return (
        <div className="app-container">
            {!isAdmin && <Navbar />}
            <CartSidebar />
            <main className="content-wrapper">
                {/* Force re-mount on route change for CSS animation */}
                <div key={location.key} className="page-transition">
                    <Routes location={location}>
                        <Route path="/" element={<Home />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/custom-order" element={<CustomOrder />} />
                        <Route path="/find-us" element={<FindUs />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/admin" element={<Admin />} />
                    </Routes>
                </div>
            </main>
            {!isAdmin && <Footer />}
        </div>
    );
}
