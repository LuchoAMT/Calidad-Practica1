const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
// Middleware
app.use(express.json());

// Rutas
const productosRoutes = require('./routes/productos');
const proveedoresRoutes = require('./routes/empresas');
const authRoutes = require('./routes/auth');

app.use('/auth', authRoutes);
app.use('/productos', productosRoutes);
app.use('/proveedores', proveedoresRoutes);


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});