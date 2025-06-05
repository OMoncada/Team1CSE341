const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipes');
const { validateRecipe, validateRecipeUpdate } = require('../validators/recipeValidator');

// Obtener todas las recetas
router.get('/', recipesController.getAllRecipes);

// Obtener una receta por ID
router.get('/:id', recipesController.getRecipeById);

// Crear una nueva receta
router.post('/', validateRecipe, recipesController.createRecipe);

// Actualizar una receta
router.put('/:id', validateRecipeUpdate, recipesController.updateRecipe);

// Eliminar una receta
router.delete('/:id', recipesController.deleteRecipe);

module.exports = router;
