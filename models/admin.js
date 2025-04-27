'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {
      // Relasi Admin dengan Categories, Suppliers, dan Items
      Admin.hasMany(models.Category, { foreignKey: 'created_by' });
      Admin.hasMany(models.Supplier, { foreignKey: 'created_by' });
      Admin.hasMany(models.Item, { foreignKey: 'created_by' });
    }
  }
  
  Admin.init({
    username: {
      type: DataTypes.STRING(50),  // Menambahkan panjang maksimum 50 karakter
      allowNull: false,            // Username tidak boleh null
      unique: true                  // Username harus unik
    },
    password: {
      type: DataTypes.STRING(100), // Menambahkan panjang maksimum 100 karakter
      allowNull: false,            // Password tidak boleh null
    },
    email: {
      type: DataTypes.STRING(100), // Menambahkan panjang maksimum 100 karakter
      allowNull: true              // Email boleh null
    }
  }, {
    sequelize,
    modelName: 'Admin',
    timestamps: true,  // Akan otomatis mengelola `created_at` dan `updated_at`
    createdAt: 'created_at',  // Nama kolom untuk createdAt
    updatedAt: 'updated_at'   // Nama kolom untuk updatedAt
  });
  
  return Admin;
};
