const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const { validateUser, validateUserUpdate } = require('../validators/userValidator');

// Obtener todos los usuarios
router.get('/', usersController.getAll);

// Obtener un usuario por ID
router.get('/:id', usersController.getOne);

// Crear un nuevo usuario
router.post('/', validateUser, usersController.create);

// Actualizar un usuario
router.put('/:id', validateUserUpdate, usersController.update);

// Eliminar un usuario
router.delete('/:id', usersController.delete);

module.exports = router;
