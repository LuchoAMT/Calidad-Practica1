const express = require('express');
const { verificarToken } = require('../middleware/auth');  // Middleware para verificar token de autenticación

// Controladores
const { crearEmpresa, obtenerEmpresas, eliminarEmpresa } = require('../controllers/empresasController');

const router = express.Router();

// Crear una empresa
router.post('/', crearEmpresa); 

// Obtener las empresas
router.get('/', obtenerEmpresas);

// Eliminar una empresa
router.delete('/:id', eliminarEmpresa);

module.exports = router;
