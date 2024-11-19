import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common'; 
import {FormBuilder,FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field'
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

@Component({
  selector: 'app-editar-cuenta',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,MatIconModule,
    MatSelectModule, CommonModule, MatButtonModule,
    ReactiveFormsModule,
    GoogleMapsModule,TextFieldModule],
  templateUrl: './editar-cuenta.component.html',
  styleUrl: './editar-cuenta.component.scss'
})

export class EditarCuentaComponent implements OnInit {
    editarCuentaForm: FormGroup;
    userType: string | null;
    userId: number;    
    hide = true;
    selectedImage: File | null = null;
    imageUrl: string = '';
    imageQR: string = ''

    selectedCoordinates: google.maps.LatLngLiteral = { lat: 0, lng: 0 }; 
    center: google.maps.LatLngLiteral = { lat: 0, lng: 0 }; 
    zoom = 18; 

    previousPassword: string | null = null;

    constructor(
      private fb: FormBuilder, 
      private empresasService: EmpresasService, 
      private negociosService: NegociosService,
    ) {
      this.userType = localStorage.getItem('userType');
      this.userId = Number(localStorage.getItem('userId')) || 0; 
      this.editarCuentaForm = this.fb.group({
        nombre: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        nuevaContraseña: [''], 
        confirmarContraseña: [''],
        contacto: [''],
        logo: [''], 
        descripcion: [''], 
        qr_pago: ['']
      });
    }

    ngOnInit(): void {
      if (this.userId !== null) {
        this.cargarDatosUsuario();
      } else {
        console.error('Error: userId es null');
      }

      this.editarCuentaForm.get('qr_pago')?.valueChanges.subscribe(value => {
        this.imageQR = value || '';  
      });
    }

    onImageSelected(event: any): void {
      const file: File = event.target.files[0];
      if (file) {
        this.selectedImage = file;
        // Actualizar la vista con la imagen seleccionada
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrl = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    }

    blobToBase64(blob: Blob): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          // Convertimos el resultado a base64
          const base64 = reader.result as string;
          resolve(base64.split(',')[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob); 
      });
    }    

    seleccionarPunto(event: google.maps.MapMouseEvent) {
      if (event.latLng) {
        this.selectedCoordinates = event.latLng.toJSON();
      }
    }

    async cargarDatosUsuario(): Promise<void> {
      if (this.userType === 'empresa') {
        // Llama al servicio para obtener los datos de la empresa
        const empresa: Empresa = await this.empresasService.getEmpresa(this.userId);

        // Verificar si el logo es un Blob
        if (empresa.logo && typeof empresa.logo === 'object' && empresa.logo instanceof Blob) {
          // Si es un Blob, creamos un URL para él
          this.imageUrl = URL.createObjectURL(empresa.logo); 
        } else {
          // Si no es un Blob (probablemente una URL o base64), asignarlo directamente
          this.imageUrl = empresa.logo; 
        }


        this.editarCuentaForm.patchValue({
          nombre: empresa.nombre,
          correo: empresa.correo,
          contacto: empresa.contacto, 
          logo: empresa.logo,
          descripcion: empresa.descripcion,
          qr_pago: empresa.QR_pago
        });

        this.previousPassword = empresa.contraseña; 
        this.imageQR = empresa.QR_pago || '';

        // Cargar coordenadas de la empresa
        this.selectedCoordinates.lat = Number(empresa.latitud); 
        this.selectedCoordinates.lng = Number(empresa.longitud); 

        this.center = { lat: this.selectedCoordinates.lat, lng: this.selectedCoordinates.lng }; 
      } else if (this.userType === 'negocio') {
        // Llama al servicio para obtener los datos del negocio
        const negocio: Negocio = await this.negociosService.getNegocio(this.userId);

        // Verificar si el logo es un Blob o Buffer
        if (negocio.foto) {
          if (negocio.foto instanceof Blob) {
            this.imageUrl = URL.createObjectURL(negocio.foto);
          } else if (Buffer.isBuffer(negocio.foto)) {
            const blob = new Blob([negocio.foto], { type: 'image/jpeg' });
            this.imageUrl = URL.createObjectURL(blob);
          } else {
            this.imageUrl = negocio.foto; // Asignar directamente si es una cadena
          }
        } else {
          this.imageUrl = 'assets/images/registro.svg'; // Imagen por defecto
        }
        
        this.editarCuentaForm.patchValue({
          nombre: negocio.nombre,
          correo: negocio.correo,
          contacto: negocio.contacto,
          descripcion: negocio.informacion
        });

        this.imageQR = '';
        this.previousPassword = negocio.contraseña;

        // Cargar coordenadas del negocio
        this.selectedCoordinates.lat = Number(negocio.latitud); 
        this.selectedCoordinates.lng = Number(negocio.longitud); 
        this.center = { lat: this.selectedCoordinates.lat, lng: this.selectedCoordinates.lng }; 
      }
    }

    togglePasswordVisibility() {
      this.hide = !this.hide;
    }
    
    async onSubmit(): Promise<void> {
      if (this.editarCuentaForm.valid) {
        const formData = this.editarCuentaForm.value;
        
        if (formData.nuevaContraseña && formData.nuevaContraseña !== formData.confirmarContraseña) {
          console.error('Las contraseñas no coinciden');
          return;
        }
    
        try {
          if (this.userType === 'negocio') {
            const negocioActualizado: Negocio = {
              id_negocio: this.userId,
              nombre: formData.nombre,
              correo: formData.correo,
              contraseña: formData.nuevaContraseña || this.previousPassword,
              contacto: formData.contacto,
              foto: formData.logo,
              informacion: formData.descripcion,
              latitud: this.selectedCoordinates.lat,
              longitud: this.selectedCoordinates.lng
            };
    
            await this.negociosService.updateNegocio(this.userId, negocioActualizado);
            alert('Negocio actualizado con éxito');
            window.location.reload(); 


          } else if (this.userType === 'empresa') {
            const empresaActualizada: Empresa = {
              id_empresa: this.userId,
              nombre: formData.nombre,
              correo: formData.correo,
              contraseña: formData.nuevaContraseña || this.previousPassword,
              descripcion: formData.descripcion,
              contacto: formData.contacto,
              logo: formData.logo,
              latitud: this.selectedCoordinates.lat,
              longitud: this.selectedCoordinates.lng,
              QR_pago: formData.qr_pago
            };
    
            await this.empresasService.updateEmpresa(this.userId, empresaActualizada);
            alert('Empresa actualizada con éxito');
            window.location.reload(); 

          }
        } catch (error) {
          console.error('Error al actualizar:', error);
          alert('Error al actualizar la información. Por favor, intente nuevamente.');
        }
      } else {
        console.error('Formulario inválido');
        alert('Por favor, complete todos los campos requeridos correctamente.');
      }
    }
}
