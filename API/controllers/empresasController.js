const bcrypt = require('bcrypt');
const db = require('../db');  // Conexión a la base de datos

// Crear una nueva empresa 
exports.crearEmpresa = async (req, res) => {
    const { nombre, descripcion, correo, contraseña, latitud, longitud, contacto, logo } = req.body;
    const empresaId = req.usuarioId;  // ID de la empresa autenticada

    const saltRounds = 10;

    try {
        // Hasheamos la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

        const query = 'INSERT INTO empresas (nombre, correo, contraseña, descripcion, latitud, longitud, contacto, logo, id_empresa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

        const [result] = await db.query(query, [nombre, correo, hashedPassword, descripcion, latitud, longitud, contacto, logo, empresaId]);

        res.status(201).json({ mensaje: 'Empresa creada con éxito' });
    } catch (err) {
        console.error('Error al crear la empresa:', err);
        return res.status(500).json({ error: err.message });
    }
};

// Obtener productos de la empresa autenticado
exports.obtenerEmpresas = async (req, res) => {

    const query = 'SELECT * FROM empresas';

    try {
        const [results] = await db.query(query);
        res.json(results);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.obtenerEmpresaPorId = async (req, res) => {
    const empresaId = req.params.id_empresa;
    
    try {
        // Usar await para manejar la promesa de la consulta
        const [results] = await db.query('SELECT * FROM empresas WHERE id_empresa = ?', [empresaId]);

        // Verificar si se encontró la empresa
        if (results.length === 0) {
            return res.status(404).send('Empresa no encontrada.');
        }

        // Enviar la primera coincidencia
        res.json(results[0]);
    } catch (err) {
        // Manejo de errores
        return res.status(500).send('Error al consultar la empresa.');
    }
};


// Eliminar una empresa
exports.eliminarEmpresa = async (req, res) => {
    const empresaId = req.params.id;

    const query = 'DELETE FROM empresas WHERE id_empresa = ? AND id = ?';

    try {
        const [result] = await db.query(query, [req.usuarioId, empresaId]);
        res.json({ mensaje: 'Empresa eliminada con éxito' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};