const { Supplier, Item } = require('../models');

// Fungsi untuk mengambil semua supplier atau menambah supplier baru
exports.getOrCreateSupplier = async (req, res) => {
  try {
    // Jika request adalah POST, kita akan menambah supplier baru
    if (req.method === 'POST') {
      const { name, contact_info,  created_by} = req.body;

      // Validasi input, pastikan name tidak kosong
      if (!name) {
        return res.status(400).json({ error: 'Name is required to create a supplier' });
      }

      // Menambah supplier baru
      const newSupplier = await Supplier.create({
        name,
        contact_info,
        created_by
      });

      // Mengembalikan supplier yang baru dibuat
      return res.status(201).json(newSupplier);

    } else if (req.method === 'GET') {
      // Jika request adalah GET, kita ambil semua supplier
      const suppliers = await Supplier.findAll();
      return res.status(200).json(suppliers);  // Mengirimkan supplier dalam format JSON
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



// Fungsi untuk menampilkan ringkasan barang yang disuplai oleh masing-masing pemasok
exports.supplierSummary = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();

    const supplierSummaries = await Promise.all(suppliers.map(async (supplier) => {
      const items = await Item.findAll({
        where: { supplier_id: supplier.id }
      });

      let totalStock = 0;
      let totalValue = 0;

      items.forEach(item => {
        totalStock += item.quantity;
        totalValue += item.price * item.quantity;
      });

      return {
        supplier: supplier.name,
        totalStock,
        totalValue,
        informasiItems: items.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          quantity: item.quantity,
          category_id: item.category_id,
          supplier_id: item.supplier_id,
          created_by: item.created_by,
          created_at: item.created_at,
          updated_at: item.updated_at
        }))        
      };
    }));

    res.status(200).json(supplierSummaries);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
