import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI = "mongodb+srv://pushkar0578_db_user:KNCmqmXquzFpjCsw@cluster0.5beiiva.mongodb.net/?appName=Cluster0";
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schemas
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true }
});

const tripSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: String, required: true },
  days: { type: Number, required: true },
  budget: { type: String, required: true },
  persons: { type: String, required: true },
  itinerary: { type: Object, required: true },
  created_at: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Trip = mongoose.model('Trip', tripSchema);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Auth Middleware
  const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ error: 'Forbidden' });
      req.user = user;
      next();
    });
  };

  // Auth Routes
  app.post('/api/auth/register', async (req, res) => {
    const { email, password, name } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword, name });
      await user.save();
      
      const token = jwt.sign({ id: user._id, email, name }, JWT_SECRET);
      res.json({ token, user: { id: user._id, email, name } });
    } catch (error) {
      console.error('Registration error:', error);
      if (error.code === 11000) {
        res.status(400).json({ error: 'Email already exists' });
      } else {
        res.status(500).json({ error: 'Server error' });
      }
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, JWT_SECRET);
      res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Trip Routes
  app.post('/api/trips', authenticateToken, async (req, res) => {
    const { location, days, budget, persons, itinerary } = req.body;
    try {
      const trip = new Trip({
        user_id: req.user.id,
        location,
        days,
        budget,
        persons,
        itinerary
      });
      await trip.save();
      res.json({ id: trip._id });
    } catch (error) {
      console.error('Save trip error:', error);
      res.status(500).json({ error: 'Failed to save trip' });
    }
  });

  app.get('/api/trips', authenticateToken, async (req, res) => {
    try {
      const trips = await Trip.find({ user_id: req.user.id }).sort({ created_at: -1 });
      res.json(trips.map(t => ({
        id: t._id,
        location: t.location,
        days: t.days,
        budget: t.budget,
        persons: t.persons,
        itinerary: t.itinerary,
        created_at: t.created_at
      })));
    } catch (error) {
      console.error('Fetch trips error:', error);
      res.status(500).json({ error: 'Failed to fetch trips' });
    }
  });

  app.get('/api/trips/:id', authenticateToken, async (req, res) => {
    try {
      const trip = await Trip.findOne({ _id: req.params.id, user_id: req.user.id });
      if (!trip) return res.status(404).json({ error: 'Trip not found' });
      res.json({
        id: trip._id,
        location: trip.location,
        days: trip.days,
        budget: trip.budget,
        persons: trip.persons,
        itinerary: trip.itinerary,
        created_at: trip.created_at
      });
    } catch (error) {
      console.error('Fetch trip error:', error);
      res.status(500).json({ error: 'Failed to fetch trip' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
