import mongoose from 'mongoose';

// Menu Item Schema
const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, required: true },
    isVeg: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    image: { type: String, default: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80' }
}, { timestamps: true });

// Custom Order Schema — matches CustomOrder.jsx form fields:
// name → customer, phone, cakeType (or textarea), weight, occasion, date, message, location
const customOrderSchema = new mongoose.Schema({
    customer: { type: String, required: true },    // from form field 'name'
    phone: { type: String, required: true },    // from form field 'phone'
    email: { type: String },                    // optional — not in form
    cakeType: { type: String },                    // from cake selector or textarea
    weight: { type: String, default: '1 kg' },
    occasion: { type: String },
    date: { type: String },                    // delivery/pickup date
    message: { type: String },                    // message on cake
    location: { type: String },                    // pickup store
    status: { type: String, enum: ['Pending', 'Confirmed', 'Delivered', 'Cancelled'], default: 'Pending' },
}, { timestamps: true });

// Message Schema — matches Contact.jsx form fields
const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },                     // optional phone from contact form
    subject: { type: String },
    message: { type: String, required: true },
    read: { type: Boolean, default: false }
}, { timestamps: true });

// Admin Schema
const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

export const MenuItem = mongoose.model('MenuItem', menuItemSchema);
export const CustomOrder = mongoose.model('CustomOrder', customOrderSchema);
export const Message = mongoose.model('Message', messageSchema);
export const Admin = mongoose.model('Admin', adminSchema);
