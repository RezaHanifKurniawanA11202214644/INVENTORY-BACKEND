'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      // Relasi banyak ke satu (M:1) dengan Category
      Item.belongsTo(models.Category, { foreignKey: 'category_id' });

      // Relasi banyak ke satu (M:1) dengan Supplier
      Item.belongsTo(models.Supplier, { foreignKey: 'supplier_id' });

      // Relasi banyak ke satu (M:1) dengan Admin
      Item.belongsTo(models.Admin, { foreignKey: 'created_by' });
    }
  }

  Item.init({
    name: {
      type: DataTypes.STRING(100),
      allowNull: false  // Nama item tidak boleh null
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true  // Deskripsi boleh kosong
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false  // Harga tidak boleh null
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false  // Quantity tidak boleh null
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false  // category_id tidak boleh null
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: false  // supplier_id tidak boleh null
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false  // created_by tidak boleh null karena merujuk ke Admin
    }
  }, {
    sequelize,
    modelName: 'Item',
    timestamps: true,  // Menangani otomatis `created_at` dan `updated_at`
    createdAt: 'created_at',  // Menentukan nama kolom untuk createdAt
    updatedAt: 'updated_at'   // Menentukan nama kolom untuk updatedAt
  });

  return Item;
};
