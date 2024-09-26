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


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
