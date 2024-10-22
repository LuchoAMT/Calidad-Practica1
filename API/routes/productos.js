const express = require('express');
const router = express.Router();

// Controladores
const { crearProducto, obtenerProductosPorProveedor, actualizarProducto, eliminarProducto,obtenerPorductoPorId } = require('../controllers/productosController');

// Crear un producto
router.post('/', crearProducto);

// Obtener los productos 
router.get('/', obtenerProductosPorProveedor);

// Actualizar un producto
router.put('/:id', actualizarProducto);

router.get('/:id_producto', obtenerPorductoPorId);

// Eliminar un producto
router.delete('/:id', eliminarProducto);

module.exports = router;
