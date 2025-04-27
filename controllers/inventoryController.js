const { Op, Sequelize } = require('sequelize');
const { Item, Category, Supplier } = require('../models');

// Fungsi untuk mendapatkan ringkasan stok (total stok, total nilai, harga rata-rata)
exports.getStockSummary = async (req, res) => {
  try {
    // Menghitung total stok
    const totalStock = await Item.sum('quantity');
    // Menghitung total nilai stok (harga * jumlah)
    const totalValue = await Item.sum(Sequelize.literal('price * quantity'));
    // Menghitung harga rata-rata barang
    const averagePrice = await Item.avg('price');

    res.status(200).json({
      totalStock,
      totalValue,
      averagePrice
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Fungsi untuk mendapatkan item dengan stok rendah (di bawah ambang batas)
exports.getLowStockItems = async (req, res) => {
  try {
    const threshold = req.query.threshold || 5;
    const lowStockItems = await Item.findAll({
      where: {
        quantity: { [Op.lt]: threshold }
      }
    });
    res.status(200).json(lowStockItems);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Fungsi untuk mendapatkan barang berdasarkan kategori tertentu
exports.getItemsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const items = await Item.findAll({
      where: { category_id: categoryId },
      include: [Category, Supplier]
    });
    res.status(200).json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Fungsi untuk mendapatkan ringkasan per kategori
exports.getCategorySummary = async (req, res) => {
  try {
    const categorySummary = await Category.findAll({
      include: [{
        model: Item,
        attributes: [
          [Sequelize.fn('COUNT', Sequelize.col('id')), 'totalItems'],
          [Sequelize.fn('SUM', Sequelize.literal('price * quantity')), 'totalValue'],
          [Sequelize.fn('AVG', Sequelize.col('price')), 'averagePrice']
        ]
      }],
      group: ['Category.id']
    });

    res.status(200).json(categorySummary);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Fungsi untuk mendapatkan ringkasan per pemasok
exports.getSupplierSummary = async (req, res) => {
  try {
    const supplierSummary = await Supplier.findAll({
      include: [{
        model: Item,
        attributes: [
          [Sequelize.fn('COUNT', Sequelize.col('id')), 'totalItems'],
          [Sequelize.fn('SUM', Sequelize.literal('price * quantity')), 'totalValue']
        ]
      }],
      group: ['Supplier.id']
    });

    res.status(200).json(supplierSummary);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Fungsi untuk mendapatkan ringkasan keseluruhan sistem
exports.getSystemSummary = async (req, res) => {
  try {
    const totalItems = await Item.count();
    const totalStockValue = await Item.sum(Sequelize.literal('price * quantity'));
    const totalCategories = await Category.count();
    const totalSuppliers = await Supplier.count();

    res.status(200).json({
      totalItems,
      totalStockValue,
      totalCategories,
      totalSuppliers
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
