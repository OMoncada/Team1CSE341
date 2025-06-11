const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipes');
const { validateRecipe, validateRecipeUpdate } = require('../validators/recipeValidator');
const isAuthenticated = require('../middleware/isAuthenticated');

// Obtener todas las recetas (público)
router.get('/', recipesController.getAllRecipes);

// Obtener una receta por ID (público)
router.get('/:id', recipesController.getRecipeById);

// Crear una nueva receta (protegido)
router.post('/', isAuthenticated, validateRecipe, recipesController.createRecipe);

// Actualizar una receta (protegido)
router.put('/:id', isAuthenticated, validateRecipeUpdate, recipesController.updateRecipe);

// Eliminar una receta (protegido)
router.delete('/:id', isAuthenticated, recipesController.deleteRecipe);

module.exports = router;
