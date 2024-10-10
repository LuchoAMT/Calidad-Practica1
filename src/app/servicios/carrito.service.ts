import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})

export class CarritoService {
  private carritoCount = new BehaviorSubject<number>(0);  
  carritoCount$ = this.carritoCount.asObservable();  

  private carritoItems: { [id_producto: number]: { producto: Producto, cantidad: number } } = {};

  constructor() {}

  agregarAlCarrito(producto: Producto) {
    const itemExistente = this.carritoItems[producto.id_producto];
    
    if (itemExistente) {
      itemExistente.cantidad += 1;
    } else {
      this.carritoItems[producto.id_producto] = { producto: producto, cantidad: 1 };
    }

    // Actualizamos el contador global de productos
    const totalProductos = this.carritoCount.value + 1;
    this.carritoCount.next(totalProductos); 
  }

  // Método para eliminar un producto del carrito
  eliminarDelCarrito(id_producto: number) {
    const itemExistente = this.carritoItems[id_producto];
    if (itemExistente) {
      const totalProductos = this.carritoCount.value - itemExistente.cantidad;
      this.carritoCount.next(totalProductos);  

      // Eliminamos el producto del carrito
      delete this.carritoItems[id_producto];
    }
  }

  // Método para vaciar el carrito
  vaciarCarrito() {
    this.carritoItems = {};
    this.carritoCount.next(0);  // Reiniciamos el contador de productos a 0
  }

  // Método para obtener los productos del carrito y sus cantidades
  getProductosCarrito(): { producto: Producto, cantidad: number }[] {
    return Object.values(this.carritoItems);
  }

  // Método para obtener el total del carrito en términos de costo
  getTotal(): number {
    return Object.values(this.carritoItems).reduce((total, item) => 
      total + (item.producto.precio * item.cantidad), 0);
  }

  // Método para actualizar la cantidad de un producto en el carrito
  actualizarProductoEnCarrito(id_producto: number, nuevaCantidad: number) {
    const itemExistente = this.carritoItems[id_producto];
    if (itemExistente) {
      const diferencia = nuevaCantidad - itemExistente.cantidad;
      itemExistente.cantidad = nuevaCantidad;

      // Actualizamos el contador global de productos basado en la diferencia de cantidad
      const totalProductos = this.carritoCount.value + diferencia;
      this.carritoCount.next(totalProductos);
    }
  }
}
