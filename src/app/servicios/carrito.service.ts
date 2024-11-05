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

  constructor() {
    this.cargarCarritoDesdeStorage();
  }

  private guardarCarritoEnStorage() {
    sessionStorage.setItem('carrito', JSON.stringify(this.carritoItems));
  }

  private cargarCarritoDesdeStorage() {
    const carritoGuardado = sessionStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carritoItems = JSON.parse(carritoGuardado);
      this.carritoCount.next(Object.values(this.carritoItems).reduce((total, item) => total + item.cantidad, 0));
    }
  }

  agregarAlCarrito(producto: Producto) {
    const itemExistente = this.carritoItems[producto.id_producto];

    if (itemExistente) {
      itemExistente.cantidad += 1;
    } else {
      this.carritoItems[producto.id_producto] = { producto: producto, cantidad: 1 };
    }

    const totalProductos = this.carritoCount.value + 1;
    this.carritoCount.next(totalProductos);
    this.guardarCarritoEnStorage();
  }

  eliminarDelCarrito(id_producto: number) {
    const itemExistente = this.carritoItems[id_producto];
    if (itemExistente) {
      const totalProductos = this.carritoCount.value - itemExistente.cantidad;
      this.carritoCount.next(totalProductos);

      delete this.carritoItems[id_producto];
      this.guardarCarritoEnStorage();
    }
  }

  vaciarCarrito() {
    this.carritoItems = {};
    this.carritoCount.next(0);
    this.guardarCarritoEnStorage();
  }

  getProductosCarrito(): { producto: Producto, cantidad: number }[] {
    return Object.values(this.carritoItems);
  }

  getTotal(): number {
    return Object.values(this.carritoItems).reduce((total, item) =>
      total + (item.producto.precio * item.cantidad), 0);
  }

  actualizarProductoEnCarrito(id_producto: number, nuevaCantidad: number) {
    const itemExistente = this.carritoItems[id_producto];
    if (itemExistente) {
      const diferencia = nuevaCantidad - itemExistente.cantidad;
      itemExistente.cantidad = nuevaCantidad;

      const totalProductos = this.carritoCount.value + diferencia;
      this.carritoCount.next(totalProductos);

      this.guardarCarritoEnStorage();
    }
  }
  private orderDetails: any;

  setOrderDetails(details: any) {
    this.orderDetails = details;
  }

  getOrderDetails() {
    return this.orderDetails;
  }

  private nombreCliente: string = '';

  setNombreCliente(nombre: string) {
    this.nombreCliente = nombre;
  }

  getNombreCliente(): string {
    return this.nombreCliente;
  }
}