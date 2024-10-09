const express = require('express');
const router = express.Router();

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
