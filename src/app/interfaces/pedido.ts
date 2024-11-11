export interface Pedido {
  id_pedido: number;
  fecha_pedido: Date;
  estado_pedido: string;
  monto_total: number;
  productos: { id_producto: number; nombre: string; cantidad: number; precio: number }[];
}
