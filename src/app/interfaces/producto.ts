export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen_url?: string;
  proveedor_id: number;
}
