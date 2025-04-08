const express = require('express');
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

// Rotas de produtos
router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct); // Rota para atualizar produto
router.delete('/:id', deleteProduct); // Rota para deletar produto

module.exports = router;