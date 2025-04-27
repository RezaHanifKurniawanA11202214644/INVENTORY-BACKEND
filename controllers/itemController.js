const { Item, Category, Supplier } = require('../models');
const { Op, Sequelize } = require('sequelize');

// Fungsi untuk membuat item baru
exports.createItem = async (req, res) => {
  try {
    const { name, description, price, quantity, category_id, supplier_id } = req.body;
    
    // Menyusun created_by dengan admin ID (misalnya admin ID 1)
    const created_by = 1;  // Ganti dengan ID admin yang sedang login jika menggunakan autentikasi

    // Membuat item baru dengan relasi category dan supplier
    const item = await Item.create({
      name,
      description,
      price,
      quantity,
      category_id,
      supplier_id,
      created_by  // Mengatur created_by dengan ID admin
    });

    res.status(201).json(item);  // Mengirimkan item yang baru dibuat
  } catch (err) {
    res.status(400).json({ error: err.message });  // Mengirimkan error jika ada masalah
  }
};

// Fungsi untuk mendapatkan semua item
exports.getItems = async (req, res) => {
  try {
    const items = await Item.findAll({
      include: [Category, Supplier]  // Meng-include relasi Category dan Supplier
    });
    res.status(200).json(items);  // Mengirimkan semua item dalam format JSON
  } catch (err) {
    res.status(400).json({ error: err.message });  // Mengirimkan error jika ada masalah
  }
};
