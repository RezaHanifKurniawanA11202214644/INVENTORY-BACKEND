# Menggunakan image Node.js
FROM node:16

# Set working directory
WORKDIR /app

# Copy file dependency
COPY package*.json ./

# Install dependency
RUN npm install

# Copy seluruh project
COPY . .

# Expose port aplikasi
EXPOSE 3000

# Command untuk menjalankan app
CMD ["npm", "start"]
