import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaMapMarkerAlt, FaPhone, FaClock, FaEnvelope, FaCheck } from 'react-icons/fa';
import { locations } from '../data/locations';
import { RevealOnScroll } from '../hooks/useScrollReveal';
import { api } from '../api';
import { useToast } from '../context/ToastContext';
import SEO from '../components/SEO';

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { addToast } = useToast();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            await api.sendMessage(data);
            setSubmitted(true);
            addToast('Message sent! We will get back to you soon.', 'success');
        } catch (error) {
            console.error('Error sending message:', error);
            addToast('Failed to send message. Please try again or call us.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <SEO
                title="Contact Us"
                description="Get in touch with Dakoti Bakers. Visit our Alpha 1 or Beta 1 store, call us, or send a message."
            />

            <div className="page-banner" style={{ paddingTop: '140px' }}>
                <h1 className="page-banner__title">Contact Us</h1>
                <p className="page-banner__crumb">Home › Contact</p>
            </div>

            <section className="section section--light">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Form */}
                        <RevealOnScroll>
                            {submitted ? (
                                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                                    <div className="success-check"><FaCheck /></div>
                                    <h3 className="text-heading" style={{ fontSize: '24px', color: '#2C1503', marginBottom: '12px' }}>Message Sent!</h3>
                                    <p style={{ color: '#4A2408', marginBottom: '24px' }}>We'll get back to you soon. Thank you for reaching out!</p>
                                    <button className="btn btn--primary" onClick={() => setSubmitted(false)}>Send Another</button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <h3 className="text-heading" style={{ fontSize: '24px', color: '#2C1503', marginBottom: '24px' }}>Send Us a Message</h3>
                                    <div className="grid grid--2">
                                        <div className="form-group">
                                            <label className="label">Name *</label>
                                            <input className="input" placeholder="Your name" {...register('name', { required: 'Required' })} />
                                            {errors.name && <span style={{ color: '#9B2335', fontSize: '12px' }}>{errors.name.message}</span>}
                                        </div>
                                        <div className="form-group">
                                            <label className="label">Phone</label>
                                            <input className="input" placeholder="+91 98765 43210" {...register('phone')} />
                                        </div>
                                    </div>
                                    <div className="form-group" style={{ marginTop: '16px' }}>
                                        <label className="label">Email *</label>
                                        <input className="input" type="email" placeholder="you@example.com" {...register('email', { required: 'Required' })} />
                                        {errors.email && <span style={{ color: '#9B2335', fontSize: '12px' }}>{errors.email.message}</span>}
                                    </div>
                                    <div className="form-group" style={{ marginTop: '16px' }}>
                                        <label className="label">Subject</label>
                                        <input className="input" placeholder="What's this about?" {...register('subject')} />
                                    </div>
                                    <div className="form-group" style={{ marginTop: '16px' }}>
                                        <label className="label">Message *</label>
                                        <textarea className="input" style={{ height: '120px' }} placeholder="Tell us what you need…" {...register('message', { required: 'Required' })} />
                                        {errors.message && <span style={{ color: '#9B2335', fontSize: '12px' }}>{errors.message.message}</span>}
                                    </div>
                                    <button type="submit" className="btn btn--primary" style={{ marginTop: '24px', width: '100%' }} disabled={isSubmitting}>
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            )}
                        </RevealOnScroll>

                        {/* Info Card */}
                        <RevealOnScroll>
                            <div className="contact-info-card">
                                <h3 className="text-heading" style={{ fontSize: '20px', color: '#FDF8F2', marginBottom: '20px' }}>Get in Touch</h3>

                                {locations.map(loc => (
                                    <div key={loc.id} className="contact-info-card__item">
                                        <FaMapMarkerAlt className="contact-info-card__icon" />
                                        <div>
                                            <strong style={{ color: '#FDF8F2', display: 'block', marginBottom: '4px' }}>{loc.name}</strong>
                                            <span style={{ fontSize: '13px', opacity: 0.7 }}>{loc.address}</span>
                                        </div>
                                    </div>
                                ))}

                                <div className="contact-info-card__item">
                                    <FaPhone className="contact-info-card__icon" />
                                    <div>
                                        <a href="tel:+919599255565" style={{ display: 'block', color: '#C8843A' }}>+91 95992 55565</a>
                                        <a href="tel:+919599255564" style={{ display: 'block', color: '#C8843A' }}>+91 95992 55564</a>
                                    </div>
                                </div>

                                <div className="contact-info-card__item">
                                    <FaClock className="contact-info-card__icon" />
                                    <div>
                                        <span>10:00 AM – 10:00 PM</span><br />
                                        <span style={{ fontSize: '13px', opacity: 0.6 }}>Open all days</span>
                                    </div>
                                </div>

                                <div className="contact-info-card__item">
                                    <FaEnvelope className="contact-info-card__icon" />
                                    <span>info@dakotibakers.com</span>
                                </div>

                                <div className="map-embed" style={{ marginTop: '20px', height: '200px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <iframe
                                        title="Dakoti Bakers Map"
                                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14032.7!2d77.5068!3d28.4852!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sDakoti+Bakers!5e0!3m2!1sen!2sin"
                                        allowFullScreen
                                        loading="lazy"
                                        style={{ filter: 'invert(90%) hue-rotate(180deg)' }}
                                    />
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </section>
        </>
    );
}
