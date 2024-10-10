import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Producto } from '../../interfaces/producto';
import { ProductosService } from '../../servicios/productos.service';
import {MatButtonModule} from '@angular/material/button';
import { CarritoService } from '../../servicios/carrito.service';


@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatButtonModule],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.scss'
})
export class DetalleProductoComponent {

  producto: Producto | undefined;

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
    } catch (error) {
      console.error(error);
    }
  }

  agregarAlCarrito() {
    if (this.producto) { 
      this.carritoService.agregarAlCarrito(this.producto);
    } else {
      console.error('Producto no está definido');
    }  
  }

}
