const bcrypt = require('bcrypt');
const db = require('../db');  // Conexión a la base de datos

// Crear un nuevo negocio 
exports.crearNegocio = async (req, res) => {
    const { nombre, informacion, correo, contraseña, latitud, longitud, contacto, foto } = req.body;
    const negocioId = req.usuarioId;  // ID del negocio autenticado

    const saltRounds = 10;

    try {
        // Hasheamos la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

        const query = 'INSERT INTO negocios (nombre, correo, contraseña, informacion, latitud, longitud, contacto, foto, id_negocio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

        const [result] = await db.query(query, [nombre, correo, hashedPassword, informacion, latitud, longitud, contacto, foto, negocioId]);

        res.status(201).json({ mensaje: 'negocio creado con éxito' });
    } catch (err) {
        console.error('Error al crear el negocio:', err);
        return res.status(500).json({ error: err.message });
    }
};

// Obtener negocios
exports.obtenerNegocios = async (req, res) => {

    const query = 'SELECT * FROM negocios';

    try {
        const [results] = await db.query(query);
        res.json(results);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.obtenerNegocioPorId = async (req, res) => {
    const negocioId = req.params.id_negocio;
    
    try {
        // Usar await para manejar la promesa de la consulta
        const [results] = await db.query('SELECT * FROM negocios WHERE id_negocio = ?', [negocioId]);

        // Verificar si se encontró la negocio
        if (results.length === 0) {
            return res.status(404).send('negocio no encontrado.');
        }

        // Enviar la primera coincidencia
        res.json(results[0]);
    } catch (err) {
        // Manejo de errores
        return res.status(500).send('Error al consultar el negocio.');
    }
};


// Eliminar una negocio
exports.eliminarNegocio = async (req, res) => {
    const negocioId = req.params.id;

    const query = 'DELETE FROM negocios WHERE id_negocio = ? AND id = ?';

    try {
        const [result] = await db.query(query, [req.usuarioId, negocioId]);
        res.json({ mensaje: 'negocio eliminado con éxito' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};