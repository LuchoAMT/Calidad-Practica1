const db = require('../db');  // Conexión a la base de datos

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
    const { nombre, descripcion, precio, stock } = req.body;
    const proveedorId = req.usuarioId;  // ID del proveedor autenticado

    const query = 'INSERT INTO productos (nombre, descripcion, precio, stock, id_proveedor) VALUES (?, ?, ?, ?, ?)';

    try {
        const [result] = await db.query(query, [nombre, descripcion, precio, stock, proveedorId]);
        res.status(201).json({ mensaje: 'Producto creado con éxito' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Obtener productos del proveedor autenticado
exports.obtenerProductos = async (req, res) => {
    const proveedorId = req.usuarioId;

    const query = 'SELECT * FROM productos';

    try {
        const [results] = await db.query(query);
        res.json(results);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Actualizar un producto
exports.actualizarProducto = async (req, res) => {
    const { nombre, descripcion, precio, stock } = req.body;
    const productoId = req.params.id;

    const query = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id_producto = ? AND id_proveedor = ?';

    try {
        const [result] = await db.query(query, [nombre, descripcion, precio, stock, productoId, req.usuarioId]);
        res.json({ mensaje: 'Producto actualizado con éxito' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Eliminar un producto
exports.eliminarProducto = async (req, res) => {
    const productoId = req.params.id;

    const query = 'DELETE FROM productos WHERE id_producto = ? AND id_proveedor = ?';

    try {
        const [result] = await db.query(query, [productoId, req.usuarioId]);
        res.json({ mensaje: 'Producto eliminado con éxito' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
