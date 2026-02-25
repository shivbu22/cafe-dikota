import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaPhone, FaBirthdayCake } from 'react-icons/fa';
import { locations } from '../data/locations';
import { RevealOnScroll } from '../hooks/useScrollReveal';

export default function FindUs() {
    return (
        <>
            <Helmet>
                <title>Dakoti Bakers | Find Us</title>
                <meta name="description" content="Visit Dakoti Bakers at our two Greater Noida locations — Alpha 1 and Beta 1. Open 10 AM – 10 PM daily." />
            </Helmet>

            <div className="page-banner" style={{ paddingTop: '140px' }}>
                <h1 className="page-banner__title">Two Stores, One Love</h1>
                <p className="page-banner__crumb"><Link to="/">Home</Link> › Find Us</p>
            </div>

            <section className="section section--light">
                <div className="container">
                    <div className="grid grid--2">
                        {locations.map(loc => (
                            <RevealOnScroll key={loc.id}>
                                <div className="location-card">
                                    <h3 className="location-card__name">{loc.name}</h3>
                                    <div className="location-card__detail">
                                        <FaMapMarkerAlt /> <span>{loc.address}</span>
                                    </div>
                                    <div className="location-card__detail">
                                        <FaClock /> <span>{loc.hours} · {loc.daysOpen}</span>
                                    </div>
                                    <div className="location-card__detail">
                                        <FaBirthdayCake /> <span>Est. {loc.established}{loc.isLegacy ? ' — Legacy Store' : ''}</span>
                                    </div>
                                    <div className="location-card__detail">
                                        <FaPhone /> <span>{loc.phone}</span>
                                    </div>
                                    <div className="location-card__actions">
                                        <a href={loc.gmapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--small">
                                            Open in Maps
                                        </a>
                                        <a href={`tel:${loc.phone.replace(/\s/g, '')}`} className="btn btn--secondary btn--small">Call Now</a>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>

                    <RevealOnScroll>
                        <div className="map-embed" style={{ marginTop: '48px' }}>
                            <iframe
                                title="Dakoti Bakers Locations"
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14032.7!2d77.5068!3d28.4852!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sDakoti+Bakers!5e0!3m2!1sen!2sin!4v1700000000000"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </RevealOnScroll>
                </div>
            </section>
        </>
    );
}
