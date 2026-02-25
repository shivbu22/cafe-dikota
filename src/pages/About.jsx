import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaHeart, FaLeaf, FaUsers } from 'react-icons/fa';
import { RevealOnScroll } from '../hooks/useScrollReveal';

const timeline = [
    { year: '2002', text: 'First store opens in Beta 1, Greater Noida. A small bakery with big dreams.' },
    { year: '2019', text: 'Alpha 1 store opens to serve more of Greater Noida with fresh cakes and treats.' },
    { year: '2024+', text: 'Expanding offerings, growing a loyal community, and continuing the legacy of handcrafted goodness.' },
];

const values = [
    { icon: <FaHeart />, title: 'Quality', desc: 'Every ingredient is carefully selected. We never compromise on the quality of our baked goods.' },
    { icon: <FaLeaf />, title: 'Freshness', desc: 'Baked fresh daily — nothing sits on our shelf for long. From oven to you, always fresh.' },
    { icon: <FaUsers />, title: 'Community', desc: 'We are a neighbourhood bakery at heart. Our customers are family, and every visit feels like home.' },
];

const team = [
    { name: 'Founder', role: 'Head Baker & Owner', initials: 'DK' },
    { name: 'Head Chef', role: 'Cake Specialist', initials: 'HC' },
    { name: 'Manager', role: 'Operations Lead', initials: 'MG' },
];

export default function About() {
    return (
        <>
            <Helmet>
                <title>Dakoti Bakers | About Us</title>
                <meta name="description" content="Learn the story of Dakoti Bakers — from a small bakery in Beta 1 in 2002 to Greater Noida's beloved two-location institution." />
            </Helmet>

            <div className="page-banner" style={{ paddingTop: '140px' }}>
                <h1 className="page-banner__title">About Us</h1>
                <p className="page-banner__crumb"><Link to="/">Home</Link> › About</p>
            </div>

            {/* Timeline */}
            <section className="section section--dark">
                <div className="container" style={{ maxWidth: '700px' }}>
                    <RevealOnScroll>
                        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                            <p className="section__eyebrow">Our Journey</p>
                            <h2 className="section__title" style={{ color: '#FDF8F2' }}>From One Store to a Legacy</h2>
                        </div>
                    </RevealOnScroll>
                    <div className="timeline">
                        {timeline.map((item, i) => (
                            <RevealOnScroll key={i}>
                                <div className="timeline__item">
                                    <div className="timeline__dot" />
                                    <div className="timeline__year">{item.year}</div>
                                    <p className="timeline__text">{item.text}</p>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section section--light">
                <div className="container">
                    <RevealOnScroll>
                        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                            <h2 className="section__title" style={{ color: '#2C1503' }}>What We Believe</h2>
                        </div>
                    </RevealOnScroll>
                    <div className="grid grid--3 stagger">
                        {values.map((val, i) => (
                            <RevealOnScroll key={i}>
                                <div className="value-card">
                                    <div className="value-card__icon">{val.icon}</div>
                                    <h3 className="value-card__title">{val.title}</h3>
                                    <p className="value-card__desc">{val.desc}</p>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="section section--dark">
                <div className="container">
                    <RevealOnScroll>
                        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                            <p className="section__eyebrow">The People</p>
                            <h2 className="section__title" style={{ color: '#FDF8F2' }}>Meet the Team</h2>
                        </div>
                    </RevealOnScroll>
                    <div className="grid grid--3 stagger" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        {team.map((member, i) => (
                            <RevealOnScroll key={i}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        width: '100px', height: '100px', borderRadius: '50%', margin: '0 auto 16px',
                                        background: 'linear-gradient(135deg, #C8843A, #7B3F1E)', display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', fontSize: '28px', fontFamily: 'var(--font-brand)', color: '#FDF8F2',
                                    }}>
                                        {member.initials}
                                    </div>
                                    <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '18px', color: '#FDF8F2', marginBottom: '4px' }}>
                                        {member.name}
                                    </h4>
                                    <p style={{ fontSize: '13px', color: '#C8843A', opacity: 0.7 }}>{member.role}</p>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
