import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../servicios/productos.service';
import { Producto } from '../../interfaces/producto';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, ActivatedRoute } from '@angular/router';

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
    empresa_id: 1
  };
  idEmpresa: number | null = null;

  constructor(private productosService: ProductosService, private route: ActivatedRoute) {}
  
  async obtenerProductos() {
    if (this.idEmpresa !== null) {
      this.productos = await this.productosService.getProductosPorEmpresa(this.idEmpresa);
    } else {
      this.productos = await this.productosService.getProductos();
    }
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
    this.route.queryParams.subscribe(params => {
      this.idEmpresa = params['id_empresa'] ? Number(params['id_empresa']) : null;
      this.obtenerProductos();
    });
  }

  limitarDescripcion(texto: string, limitePalabras: number): string {
    const palabras = texto.split(' '); 
    if (palabras.length > limitePalabras) {
        return palabras.slice(0, limitePalabras).join(' ') + ' .....'; 
    }
    return texto; 
}

}
