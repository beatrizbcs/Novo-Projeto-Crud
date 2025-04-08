const express = require('express');
const router = express.Router();
const {
    createHarvest,
    getHarvests,
    getHarvestById,
    updateHarvest,
    deleteHarvest
} = require('../controllers/harvestController');

// Rotas de safras
router.post('/', createHarvest);
router.get('/', getHarvests);
router.get('/:id', getHarvestById);
router.put('/:id', updateHarvest); // Rota para atualizar safra
router.delete('/:id', deleteHarvest); // Rota para deletar safra

module.exports = router;