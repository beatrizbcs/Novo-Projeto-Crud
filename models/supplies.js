const mongoose = require('mongoose');

const supplySchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true }
});

const Supply = mongoose.model('Supply', supplySchema);

module.exports = Supply;