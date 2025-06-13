const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categories');
const isAuthenticated = require('../middleware/isAuthenticated');
const { validateCategory, validateCategoryUpdate } = require('../validators/categoryValidator');

// Obtener todas las categorías
router.get('/', categoryController.getAllCategories);

// Obtener una categoría por ID
router.get('/:id', categoryController.getCategoryById);

// Crear una nueva categoría (protegido)
router.post('/', isAuthenticated, validateCategory, categoryController.createCategory);

// Actualizar una categoría (protegido)
router.put('/:id', isAuthenticated, validateCategoryUpdate, categoryController.updateCategory);

// Eliminar una categoría (protegido)
router.delete('/:id', isAuthenticated, categoryController.deleteCategory);

module.exports = router;
