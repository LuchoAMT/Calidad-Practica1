const express = require('express');
const { verificarToken } = require('../middleware/auth');  // Middleware para verificar token de autenticación

// Controladores
const { crearNegocio, obtenerNegocios, obtenerNegocioPorId, eliminarNegocio, actualizarNegocio } = require('../controllers/negociosController');

const router = express.Router();

// Crear un Negocio
router.post('/', crearNegocio); 

// Obtener los Negocios
router.get('/', obtenerNegocios);

// Obtener los Negocios por id
router.get('/:id_negocio', obtenerNegocioPorId);

// Actualizar un Negocio
router.put('/:id_negocio', verificarToken, actualizarNegocio);

// Eliminar un Negocio
router.delete('/:id_negocio', verificarToken, eliminarNegocio);

module.exports = router;