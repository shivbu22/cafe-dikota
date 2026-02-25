import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaBirthdayCake, FaCalendarAlt, FaUser, FaCheck, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { cakes } from '../data/menu';
import { locations } from '../data/locations';
import { RevealOnScroll } from '../hooks/useScrollReveal';
import { api } from '../api';
import { useToast } from '../context/ToastContext';
import SEO from '../components/SEO';

const weights = ['0.5 kg', '1 kg', '1.5 kg', '2 kg', 'Custom'];
const occasions = ['Birthday', 'Anniversary', 'Wedding', 'Corporate', 'Other'];

export default function CustomOrder() {
    const [step, setStep] = useState(1);
    const [selectedCake, setSelectedCake] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { addToast } = useToast();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const orderData = {
                ...data,
                cakeType: selectedCake || data.cakeType,
                customer: data.name
            };
            await api.submitOrder(orderData);
            setIsSubmitted(true);
            addToast('Order submitted successfully! We will contact you soon.', 'success');
        } catch (error) {
            console.error('Error submitting order:', error);
            addToast('Failed to submit order. Please try again or call us.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="section section--light" style={{ paddingTop: '160px', minHeight: '80vh', textAlign: 'center' }}>
                <div className="container">
                    <div className="success-check">
                        <FaCheck />
                    </div>
                    <h2 className="section__title">Order Received!</h2>
                    <p className="section__subtitle">Thank you for choosing Dakoti Bakers. Our team will call you within 2 hours to confirm details and pricing.</p>
                    <button className="btn btn--primary" onClick={() => window.location.href = '/'}>Back to Home</button>
                </div>
            </div>
        );
    }

    return (
        <>
            <SEO
                title="Custom Cake Order"
                description="Design your dream cake with Dakoti Bakers. Choose flavors, sizes, and occasions for your special day."
            />

            <div className="page-banner" style={{ paddingTop: '140px' }}>
                <h1 className="page-banner__title">Custom Order</h1>
                <p className="page-banner__crumb">Home › Custom Order</p>
            </div>

            <section className="section section--light">
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div className="step-indicator">
                        <div className={`step-dot ${step >= 1 ? 'step-dot--active' : ''} ${step > 1 ? 'step-dot--done' : ''}`}>
                            <div className="step-dot__circle">{step > 1 ? <FaCheck /> : '1'}</div>
                            <span className="step-dot__label">Design</span>
                        </div>
                        <div style={{ width: '60px', height: '2px', background: 'rgba(200,132,58,0.2)', marginTop: '20px' }} />
                        <div className={`step-dot ${step >= 2 ? 'step-dot--active' : ''} ${step > 2 ? 'step-dot--done' : ''}`}>
                            <div className="step-dot__circle">{step > 2 ? <FaCheck /> : '2'}</div>
                            <span className="step-dot__label">Details</span>
                        </div>
                        <div style={{ width: '60px', height: '2px', background: 'rgba(200,132,58,0.2)', marginTop: '20px' }} />
                        <div className={`step-dot ${step >= 3 ? 'step-dot--active' : ''}`}>
                            <div className="step-dot__circle">3</div>
                            <span className="step-dot__label">Contact</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="admin-card" style={{ background: 'var(--parchment)', borderColor: 'rgba(200,132,58,0.2)' }}>
                        {step === 1 && (
                            <RevealOnScroll>
                                <div className="form-step">
                                    <h3 className="card__title" style={{ color: 'var(--velvet-brown)', marginBottom: '24px' }}>Choose Your Base</h3>
                                    <div className="grid grid--2" style={{ gap: '12px' }}>
                                        {cakes.map(cake => (
                                            <div
                                                key={cake.name}
                                                className={`card ${selectedCake === cake.name ? 'border-primary' : ''}`}
                                                style={{ cursor: 'pointer', padding: '12px', border: selectedCake === cake.name ? '2px solid var(--caramel-gold)' : '1px solid rgba(0,0,0,0.1)' }}
                                                onClick={() => setSelectedCake(cake.name)}
                                            >
                                                <span style={{ fontWeight: 600, fontSize: '14px' }}>{cake.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ marginTop: '24px' }}>
                                        <label className="label">Or Describe Your Vision</label>
                                        <textarea
                                            className="input"
                                            placeholder="Tell us about the flavor, style, or theme..."
                                            {...register('cakeType')}
                                        ></textarea>
                                    </div>
                                    <button type="button" className="btn btn--primary" style={{ width: '100%', marginTop: '24px' }} onClick={() => setStep(2)}>
                                        Next Component <FaChevronRight />
                                    </button>
                                </div>
                            </RevealOnScroll>
                        )}

                        {step === 2 && (
                            <RevealOnScroll>
                                <div className="form-step">
                                    <h3 className="card__title" style={{ color: 'var(--velvet-brown)', marginBottom: '24px' }}>Cake Specifications</h3>
                                    <div className="grid grid--2">
                                        <div>
                                            <label className="label">Weight</label>
                                            <select className="input" {...register('weight', { required: true })}>
                                                {weights.map(w => <option key={w} value={w}>{w}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="label">Occasion</label>
                                            <select className="input" {...register('occasion')}>
                                                {occasions.map(o => <option key={o} value={o}>{o}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '16px' }}>
                                        <label className="label">Delivery/Pickup Date</label>
                                        <input type="date" className="input" {...register('date', { required: true })} />
                                    </div>
                                    <div style={{ marginTop: '16px' }}>
                                        <label className="label">Message on Cake</label>
                                        <input type="text" className="input" placeholder="e.g. Happy Birthday Rahul!" {...register('message')} />
                                    </div>
                                    <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                        <button type="button" className="btn btn--secondary" style={{ flex: 1 }} onClick={() => setStep(1)}>
                                            <FaChevronLeft /> Back
                                        </button>
                                        <button type="button" className="btn btn--primary" style={{ flex: 1 }} onClick={() => setStep(3)}>
                                            Next <FaChevronRight />
                                        </button>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        )}

                        {step === 3 && (
                            <RevealOnScroll>
                                <div className="form-step">
                                    <h3 className="card__title" style={{ color: 'var(--velvet-brown)', marginBottom: '24px' }}>Your Contact Details</h3>
                                    <div>
                                        <label className="label">Full Name</label>
                                        <input type="text" className="input" {...register('name', { required: true })} />
                                    </div>
                                    <div style={{ marginTop: '16px' }}>
                                        <label className="label">Phone Number</label>
                                        <input type="tel" className="input" {...register('phone', { required: true })} />
                                    </div>
                                    <div style={{ marginTop: '16px' }}>
                                        <label className="label">Preferred Store</label>
                                        <select className="input" {...register('location')}>
                                            {locations.map(loc => <option key={loc.id} value={loc.name}>{loc.name}</option>)}
                                        </select>
                                    </div>
                                    <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                        <button type="button" className="btn btn--secondary" style={{ flex: 1 }} onClick={() => setStep(2)}>
                                            <FaChevronLeft /> Back
                                        </button>
                                        <button type="submit" className="btn btn--primary" style={{ flex: 1 }} disabled={isSubmitting}>
                                            {isSubmitting ? 'Submitting...' : 'Place Order'}
                                        </button>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        )}
                    </form>
                </div>
            </section>
        </>
    );
}
