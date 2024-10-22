import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Producto } from '../../interfaces/producto';
import { CarritoService } from '../../servicios/carrito.service';


@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatButtonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent {

  productosCarrito: { producto: Producto, cantidad: number }[] = [];
  totalCarrito: number = 0;

  constructor(private carritoService: CarritoService) {} 

  ngOnInit(): void {
    this.cargarProductosCarrito();
    this.calcularTotalCarrito();
  }

  cargarProductosCarrito() {
    this.productosCarrito = this.carritoService.getProductosCarrito();
  }

  // Método para obtener el total de los productos en el carrito
  getTotal(): number {
    return this.carritoService.getTotal();  
  }

  trackById(index: number, producto: Producto): number {
    return producto.id_producto;  
  }

  incrementarCantidad(producto: Producto) {
    this.carritoService.agregarAlCarrito(producto);
    this.cargarProductosCarrito();
    this.calcularTotalCarrito();
  }

  decrementarCantidad(producto: Producto) {
    const item = this.productosCarrito.find(p => p.producto.id_producto === producto.id_producto);
    if (item) {
      if (item.cantidad > 1) {
        this.carritoService.actualizarProductoEnCarrito(producto.id_producto, item.cantidad - 1);
      } else {
        // Si la cantidad es 1, eliminar el producto del carrito
        this.carritoService.eliminarDelCarrito(producto.id_producto);
      }
      this.cargarProductosCarrito();
      this.calcularTotalCarrito();
    }
  }

  calcularTotalCarrito() {
    this.totalCarrito = this.carritoService.getTotal();
  }
}