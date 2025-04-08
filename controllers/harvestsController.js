const Harvest = require('../models/harvest');

// Criar nova safra
exports.createHarvest = async (req, res) => {
    try {
        const { name, startDate, endDate, plantationId } = req.body;
        const harvest = new Harvest({ name, startDate, endDate, plantationId });
        await harvest.save();
        res.status(201).json(harvest);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Listar todas as safras
exports.getHarvests = async (req, res) => {
    try {
        const harvests = await Harvest.find();
        res.status(200).json(harvests);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Obter safra por ID
exports.getHarvestById = async (req, res) => {
    try {
        const harvest = await Harvest.findById(req.params.id);
        if (!harvest) return res.status(404).json({ message: 'Safra não encontrada' });
        res.status(200).json(harvest);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Atualizar safra
exports.updateHarvest = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, startDate, endDate, plantationId } = req.body;

        const updatedHarvest = await Harvest.findByIdAndUpdate(id, { name, startDate, endDate, plantationId }, { new: true });
        if (!updatedHarvest) return res.status(404).json({ message: 'Safra não encontrada' });

        res.status(200).json(updatedHarvest);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Excluir safra
exports.deleteHarvest = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedHarvest = await Harvest.findByIdAndDelete(id);
        if (!deletedHarvest) return res.status(404).json({ message: 'Safra não encontrada' });

        res.status(200).json({ message: 'Safra excluída com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};