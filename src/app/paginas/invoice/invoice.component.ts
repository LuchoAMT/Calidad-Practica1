import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../servicios/carrito.service';
import { jsPDF } from 'jspdf';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  productosCarrito: { producto: any, cantidad: number }[] = [];
  currentDate: Date = new Date(); // Agrega esta línea
  nombreCliente: string = '';
  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.productosCarrito = this.carritoService.getProductosCarrito().map(item => {
      item.producto.descuento = item.producto.descuento ?? 0;
      return item;
    });    
    this.nombreCliente = this.carritoService.getNombreCliente();
    console.log('Nombre del cliente:', this.nombreCliente);
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

  generatePDF() {
    const data = document.getElementById('invoice'); 

    if (data) {
      html2canvas(data).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 190; // Ancho de la imagen en el PDF
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const heightLeft = imgHeight;

        let position = 10;

        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        position += heightLeft;

        pdf.save('factura.pdf'); // Nombre del archivo PDF
      });
    }
  }
}
