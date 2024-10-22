const db = require('../db');  // Conexión a la base de datos

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
    const { nombre, descripcion, precio, stock } = req.body;
    const empresaId = req.usuarioId;  // ID de la empresa autenticado

    const query = 'INSERT INTO productos (nombre, descripcion, precio, stock, id_empresa) VALUES (?, ?, ?, ?, ?)';

    try {
        const [result] = await db.query(query, [nombre, descripcion, precio, stock, empresaId]);
        res.status(201).json({ mensaje: 'Producto creado con éxito' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Obtener productos de la empresa autenticado o todos los productos si no hay filtro
exports.obtenerProductosPorProveedor = async (req, res) => {
    const empresaId = req.query.id_empresa; 

    // Query con o sin filtro
    let query = 'SELECT * FROM productos';
    let params = [];

    if (empresaId ) {
        query += ' WHERE id_empresa = ?';
        params.push(empresaId);
    }

    try {
        const [results] = await db.query(query, params);
        res.json(results);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.obtenerPorductoPorId = async (req, res) => {
  const productoId = req.params.id_producto;

  try {
      // Usar await para manejar la promesa de la consulta
      const [results] = await db.query('SELECT * FROM productos WHERE id_producto = ?', [productoId]);

      // Verificar si se encontró la empresa
      if (results.length === 0) {
          return res.status(404).send('Producto no encontrado.');
      }

      // Enviar la primera coincidencia
      res.json(results[0]);
  } catch (err) {
      // Manejo de errores
      return res.status(500).send('Error al consultar la empresa.');
  }
};

// Actualizar un producto
exports.actualizarProducto = async (req, res) => {
    const { nombre, descripcion, precio, stock } = req.body;
    const productoId = req.params.id;

    const query = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id_producto = ? AND id_empresa = ?';

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

    const query = 'DELETE FROM productos WHERE id_producto = ? AND id_empresa = ?';

    try {
        const [result] = await db.query(query, [productoId, req.usuarioId]);
        res.json({ mensaje: 'Producto eliminado con éxito' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
