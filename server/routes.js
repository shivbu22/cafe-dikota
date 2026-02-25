import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { MenuItem, CustomOrder, Message, Admin } from './models.js';

const router = express.Router();

// Middleware for JWT Verification
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dakoti_secret_key');
        req.admin = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
};

// --- AUTH ROUTES ---
router.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'dakoti_secret_key', { expiresIn: '1d' });
        res.json({ token, admin: { id: admin._id, username: admin.username } });
    } catch (e) {
        console.error('Login error:', e);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// --- MENU ROUTES ---
router.get('/menu', async (req, res) => {
    try {
        const items = await MenuItem.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (e) {
        console.error('Get menu error:', e);
        res.status(500).json({ msg: 'Server Error' });
    }
});

router.post('/menu', auth, async (req, res) => {
    try {
        const newItem = new MenuItem(req.body);
        const item = await newItem.save();
        res.json(item);
    } catch (e) {
        console.error('Add menu item error:', e);
        res.status(500).json({ msg: 'Server Error', error: e.message });
    }
});

router.delete('/menu/:id', auth, async (req, res) => {
    try {
        await MenuItem.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Item removed' });
    } catch (e) {
        console.error('Delete menu item error:', e);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// --- ORDER ROUTES ---
router.post('/orders', async (req, res) => {
    try {
        // Normalize field names: frontend may send 'name' for customer
        const orderData = {
            ...req.body,
            customer: req.body.customer || req.body.name,
            cakeType: req.body.cakeType || req.body.cake,
        };
        const newOrder = new CustomOrder(orderData);
        const order = await newOrder.save();
        res.json(order);
    } catch (e) {
        console.error('Submit order error:', e.message);
        res.status(500).json({ msg: 'Server Error', error: e.message });
    }
});

router.get('/orders', auth, async (req, res) => {
    try {
        const orders = await CustomOrder.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (e) {
        console.error('Get orders error:', e);
        res.status(500).json({ msg: 'Server Error' });
    }
});

router.patch('/orders/:id', auth, async (req, res) => {
    try {
        const order = await CustomOrder.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!order) return res.status(404).json({ msg: 'Order not found' });
        res.json(order);
    } catch (e) {
        console.error('Update order error:', e);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// --- MESSAGE ROUTES ---
router.post('/messages', async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        const message = await newMessage.save();
        res.json(message);
    } catch (e) {
        console.error('Send message error:', e.message);
        res.status(500).json({ msg: 'Server Error', error: e.message });
    }
});

router.get('/messages', auth, async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (e) {
        console.error('Get messages error:', e);
        res.status(500).json({ msg: 'Server Error' });
    }
});

router.patch('/messages/:id', auth, async (req, res) => {
    try {
        const msg = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
        if (!msg) return res.status(404).json({ msg: 'Message not found' });
        res.json(msg);
    } catch (e) {
        console.error('Mark read error:', e);
        res.status(500).json({ msg: 'Server Error' });
    }
});

router.delete('/messages/:id', auth, async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Message deleted' });
    } catch (e) {
        console.error('Delete message error:', e);
        res.status(500).json({ msg: 'Server Error' });
    }
});

export default router;
