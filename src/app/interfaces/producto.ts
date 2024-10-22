export interface Producto {
  id_producto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen_url?: string;
  empresa_id: number;
}
