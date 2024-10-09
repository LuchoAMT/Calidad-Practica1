const express = require('express');
const { verificarToken } = require('../middleware/auth');  // Middleware para verificar token de autenticación

// Controladores
const { crearEmpresa, obtenerEmpresas, eliminarEmpresa } = require('../controllers/empresasController');

const router = express.Router();

// Crear una empresa
router.post('/', crearEmpresa); 

// Obtener las empresas
router.get('/', obtenerEmpresas);

// Obtener las empresas por id
router.get('/proveedores/:id_proveedor', obtenerEmpresaPorId);

// Eliminar una empresa
<<<<<<< HEAD
router.delete('/:id_proveedor', verificarToken, eliminarEmpresa);
=======
router.delete('/:id', eliminarEmpresa);
>>>>>>> 253f682379c9138476d902634f968b911e711982

module.exports = router;
