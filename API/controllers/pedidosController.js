const db = require('../db'); // Conexión a la base de datos

// Crear un nuevo pedido
exports.crearPedido = async (req, res) => {
    const { id_negocio, productos } = req.body; // `productos` es un array con { id_producto, cantidad, precio }

    const pedidoQuery = 'INSERT INTO pedidos (id_negocio, fecha_pedido, estado_pedido, monto_total) VALUES (?, NOW(), ?, ?)';
    const pedidoProductoQuery = 'INSERT INTO pedido_producto (id_pedido, id_producto, cantidad, precio) VALUES (?, ?, ?, ?)';

    try {
        // Calcular el monto total del pedido
        const montoTotal = productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);

        // Iniciar una transacción
        await db.query('START TRANSACTION');

        // Insertar el pedido en la tabla `pedidos`
        const [pedidoResult] = await db.query(pedidoQuery, [id_negocio, 'pendiente', montoTotal]);

        // Obtener el ID del pedido recién creado
        const idPedido = pedidoResult.insertId;

        // Insertar los productos en la tabla `pedido_producto`
        for (const producto of productos) {
            await db.query(pedidoProductoQuery, [idPedido, producto.id_producto, producto.cantidad, producto.precio]);
        }

        // Confirmar la transacción
        await db.query('COMMIT');

        res.status(201).json({ mensaje: 'Pedido creado con éxito', id_pedido: idPedido });
    } catch (err) {
        // Si ocurre un error, revertir la transacción
        await db.query('ROLLBACK');
        console.error('Error al crear el pedido:', err);
        res.status(500).json({ error: 'Error al crear el pedido' });
    }
};
