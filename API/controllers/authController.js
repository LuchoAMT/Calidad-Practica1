const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');  // Conexión a la base de datos

// Lógica para iniciar sesión
exports.iniciarSesion = async (req, res) => {
    const { email, password, userType } = req.body;

    if (userType !== 'negocio' && userType !== 'proveedor') {
        return res.status(400).json({ mensaje: 'Tipo de usuario no válido' });
    }

    let queryTable = userType === 'negocio' ? 'negocios' : 'proveedores';
    let idColumn = userType === 'negocio' ? 'id_negocio' : 'id_proveedor';

    try {
        // Verificar si el usuario existe en la base de datos
        const [user] = await db.query(`SELECT * FROM ${queryTable} WHERE correo = ?`, [email]);

        if (!user) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        
        console.log('User: ', user);
        console.log('pass: ', password);
        console.log('pass hasheada: ', user[0].contraseña);

        // Comparar la contraseña con el hash almacenado en la base de datos
        const match = await bcrypt.compare(password, user[0].contraseña);
        if (!match) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }

        // Crear un JWT con el id del usuario
        const token = jwt.sign({ id: user[idColumn] }, 'secreto', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};
