import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../servicios/productos.service';
import { Producto } from '../../interfaces/producto';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [MatCardModule, RouterLink],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.scss'
})
export class ListaProductosComponent implements OnInit {
  productos: Producto[] = [];
  nuevoProducto: Producto = {
    id_producto: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    imagen_url: '',
    proveedor_id: 1
  };

  constructor(private productosService: ProductosService) {}

  async obtenerProductos() {
    this.productos = await this.productosService.getProductos();
  }

  async crearProducto() {
    try {
      const productoCreado = await this.productosService.crearProducto(this.nuevoProducto);
      console.log('Producto creado:', productoCreado);
    } catch (error) {
      console.error('Error al crear el producto', error);
    }
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  limitarDescripcion(texto: string, limitePalabras: number): string {
    const palabras = texto.split(' '); 
    if (palabras.length > limitePalabras) {
        return palabras.slice(0, limitePalabras).join(' ') + ' .....'; 
    }
    return texto; 
}

}
