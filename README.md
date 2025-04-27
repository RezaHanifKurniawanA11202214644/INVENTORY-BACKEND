# 📦 Inventory Management Backend

Sebuah aplikasi **RESTful API** berbasis **Node.js** + **Express.js** untuk **mengelola stok barang**, **kategori**, dan **pemasok** di dalam sistem inventaris.  
Project ini juga sudah mendukung **Dockerization** menggunakan **PostgreSQL** sebagai database.

---

## ✨ Fitur Utama

- **Create + Read untuk Data Item:**
  - Menambahkan item baru ke inventaris.
  - Melihat daftar semua item yang tersedia.

- **Create + Read untuk Data Kategori:**
  - Menambahkan kategori baru.
  - Melihat daftar semua kategori.

- **Create + Read untuk Data Supplier:**
  - Menambahkan supplier baru.
  - Melihat daftar semua supplier.

- **Ringkasan Stok Barang:**
  - Menampilkan total stok, total nilai stok (`harga * jumlah`), dan harga rata-rata barang.

- **Barang dengan Stok Rendah:**
  - Menampilkan daftar barang dengan stok di bawah ambang batas tertentu (default 5 unit).

- **Barang berdasarkan Kategori:**
  - Menampilkan barang yang termasuk dalam kategori tertentu.

- **Ringkasan Per Kategori:**
  - Jumlah barang, total nilai stok per kategori, dan harga rata-rata dalam kategori tersebut.

- **Ringkasan Berdasarkan Pemasok:**
  - Menampilkan jumlah barang per pemasok dan total nilai barang yang mereka suplai.

- **Ringkasan Keseluruhan Sistem:**
  - Total jumlah barang, nilai keseluruhan stok, jumlah kategori, dan jumlah pemasok.

---

## 🛠️ Teknologi yang Digunakan

- **Node.js** + **Express.js** - Backend server
- **Sequelize ORM** - Abstraksi database
- **PostgreSQL** - Database Relational
- **Docker** - Untuk containerisasi aplikasi
- **Docker Compose** - Untuk mengatur multi-container setup

---

## 💃 Struktur Proyek

```
inventory-backend/
🕺
👉 controllers/
🕺   └︎ inventoryController.js
👉 models/
🕺   ├︎ admin.js
🕺   ├︎ category.js
🕺   ├︎ item.js
🕺   └︎ supplier.js
👉 routes/
🕺   ├︎ adminRoutes.js
🕺   ├︎ categoryRoutes.js
🕺   ├︎ itemRoutes.js
🕺   ├︎ supplierRoutes.js
🕺   └︎ inventoryRoutes.js
👉 config/
🕺   └︎ config.json   # Konfigurasi database
👉 Dockerfile
👉 docker-compose.yml
👉 package.json
👉 README.md
```

---

## ⚙️ Cara Menjalankan (Local Development)

1. **Install Dependency:**

```bash
npm install
```

2. **Setting Database:**
   - Pastikan PostgreSQL berjalan di `localhost` port `5432`.
   - Pastikan database `db_inventory` sudah dibuat.

3. **Migrasi Database (jika ada migration):**

```bash
npx sequelize db:migrate
```

4. **Jalankan Server:**

```bash
npm start
```

Server akan berjalan di `http://localhost:3000`

---

## 🐳 Cara Menjalankan dengan Docker

1. **Build dan Run dengan Docker Compose:**

```bash
docker-compose up --build
```

2. **Akses API di:**

```bash
http://localhost:3000/api
```

---

## 📋 Endpoint Utama

| Endpoint | Method | Deskripsi |
|:---------|:-------|:----------|
| `/api/items` | POST | Menambahkan item baru |
| `/api/items` | GET | Melihat daftar item |
| `/api/categories` | POST | Menambahkan kategori baru |
| `/api/categories` | GET | Melihat daftar kategori |
| `/api/suppliers` | POST | Menambahkan supplier baru |
| `/api/suppliers` | GET | Melihat daftar supplier |
| `/api/inventory/stock-summary` | GET | Ringkasan stok barang |
| `/api/inventory/low-stock?threshold=5` | GET | Daftar barang dengan stok rendah |
| `/api/inventory/items/category/:categoryId` | GET | Barang berdasarkan kategori |
| `/api/inventory/category-summary` | GET | Ringkasan per kategori |
| `/api/inventory/supplier-summary` | GET | Ringkasan per pemasok |
| `/api/inventory/system-summary` | GET | Ringkasan keseluruhan sistem |

---

## 📢 Catatan

- Tidak menggunakan `.env` file (semua konfigurasi ada di `config/config.json`).
- Untuk keamanan dan fleksibilitas, sebaiknya gunakan `.env` di masa depan.

---

## ✍️ Author

- Project ini dibuat oleh **Prof Reza** untuk pengembangan sistem inventory berbasis API backend.

---

