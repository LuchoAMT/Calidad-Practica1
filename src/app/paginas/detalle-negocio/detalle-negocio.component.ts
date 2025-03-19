import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
// Negocios 
import { Negocio } from '../../interfaces/negocio'; 
import { NegociosService } from '../../servicios/negocios.service'; 

import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-detalle-negocio',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatButtonModule, GoogleMapsModule, CommonModule, QRCodeModule],
  templateUrl: './detalle-negocio.component.html',
  styleUrls: ['./detalle-negocio.component.scss']
})
export class DetalleNegocioComponent implements OnInit {
  negocio: Negocio | undefined;
  center: google.maps.LatLngLiteral = { lat: -17.399945139000618, lng: -66.15775054829115 };
  zoom = 16;
  linkQR: string = ''; 

  circleOptions: google.maps.CircleOptions = {
    center: this.center,
    radius: 50,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
  };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly negociosService: NegociosService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.cargarNegocio(id);
  }

  async cargarNegocio(id: number) { 
    try {
      this.negocio = await this.negociosService.getNegocio(id);

      if (this.negocio) {
        const latitud = Number(this.negocio.latitud);
        const longitud = Number(this.negocio.longitud);

        if (!isNaN(latitud) && !isNaN(longitud) && isFinite(latitud) && isFinite(longitud)) {
          this.center = {
            lat: latitud,
            lng: longitud,
          };
        } else {
          console.error('Las coordenadas no son válidas:', latitud, longitud);
        }
        this.actualizarQR();
      } else {
        console.error('El negocio no se encontró.');
      }
    } catch (error) {
      console.error('Error al cargar el negocio:', error);
    }
  }

  actualizarQR() {
    if (!this.negocio) return;

    // Si el contacto es teléfono
    if (/^\d+$/.test(this.negocio.contacto)) {
      this.linkQR = `https://wa.me/${this.negocio.contacto}`;
    } 
    // Si el contacto es email
    else if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.negocio.contacto)) {
      this.linkQR = `mailto:${this.negocio.contacto}`;
    }
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.center = event.latLng.toJSON(); // Actualiza el centro del mapa al hacer clic
    }
  }
  
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      console.log('Posición del mouse:', event.latLng.toJSON()); // Muestra la posición del mouse en el mapa
    }
  }  

}
