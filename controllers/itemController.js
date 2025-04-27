const { Item, Category, Supplier } = require('../models');
const { Op } = require('sequelize');

// Fungsi untuk mengambil semua item atau menambah item baru
exports.getOrCreateItem = async (req, res) => {
  try {
    if (req.method === 'POST') {
      // Jika request adalah POST, kita buat item baru
      const { name, description, price, quantity, category_id, supplier_id, created_by } = req.body;

      // Validasi input
      if (!name || !price || !quantity || !category_id || !supplier_id) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Membuat item baru
      const newItem = await Item.create({
        name,
        description,
        price,
        quantity,
        category_id,
        supplier_id,
        created_by
      });

      // Mengembalikan item yang baru dibuat
      return res.status(201).json(newItem);

    } else if (req.method === 'GET') {
      // Jika request adalah GET, kita ambil semua item
      const items = await Item.findAll();

      // Menghitung total stok dan total nilai
      let totalStock = 0;
      let totalValue = 0;
      let totalPrice = 0;
      let validItemsCount = 0; // Untuk menghitung item yang valid untuk rata-rata harga

      items.forEach(item => {
        const price = parseFloat(item.price); // Pastikan harga dalam bentuk angka
        const quantity = parseInt(item.quantity, 10); // Pastikan quantity dalam bentuk angka

        if (!isNaN(price) && !isNaN(quantity)) {
          totalStock += quantity;
          totalValue += price * quantity;
          totalPrice += price;
          validItemsCount++;
        }
      });

      const averagePrice = validItemsCount > 0 ? totalPrice / validItemsCount : 0;

      // Menambahkan informasi total stok, nilai, dan rata-rata harga di response
      return res.status(200).json({
        totalStock,
        totalValue,
        averagePrice,
        items
      });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Fungsi untuk menampilkan daftar barang yang stoknya di bawah ambang batas tertentu
exports.lowStockItems = async (req, res) => {
  try {
    const threshold = 5; // Ambang batas stok
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

// Fungsi untuk menampilkan ringkasan berdasarkan kategori tertentu
exports.categorySummary = async (req, res) => {
  try {
    // Ambil categoryId dari parameter URL
    const { categoryId } = req.params;

    // Cari kategori berdasarkan categoryId
    const category = await Category.findOne({ where: { id: categoryId } });

    // Jika kategori tidak ditemukan, kembalikan error 404
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Ambil item berdasarkan category_id
    const items = await Item.findAll({
      where: { category_id: category.id }
    });

    let totalStock = 0;
    let totalValue = 0;
    let totalPrice = 0;

    const itemDetails = items.map(item => {
      const price = parseFloat(item.price);  // Pastikan harga diubah ke angka
      totalStock += item.quantity;
      totalValue += price * item.quantity;  // Total value per item
      totalPrice += price;  // Total harga per item (tanpa quantity)

      return {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        quantity: item.quantity,
        totalValue: price * item.quantity  // Total value per item
      };
    });

    // Hitung rata-rata harga (total value dibagi total stock)
    const averagePrice = totalStock > 0 ? totalValue / totalStock : 0;

    // Format rata-rata harga menjadi 2 desimal
    res.status(200).json({
      category: category.name,
      totalStock,
      totalValue,
      averagePrice: parseFloat(averagePrice.toFixed(2)),  // Format rata-rata harga menjadi 2 desimal
      items: itemDetails  // Menambahkan informasi item
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Fungsi untuk menampilkan ringkasan keseluruhan sistem
exports.systemSummary = async (req, res) => {
  try {
    const items = await Item.findAll();
    const categories = await Category.findAll();
    const suppliers = await Supplier.findAll();

    let totalStock = 0;
    let totalValue = 0;

    // Menyusun informasi item, kategori, dan supplier
    const itemDetails = items.map(item => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      totalValue: parseFloat(item.price) * item.quantity,  // Menghitung total value per item
    }));


    // Menghitung total stock dan total value
    items.forEach(item => {
      totalStock += item.quantity;
      totalValue += parseFloat(item.price) * item.quantity;
    });

    res.status(200).json({
      totalItems: items.length,
      totalStock,
      totalValue,
      totalCategories: categories.length,
      totalSuppliers: suppliers.length,
      items,  // Menambahkan informasi item
      categories,
      suppliers
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
