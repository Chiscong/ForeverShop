// MongoDB initialization script
db = db.getSiblingDB('ecommerce');

// Create collections
db.createCollection('users');
db.createCollection('products');
db.createCollection('orders');

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.products.createIndex({ "name": 1 });
db.products.createIndex({ "category": 1 });
db.orders.createIndex({ "userId": 1 });
db.orders.createIndex({ "date": -1 });

print('Database initialized successfully!');