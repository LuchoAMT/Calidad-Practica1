import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';
import { CarritoService } from '../../servicios/carrito.service';
import { FormsModule } from '@angular/forms';

import { MatTabsModule } from '@angular/material/tabs';

import { Producto } from '../../interfaces/producto';
import { Empresa } from '../../interfaces/empresa';
import { EmpresasService } from '../../servicios/empresas.service';
import { ProductosService } from '../../servicios/productos.service';

@Component({
  selector: 'app-pago-tarjeta',
  standalone: true,
  imports: [FormsModule,MatTabsModule,CommonModule],
  templateUrl: './pago-tarjeta.component.html',
  styleUrls: ['./pago-tarjeta.component.scss']
})
export class PagoTarjetaComponent {
  nombreTitular: string = '';
  nitCi: string = '';
  productosCarrito: { producto: any, cantidad: number }[] = [];
  empresas: Empresa[] = [];
  qrPagos: string[] = [];
  deudasPorEmpresa: { id_empresa: number, total_deuda: number, nombre: string, QR_pago: string }[] = [];
  imagenesComprobantes: { [key: number]: File } = {};

  constructor(private carritoService: CarritoService, private router: Router, private empresaService: EmpresasService,  private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosCarrito = this.carritoService.getProductosCarrito();
    console.log('Productos en el carrito:', this.productosCarrito);
    this.obtenerQrPagos();
  }

  calcularDeudasPorEmpresa(): void {
    const deudas: { [id_empresa: number]: { total_deuda: number, nombre: string, QR_pago: string } } = {};

    for (const item of this.productosCarrito) {
      const producto: Producto = item.producto;

      const precioFinal = producto.descuento > 0
      ? this.productosService.calcularPrecioDescuento(producto.precio, producto.descuento)
      : producto.precio;

      const totalProducto = precioFinal * item.cantidad;
      const id_empresa = producto.id_empresa;

      const empresa = this.empresas.find(e => e.id_empresa === id_empresa);
      if (empresa) {
        if (deudas[id_empresa]) {
          deudas[id_empresa].total_deuda += totalProducto;
        } else {
          deudas[id_empresa] = {
            total_deuda: totalProducto,
            nombre: empresa.nombre,
            QR_pago: empresa.QR_pago,
          };
        }
      }
    }

    // Convertir el objeto de deudas a un array
    this.deudasPorEmpresa = Object.keys(deudas).map(id_empresa => ({
      id_empresa: Number(id_empresa),
      total_deuda: deudas[Number(id_empresa)].total_deuda,
      nombre: deudas[Number(id_empresa)].nombre,
      QR_pago: deudas[Number(id_empresa)].QR_pago,
    }));
  }

  async obtenerQrPagos(): Promise<void> {
    const idsEmpresas = this.productosCarrito.map(producto => producto.producto.id_empresa);
    const idsUnicos = Array.from(new Set(idsEmpresas));

    for (const id of idsUnicos) {
      try {
        const empresa: Empresa = await this.empresaService.getEmpresa(id);
        if (empresa && empresa.QR_pago) {
          this.qrPagos.push(empresa.QR_pago);
          this.empresas.push(empresa);
        }
      } catch (error) {
        console.error('Error al obtener la empresa:', error);
      }
    }
    this.calcularDeudasPorEmpresa();
  }

  onFileSelected(event: Event, deuda: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.imagenesComprobantes[deuda.id_empresa] = file; // Asocia la imagen con la empresa
      console.log('Imagen seleccionada para', deuda.nombre, file);
    }
  }

  subirComprobante(deuda: any): void {
    const imagen = this.imagenesComprobantes[deuda.id_empresa];
    if (imagen) {
      // Aquí puedes manejar la lógica para subir la imagen al servidor
      console.log('Subiendo comprobante para', deuda.nombre);

    } else {
      console.error('No se ha seleccionado ninguna imagen para', deuda.nombre);
    }
  }

  // Método para manejar el envío del formulario
  async realizarPago() {
    try {
      // Si estás usando el método de pago por tarjeta
      if (this.nombreTitular) {
        this.carritoService.setNombreCliente(this.nombreTitular); // Almacena el nombre en el servicio
        this.carritoService.setNitCi(this.nitCi);
      }

      const idNegocio = Number(localStorage.getItem('userId'));
      await this.carritoService.crearPedido(idNegocio);

      // Redirigir a la página de factura
      this.router.navigate(['/invoice']);
    } catch (err) {
      console.error(err);
    }
  }
}
