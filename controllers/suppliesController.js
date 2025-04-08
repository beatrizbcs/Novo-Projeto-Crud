const Supply = require('../models/supply');

// Criar novo suprimento
exports.createSupply = async (req, res) => {
    try {
        const { name, quantity, supplier } = req.body;
        const supply = new Supply({ name, quantity, supplier });
        await supply.save();
        res.status(201).json(supply);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Listar todos os suprimentos
exports.getSupplies = async (req, res) => {
    try {
        const supplies = await Supply.find();
        res.status(200).json(supplies);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Obter suprimento por ID
exports.getSupplyById = async (req, res) => {
    try {
        const supply = await Supply.findById(req.params.id);
        if (!supply) return res.status(404).json({ message: 'Suprimento não encontrado' });
        res.status(200).json(supply);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Atualizar suprimento
exports.updateSupply = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, quantity, supplier } = req.body;

        const updatedSupply = await Supply.findByIdAndUpdate(id, { name, quantity, supplier }, { new: true });
        if (!updatedSupply) return res.status(404).json({ message: 'Suprimento não encontrado' });

        res.status(200).json(updatedSupply);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Excluir suprimento
exports.deleteSupply = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSupply = await Supply.findByIdAndDelete(id);
        if (!deletedSupply) return res.status(404).json({ message: 'Suprimento não encontrado' });

        res.status(200).json({ message: 'Suprimento excluído com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};