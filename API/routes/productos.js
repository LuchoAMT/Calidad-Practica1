const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middleware/auth');  // Middleware para verificar token de autenticación

// Controladores
const { crearProducto, obtenerProductos, actualizarProducto, eliminarProducto } = require('../controllers/productosController');

// Crear un producto
router.post('/', crearProducto);

// Obtener los productos del proveedor
router.get('/', obtenerProductos);

// Actualizar un producto
router.put('/:id', actualizarProducto);

// Eliminar un producto
router.delete('/:id', eliminarProducto);

module.exports = router;
