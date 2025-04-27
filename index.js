const express = require('express');
const app = express();

// Mengimpor routes yang sudah didefinisikan
const adminRoutes = require('./routes/adminRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const itemRoutes = require('./routes/itemRoutes');
const supplierRoutes = require('./routes/supplierRoutes');

// Middleware untuk parsing JSON
app.use(express.json());

// Routing untuk API
app.use('/api/admins', adminRoutes);      // Menangani route terkait admin
app.use('/api/categories', categoryRoutes);   // Menangani route terkait kategori
app.use('/api/items', itemRoutes);       // Menangani route terkait item
app.use('/api/suppliers', supplierRoutes);   // Menangani route terkait supplier

// Route default
app.get('/api/', (req, res) => {
  res.send('Welcome to Inventory Management API!');
});

// Error handling untuk route yang tidak ditemukan
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Middleware untuk menangani error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

// Menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
