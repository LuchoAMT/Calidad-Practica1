const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middleware/auth');  // Middleware para verificar token de autenticación

// Controladores
const { crearProducto, obtenerProductos, actualizarProducto, eliminarProducto } = require('../controllers/productosController');

// Crear un producto
router.post('/', verificarToken, crearProducto);

// Obtener los productos del proveedor
router.get('/', verificarToken, obtenerProductos);

// Actualizar un producto
router.put('/:id', verificarToken, actualizarProducto);

// Eliminar un producto
router.delete('/:id', verificarToken, eliminarProducto);

module.exports = router;
