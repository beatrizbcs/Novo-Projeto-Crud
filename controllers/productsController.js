const Product = require('../models/product');

// Criar novo produto
exports.createProduct = async (req, res) => {
    try {
        const { name, price, stock } = req.body;
        const product = new Product({ name, price, stock });
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Listar todos os produtos
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Obter produto por ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Atualizar produto
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, stock } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, stock }, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Produto não encontrado' });

        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Excluir produto
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) return res.status(404).json({ message: 'Produto não encontrado' });

        res.status(200).json({ message: 'Produto excluído com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};