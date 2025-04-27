const { Category } = require('../models');

// Fungsi untuk menambahkan kategori
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body; // Mengambil data nama dan deskripsi kategori dari body request

    // Validasi: pastikan nama kategori ada
    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    // Menambahkan kategori baru dalam database dengan created_by = 1 (admin statis)
    const newCategory = await Category.create({
      name,
      description,   // Menggunakan nilai deskripsi yang diterima dari request
      created_by: 1  // ID admin yang membuat kategori (ID 1 untuk admin statis)
    });

    // Mengirimkan kategori baru dalam format JSON dengan status 201
    res.status(201).json(newCategory);
  } catch (err) {
    // Jika terjadi error, kirimkan error dalam format JSON
    res.status(400).json({ error: err.message });
  }
};


// Fungsi untuk mendapatkan semua kategori
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();  // Mengambil semua kategori dari database
    res.status(200).json(categories);  // Mengirimkan kategori dalam format JSON
  } catch (err) {
    res.status(400).json({ error: err.message });  // Mengirimkan error jika ada masalah
  }
};
