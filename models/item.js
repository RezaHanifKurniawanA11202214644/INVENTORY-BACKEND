'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      Item.belongsTo(models.Category, { foreignKey: 'category_id' });
      Item.belongsTo(models.Supplier, { foreignKey: 'supplier_id' });
      Item.belongsTo(models.Admin, { foreignKey: 'created_by' });
    }
  }
  Item.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    quantity: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    supplier_id: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Item;
};
