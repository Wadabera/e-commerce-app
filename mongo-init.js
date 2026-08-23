// MongoDB initialization script
db = db.getSiblingDB('ecommerce');

// Create collections if they don't exist
db.createCollection('users');
db.createCollection('products');
db.createCollection('orders');
db.createCollection('carts');

print('MongoDB initialized successfully for ecommerce database');
