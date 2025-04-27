const { Category, Item } = require('../models'); 

exports.getOrCreateCategory = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { name, description, created_by } = req.body;  // <<=== AMBIL created_by dari req.body

      if (!name) {
        return res.status(400).json({ error: 'Category name is required' });
      }

      if (!created_by) {
        return res.status(400).json({ error: 'Created_by is required' });  // Validasi tambahan
      }

      const newCategory = await Category.create({
        name,
        description,
        created_by 
      });

      return res.status(201).json(newCategory);
    } else if (req.method === 'GET') {
      const categories = await Category.findAll();
      return res.status(200).json(categories);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Fungsi untuk menampilkan ringkasan semua kategori
exports.allCategoriesSummary = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: {
        model: Item,
        as: 'Items', // Pastikan alias sama dengan di model relasi kalau pakai alias
      }
    });

    const summaries = categories.map(category => {
      const items = category.Items || [];

      let totalStock = 0;
      let totalValue = 0;
      let totalPrice = 0;

      items.forEach(item => {
        totalStock += item.quantity;
        totalValue += item.price * item.quantity;
        totalPrice += item.price;
      });

      const averagePrice = items.length > 0 ? totalPrice / items.length : 0;

      return {
        categoryId: category.id,
        categoryName: category.name,
        totalItems: items.length,
        totalStock,
        totalValue,
        averagePrice,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          quantity: item.quantity,
          created_by: item.created_by,  // Menyertakan created_by dari item
          supplier_id: item.supplier_id,  // Menyertakan supplier_id dari item
          create_at: item.create_at,
          update_at: item.update_at
        }))
      };
    });

    res.status(200).json(summaries);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

