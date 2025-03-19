import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../servicios/carrito.service';
import { jsPDF } from 'jspdf';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  productosCarrito: { producto: any, cantidad: number }[] = [];
  total: number = 0;
  currentDate: Date = new Date(); // Fecha actual
  currentTime: string = ''; // Hora actual
  nombreCliente: string = '';
  nitCi: string = ''; // NIT o CI del cliente

  constructor(private readonly carritoService: CarritoService) {}

  ngOnInit(): void {
    this.productosCarrito = this.carritoService.getProductosCarrito();
    this.total = this.carritoService.getTotal();
    this.nombreCliente = this.carritoService.getNombreCliente();
    this.nitCi = this.carritoService.getNitCi(); // Obtener el NIT o CI del servicio
    this.updateTime(); // Inicializar la hora actual
    console.log('Nombre del cliente:', this.nombreCliente);
  }

  // Método para actualizar la hora actual
  updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString(); // Formato de hora local (ej. 12:34:56)
  }

  generatePDF() {
    const data = document.getElementById('invoice'); // Asegúrate de que el ID coincida con el contenedor de la factura

    if (data) {
      html2canvas(data).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 190; // Ancho de la imagen en el PDF
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let position = 10;

        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);

        pdf.save('factura.pdf'); // Nombre del archivo PDF
      });
    }
  }
  calcularPrecioDescuento(precio: number, descuento: number): number {
    return precio - (precio * descuento) / 100;
  }

  calcularTotal(): number {
    return this.productosCarrito.reduce((total, item) => {
      const precioFinal = item.producto.descuento > 0
        ? this.calcularPrecioDescuento(item.producto.precio, item.producto.descuento)
        : item.producto.precio;
      return total + precioFinal * item.cantidad;
    }, 0);

  }
}
