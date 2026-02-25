import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    FaTachometerAlt, FaBirthdayCake, FaClipboardList,
    FaEnvelope, FaMapMarkerAlt, FaImages, FaSignOutAlt,
    FaPlus, FaEdit, FaTrash, FaSearch, FaTimes, FaCheck,
    FaShoppingBag, FaRupeeSign, FaUsers, FaBell
} from 'react-icons/fa';
import { api } from '../api';
import { useToast } from '../context/ToastContext';
import SEO from '../components/SEO';

const STATUS_COLORS = {
    Pending: { bg: 'rgba(200,132,58,0.15)', color: '#C8843A', border: 'rgba(200,132,58,0.4)' },
    Confirmed: { bg: 'rgba(46,160,67,0.15)', color: '#3FB950', border: 'rgba(46,160,67,0.4)' },
    Delivered: { bg: 'rgba(88,166,255,0.15)', color: '#58A6FF', border: 'rgba(88,166,255,0.4)' },
    Cancelled: { bg: 'rgba(155,35,53,0.15)', color: '#F85149', border: 'rgba(155,35,53,0.4)' },
};

function StatusBadge({ status }) {
    const s = STATUS_COLORS[status] || STATUS_COLORS.Pending;
    return (
        <span style={{
            background: s.bg, color: s.color, border: `1px solid ${s.border}`,
            borderRadius: '20px', padding: '3px 12px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.5px'
        }}>{status}</span>
    );
}

function TableSkeleton({ rows = 5 }) {
    return (
        <div style={{ background: '#1C0D00', borderRadius: '16px', padding: '15px' }}>
            {[...Array(rows)].map((_, i) => (
                <div key={i} className="skeleton" style={{ height: '50px', marginBottom: '10px', opacity: 0.1 + (i * 0.05) }} />
            ))}
        </div>
    );
}

