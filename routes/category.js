const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categories');
const { validateCategory } = require('../validators/categoryValidator');

// Obtener todas las categorías
router.get('/', categoryController.getAllCategories);

// Crear una nueva categoría
router.post('/', validateCategory, categoryController.createCategory);

// Eliminar una categoría por ID
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
