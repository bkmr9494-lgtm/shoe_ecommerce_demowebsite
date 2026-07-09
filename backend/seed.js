const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/solex');
    console.log('📡 MongoDB Connected');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@solex.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('👤 Created admin user: admin@solex.com / admin123');

    // Create sample products
    const products = [
      {
        name: 'SoleX Neon Cyberpunk Runner',
        price: 189,
        category: 'Running',
        description: 'Engineered with custom light-conductive structural overlays and zero-gravity return soles. Built to maximize kinetics under multi-axial shock loads.',
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop'],
        sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
        stock: 42
      },
      {
        name: 'Vortex Quantum Stealth High-Top',
        price: 245,
        category: 'Basketball',
        description: 'Carbon fiber anti-torsion tech with quantum foam cushioning system. Designed for explosive court movements and vertical dominance.',
        images: ['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=600&auto=format&fit=crop'],
        sizes: ['UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'],
        stock: 19
      },
      {
        name: 'AeroGlide Prism Minimalist',
        price: 150,
        category: 'Casual',
        description: 'Ultra breathable structural mesh with adaptive fit technology. Perfect for urban exploration and daily comfort.',
        images: ['https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop'],
        sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
        stock: 35
      },
      {
        name: 'HyperDrive Laser Volt Pro',
        price: 210,
        category: 'Lifestyle',
        description: 'Glow adaptive side profile mechanics with reactive LED lighting. Statement piece for the bold and fashion-forward.',
        images: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop'],
        sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
        stock: 28
      },
      {
        name: 'Titan Force Impact Elite',
        price: 275,
        category: 'Basketball',
        description: 'Military-grade durability with impact absorption technology. Built for serious athletes who demand performance.',
        images: ['https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=600&auto=format&fit=crop'],
        sizes: ['UK 9', 'UK 10', 'UK 11', 'UK 12', 'UK 13'],
        stock: 15
      },
      {
        name: 'Nebula Cloud Walker',
        price: 165,
        category: 'Running',
        description: 'Cloud-like cushioning with energy return foam. Feels like running on air with maximum impact protection.',
        images: ['https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=600&auto=format&fit=crop'],
        sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
        stock: 50
      }
    ];

    await Product.insertMany(products);
    console.log('📦 Created sample products');

    console.log('✅ Seed data completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedData();
