const express = require('express');
const multer = require('multer');
const { verificarToken } = require('../middleware/auth');  // Middleware para verificar token de autenticación

const upload = multer(); // Configuración básica de multer

// Controladores
const { crearEmpresa, obtenerEmpresas, obtenerEmpresaPorId, eliminarEmpresa, actualizarEmpresa } = require('../controllers/empresasController');

const router = express.Router();

// Crear una empresa
router.post('/', upload.single('logo'), crearEmpresa); 

// Obtener las empresas
router.get('/', obtenerEmpresas);

// Obtener las empresas por id
router.get('/:id_empresa', obtenerEmpresaPorId);

// Actualizar una empresa
router.put('/:id_empresa', verificarToken, upload.single('logo'), actualizarEmpresa);

// Eliminar una empresa
router.delete('/:id_empresa', verificarToken, eliminarEmpresa);

module.exports = router;