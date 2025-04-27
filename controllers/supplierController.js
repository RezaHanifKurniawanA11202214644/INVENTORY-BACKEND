const { Supplier } = require('../models');

// Fungsi untuk membuat supplier baru
exports.createSupplier = async (req, res) => {
  try {
    const { name, contact_info } = req.body;
    
    // Pastikan 'created_by' diisi dengan ID admin (misalnya ID 1 untuk admin pertama)
    const created_by = 1;  // Misalnya ID admin 1

    // Menambahkan supplier baru ke dalam database
    const supplier = await Supplier.create({
      name,
      contact_info,
      created_by  // Menambahkan created_by
    });

    // Mengirimkan supplier yang baru dibuat sebagai respons
    res.status(201).json(supplier);
  } catch (err) {
    // Mengirimkan error jika ada masalah
    res.status(400).json({ error: err.message });
  }
};

// Fungsi untuk mendapatkan semua supplier
exports.getSuppliers = async (req, res) => {
  try {
    // Mengambil semua supplier dari database
    const suppliers = await Supplier.findAll();
    // Mengirimkan semua supplier sebagai respons
    res.status(200).json(suppliers);
  } catch (err) {
    // Mengirimkan error jika ada masalah
    res.status(400).json({ error: err.message });
  }
};
