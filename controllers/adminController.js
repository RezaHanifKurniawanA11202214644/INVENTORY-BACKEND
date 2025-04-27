const { Admin } = require('../models');

// Fungsi untuk mengambil semua data admin atau menambah admin baru
exports.getOrCreateAdmin = async (req, res) => {
  try {
    if (req.method === 'POST') {
      // Memeriksa apakah username dan password ada pada body request
      const { username, password, email } = req.body;

      // Jika username dan password ada, kita buat admin baru
      if (username && password) {
        const newAdmin = await Admin.create({
          username,
          password,
          email
        });
        return res.status(201).json(newAdmin); // Kembalikan data admin yang baru dibuat
      } else {
        return res.status(400).json({ error: 'Username and password are required' });
      }
    } else if (req.method === 'GET') {
      // Jika request adalah GET, kita ambil semua admin
      const admins = await Admin.findAll();
      return res.status(200).json(admins); // Mengirimkan data admin dalam format JSON
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
