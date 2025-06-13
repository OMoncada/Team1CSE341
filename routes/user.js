const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const { validateUser, validateUserUpdate } = require('../validators/userValidator');
const isAuthenticated = require('../middleware/isAuthenticated');

// ✅ Obtener todos los usuarios (protegido)
router.get('/', usersController.getAll);

// ✅ Obtener un usuario por ID (protegido)
router.get('/:id', usersController.getOne);

// ✅ Crear un nuevo usuario (protegido)
router.post('/', isAuthenticated, validateUser, usersController.create);

// ✅ Actualizar un usuario (protegido)
router.put('/:id', isAuthenticated, validateUserUpdate, usersController.update);

// ✅ Eliminar un usuario (protegido)
router.delete('/:id', isAuthenticated, usersController.delete);

module.exports = router;
