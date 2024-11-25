import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive} from '@angular/router';
import { Producto } from '../../interfaces/producto';
import { ProductosService } from '../../servicios/productos.service';
import {MatButtonModule} from '@angular/material/button';
import { CarritoService } from '../../servicios/carrito.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatButtonModule, CommonModule],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.scss'
})
export class DetalleProductoComponent {

  producto: Producto | undefined;
  esPropietario: boolean = false; // Bandera para indicar si el usuario es el propietario del producto

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductosService,
    private carritoService: CarritoService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.cargarProducto(id);
  }

  async cargarProducto(id: number) {
    try {
      this.producto = await this.productoService.getProductoPorId(id);
      console.log('Producto cargado:', this.producto);  // Verifica si los datos se cargan correctamente
      
      // Verifica si el usuario que inició sesión es el propietario del producto
      if (this.producto) {
        const userId = Number(localStorage.getItem('userId')); // Método que debes implementar en tu servicio de autenticación
        const userType = localStorage.getItem('userType');
        this.esPropietario = this.producto.id_empresa === userId && userType === 'empresa'; // Compara con el id del propietario
        console.log("local id: ", userId);
        console.log("producto empresa_id: ", this.producto.id_empresa);
        console.log(this.producto.id_empresa === userId);
        console.log("propietario? ", this.esPropietario);
      }
    } catch (error) {
      console.error(error);
    }
  }

  agregarAlCarrito() {
    const idUsuario = Number(localStorage.getItem('userId'));
    if (this.producto) { 
      this.carritoService.agregarProductoAlCarrito(this.producto, idUsuario);
    } else {
      console.error('Producto no está definido');
    }  
  }

  calcularPrecioDescuento(precio: number, descuento: number): number{
    return this.productoService.calcularPrecioDescuento(precio, descuento);
  }

}
