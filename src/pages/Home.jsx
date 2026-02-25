import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaBirthdayCake, FaHamburger, FaCoffee, FaStar, FaStarHalfAlt, FaChevronDown, FaMapMarkerAlt, FaClock, FaPhone, FaSearch } from 'react-icons/fa';
import { bestsellers } from '../data/menu';
import { locations } from '../data/locations';
import { reviews } from '../data/reviews';
import { useScrollReveal, RevealOnScroll } from '../hooks/useScrollReveal';
import { useCart } from '../context/CartContext';

function StarRating({ count }) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < Math.floor(count)) stars.push(<FaStar key={i} />);
        else if (i < count) stars.push(<FaStarHalfAlt key={i} />);
        else stars.push(<FaStar key={i} style={{ opacity: 0.2 }} />);
    }
    return <div className="review-card__stars">{stars}</div>;
}

export default function Home() {
    const { addItem } = useCart();

    return (
        <>
            <Helmet>
                <title>Dakoti Bakers | Baked with Soul. Loved by All.</title>
                <meta name="description" content="Dakoti Bakers — Greater Noida's beloved bakery since 2002. Artisan cakes, pastries, burgers & more. Two locations: Alpha 1 & Beta 1." />
            </Helmet>

            {/* === HERO === */}
            <section className="hero">
                <div className="hero__bg" style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1920&q=80')`,
                }} />
                <div className="hero__grain" />
                <div className="hero__content">
                    <p className="hero__tag">Since 2002 · Greater Noida's Beloved Bakery</p>
                    <h1 className="hero__title">Baked with Soul.<br />Loved by All.</h1>
                    <p className="hero__subtitle">
                        Cakes, pastries, and more — crafted fresh daily at our Alpha 1 &amp; Beta 1 stores.
                    </p>
                    <div className="hero__cta">
                        <Link to="/menu" className="btn btn--primary">Explore Our Menu</Link>
                        <Link to="/order" className="btn btn--ghost">Order a Cake</Link>
                    </div>
                </div>
                <div className="hero__scroll"><FaChevronDown /></div>
            </section>

            {/* === WHAT WE DO === */}
            <section className="section section--dark">
                <div className="container">
                    <RevealOnScroll>
                        <div className="grid grid--3 stagger">
                            <div className="icon-card reveal">
                                <div className="icon-card__icon"><FaBirthdayCake /></div>
                                <h3 className="icon-card__title">Artisan Cakes</h3>
                                <p className="icon-card__desc">Custom cakes for every occasion, baked fresh with the finest ingredients.</p>
                            </div>
                            <div className="icon-card reveal">
                                <div className="icon-card__icon"><FaHamburger /></div>
                                <h3 className="icon-card__title">Quick Bites</h3>
                                <p className="icon-card__desc">Burgers, sandwiches, and wraps for everyday cravings.</p>
                            </div>
                            <div className="icon-card reveal">
                                <div className="icon-card__icon"><FaCoffee /></div>
                                <h3 className="icon-card__title">Hot Beverages</h3>
                                <p className="icon-card__desc">Coffee, tea & fresh juices to pair with your favourite treat.</p>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* === BESTSELLERS === */}
            <section className="section section--light">
                <div className="container">
                    <RevealOnScroll>
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <h2 className="section__title" style={{ color: '#2C1503' }}>Crowd Favourites</h2>
                            <p className="section__subtitle">Rated 4.0+ across Greater Noida</p>
                        </div>
                    </RevealOnScroll>
                    <div className="bestseller-row">
                        {bestsellers.map(item => (
                            <div key={item.id} className="card">
                                <img
                                    className="card__image"
                                    src={`https://images.unsplash.com/photo-${item.name.includes('Red Velvet') ? '1616541823729-00fe0aacd32c' : item.name.includes('Oreo') ? '1606890737304-57a1ca8a5b62' : item.name.includes('Blueberry') ? '1464349095431-e9a21285b5f3' : item.name.includes('Butterscotch') ? '1571115177098-cb88d3190afa' : item.name.includes('Triple') ? '1578985545062-69928b1d9587' : '1588195538326-c5b1e9f80a1b'}?w=400&q=80`}
                                    alt={item.name}
                                />
                                <div className="card__body">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                        <span className="veg-dot" />
                                        <span className="card__title">{item.name}</span>
                                    </div>
                                    <p className="card__desc">{item.description}</p>
                                    <div className="card__footer">
                                        <span className="card__price">₹{item.price}</span>
                                        <button className="btn btn--primary btn--small" onClick={() => addItem(item)}>Order Now</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === ABOUT SNAPSHOT === */}
            <section className="section section--dark">
                <div className="container">
                    <RevealOnScroll>
                        <div className="about-split">
                            <img
                                className="about-split__image"
                                src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=600&q=80"
                                alt="Dakoti Bakers Interior"
                            />
                            <div>
                                <p className="section__eyebrow">Our Story</p>
                                <h2 className="section__title" style={{ color: '#FDF8F2' }}>Over Two Decades of Sweetness</h2>
                                <p style={{ color: 'rgba(200,132,58,0.6)', fontSize: '15px', lineHeight: 1.7, marginBottom: '32px' }}>
                                    What started in Beta 1 back in 2002 has grown into a beloved two-outlet institution across Greater Noida. Every cake is baked fresh, every pastry handcrafted, and every visit made to feel like home.
                                </p>
                                <div className="about-split__stats">
                                    <div>
                                        <div className="about-split__stat-value">23+</div>
                                        <div className="about-split__stat-label">Years</div>
                                    </div>
                                    <div>
                                        <div className="about-split__stat-value">4.0</div>
                                        <div className="about-split__stat-label">Rating</div>
                                    </div>
                                    <div>
                                        <div className="about-split__stat-value">2</div>
                                        <div className="about-split__stat-label">Locations</div>
                                    </div>
                                    <div>
                                        <div className="about-split__stat-value">₹300</div>
                                        <div className="about-split__stat-label">For Two</div>
                                    </div>
                                </div>
                                <div style={{ marginTop: '32px' }}>
                                    <Link to="/about" className="btn btn--ghost">Read Our Full Story →</Link>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* === FIND A STORE === */}
            <section className="section section--parchment">
                <div className="container">
                    <RevealOnScroll>
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <h2 className="section__title" style={{ color: '#2C1503' }}>Find a Store</h2>
                        </div>
                    </RevealOnScroll>
                    <div className="grid grid--2 stagger">
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
                                        <FaBirthdayCake /> <span>Est. {loc.established}{loc.isLegacy ? ' (Legacy Store)' : ''}</span>
                                    </div>
                                    {loc.phone && (
                                        <div className="location-card__detail">
                                            <FaPhone /> <span>{loc.phone}</span>
                                        </div>
                                    )}
                                    <div className="location-card__actions">
                                        <a href={loc.gmapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--small">Get Directions →</a>
                                        {loc.phone && (
                                            <a href={`tel:${loc.phone.replace(/\s/g, '')}`} className="btn btn--secondary btn--small">Call Now</a>
                                        )}
                                    </div>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* === GALLERY TEASER === */}
            <section className="section section--dark">
                <div className="container">
                    <RevealOnScroll>
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <h2 className="section__title" style={{ color: '#FDF8F2' }}>From Our Kitchen</h2>
                        </div>
                    </RevealOnScroll>
                    <div className="grid grid--3 stagger" style={{ maxHeight: '500px', overflow: 'hidden' }}>
                        {[
                            'photo-1578985545062-69928b1d9587',
                            'photo-1588195538326-c5b1e9f80a1b',
                            'photo-1606890737304-57a1ca8a5b62',
                            'photo-1464349095431-e9a21285b5f3',
                            'photo-1571115177098-cb88d3190afa',
                            'photo-1616541823729-00fe0aacd32c',
                        ].map((img, i) => (
                            <div key={i} className="gallery-item reveal">
                                <img src={`https://images.unsplash.com/${img}?w=400&q=80`} alt="Gallery" />
                                <div className="gallery-item__overlay"><FaSearch /></div>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '40px' }}>
                        <Link to="/gallery" className="btn btn--ghost">View Gallery →</Link>
                    </div>
                </div>
            </section>

            {/* === REVIEWS === */}
            <section className="section section--light">
                <div className="container">
                    <RevealOnScroll>
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <h2 className="section__title" style={{ color: '#2C1503' }}>What Greater Noida Says</h2>
                        </div>
                    </RevealOnScroll>
                    <div className="grid grid--3 stagger">
                        {reviews.map(review => (
                            <RevealOnScroll key={review.id}>
                                <div className="review-card">
                                    <p className="review-card__quote">"{review.text}"</p>
                                    <StarRating count={review.stars} />
                                    <p className="review-card__author">{review.author} · {review.source}</p>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
