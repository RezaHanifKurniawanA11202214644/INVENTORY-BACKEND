const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController'); // Import Controller Admin

// Routing untuk mengambil semua data admin
router.get('/', adminController.getAdmins);

// Routing untuk menambahkan admin baru
router.post('/', adminController.createAdmin);

module.exports = router;
