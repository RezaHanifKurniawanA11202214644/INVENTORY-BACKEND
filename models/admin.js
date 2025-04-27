'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {
      Admin.hasMany(models.Category, { foreignKey: 'created_by' });
      Admin.hasMany(models.Supplier, { foreignKey: 'created_by' });
      Admin.hasMany(models.Item, { foreignKey: 'created_by' });
    }
  }
  Admin.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Admin',
    timestamps: true,  // Tambahkan ini untuk menggunakan `created_at` dan `updated_at`
    createdAt: 'created_at',  // Tentukan nama kolom untuk createdAt
    updatedAt: 'updated_at'   // Tentukan nama kolom untuk updatedAt
  });
  return Admin;
};
