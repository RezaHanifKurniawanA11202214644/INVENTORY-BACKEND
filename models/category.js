'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // Relasi satu ke banyak (1:M) dengan Item
      Category.hasMany(models.Item, { foreignKey: 'category_id' });

      // Relasi banyak ke satu (M:1) dengan Admin
      Category.belongsTo(models.Admin, { foreignKey: 'created_by' });
    }
  }

  Category.init({
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,  // Menambahkan validasi bahwa name tidak boleh null
      unique: true        // Nama kategori harus unik
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true      // Deskripsi boleh kosong
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false     // created_by tidak boleh null karena merujuk ke Admin
    }
  }, {
    sequelize,
    modelName: 'Category',
    timestamps: true,  // Menangani otomatis `created_at` dan `updated_at`
    createdAt: 'created_at',  // Menentukan nama kolom untuk createdAt
    updatedAt: 'updated_at'   // Menentukan nama kolom untuk updatedAt
  });

  return Category;
};
