// server/models/Property.js
// MongoDB Mongoose Schema for Aura Real Estate Platform

let mongoose;
try {
  mongoose = require('mongoose');
} catch (e) {
  // If mongoose is not yet installed in local dev
  mongoose = null;
}

if (mongoose) {
  const PropertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tagline: String,
    description: String,
    price: { type: Number, required: true },
    currency: { type: String, default: '$' },
    type: { type: String, enum: ['buy', 'rent', 'commercial', 'residential'], required: true },
    category: { type: String, required: true },
    status: { type: String, default: 'For Sale' },
    isFeatured: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: true },
    isHot: { type: Boolean, default: false },
    rating: { type: Number, default: 5.0 },
    reviewCount: { type: Number, default: 0 },
    bedrooms: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 0 },
    areaSqFt: { type: Number, required: true },
    garages: { type: Number, default: 0 },
    yearBuilt: Number,
    address: {
      street: String,
      neighborhood: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
      lat: Number,
      lng: Number
    },
    images: [String],
    amenities: [String],
    nearby: [{
      name: String,
      distance: String,
      type: { type: String },
      rating: Number
    }],
    createdAt: { type: Date, default: Date.now }
  });

  module.exports = mongoose.models.Property || mongoose.model('Property', PropertySchema);
} else {
  module.exports = {};
}
