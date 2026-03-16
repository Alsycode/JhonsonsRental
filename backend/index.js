// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Declare dbReady BEFORE using it
// let dbReady = false;

// // Test connection first - seed ONLY runs after success
// mongoose.connect(process.env.MONGODB_URI)
//   .then(async () => {
//     console.log('✅ MongoDB Connected');
//     dbReady = true;
//     await seedDummy();  // Only runs AFTER connection
//   })
//   .catch(err => {
//     console.error('❌ MongoDB error:', err.message);
//     process.exit(1);  // Stop server if DB fails
//   });

// // Schema – price & location are stored, but not sent to public
// const propertySchema = new mongoose.Schema({
//   title: String,
//   description: String,        // public visible
//   location: String,           // hidden from public
//   price: String,              // hidden from public
//   img: String,
//   furnished: Boolean,
//   createdAt: { type: Date, default: Date.now }
// });

// const Property = mongoose.model('Property', propertySchema);

// async function seedDummy() {
//   if (!dbReady) return console.log('⏳ Waiting for DB...');
  
//   try {
//     const count = await Property.countDocuments();
//     console.log(`Found ${count} properties`);
    
//     if (count === 0) {
//       await Property.insertMany([
//         {
//           title: "2BHK Near Stadium",
//           description: "Spacious 2 bedroom hall kitchen, fully furnished, good ventilation, parking available",
//           location: "Kathrikadavu, Kaloor",
//           price: "₹14,000 / month",
//           img: "https://res.cloudinary.com/demo/image/upload/v1690000000/sample-room-1.jpg",
//           furnished: true
//         },
//         {
//           title: "1BHK Compact Flat",
//           description: "Single bedroom with attached bath, semi-furnished, close to main road",
//           location: "Panampilly Nagar side, Kaloor",
//           price: "₹9,500 / month",
//           img: "https://res.cloudinary.com/demo/image/upload/v1690000000/sample-room-2.jpg",
//           furnished: false
//         },
//         {
//           title: "PG for Working Men",
//           description: "Single/double sharing, food optional, WiFi, 24h water, clean & safe",
//           location: "Near JLN Stadium, Kaloor",
//           price: "₹6,000–8,000 / month",
//           img: "https://res.cloudinary.com/demo/image/upload/v1690000000/sample-pg.jpg",
//           furnished: true
//         }
//       ]);
//       console.log('✅ Dummy properties added');
//     } else {
//       console.log('✅ Properties already exist, skipping seed');
//     }
//   } catch (err) {
//     console.error('Seed error:', err.message);
//   }
// }

// // REMOVED: Don't call seedDummy() here - it runs inside .then()

// // Public endpoint – hides location & price
// app.get('/api/properties', async (req, res) => {
//   try {
//     const properties = await Property.find()
//       .select('title description img furnished createdAt') // only send these fields
//       .sort({ createdAt: -1 });
//     res.json(properties);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch properties' });
//   }
// });

// // Admin endpoints (no auth beyond simple password on frontend)
// app.post('/api/properties', async (req, res) => {
//   try {
//     const newProp = new Property(req.body);
//     await newProp.save();
//     res.status(201).json(newProp);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// app.delete('/api/properties/:id', async (req, res) => {
//   try {
//     await Property.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Deleted' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to delete' });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server on port ${PORT}`));
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ CORS setup for Vite dev server (port 5173)
const allowedOrigins = [
  'http://localhost:5173',      // Vite dev server
  'http://localhost:3000',      // Create React App dev
  'https://jhonsons-rental-jstn.vercel.app'  // Your deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Declare dbReady BEFORE using it
let dbReady = false;

// Test connection first - seed ONLY runs after success
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected');
    dbReady = true;
    await seedDummy();  // Only runs AFTER connection
  })
  .catch(err => {
    console.error('❌ MongoDB error:', err.message);
    process.exit(1);  // Stop server if DB fails
  });

// Schema – price & location are stored, but not sent to public
const propertySchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  price: String,
  images: [String],   // ⭐ instead of img
  furnished: Boolean,
  createdAt: { type: Date, default: Date.now }
});
const Property = mongoose.model('Property', propertySchema);

async function seedDummy() {
  if (!dbReady) return console.log('⏳ Waiting for DB...');
  
  try {
    const count = await Property.countDocuments();
    console.log(`Found ${count} properties`);
    
    if (count === 0) {
      await Property.insertMany([
        {
          title: "2BHK Near Stadium",
          description: "Spacious 2 bedroom hall kitchen, fully furnished, good ventilation, parking available",
          location: "Kathrikadavu, Kaloor",
          price: "₹14,000 / month",
          img: "https://res.cloudinary.com/demo/image/upload/v1690000000/sample-room-1.jpg",
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
      console.log('✅ Dummy properties added');
    } else {
      console.log('✅ Properties already exist, skipping seed');
    }
  } catch (err) {
    console.error('Seed error:', err.message);
  }
}

// Public endpoint – hides location & price
app.get('/api/properties', async (req, res) => {
  try {
    const properties = await Property.find()
.select('title description images furnished createdAt')
      .sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});
// Update property endpoint
app.put('/api/properties/:id', async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updatedProperty) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json(updatedProperty);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
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
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
