import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { categories, allMenuItems as staticMenu } from '../data/menu';
import { RevealOnScroll } from '../hooks/useScrollReveal';
import { api } from '../api';
import SEO from '../components/SEO';

function MenuSkeleton() {
    return (
        <div className="grid grid--3">
            {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="card" style={{ height: '240px' }}>
                    <div className="card__body skeleton" style={{ height: '100%', border: 'none' }} />
                </div>
            ))}
        </div>
    );
}

export default function Menu() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [menuItems, setMenuItems] = useState(staticMenu);
    const [loading, setLoading] = useState(true);
    const { addItem } = useCart();
    const { addToast } = useToast();

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const data = await api.getMenu();
                if (data && data.length > 0) {
                    setMenuItems(data);
                }
            } catch (error) {
                console.error('Error fetching menu:', error);
                addToast('Showing offline menu', 'info');
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, [addToast]);

    const filtered = activeCategory === 'All'
        ? menuItems
        : menuItems.filter(item => item.category === activeCategory);

    const handleAddToCart = (item) => {
        addItem(item);
        addToast(`${item.name} added to cart!`, 'success');
    };

    return (
        <>
            <SEO
                title="Menu"
                description="Explore our delicious collection of artisanal cakes, pastries, burgers, and beverages. Freshly baked every day."
            />

            <div className="page-banner" style={{ paddingTop: '140px' }}>
                <h1 className="page-banner__title">Our Menu</h1>
                <p className="page-banner__crumb">Home › Menu</p>
            </div>

            <section className="section section--light">
                <div className="container">
                    <div className="menu-tabs">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`menu-tab ${activeCategory === cat ? 'menu-tab--active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {loading ? <MenuSkeleton /> : (
                        <div className="grid grid--3">
                            {filtered.map(item => (
                                <RevealOnScroll key={item.id || item._id}>
                                    <div className="card">
                                        <div className="card__body">
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                                {item.isVeg !== undefined && <span className={`veg-dot ${item.isVeg ? '' : 'veg-dot--non'}`} />}
                                                <h3 className="card__title">{item.name}</h3>
                                            </div>
                                            <p className="card__desc">{item.description}</p>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                                                <span className="card__price">₹{item.price}</span>
                                                <button
                                                    className="btn btn--primary btn--sm"
                                                    onClick={() => handleAddToCart(item)}
                                                >
                                                    Add +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
