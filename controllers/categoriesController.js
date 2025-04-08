const Category = require('../models/category');

// Criar nova categoria
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = new Category({ name, description });
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Listar todas as categorias
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Obter categoria por ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Categoria não encontrada' });
        res.status(200).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Atualizar categoria
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!updatedCategory) return res.status(404).json({ message: 'Categoria não encontrada' });

        res.status(200).json(updatedCategory);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Excluir categoria
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) return res.status(404).json({ message: 'Categoria não encontrada' });

        res.status(200).json({ message: 'Categoria excluída com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};