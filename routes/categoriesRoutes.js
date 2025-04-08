const express = require('express');
const router = express.Router();
const {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');

// Rotas de categorias
router.post('/', createCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategory); // Rota para atualizar categoria
router.delete('/:id', deleteCategory); // Rota para deletar categoria

module.exports = router;