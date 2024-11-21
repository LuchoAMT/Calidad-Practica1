import { Component,OnInit,ViewChild  } from '@angular/core';
import { ActivatedRoute,RouterLink, RouterLinkActive} from '@angular/router';
import { Empresa } from '../../interfaces/empresa';
import { EmpresasService } from '../../servicios/empresas.service';
import {MatButtonModule} from '@angular/material/button';

import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMap } from '@angular/google-maps';

import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-detalles-empresa',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,MatButtonModule, GoogleMapsModule,CommonModule, QRCodeModule],
  templateUrl: './detalles-empresa.component.html',
  styleUrl: './detalles-empresa.component.scss'
})

export class DetallesEmpresaComponent implements OnInit {
  empresa: Empresa | undefined;
  center: google.maps.LatLngLiteral = { lat: -17.399945139000618, lng: -66.15775054829115 };
  zoom = 15;
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

  @ViewChild(GoogleMap) map!: GoogleMap; 

  constructor(
    private route: ActivatedRoute,
    private empresasService: EmpresasService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.cargarEmpresa(id);
  }

  async cargarEmpresa(id: number) {
    try {
      this.empresa = await this.empresasService.getEmpresa(id);
  
      if (this.empresa) {
        const latitud = Number(this.empresa.latitud);
        const longitud = Number(this.empresa.longitud);
  
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
        console.error('La empresa no se encontró.');
      }
    } catch (error) {
      console.error('Error al cargar la empresa:', error);
    }
  }

  actualizarQR() {
    if (!this.empresa) return;

    // Si el contacto es teléfono
    if (/^\d+$/.test(this.empresa.contacto)) {
      this.linkQR = `https://wa.me/${this.empresa.contacto}`;
    } 
    // Si el contacto es email
    else if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.empresa.contacto)) {
      this.linkQR = `mailto:${this.empresa.contacto}`;
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