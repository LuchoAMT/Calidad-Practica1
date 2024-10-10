import { Component  } from '@angular/core';
import { ActivatedRoute,RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Empresa } from '../../interfaces/empresa';
import { EmpresasService } from '../../servicios/empresas.service';
import {MatButtonModule} from '@angular/material/button';

import { CommonModule } from '@angular/common';
import { GoogleMapsModule} from '@angular/google-maps'; 

@Component({
  selector: 'app-detalles-empresa',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive,MatButtonModule, GoogleMapsModule,CommonModule],
  templateUrl: './detalles-empresa.component.html',
  styleUrl: './detalles-empresa.component.scss'
})
export class DetallesEmpresaComponent {

  empresa: Empresa | undefined;
  display: any;
  center: google.maps.LatLngLiteral = { lat: -17.399945139000618, lng: -66.15775054829115 };
  zoom = 11;

  constructor(
    private route: ActivatedRoute,
    private empresasService: EmpresasService,
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.cargarEmpresa(id);
  }

  async cargarEmpresa(id: number) {
    try {
      this.empresa = await this.empresasService.getEmpresa(id);
      console.log('Empresa cargada:', this.empresa);
    } catch (error) {
      console.error(error);
    } 
  }
  

  moveMap(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.center = (event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.display = event.latLng.toJSON();
  }

}
