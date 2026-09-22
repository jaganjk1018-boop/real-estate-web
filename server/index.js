// server/index.js
// Express.js & MongoDB Atlas Backend Server for Aura Real Estate Platform
// Ready for deployment on Render or Railway

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Fallback Store (or connect Mongoose if MONGODB_URI is provided)
const inMemoryProperties = [
  {
    id: 'prop-1',
    title: 'The Bel-Air Obsidian Villa',
    price: 18500000,
    type: 'buy',
    category: 'Luxury Villa',
    status: 'For Sale',
    bedrooms: 6,
    bathrooms: 8,
    areaSqFt: 11450,
    city: 'Los Angeles'
  },
  {
    id: 'prop-2',
    title: 'The Sky Crest Penthouse',
    price: 24500000,
    type: 'buy',
    category: 'Penthouse',
    status: 'For Sale',
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 8200,
    city: 'New York'
  }
];

const inMemoryInquiries = [];

// Optional MongoDB Connection
if (process.env.MONGODB_URI) {
  try {
    const mongoose = require('mongoose');
    mongoose.connect(process.env.MONGODB_URI)
      .then(() => console.log('Connected to MongoDB Atlas'))
      .catch((err) => console.error('MongoDB Atlas connection error:', err));
  } catch (e) {
    console.log('Running without mongoose dependency in local mode.');
  }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Aura Real Estate Express Engine',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// GET /api/properties
app.get('/api/properties', (req, res) => {
  res.json({
    count: inMemoryProperties.length,
    properties: inMemoryProperties
  });
});

// POST /api/properties
app.post('/api/properties', (req, res) => {
  const newProp = {
    id: `prop-${Date.now()}`,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  inMemoryProperties.unshift(newProp);
  res.status(201).json({ success: true, property: newProp });
});

// POST /api/inquiries
app.post('/api/inquiries', (req, res) => {
  const lead = {
    id: `inq-${Date.now()}`,
    ...req.body,
    status: 'New',
    createdAt: new Date().toISOString()
  };
  inMemoryInquiries.unshift(lead);
  res.status(201).json({ success: true, inquiry: lead });
});

// Start Server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Aura Real Estate API Server running on port ${PORT}`);
  });
}

module.exports = app;
