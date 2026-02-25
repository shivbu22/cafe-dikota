import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaTimes, FaPlus, FaMinus } from 'react-icons/fa';

export default function CartSidebar() {
    const { items, totalItems, totalPrice, isOpen, setIsOpen, updateQty, removeItem, clearCart } = useCart();

    return (
        <>
            {/* Floating Cart Button */}
            {totalItems > 0 && (
                <button className="cart-float" onClick={() => setIsOpen(true)} aria-label="Open cart">
                    <FaShoppingCart />
                    <span className="cart-float__badge">{totalItems}</span>
                </button>
            )}

            {/* Overlay */}
            {isOpen && (
                <div
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1400 }}
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`cart-sidebar ${isOpen ? 'cart-sidebar--open' : ''}`}>
                <div className="cart-sidebar__header">
                    <h3 className="text-heading" style={{ fontSize: '20px' }}>Your Cart ({totalItems})</h3>
                    <button onClick={() => setIsOpen(false)} style={{ fontSize: '20px', color: '#4A2408' }} aria-label="Close cart">
                        <FaTimes />
                    </button>
                </div>

                <div className="cart-sidebar__body">
                    {items.length === 0 ? (
                        <p style={{ textAlign: 'center', opacity: 0.5, paddingTop: '40px' }}>Your cart is empty</p>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item__info">
                                    <div className="cart-item__name">{item.name}</div>
                                    <div className="cart-item__price">₹{item.price * item.qty}</div>
                                </div>
                                <div className="cart-item__qty">
                                    <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Decrease quantity"><FaMinus /></button>
                                    <span style={{ fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
                                    <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Increase quantity"><FaPlus /></button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="cart-sidebar__footer">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 700, fontSize: '18px' }}>
                            <span>Total</span>
                            <span style={{ color: '#C8843A' }}>₹{totalPrice}</span>
                        </div>
                        <button className="btn btn--primary" style={{ width: '100%', marginBottom: '8px' }}>
                            Proceed to Checkout
                        </button>
                        <button className="btn btn--secondary" style={{ width: '100%' }} onClick={clearCart}>
                            Clear Cart
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
