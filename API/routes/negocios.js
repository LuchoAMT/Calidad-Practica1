const express = require('express');
const multer = require('multer');
const { verificarToken } = require('../middleware/auth'); 

const upload = multer(); // Configuración básica de multer

// Controladores
const { crearNegocio, obtenerNegocios, obtenerNegocioPorId, eliminarNegocio, actualizarNegocio } = require('../controllers/negociosController');

const router = express.Router();

// Crear un Negocio
router.post('/', upload.single('foto'), crearNegocio); 

// Obtener los Negocios
router.get('/', obtenerNegocios);

// Obtener los Negocios por id
router.get('/:id_negocio', obtenerNegocioPorId);

// Actualizar un Negocio
router.put('/:id_negocio', verificarToken, upload.single('foto'), actualizarNegocio);


// Eliminar un Negocio
router.delete('/:id_negocio', verificarToken, eliminarNegocio);

module.exports = router;