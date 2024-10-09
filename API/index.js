const express = require('express');
const cors = require('cors');
const db = require('./db');  // Importa la conexión a la base de datos
const app = express();
const port = 3000;

app.use(cors());
// Middleware
app.use(express.json());

// Endpoint para obtener todos los productos
app.get('/productos', (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) {
            return res.status(500).send('Error al consultar productos.');
        }
        res.json(results);
    });
});

// Endpoint para añadir un producto
app.post('/productos', (req, res) => {
    const { nombre, descripcion, precio, imagen_url, proveedor_id } = req.body;
    const query = 'INSERT INTO productos (nombre, descripcion, precio, imagen_url, proveedor_id) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [nombre, descripcion, precio, imagen_url, proveedor_id], (err, results) => {
        if (err) {
            return res.status(500).send('Error al insertar producto.');
        }
        res.status(201).json({ id: results.insertId });
    });
});

// Endpoint para actualizar un producto
app.put('/productos/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, descripcion, precio, imagen_url, proveedor_id } = req.body;
    const query = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, imagen_url = ?, proveedor_id = ? WHERE id = ?';
    db.query(query, [nombre, descripcion, precio, imagen_url, proveedor_id, id], (err) => {
        if (err) {
            return res.status(500).send('Error al actualizar producto.');
        }
        res.send('Producto actualizado.');
    });
});

// Endpoint para eliminar un producto
app.delete('/productos/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM productos WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) {
            return res.status(500).send('Error al eliminar producto.');
        }
        res.send('Producto eliminado.');
    });
});


app.get('/proveedores', (req, res) => {
  db.query('SELECT * FROM proveedores', (err, results) => {
      if (err) {
          return res.status(500).send('Error al consultar productos.');
      }
      res.json(results);
  });
});

app.get('/proveedores/:id', (req, res) => {
    const empresaId = req.params.id;
    db.query('SELECT * FROM proveedores WHERE id_proveedor = ?', [empresaId], (err, results) => {
        if (err) {
            return res.status(500).send('Error al consultar productos.');
        }
        if (results.length === 0) {
            return res.status(404).send('Empresa no encontrada.');
        }
            res.json(results[0]);  // Enviar solo la primera coincidencia
        });
    });
    
app.post('/proveedores', (req, res) => {
    const { nombre, correo, contraseña, descripcion, direccion, contacto, logo } = req.body;
    const proveedorId = req.usuarioId;  // ID del proveedor autenticado
    const query = 'INSERT INTO proveedores (nombre, correo, contraseña, descripcion, direccion, contacto, logo, id_proveedor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'; // Asegúrate de que todos los parámetros estén incluidos
    db.query(query, [nombre, correo, contraseña, descripcion, direccion, contacto, logo, proveedorId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ mensaje: 'Empresa creada con éxito' });
    });
});



// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
