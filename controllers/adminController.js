const { Admin } = require('../models'); // Mengimport model Admin

// Fungsi untuk mengambil semua data admin
exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll(); // Mengambil semua data admin dari database
    res.status(200).json(admins); // Mengirimkan data admin dalam format JSON dengan status 200
  } catch (err) {
    res.status(400).json({ error: err.message }); // Jika terjadi error, kirimkan error dalam format JSON
  }
};

// Fungsi untuk menambahkan admin
exports.createAdmin = async (req, res) => {
  try {
    const { username, password, email } = req.body; // Mengambil data dari body request

    // Validasi: pastikan data yang diperlukan ada
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Membuat admin baru dalam database
    const newAdmin = await Admin.create({
      username,
      password,
      email
    });

    // Mengirimkan admin baru dalam format JSON dengan status 201 (Created)
    res.status(201).json(newAdmin);
  } catch (err) {
    // Jika terjadi error, kirimkan error dalam format JSON
    res.status(400).json({ error: err.message });
  }
};
