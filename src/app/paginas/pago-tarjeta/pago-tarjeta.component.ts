import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CarritoService } from '../../servicios/carrito.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pago-tarjeta',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,FormsModule],
  templateUrl: './pago-tarjeta.component.html',
  styleUrls: ['./pago-tarjeta.component.scss']
})
export class PagoTarjetaComponent {
  nombreTitular: string = ''; // Variable para almacenar el nombre del titular

  constructor(private carritoService: CarritoService, private router: Router) {}

  // Método para manejar el envío del formulario
  async realizarPago() {
    try {
      this.carritoService.setNombreCliente(this.nombreTitular); // Almacena el nombre en el servicio
      const idNegocio = Number(localStorage.getItem('userId'));
      await this.carritoService.crearPedido(idNegocio);

      this.router.navigate(['/invoice']); // Redirige a la página de la factura
    } catch (err) {
      console.error(err);
    }
    

  }

}