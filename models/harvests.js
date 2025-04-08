const mongoose = require('mongoose');

const harvestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    plantationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plantation', required: true }
});

const Harvest = mongoose.model('Harvest', harvestSchema);

module.exports = Harvest;