const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customPizza: {
        base: String,
        sauce: String,
        cheese: String,
        vegetables: [String]
    },
    totalPrice: { type: Number, required: true },
    paymentStatus: { type: String, default: 'Paid (Test Mode)' },
    orderStatus: { type: String, enum: ['Order Received', 'In Kitchen', 'Sent to Delivery'], default: 'Order Received' },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Order', orderSchema);