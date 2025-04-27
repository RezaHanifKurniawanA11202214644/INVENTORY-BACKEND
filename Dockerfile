# Menggunakan image Node.js yang sudah ada sebagai base image
FROM node:18

# Set working directory di dalam container
WORKDIR /app

# Menyalin package.json dan package-lock.json ke container
COPY package*.json ./ 

# Menginstall dependensi aplikasi
RUN npm install

# Menyalin semua file ke dalam container
COPY . . 

# Expose port untuk aplikasi backend
EXPOSE 3000

# Perintah untuk menjalankan aplikasi, sudah termasuk migrasi
CMD ["npm", "start"]