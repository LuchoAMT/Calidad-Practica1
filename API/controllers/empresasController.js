const bcrypt = require('bcrypt');
const db = require('../db');  // Conexión a la base de datos

// Crear una nueva empresa 
exports.crearEmpresa = async (req, res) => {
    const { nombre, descripcion, correo, contraseña, latitud, longitud, contacto, logo, QR_pago } = req.body;

    const saltRounds = 10;

    try {
        // Hasheamos la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

        const query = 'INSERT INTO empresas (nombre, correo, contraseña, descripcion, latitud, longitud, contacto, logo, QR_pago) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

        const [result] = await db.query(query, [nombre, correo, hashedPassword, descripcion, latitud, longitud, contacto, logo, QR_pago]);

        // Respuesta exitosa
        res.status(201).json({ mensaje: 'Empresa creada con éxito' });
    } catch (err) {
        console.error('Error al crear la empresa:', err);
        return res.status(500).json({ error: err.message });
    }
}

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

exports.actualizarEmpresa = async (req, res) => {
    const empresaId = req.params.id_empresa;
    const { nombre, descripcion, correo, contraseña, latitud, longitud, contacto, logo, qr_pago } = req.body;

    try {
        // Primero verificamos si el empresa existe
        const [empresaExistente] = await db.query(
            'SELECT * FROM empresas WHERE id_empresa = ?',
            [empresaId]
        );

        if (empresaExistente.length === 0) {
            return res.status(404).json({ mensaje: 'Empresa no encontrada' });
        }

        // Preparamos los campos a actualizar
        let updateFields = [];
        let updateValues = [];

        if (nombre) {
            updateFields.push('nombre = ?');
            updateValues.push(nombre);
        }
        if (descripcion) {
            updateFields.push('descripcion = ?');
            updateValues.push(descripcion);
        }
        if (correo) {
            updateFields.push('correo = ?');
            updateValues.push(correo);
        }
        if (contraseña) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(contraseña, saltRounds);
            updateFields.push('contraseña = ?');
            updateValues.push(hashedPassword);
        }
        if (latitud) {
            updateFields.push('latitud = ?');
            updateValues.push(latitud);
        }
        if (longitud) {
            updateFields.push('longitud = ?');
            updateValues.push(longitud);
        }
        if (contacto) {
            updateFields.push('contacto = ?');
            updateValues.push(contacto);
        }
        if (logo) {
            updateFields.push('logo = ?');
            updateValues.push(logo);
        }
        if (qr_pago) {
            updateFields.push('QR_pago = ?');
            updateValues.push(qr_pago);
        }

        // Si no hay campos para actualizar
        if (updateFields.length === 0) {
            return res.status(400).json({ mensaje: 'No se proporcionaron campos para actualizar' });
        }

        // Construimos la consulta SQL
        const query = `
            UPDATE empresas 
            SET ${updateFields.join(', ')}
            WHERE id_empresa = ?
        `;

        // Añadimos el id_empresa a los valores
        updateValues.push(empresaId);

        // Ejecutamos la actualización
        const [result] = await db.query(query, updateValues);

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'No se pudo actualizar el empresa' });
        }

        res.json({
            mensaje: 'empresa actualizada exitosamente',
            empresaId: empresaId
        });

    } catch (err) {
        console.error('Error al actualizar la empresa:', err);
        res.status(500).json({
            mensaje: 'Error al actualizar la empresa',
            error: err.message
        });
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