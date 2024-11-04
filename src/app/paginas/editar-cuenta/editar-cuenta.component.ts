import { Component } from '@angular/core';
import { Router,RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule, HttpClient } from '@angular/common'; 
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
//Angular Material
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
//empresas
import { Empresa } from '../../interfaces/empresa';
import { EmpresasService } from '../../servicios/empresas.service';
//negocios
import { Negocio } from '../../interfaces/negocio';
import { NegociosService } from '../../servicios/negocios.service';
//Google maps
import { GoogleMapsModule } from '@angular/google-maps';
//Auth
import { AutenticacionService } from '../../servicios/auth.service';

@Component({
  selector: 'app-editar-cuenta',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, CommonModule,
    MatSelectModule, ReactiveFormsModule, MatIconModule, 
    RouterLink, RouterLinkActive,
    RouterOutlet, MatButtonModule, GoogleMapsModule],
  templateUrl: './editar-cuenta.component.html',
  styleUrl: './editar-cuenta.component.scss'
})
export class EditarCuentaComponent {
    //Coordenadas en el mapa 
    center: google.maps.LatLngLiteral = { lat: -17.399945139000618, lng: -66.15775054829115 };
    zoom = 15;
    selectedCoordinates: google.maps.LatLngLiteral = { lat: 0, lng: 0 }; 
    
    hide = true;
  
    constructor(
      private fb: FormBuilder,
      private authService: AutenticacionService, 
      private http: HttpClient
      ) {}

    ngOnInit(): void {
      // Inicializa el formulario
      this.formulario = this.fb.group({
        userType: ['', Validators.required],
        logo: ['', Validators.required],
        nombre: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        informacion: [''],
        contacto: ['', Validators.required]
      });
  
      // Cargar datos del usuario
      this.cargarDatosUsuario();
    }
  
    togglePasswordVisibility() {
      this.hide = !this.hide;
    }
  
    seleccionarPunto(event: google.maps.MapMouseEvent) {
      if (event.latLng) {
        this.selectedCoordinates = event.latLng.toJSON();
      }
    }

}
