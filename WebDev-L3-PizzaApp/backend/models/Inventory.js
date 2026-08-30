const mongoose = require('mongoose');
const inventorySchema = new mongoose.Schema({
    itemName: { type: String, required: true }, // e.g., "Mozzarella Cheese", "Thin Crust"
    category: { type: String, required: true }, // "base", "sauce", "cheese", "vegetable"
    stockCount: { type: Number, required: true, default: 50 },
    lowStockThreshold: { type: Number, default: 15 }
});
module.exports = mongoose.model('Inventory', inventorySchema);