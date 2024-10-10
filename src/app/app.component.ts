import { Component} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { CarritoService } from './servicios/carrito.service';

import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, MatButtonModule, MatMenuModule,GoogleMapsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent{
  title = 'Proyecto_Grupo_1';

  carritoCount: number = 0;
  constructor(private carritoService: CarritoService) {
    // Suscribirse al observable del carrito para obtener el contador actualizado
    this.carritoService.carritoCount$.subscribe(count => {
      this.carritoCount = count;
    });
  }
}
