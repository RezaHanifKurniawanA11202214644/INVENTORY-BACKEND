# 🏦 Inventory Management Backend

Sebuah aplikasi **RESTful API** berbasis **Node.js**, **Express**, **Sequelize**, dan **PostgreSQL**. Proyek ini telah dikontainerisasi menggunakan **Docker** agar mudah dijalankan di berbagai lingkungan.

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
  - Jumlah barang, total nilai stok per kategori, dan harga rata-rata perkategori.

- **Ringkasan Berdasarkan Pemasok:**
  - Menampilkan jumlah barang per pemasok dan total nilai barang yang mereka suplai.

- **Ringkasan Keseluruhan Sistem:**
  - Total jumlah barang, nilai keseluruhan stok, jumlah kategori, dan jumlah pemasok serta informasi lengkap barang, supplier, category.

---

## 🛠️ Tahapan Pembuatan Proyek

### 1. Inisialisasi Proyek
```bash
npm init -y
```

### 2. Install Dependensi
```bash
npm install express sequelize pg pg-hstore dotenv
npm install --save-dev sequelize-cli nodemon
```

### 3. Inisialisasi Struktur Sequelize
```bash
npx sequelize-cli init
```

Akan membuat folder berikut:
- `config/` untuk konfigurasi DB
- `models/`, `migrations/`, dan `seeders/`

### 4. Konfigurasi Database (`config/config.json`)
```json
{
  "development": {
    "username": "postgres",
    "password": "123",
    "database": "db_inventory",
    "host": "db",
    "dialect": "postgres",
    "port": 5432
  }
}
```

### 5. Buat Model dan Migrasi
Contoh:
```bash
npx sequelize-cli model:generate --name Item --attributes name:string,stock:integer,price:float
```
Lakukan hal yang sama untuk `Category`, `Supplier`, `Admin`.

### 6. Jalankan Migrasi
```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

---

## 🫳‍♂️ Struktur Proyek

```
inventory-backend/
├── config/
├── controllers/
├── migrations/
├── models/
├── routes/
├── seeders/
├── Dockerfile
├── docker-compose.yml
├── package.json
└── index.js
```

---

## 🐳 Menjalankan Aplikasi dengan Docker

### 1. Build dan Jalankan
```bash
docker-compose up --build
```

### 2. Jika sudah pernah dibuild:
```bash
docker-compose up
```

### 3. Akses API
```
http://localhost:3000/api
```

Database dan data tidak akan hilang meskipun container dimatikan karena menggunakan named volume:
```yaml
volumes:
  postgres_data:
    driver: local
```

---

## 📋 Endpoint API

## 📋 Endpoint API

Semua endpoint dapat diakses melalui base URL:  
`http://localhost:3000/api`

| Endpoint                                           | Method | Deskripsi                                                                                      | Contoh URL                                                  |
|----------------------------------------------------|--------|-----------------------------------------------------------------------------------------------|-------------------------------------------------------------|
| `/admins`                                          | POST   | Tambah admin baru                                                                             | `http://localhost:3000/api/admins`                          |
| `/admins`                                          | GET    | Lihat semua admin                                                                             | `http://localhost:3000/api/admins`                          |
| `/categories`                                      | POST   | Tambah kategori baru                                                                          | `http://localhost:3000/api/categories`                      |
| `/categories`                                      | GET    | Lihat semua kategori                                                                          | `http://localhost:3000/api/categories`                      |
| `/suppliers`                                       | POST   | Tambah supplier baru                                                                          | `http://localhost:3000/api/suppliers`                       |
| `/suppliers`                                       | GET    | Lihat semua supplier                                                                          | `http://localhost:3000/api/suppliers`                       |
| `/items`                                           | POST   | Tambah item baru                                                                              | `http://localhost:3000/api/items`                           |
| `/items`                                           | GET    | Lihat semua ringkasan item, total stok, nilai stok, dan harga rata-rata                                | `http://localhost:3000/api/items`                           |
| `/items/low-stock`                                 | GET    | Lihat barang dengan stok di bawah 5 unit                                                      | `http://localhost:3000/api/items/low-stock`                 |
| `/items/:categoryId/category-byid-summary`         | GET    | Ringkasan barang dalam kategori tertentu                                                      | `http://localhost:3000/api/items/3/category-byid-summary`  |
| `/items/categorySummary`                           | GET    | Ringkasan per kategori, jumlah, nilai, dan rata-rata harga                                     | `http://localhost:3000/api/items/categorySummary`           |
| `/suppliers/supplierSummary`                       | GET    | Ringkasan barang berdasarkan supplier                                                         | `http://localhost:3000/api/suppliers/supplierSummary`       |
| `/items/system-summary`                            | GET    | Ringkasan keseluruhan sistem       (lengkap)                                                           | `http://localhost:3000/api/items/system-summary`            |



---

## 📆 Catatan Penting

- Anda bisa mengecek isi database container dengan:
```bash
docker exec -it postgres_db psql -U postgres -d db_inventory
```

- Jika ingin pakai GUI (seperti HeidiSQL), arahkan ke:
```
Host: localhost
Port: 5432
User: postgres
Password: 123
Database: db_inventory
```

- File konfigurasi database ada di `config/config.json`, menggunakan env `development` secara default.
- Anda bisa mengatur `NODE_ENV` lewat Docker Compose:
```yaml
environment:
  - NODE_ENV=development
```

---

## ✨ Pengembang

Proyek ini dibuat oleh **Reza Hanif** untuk kebutuhan pembelajaran dan pengembangan sistem manajemen inventaris modern berbasis container.

---

