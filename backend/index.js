const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB error:', err));

// Schema – price & location are stored, but not sent to public
const propertySchema = new mongoose.Schema({
  title: String,
  description: String,        // public visible
  location: String,           // hidden from public
  price: String,              // hidden from public
  img: String,
  furnished: Boolean,
  createdAt: { type: Date, default: Date.now }
});

const Property = mongoose.model('Property', propertySchema);

// Seed dummy data (runs only once – comment out after first run)
async function seedDummy() {
  const count = await Property.countDocuments();
  if (count === 0) {
    await Property.insertMany([
      {
        title: "2BHK Near Stadium",
        description: "Spacious 2 bedroom hall kitchen, fully furnished, good ventilation, parking available",
        location: "Kathrikadavu, Kaloor",
        price: "₹14,000 / month",
        img: "https://res.cloudinary.com/demo/image/upload/v1690000000/sample-room-1.jpg", // replace with real later
        furnished: true
      },
      {
        title: "1BHK Compact Flat",
        description: "Single bedroom with attached bath, semi-furnished, close to main road",
        location: "Panampilly Nagar side, Kaloor",
        price: "₹9,500 / month",
        img: "https://res.cloudinary.com/demo/image/upload/v1690000000/sample-room-2.jpg",
        furnished: false
      },
      {
        title: "PG for Working Men",
        description: "Single/double sharing, food optional, WiFi, 24h water, clean & safe",
        location: "Near JLN Stadium, Kaloor",
        price: "₹6,000–8,000 / month",
        img: "https://res.cloudinary.com/demo/image/upload/v1690000000/sample-pg.jpg",
        furnished: true
      }
    ]);
    console.log('Dummy properties added');
  }
}
seedDummy();

// Public endpoint – hides location & price
app.get('/api/properties', async (req, res) => {
  const properties = await Property.find()
    .select('title description img furnished') // only send these fields
    .sort({ createdAt: -1 });
  res.json(properties);
});

// Admin endpoints (no auth beyond simple password on frontend)
app.post('/api/properties', async (req, res) => {
  try {
    const newProp = new Property(req.body);
    await newProp.save();
    res.status(201).json(newProp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/properties/:id', async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));