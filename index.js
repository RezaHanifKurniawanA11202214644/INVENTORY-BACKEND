const express = require('express');
const app = express();
const { Admin, Category, Supplier, Item } = require('./models');
const adminRoutes = require('./routes/adminRoutes'); 
const itemRoutes = require('./routes/itemRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

// Middleware untuk parsing JSON
app.use(express.json());

// Routing
app.use('/api/admins', adminRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/inventory', inventoryRoutes);

// Route untuk menangani request default
app.get('/', (req, res) => {
  res.send('Welcome to Inventory Management API!');
});

// Error handling untuk route yang tidak ditemukan
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Middleware untuk error umum
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

// Starting the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
