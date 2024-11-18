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

  // Método para obtener el total de los productos en el carrito
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
    this.totalCarrito = this.carritoService.getTotal();
  }

  async confirmarPedido() {
    try {
      const idNegocio = Number(localStorage.getItem('userId'));
      const response = await this.carritoService.crearPedido(idNegocio);
      
      this.carritoService.vaciarCarrito();
      this.productosCarrito = [];
      this.calcularTotalCarrito();
    } catch (err) {
      console.error(err);
    }
  } 
}