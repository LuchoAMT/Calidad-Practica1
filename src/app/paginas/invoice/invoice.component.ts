import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../servicios/carrito.service';
import { jsPDF } from 'jspdf';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  productosCarrito: { producto: any, cantidad: number }[] = [];
  total: number = 0;
  currentDate: Date = new Date(); // Agrega esta línea
  nombreCliente: string = '';
  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.productosCarrito = this.carritoService.getProductosCarrito();
    this.total = this.carritoService.getTotal();
    this.nombreCliente = this.carritoService.getNombreCliente();
    console.log('Nombre del cliente:', this.nombreCliente);
  }


  // generatePDF() {
  //   const doc = new jsPDF();
  //   doc.text('Factura', 10, 10);
  //   doc.text('Cliente: ' + this.nombreCliente, 10, 20);
  //   doc.text('Productos:', 10, 30);
  //   this.productosCarrito.forEach((item, index) => {
  //     doc.text(`${item.producto.nombre} - ${item.producto.precio} Bs. x ${item.cantidad}`, 10, 40 + (index * 10));
  //   });
  //   doc.text(`Total: ${this.total} Bs.`, 10, 50 + (this.productosCarrito.length * 10));
  //   doc.save('factura.pdf');
  // }

  generatePDF() {
    const data = document.getElementById('invoice'); // Asegúrate de que el ID coincida con el contenedor de la factura

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
