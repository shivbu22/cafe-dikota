import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { Admin, MenuItem } from './models.js';
import routes from './routes.js';
import { allMenuItems } from './seedData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api', routes);

// Database Connection & Initial Seeding
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dakoti_bakers')
    .then(async () => {
        console.log('MongoDB Connected ✅');

        // Seed Admin if not exists
        const adminExists = await Admin.findOne({ username: 'admin' });
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('dakoti2002', 10);
            await new Admin({ username: 'admin', password: hashedPassword }).save();
            console.log('Default Admin seeded (admin/dakoti2002) 👤');
        }

        // Seed Menu if empty
        const menuCount = await MenuItem.countDocuments();
        if (menuCount === 0) {
            // Import data from frontend static files
            await MenuItem.insertMany(allMenuItems);
            console.log('Menu items seeded from static data 🍰');
        }

        app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
    })
    .catch(err => console.log('Database Connection Error ❌:', err));
