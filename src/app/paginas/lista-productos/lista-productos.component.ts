import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../servicios/productos.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
//imports de angular material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
//otros imports
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
//Imports interfaces y servicios
import { Producto } from '../../interfaces/producto';
import { Empresa } from '../../interfaces/empresa';
import { AutenticacionService } from '../../servicios/auth.service';



@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatChipsModule,
    MatAutocompleteModule, AsyncPipe, RouterLink],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.scss'
})
export class ListaProductosComponent implements OnInit {
  mycontrol = new FormControl('');
  productosFiltrados!: Observable<Producto[]>;
  productos: Producto[] = [];
  empresas: Empresa[] = []; //lista de empresas
  empresaSeleccionada: string | null = null;
  idEmpresa: number | null = null;
  isAuthenticated: boolean = false;

  nuevoProducto: Producto = {
    id_producto: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    imagen_url: '',
    id_empresa: 1,
    etiqueta: 'Nuevo',
    descuento: 0.00
  };


  constructor(
    private readonly productosService: ProductosService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly authService: AutenticacionService) {
    this.isAuthenticated = this.authService.isAuthenticated();

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
    this.route.queryParams.subscribe(async params => {
      this.idEmpresa = params['id_empresa'] ? Number(params['id_empresa']) : null;
      const filtroDescuento = params['descuento'] === 'true'; // Verifica si se activó el filtro de descuento
      await this.obtenerProductos();

      if (filtroDescuento) {
        // Filtra productos con descuento > 0
        this.productos = this.productos.filter(producto => producto.descuento > 0);
      }
    });
  }

  limitarDescripcion(texto: string, limitePalabras: number): string {
    const palabras = texto.split(' ');
    if (palabras.length > limitePalabras) {
      return palabras.slice(0, limitePalabras).join(' ') + ' .....';
    }
    return texto;
  }
  // Verificación para bloquear acceso a Editar Cuenta si no está autenticado
  verificarAutenticacion(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (!this.isAuthenticated) {
      this.snackBar.open('Debes iniciar sesión para acceder a esta sección.', 'Cerrar', {
        duration: 3000,
      });
      this.router.navigate(['/iniciar-sesion']);
    }
  }

  calcularPrecioDescuento(precio: number, descuento: number): number {
    return this.productosService.calcularPrecioDescuento(precio, descuento);
  }

}
