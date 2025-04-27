'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';  // Ambil environment (default: development)
const config = require(__dirname + '/../config/config.json')[env]; // Load konfigurasi dari config.json berdasarkan environment
const db = {};

let sequelize;

// Cek apakah menggunakan variabel lingkungan (untuk koneksi dengan database)
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    logging: false, // Menyembunyikan log query untuk output yang lebih bersih (optional)
  });
}

// Menyaring dan memuat file model dari direktori
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&  // Menghindari file yang diawali titik (misalnya .gitignore)
      file !== basename &&        // Menghindari file ini sendiri
      file.slice(-3) === '.js' && // Mengambil hanya file JS
      file.indexOf('.test.js') === -1  // Menghindari file test
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Memanggil method 'associate' untuk setiap model yang mendefinisikan asosiasi
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Menambahkan sequelize dan Sequelize ke objek db untuk bisa digunakan di seluruh aplikasi
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;