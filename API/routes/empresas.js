const express = require('express');
const { verificarToken } = require('../middleware/auth');  // Middleware para verificar token de autenticación

// Controladores
const { crearEmpresa, obtenerEmpresas, obtenerEmpresaPorId, eliminarEmpresa } = require('../controllers/empresasController');

const router = express.Router();

// Crear una empresa
router.post('/', crearEmpresa); 

// Obtener las empresas
router.get('/', obtenerEmpresas);

// Obtener las empresas por id
router.get('/:id_proveedor', obtenerEmpresaPorId);

// Eliminar una empresa
router.delete('/:id_proveedor', verificarToken, eliminarEmpresa);

module.exports = router;
