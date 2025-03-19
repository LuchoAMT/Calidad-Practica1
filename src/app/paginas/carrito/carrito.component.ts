import { Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Producto } from '../../interfaces/producto';
import { CarritoService } from '../../servicios/carrito.service';
import { ProductosService } from '../../servicios/productos.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatButtonModule, CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent {

  productosCarrito: { producto: Producto, cantidad: number }[] = [];
  totalCarrito: number = 0;

  constructor(private readonly carritoService: CarritoService, private readonly productoService: ProductosService) {} 

  ngOnInit(): void {
    const idUsuario = Number(localStorage.getItem('userId'));
    const tipoUsuario = localStorage.getItem('userType');
    if (idUsuario && tipoUsuario == 'negocio'){
      this.carritoService.cargarCarritoDesdeBackend(idUsuario).then(() => {
        this.cargarProductosCarrito();
        this.calcularTotalCarrito();
        console.log('productos carrito: ', this.productosCarrito);
      });
    }
  }

  cargarProductosCarrito() {
    this.productosCarrito = this.carritoService.getProductosCarrito();
  }

  getPrecioFinal(producto: Producto): number {
    return producto.descuento > 0 
      ? this.productoService.calcularPrecioDescuento(producto.precio, producto.descuento) 
      : producto.precio;
  }

  getTotal(): number {
    return this.carritoService.getTotal();  
  }

  trackById(index: number, producto: Producto): number {
    return producto.id_producto;  
  }

  incrementarCantidad(producto: Producto) {
    const idUsuario = Number(localStorage.getItem('userId'));
    const item = this.productosCarrito.find(p => p.producto.id_producto === producto.id_producto);
    if(item){
      this.carritoService.agregarAlCarrito(producto);
      this.carritoService.actualizarProductoEnCarrito(producto.id_producto, item.cantidad, idUsuario);
      this.cargarProductosCarrito();
      this.calcularTotalCarrito();
    }   
  }

  decrementarCantidad(producto: Producto) {
    const item = this.productosCarrito.find(p => p.producto.id_producto === producto.id_producto);
    const idUsuario = Number(localStorage.getItem('userId'));
    if (item) {
      if (item.cantidad > 1) {
        this.carritoService.actualizarProductoEnCarrito(producto.id_producto, item.cantidad - 1, idUsuario);
      } else {
        // Si la cantidad es 1, eliminar el producto del carrito
        this.carritoService.actualizarProductoEnCarrito(producto.id_producto, item.cantidad - 1, idUsuario);
        this.carritoService.eliminarDelCarrito(producto.id_producto);
      }
      this.cargarProductosCarrito();
      this.calcularTotalCarrito();
    }
  }

  calcularTotalCarrito() {
    this.totalCarrito = this.productosCarrito.reduce((total, item) => {
      const precioFinal = item.producto.descuento > 0 
        ? this.productoService.calcularPrecioDescuento(item.producto.precio, item.producto.descuento)
        : item.producto.precio;
      return total + (precioFinal * item.cantidad);
    }, 0);
  }

  async confirmarPedido() {
    try {
      const idNegocio = Number(localStorage.getItem('userId'));
      await this.carritoService.crearPedido(idNegocio);
      
      this.carritoService.vaciarCarrito();
      this.productosCarrito = [];
      this.calcularTotalCarrito();
    } catch (err) {
      console.error(err);
    }
  } 
}