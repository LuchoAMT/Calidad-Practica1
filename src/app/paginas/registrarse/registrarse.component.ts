import { ChangeDetectionStrategy, Component} from '@angular/core';
import { Router,RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
//Angular Material
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
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

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, CommonModule,
    MatSelectModule, ReactiveFormsModule, MatIconModule, 
    RouterLink, RouterLinkActive, 
    RouterOutlet, MatButtonModule, GoogleMapsModule],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RegistrarseComponent{
  //Coordenadas en el mapa 
  center: google.maps.LatLngLiteral = { lat: -17.399945139000618, lng: -66.15775054829115 };
  zoom = 15;
  selectedCoordinates: google.maps.LatLngLiteral = { lat: 0, lng: 0 }; 

  readonly logo = new FormControl('', [Validators.required]);
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly nombre = new FormControl('', [Validators.required]);
  readonly password = new FormControl('', [Validators.required]);
  readonly password_confirm = new FormControl('', [Validators.required]);
  readonly informacion = new FormControl('', [Validators.required]);
  readonly contacto = new FormControl('', [
    Validators.required,
    Validators.pattern('(^[0-9]+$)|(^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$)')
  ]);
  readonly userType = new FormControl('', [Validators.required]); 
  
  hide = true;
  termsAccepted: boolean = false; 

  // Estructura para empresa y negocio
  nuevaEmpresa: Empresa = {
    id_empresa: 0,
    nombre: '',
    descripcion: '',
    correo: '',
    contraseña: '',
    latitud: 0,
    longitud: 0,
    contacto: '',
    logo: '',
  };

  nuevoNegocio: Negocio = {
    id_negocio: 0,
    nombre: '',
    informacion: '',
    correo: '',
    contraseña: '',
    latitud: 0,
    longitud: 0,
    contacto: '',
    foto: '',
  };

  constructor(private router: Router, private empresasService:EmpresasService, private negociosService:NegociosService) {}

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  togglePasswordConfirmVisibility() {
    this.hide = !this.hide;
  }

  async crearRegistro() {
    // Verificar que todos los campos están completos
    if (
      !this.logo.value ||
      !this.email.value ||
      !this.nombre.value ||
      !this.password.value ||
      !this.password_confirm.value ||
      !this.informacion.value ||
      !this.contacto.value ||
      (this.selectedCoordinates.lat === 0 && this.selectedCoordinates.lng === 0)
    ) {
      alert('Por favor, complete todos los campos y seleccione una ubicación en el mapa.');
      return;
    }

    // Verificaciones adicionales

    if (this.email.invalid) {
      alert('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    
    if (this.password.value !== this.password_confirm.value) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (this.contacto.hasError('pattern')) {
      alert('El campo de contacto debe contener solo números.');
      return;
    }

    // Asignar datos de acuerdo con el usuario seleccionado
    if (this.userType.value === 'empresa') {
      // Asignar valores específicos para empresa
      this.nuevaEmpresa = {
        id_empresa: 0,
        nombre: this.nombre.value,
        descripcion: this.informacion.value, 
        correo: this.email.value,
        contraseña: this.password.value,
        latitud: this.selectedCoordinates.lat,
        longitud: this.selectedCoordinates.lng,
        contacto: this.contacto.value,
        logo: this.logo.value,
      };

      try {
        const empresaCreada = await this.empresasService.crearEmpresa(this.nuevaEmpresa);
        alert('Registro de empresa exitoso');
        this.router.navigate(['/inicio']);
      } catch (error) {
        console.error('Error al crear la empresa:', error);
      }
    } else if (this.userType.value === 'negocio') {
      // Asignar valores para negocio
      this.nuevoNegocio = {
        id_negocio: 0,
        nombre: this.nombre.value,
        informacion: this.informacion.value, 
        correo: this.email.value,
        contraseña: this.password.value,
        latitud: this.selectedCoordinates.lat,
        longitud: this.selectedCoordinates.lng,
        contacto: this.contacto.value,
        foto: this.logo.value,
      };

      try {
        const negocioCreado = await this.negociosService.crearNegocio(this.nuevoNegocio);
        alert('Registro de negocio exitoso');
        this.router.navigate(['/inicio']);
      } catch (error) {
        console.error('Error al crear el negocio:', error);
      }
    }
  }

  seleccionarPunto(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.selectedCoordinates = event.latLng.toJSON();
    }
  }
}