import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Negocio } from '../../interfaces/negocio'; // Asegúrate de tener la interfaz adecuada
import { NegociosService } from '../../servicios/negocios.service'; // Servicio para obtener datos de negocios
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-detalle-negocio',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatButtonModule, GoogleMapsModule, CommonModule],
  templateUrl: './detalle-negocio.component.html',
  styleUrls: ['./detalle-negocio.component.scss']
})
export class DetalleNegocioComponent implements OnInit {
  negocio: Negocio | undefined; // Cambia "Empresa" a "Negocio"
  center: google.maps.LatLngLiteral = { lat: -17.399945139000618, lng: -66.15775054829115 };
  zoom = 15;

  circleOptions: google.maps.CircleOptions = {
    center: this.center,
    radius: 50,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
  };

  @ViewChild(GoogleMap) map!: GoogleMap;

  constructor(
    private route: ActivatedRoute,
    private negociosService: NegociosService, // Servicio para obtener datos de negocios
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.cargarNegocio(id); // Cambia a cargarNegocio
  }

  async cargarNegocio(id: number) { // Cambia a cargarNegocio
    try {
      this.negocio = await this.negociosService.getNegocio(id); // Cambia a getNegocio

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
      } else {
        console.error('El negocio no se encontró.');
      }
    } catch (error) {
      console.error('Error al cargar el negocio:', error);
    }
  }
}
