const db = require('../db');  // Conexión a la base de datos

// Crear un nuevo producto
exports.crearProducto = (req, res) => {
    const { nombre, descripcion, precio, stock } = req.body;
    const proveedorId = req.usuarioId;  // ID del proveedor autenticado

    const query = 'INSERT INTO productos (nombre, descripcion, precio, stock, id_proveedor) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [nombre, descripcion, precio, stock, proveedorId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ mensaje: 'Producto creado con éxito' });
    });
};

// Obtener productos del proveedor autenticado
exports.obtenerProductos = (req, res) => {
    const proveedorId = req.usuarioId;

    const query = 'SELECT * FROM productos';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Actualizar un producto
exports.actualizarProducto = (req, res) => {
    const { nombre, descripcion, precio, stock } = req.body;
    const productoId = req.params.id;

    const query = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id_producto = ? AND id_proveedor = ?';
    db.query(query, [nombre, descripcion, precio, stock, productoId, req.usuarioId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Producto actualizado con éxito' });
    });
};

// Eliminar un producto
exports.eliminarProducto = (req, res) => {
    const productoId = req.params.id;

    const query = 'DELETE FROM productos WHERE id_producto = ? AND id_proveedor = ?';
    db.query(query, [productoId, req.usuarioId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Producto eliminado con éxito' });
    });
};
