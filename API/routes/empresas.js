const express = require('express');
const { verificarToken } = require('../middleware/auth');  // Middleware para verificar token de autenticación

// Controladores
const { crearEmpresa, obtenerEmpresas, obtenerEmpresaPorId, eliminarEmpresa, actualizarEmpresa } = require('../controllers/empresasController');

const router = express.Router();

// Crear una empresa
router.post('/', crearEmpresa); 

// Obtener las empresas
router.get('/', obtenerEmpresas);

// Obtener las empresas por id
router.get('/:id_empresa', obtenerEmpresaPorId);

// Actualizar una empresa
router.put('/:id_empresa', verificarToken, actualizarEmpresa);

// Eliminar una empresa
router.delete('/:id_empresa', verificarToken, eliminarEmpresa);

module.exports = router;