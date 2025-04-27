'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    static associate(models) {
      // Relasi banyak ke satu (M:1) dengan Admin
      Supplier.belongsTo(models.Admin, { foreignKey: 'created_by' });

      // Relasi satu ke banyak (1:M) dengan Item
      Supplier.hasMany(models.Item, { foreignKey: 'supplier_id' });
    }
  }

  Supplier.init({
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,  // Nama supplier tidak boleh null
      unique: true        // Nama supplier harus unik
    },
    contact_info: {
      type: DataTypes.STRING(100),
      allowNull: true      // Info kontak boleh kosong
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false     // created_by tidak boleh null karena merujuk ke Admin
    }
  }, {
    sequelize,
    modelName: 'Supplier',
    timestamps: true,  // Menangani otomatis `created_at` dan `updated_at`
    createdAt: 'created_at',  // Menentukan nama kolom untuk createdAt
    updatedAt: 'updated_at'   // Menentukan nama kolom untuk updatedAt
  });

  return Supplier;
};
