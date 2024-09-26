const express = require('express');
const { verificarToken } = require('../middleware/auth');  // Middleware para verificar token de autenticación

// Controladores
const { crearEmpresa, obtenerEmpresas, eliminarEmpresa } = require('../controllers/empresasController');

const router = express.Router();

// Crear una empresa
router.post('/proveedores', verificarToken, crearEmpresa); 

// Obtener las empresas
router.get('/proveedores', verificarToken, obtenerEmpresas);

// Eliminar una empresa
router.delete('/:id', verificarToken, eliminarEmpresa);

module.exports = router;
