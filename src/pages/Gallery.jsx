import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaSearch, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { RevealOnScroll } from '../hooks/useScrollReveal';

const galleryImages = [
    { id: 1, src: 'photo-1578985545062-69928b1d9587', category: 'Cakes', caption: 'Triple Chocolate Cake' },
    { id: 2, src: 'photo-1588195538326-c5b1e9f80a1b', category: 'Cakes', caption: 'Black Forest Delight' },
    { id: 3, src: 'photo-1517433670267-08bbd4be890f', category: 'Interiors', caption: 'Our Cozy Bakery' },
    { id: 4, src: 'photo-1606890737304-57a1ca8a5b62', category: 'Cakes', caption: 'Oreo Dream Cake' },
    { id: 5, src: 'photo-1509440159596-0249088772ff', category: 'Pastries', caption: 'Fresh Pastries' },
    { id: 6, src: 'photo-1464349095431-e9a21285b5f3', category: 'Cakes', caption: 'Blueberry Cake' },
    { id: 7, src: 'photo-1571115177098-cb88d3190afa', category: 'Cakes', caption: 'Butterscotch Cake' },
    { id: 8, src: 'photo-1616541823729-00fe0aacd32c', category: 'Cakes', caption: 'Red Velvet Cake' },
    { id: 9, src: 'photo-1551024601-bec78aea704b', category: 'Cakes', caption: 'Chocolate Fudge' },
    { id: 10, src: 'photo-1461023058943-07fcbe16d735', category: 'Interiors', caption: 'Coffee Corner' },
    { id: 11, src: 'photo-1568901346375-23c9450c58cd', category: 'Events', caption: 'Burger Special' },
    { id: 12, src: 'photo-1562440499-64c9a111f713', category: 'Cakes', caption: 'Marble Cake' },
];

const filterTabs = ['All', 'Cakes', 'Pastries', 'Interiors', 'Events'];

export default function Gallery() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [lightboxIndex, setLightboxIndex] = useState(null);

    const filtered = activeFilter === 'All' ? galleryImages : galleryImages.filter(img => img.category === activeFilter);

    const openLightbox = (idx) => setLightboxIndex(idx);
    const closeLightbox = () => setLightboxIndex(null);
    const prevImage = () => setLightboxIndex(prev => prev > 0 ? prev - 1 : filtered.length - 1);
    const nextImage = () => setLightboxIndex(prev => prev < filtered.length - 1 ? prev + 1 : 0);

    return (
        <>
            <Helmet>
                <title>Dakoti Bakers | Gallery</title>
                <meta name="description" content="Browse our gallery of artisan cakes, pastries, bakery interiors, and special events." />
            </Helmet>

            <div className="page-banner" style={{ paddingTop: '140px' }}>
                <h1 className="page-banner__title">Gallery</h1>
                <p className="page-banner__crumb"><Link to="/">Home</Link> › Gallery</p>
            </div>

            <section className="section section--light">
                <div className="container">
                    <div className="menu-tabs" style={{ position: 'static', background: 'transparent', borderBottom: 'none', marginBottom: '32px' }}>
                        {filterTabs.map(tab => (
                            <button
                                key={tab}
                                className={`menu-tab ${activeFilter === tab ? 'menu-tab--active' : ''}`}
                                onClick={() => setActiveFilter(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="gallery-grid">
                        {filtered.map((img, idx) => (
                            <RevealOnScroll key={img.id}>
                                <div className="gallery-item" onClick={() => openLightbox(idx)}>
                                    <img
                                        src={`https://images.unsplash.com/${img.src}?w=600&q=80`}
                                        alt={img.caption}
                                        style={{ height: idx % 3 === 0 ? '350px' : '250px', objectFit: 'cover' }}
                                    />
                                    <div className="gallery-item__overlay"><FaSearch /></div>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <div className="lightbox" onClick={closeLightbox}>
                    <button className="lightbox__close" onClick={closeLightbox} aria-label="Close"><FaTimes /></button>
                    <button className="lightbox__nav lightbox__nav--prev" onClick={e => { e.stopPropagation(); prevImage(); }} aria-label="Previous">
                        <FaChevronLeft />
                    </button>
                    <img
                        className="lightbox__img"
                        src={`https://images.unsplash.com/${filtered[lightboxIndex].src}?w=1200&q=90`}
                        alt={filtered[lightboxIndex].caption}
                        onClick={e => e.stopPropagation()}
                    />
                    <button className="lightbox__nav lightbox__nav--next" onClick={e => { e.stopPropagation(); nextImage(); }} aria-label="Next">
                        <FaChevronRight />
                    </button>
                </div>
            )}
        </>
    );
}