function Modal({ title, onClose, children }) {
    return (
        <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }} onClick={onClose}>
            <div style={{
                background: '#1C0D00', border: '1px solid rgba(200,132,58,0.25)', borderRadius: '20px',
                padding: '32px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto'
            }} onClick={e => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', color: '#FDF8F2', margin: 0 }}>{title}</h3>
                    <button onClick={onClose} style={{ color: '#EFE3CB', opacity: 0.5, fontSize: '18px', background: 'none', border: 'none', cursor: 'pointer' }}><FaTimes /></button>
                </div>
                {children}
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, sub, color }) {
    return (
        <div style={{
            background: 'linear-gradient(135deg, #1C0D00 0%, #2a1200 100%)',
            border: '1px solid rgba(200,132,58,0.15)', borderRadius: '16px', padding: '24px',
            display: 'flex', flexDirection: 'column', gap: '8px'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <p style={{ color: '#EFE3CB', opacity: 0.5, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>{label}</p>
                    <p style={{ fontSize: '32px', fontWeight: 800, color, fontFamily: 'var(--font-brand)', lineHeight: 1 }}>{value}</p>
                </div>
                <div style={{ background: `${color}20`, borderRadius: '12px', padding: '12px', color, fontSize: '20px' }}>{icon}</div>
            </div>
            {sub && <p style={{ fontSize: '12px', color: '#3FB950', marginTop: '4px' }}>{sub}</p>}
        </div>
    );
}

function SectionHeader({ title, action }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '26px', color: '#FDF8F2', margin: 0 }}>{title}</h2>
                <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg,#C8843A,transparent)', marginTop: '6px', borderRadius: '2px' }} />
            </div>
            {action}
        </div>
    );
}

const fi = { background: '#110600', border: '1px solid rgba(200,132,58,0.25)', borderRadius: '10px', color: '#FDF8F2', padding: '10px 14px', width: '100%', fontSize: '14px', outline: 'none', boxSizing: 'border-box' };

export default function Admin() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('dakoti_admin_token'));
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [activeTab, setActiveTab] = useState('dashboard');
    const [orders, setOrders] = useState([]);
    const [messages, setMessages] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [search, setSearch] = useState('');
    const [modal, setModal] = useState(null);
    const [selected, setSelected] = useState(null);
    const [newItem, setNewItem] = useState({ name: '', category: 'Cakes', price: '', description: '', isVeg: true });
    const [loading, setLoading] = useState(false);
    const { addToast } = useToast();

    useEffect(() => {
        if (isLoggedIn) {
            fetchData();
        }
    }, [isLoggedIn]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [menuRes, orderRes, msgRes] = await Promise.all([
                api.getMenu(),
                api.getOrders(),
                api.getMessages()
            ]);
            setMenuItems(menuRes);
            setOrders(orderRes);
            setMessages(msgRes);
        } catch (err) {
            console.error('Error fetching data:', err);
            addToast('Failed to load dashboard data', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await api.login({ username, password });
            localStorage.setItem('dakoti_admin_token', data.token);
            setIsLoggedIn(true);
            setLoginError('');
            addToast('Welcome back, Admin!', 'success');
        } catch (err) {
            setLoginError(err.message || 'Login failed');
            addToast('Invalid credentials', 'error');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('dakoti_admin_token');
        setIsLoggedIn(false);
        addToast('Logged out successfully', 'info');
    };

    const addMenuItem = async () => {
        if (!newItem.name || !newItem.price) {
            addToast('Please fill name and price', 'error');
            return;
        }
        try {
            const item = await api.addMenuItem({ ...newItem, price: Number(newItem.price) });
            setMenuItems(m => [item, ...m]);
            setNewItem({ name: '', category: 'Cakes', price: '', description: '', isVeg: true });
            setModal(null);
            addToast('New item added to menu', 'success');
        } catch (err) {
            addToast('Error adding item', 'error');
        }
    };

    const deleteMenuItem = async (id) => {
        if (!window.confirm('Delete this item?')) return;
        try {
            await api.deleteMenuItem(id);
            setMenuItems(m => m.filter(x => x._id !== id));
            addToast('Item removed from menu', 'success');
        } catch (err) {
            addToast('Error deleting item', 'error');
        }
    };

    const updateOrderStatus = async (id, status) => {
        try {
            const updated = await api.updateOrderStatus(id, status);
            setOrders(o => o.map(x => x._id === id ? updated : x));
            if (selected && selected._id === id) setSelected(updated);
            addToast(`Order marked as ${status}`, 'success');
        } catch (err) {
            addToast('Error updating status', 'error');
        }
    };

    const markRead = async (id) => {
        try {
            const updated = await api.markMessageRead(id);
            setMessages(m => m.map(x => x._id === id ? updated : x));
        } catch (err) {
            console.error(err);
        }
    };

    const deleteMsg = async (id) => {
        try {
            await api.deleteMessage(id);
            setMessages(m => m.filter(x => x._id !== id));
            setModal(null);
            addToast('Message deleted', 'info');
        } catch (err) {
            addToast('Error deleting message', 'error');
        }
    };

    if (!isLoggedIn) return (
        <>
            <SEO title="Admin Login" description="Secure login for Dakoti Bakers administration portal." />
            <div style={{
                minHeight: '100vh', background: 'radial-gradient(ellipse at 30% 50%, #1C0D00 0%, #0a0400 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
            }}>
                <div style={{
                    background: 'linear-gradient(135deg,#1C0D00,#2a1200)', border: '1px solid rgba(200,132,58,0.2)',
                    borderRadius: '24px', padding: '48px 40px', width: '100%', maxWidth: '420px', boxShadow: '0 40px 80px rgba(0,0,0,0.6)'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎂</div>
                        <h1 style={{ fontFamily: 'var(--font-brand)', fontSize: '30px', color: '#C8843A', margin: 0 }}>Dakoti Admin</h1>
                        <p style={{ color: '#EFE3CB', opacity: 0.4, marginTop: '8px', fontSize: '14px' }}>Bakery Management Portal</p>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', color: '#EFE3CB', opacity: 0.6, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Username</label>
                            <input style={fi} value={username} onChange={e => setUsername(e.target.value)} placeholder="admin" autoFocus />
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', color: '#EFE3CB', opacity: 0.6, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Password</label>
                            <input style={fi} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
                        </div>
                        {loginError && <p style={{ color: '#F85149', fontSize: '13px', marginBottom: '16px', textAlign: 'center' }}>{loginError}</p>}
                        <button type="submit" style={{
                            width: '100%', background: 'linear-gradient(135deg,#C8843A,#a86828)', color: '#fff', border: 'none',
                            borderRadius: '12px', padding: '14px', fontSize: '16px', fontWeight: 700, cursor: 'pointer',
                            boxShadow: '0 8px 24px rgba(200,132,58,0.3)', transition: 'opacity 0.2s'
                        }}>Sign In →</button>
                    </form>
                </div>
            </div>
        </>
    );

    const navLinks = [
        { id: 'dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
        { id: 'menu', icon: <FaBirthdayCake />, label: 'Menu' },
        { id: 'orders', icon: <FaClipboardList />, label: 'Orders' },
        { id: 'messages', icon: <FaEnvelope />, label: 'Messages' },
    ];

    const unread = messages.filter(m => !m.read).length;
    const pending = orders.filter(o => o.status === 'Pending').length;

    return (
        <>
            <SEO title="Admin Dashboard" description="Dakoti Bakers administration portal." />
            {modal === 'addMenu' && (
                <Modal title="Add Menu Item" onClose={() => setModal(null)}>
                    {[
                        { label: 'Item Name', key: 'name', type: 'text' },
                        { label: 'Price (₹)', key: 'price', type: 'number' },
                        { label: 'Description', key: 'description', type: 'text' },
                    ].map(f => (
                        <div key={f.key} style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', color: '#EFE3CB', opacity: 0.5, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>{f.label}</label>
                            <input style={fi} type={f.type} value={newItem[f.key]} onChange={e => setNewItem(v => ({ ...v, [f.key]: e.target.value }))} />
                        </div>
                    ))}
                    <label style={{ display: 'block', color: '#EFE3CB', opacity: 0.5, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Category</label>
                    <select style={{ ...fi, marginBottom: '16px' }} value={newItem.category} onChange={e => setNewItem(v => ({ ...v, category: e.target.value }))}>
                        {['Cakes', 'Pastries', 'Burgers & Sandwiches', 'Beverages'].map(c => <option key={c}>{c}</option>)}
                    </select>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                        <input type="checkbox" id="veg" checked={newItem.isVeg} onChange={e => setNewItem(v => ({ ...v, isVeg: e.target.checked }))} />
                        <label htmlFor="veg" style={{ color: '#EFE3CB', fontSize: '14px' }}>Vegetarian</label>
                    </div>
                    <button onClick={addMenuItem} style={{ width: '100%', background: 'linear-gradient(135deg,#C8843A,#a86828)', color: '#fff', border: 'none', borderRadius: '12px', padding: '13px', fontWeight: 700, cursor: 'pointer', fontSize: '15px' }}>
                        Add Item
                    </button>
                </Modal>
            )}
            {modal === 'viewOrder' && selected && (
                <Modal title={`Order Details`} onClose={() => setModal(null)}>
                    {[
                        ['Customer', selected.customer], ['Phone', selected.phone], ['Cake', selected.cakeType || selected.cake],
                        ['Weight', selected.weight], ['Occasion', selected.occasion],
                        ['Date', selected.date || selected.deliveryDate], ['Status', selected.status],
                        ['Location', selected.location || '—'], ['Message', selected.message || '—']
                    ].map(([k, v]) => (
                        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(200,132,58,0.08)' }}>
                            <span style={{ color: '#EFE3CB', opacity: 0.5, fontSize: '13px' }}>{k}</span>
                            <span style={{ color: '#FDF8F2', fontSize: '13px', fontWeight: 600 }}>{v}</span>
                        </div>
                    ))}
                    <div style={{ marginTop: '20px' }}>
                        <label style={{ display: 'block', color: '#EFE3CB', opacity: 0.5, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Update Status</label>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {Object.keys(STATUS_COLORS).map(s => (
                                <button key={s} onClick={() => updateOrderStatus(selected._id, s)}
                                    style={{
                                        padding: '8px 16px', borderRadius: '20px', border: `1px solid ${STATUS_COLORS[s].border}`,
                                        background: selected.status === s ? STATUS_COLORS[s].bg : 'transparent',
                                        color: STATUS_COLORS[s].color, fontWeight: 700, fontSize: '12px', cursor: 'pointer'
                                    }}>
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                </Modal>
            )}
            {modal === 'viewMsg' && selected && (
                <Modal title="Message" onClose={() => setModal(null)}>
                    <div style={{ marginBottom: '16px' }}>
                        <p style={{ color: '#C8843A', fontWeight: 700, fontSize: '16px' }}>{selected.subject || 'No Subject'}</p>
                        <p style={{ color: '#EFE3CB', opacity: 0.5, fontSize: '13px', marginTop: '4px' }}>{selected.name} · {selected.email}</p>
                    </div>
                    <p style={{ color: '#FDF8F2', lineHeight: 1.7, fontSize: '15px', background: 'rgba(200,132,58,0.05)', borderRadius: '12px', padding: '16px' }}>{selected.message}</p>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        <a href={`mailto:${selected.email}`} style={{ flex: 1, background: 'linear-gradient(135deg,#C8843A,#a86828)', color: '#fff', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: 700, cursor: 'pointer', fontSize: '14px', textAlign: 'center', textDecoration: 'none' }}>Reply</a>
                        <button onClick={() => deleteMsg(selected._id)} style={{ flex: 1, background: 'rgba(155,35,53,0.15)', color: '#F85149', border: '1px solid rgba(155,35,53,0.3)', borderRadius: '12px', padding: '12px', fontWeight: 700, cursor: 'pointer' }}>Delete</button>
                    </div>
                </Modal>
            )}

            <div style={{ display: 'flex', minHeight: '100vh', background: '#0D0500', fontFamily: 'var(--font-body)' }}>
                <aside style={{ background: '#1C0D00', width: '220px', minHeight: '100vh', borderRight: '1px solid rgba(200,132,58,0.1)', position: 'sticky', top: 0 }}>
                    <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(200,132,58,0.1)', fontFamily: 'var(--font-brand)', color: '#C8843A', fontSize: '20px' }}>🎂 Dakoti Admin</div>
                    <nav style={{ padding: '20px 0' }}>
                        {navLinks.map(l => (
                            <button key={l.id} onClick={() => setActiveTab(l.id)} style={{
                                display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', width: '100%', border: 'none', textAlign: 'left',
                                background: activeTab === l.id ? 'rgba(200,132,58,0.1)' : 'transparent',
                                color: activeTab === l.id ? '#C8843A' : '#EFE3CB', cursor: 'pointer', fontSize: '14px'
                            }}>
                                {l.icon} {l.label}
                                {l.id === 'messages' && unread > 0 && <span style={{ marginLeft: 'auto', background: '#C8843A', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{unread}</span>}
                            </button>
                        ))}
                    </nav>
                    <button onClick={handleLogout} style={{ position: 'absolute', bottom: '20px', left: '20px', color: '#F85149', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaSignOutAlt /> Logout
                    </button>
                </aside>

                <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
                    {loading ? <TableSkeleton rows={8} /> : (
                        <>
                            {activeTab === 'dashboard' && (
                                <>
                                    <SectionHeader title="Dashboard Overview" />
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '32px' }}>
                                        <StatCard icon={<FaShoppingBag />} label="Orders" value={orders.length} color="#C8843A" />
                                        <StatCard icon={<FaClipboardList />} label="Pending" value={pending} color="#F85149" />
                                        <StatCard icon={<FaBell />} label="Unread" value={unread} color="#58A6FF" />
                                        <StatCard icon={<FaRupeeSign />} label="Items" value={menuItems.length} color="#3FB950" />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <div style={{ background: '#1C0D00', borderRadius: '16px', padding: '20px' }}>
                                            <h3 style={{ color: '#FDF8F2', marginBottom: '16px' }}>Recent Orders</h3>
                                            {orders.slice(0, 5).map(o => (
                                                <div key={o._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                    <span style={{ color: '#EFE3CB' }}>{o.customer}</span>
                                                    <StatusBadge status={o.status} />
                                                </div>
                                            ))}
                                        </div>
                                        <div style={{ background: '#1C0D00', borderRadius: '16px', padding: '20px' }}>
                                            <h3 style={{ color: '#FDF8F2', marginBottom: '16px' }}>Recent Messages</h3>
                                            {messages.slice(0, 5).map(m => (
                                                <div key={m._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                    <span style={{ color: '#EFE3CB', fontWeight: m.read ? 400 : 700 }}>{m.name}</span>
                                                    <span style={{ color: '#C8843A', fontSize: '12px' }}>{new Date(m.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {activeTab === 'menu' && (
                                <>
                                    <SectionHeader title="Menu Manager" action={<button className="btn btn--primary" onClick={() => setModal('addMenu')}>+ Add Item</button>} />
                                    <div style={{ background: '#1C0D00', borderRadius: '16px', overflow: 'hidden' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                            <thead style={{ background: 'rgba(200,132,58,0.1)' }}>
                                                <tr>
                                                    <th style={{ padding: '15px', textAlign: 'left' }}>Item</th>
                                                    <th style={{ padding: '15px', textAlign: 'left' }}>Category</th>
                                                    <th style={{ padding: '15px', textAlign: 'left' }}>Price</th>
                                                    <th style={{ padding: '15px', textAlign: 'left' }}>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {menuItems.map(item => (
                                                    <tr key={item._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                        <td style={{ padding: '15px', color: '#FDF8F2' }}>{item.name} {item.isVeg ? '🟢' : '🔴'}</td>
                                                        <td style={{ padding: '15px', color: '#EFE3CB' }}>{item.category}</td>
                                                        <td style={{ padding: '15px', color: '#C8843A', fontWeight: 700 }}>₹{item.price}</td>
                                                        <td style={{ padding: '15px' }}>
                                                            <button onClick={() => deleteMenuItem(item._id)} style={{ color: '#F85149', background: 'none', border: 'none', cursor: 'pointer' }}><FaTrash /></button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            )}

                            {activeTab === 'orders' && (
                                <>
                                    <SectionHeader title="Orders" />
                                    <div style={{ background: '#1C0D00', borderRadius: '16px', overflow: 'hidden' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                            <thead style={{ background: 'rgba(200,132,58,0.1)' }}>
                                                <tr>
                                                    <th style={{ padding: '15px', textAlign: 'left' }}>Customer</th>
                                                    <th style={{ padding: '15px', textAlign: 'left' }}>Cake</th>
                                                    <th style={{ padding: '15px', textAlign: 'left' }}>Date</th>
                                                    <th style={{ padding: '15px', textAlign: 'left' }}>Status</th>
                                                    <th style={{ padding: '15px', textAlign: 'left' }}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orders.map(o => (
                                                    <tr key={o._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                        <td style={{ padding: '15px', color: '#FDF8F2' }}>{o.customer}</td>
                                                        <td style={{ padding: '15px', color: '#EFE3CB' }}>{o.cakeType || o.cake}</td>
                                                        <td style={{ padding: '15px', color: '#EFE3CB' }}>{(o.date || o.deliveryDate)?.split('T')[0]}</td>
                                                        <td style={{ padding: '15px' }}><StatusBadge status={o.status} /></td>
                                                        <td style={{ padding: '15px' }}>
                                                            <button onClick={() => { setSelected(o); setModal('viewOrder'); }} style={{ color: '#C8843A', background: 'none', border: 'none', cursor: 'pointer' }}>View</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            )}

                            {activeTab === 'messages' && (
                                <>
                                    <SectionHeader title="Inbox" />
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {messages.map(m => (
                                            <div key={m._id} onClick={() => { setSelected(m); setModal('viewMsg'); markRead(m._id); }} style={{
                                                background: '#1C0D00', padding: '15px 20px', borderRadius: '12px', cursor: 'pointer',
                                                border: m.read ? '1px solid transparent' : '1px solid #C8843A'
                                            }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                    <span style={{ color: '#FDF8F2', fontWeight: m.read ? 400 : 700 }}>{m.name}</span>
                                                    <span style={{ color: '#EFE3CB', opacity: 0.5, fontSize: '12px' }}>{new Date(m.createdAt).toLocaleString()}</span>
                                                </div>
                                                <p style={{ color: '#C8843A', fontSize: '13px', margin: '4px 0' }}>{m.subject || 'No Subject'}</p>
                                                <p style={{ color: '#EFE3CB', opacity: 0.6, fontSize: '13px' }}>{m.message.slice(0, 100)}...</p>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </main>
            </div>
        </>
    );
}
