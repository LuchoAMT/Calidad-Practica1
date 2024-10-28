import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../servicios/productos.service';
import { EmpresasService } from '../../servicios/empresas.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe} from '@angular/common';
import { Producto } from '../../interfaces/producto';
import { Empresa } from '../../interfaces/empresa';
import { RouterLink, ActivatedRoute } from '@angular/router';
//imports de angular material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
//otros imports
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule,  MatInputModule, MatChipsModule,
    MatAutocompleteModule, AsyncPipe, RouterLink],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.scss'
})
export class ListaProductosComponent implements OnInit {
  mycontrol = new FormControl('');
  productosFiltrados!: Observable<Producto[]>;
  productos: Producto[] = [];
  empresas: Empresa[] = []; //lista de empresas
  empresaSeleccionada: string |  null = null;
  idEmpresa: number | null = null;

  nuevoProducto: Producto = {
    id_producto: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    imagen_url: '',
    empresa_id: 1
  };
  

  constructor(private productosService: ProductosService,private empresasService: EmpresasService, private route: ActivatedRoute) {
        this.productosFiltrados = this.mycontrol.valueChanges.pipe(
          startWith(''),
          map(prod => (prod ? this._filtrarProductos(prod) : this.productos.slice())),
        );
  }

  private _filtrarProductos(value: string): Producto[] {
    const filterValue = value.toLowerCase();

    return this.productos.filter(prod => prod.nombre.toLowerCase().includes(filterValue));
  }

  
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
