const db = require('../db');  // Conexión a la base de datos

// Crear un nuevo producto
exports.crearEmpresa = async (req, res) => {
    const { nombre, descripcion, correo, contraseña, direccion, contacto, logo } = req.body;
    const proveedorId = req.usuarioId;  // ID del proveedor autenticado

    const query = 'INSERT INTO proveedores (nombre, correo, contraseña, descripcion, direccion, contacto, logo, id_proveedor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    try {
        const [result] = await db.query(query, [nombre, descripcion, correo, contraseña, direccion, contacto, logo, proveedorId]);
        res.status(201).json({ mensaje: 'Empresa creada con éxito' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Obtener productos del proveedor autenticado
exports.obtenerEmpresas = async (req, res) => {
    const proveedorId = req.usuarioId;

    const query = 'SELECT * FROM proveedores';

    try {
        const [results] = await db.query(query);
        res.json(results);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Eliminar una empresa
exports.eliminarEmpresa = async (req, res) => {
    const proveedorId = req.params.id;

    const query = 'DELETE FROM proveedores WHERE id_proveedor = ? AND id = ?';

    try {
        const [result] = await db.query(query, [req.usuarioId, proveedorId]);
        res.json({ mensaje: 'Empresa eliminada con éxito' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
