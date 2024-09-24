const jwt = require('jsonwebtoken');

exports.verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ mensaje: 'Token no proporcionado' });

    jwt.verify(token, 'secreto', (err, decoded) => {
        if (err) return res.status(500).json({ mensaje: 'Fallo en la autenticación' });
        req.usuarioId = decoded.id;  // Extraemos el ID del usuario autenticado
        next();
    });
};
