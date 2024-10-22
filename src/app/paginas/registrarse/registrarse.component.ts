import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { Router,RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
//Angular Material
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {merge} from 'rxjs';
//empresas
import { Empresa } from '../../interfaces/empresa';
import { EmpresasService } from '../../servicios/empresas.service';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, RouterLink, RouterLinkActive, RouterOutlet, MatButtonModule],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrarseComponent{
  readonly logo = new FormControl('', [Validators.required]);
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly nombre = new FormControl('', [Validators.required]);
  readonly password = new FormControl('', [Validators.required]);
  readonly password_confirm = new FormControl('', [Validators.required]);
  readonly descripcion = new FormControl('', [Validators.required]);
  readonly latitud = new FormControl('', [Validators.required]);
  readonly longitud = new FormControl('', [Validators.required]);
  readonly contacto = new FormControl('', [Validators.required]);

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

  errorMessage = signal('');

  constructor(private router: Router, private empresasService:EmpresasService) {
    merge(this.nombre.statusChanges, this.nombre.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());

    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());     
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('Este campo es obligatorio para ingresar');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('El campo ingresado no es valido');
    } else {
      this.errorMessage.set('');
    }
  }
  

  terms: boolean = false;

  async crearEmpresa() {
    if (this.password.value === this.password_confirm.value) {
      this.nuevaEmpresa.logo = this.logo.value || '';
      this.nuevaEmpresa.nombre = this.nombre.value!;
      this.nuevaEmpresa.correo = this.email.value!;
      this.nuevaEmpresa.contraseña = this.password.value!;
      this.nuevaEmpresa.descripcion = this.descripcion.value!;
      this.nuevaEmpresa.latitud = parseFloat(this.latitud.value!);
      this.nuevaEmpresa.longitud = parseFloat(this.longitud.value!);
      this.nuevaEmpresa.contacto = this.contacto.value!;
  
      try {
        const empresaCreada = await this.empresasService.crearEmpresa(this.nuevaEmpresa);
        console.log('Empresa creada:', empresaCreada);
        // Redirige a la página de inicio tras la creación exitosa
        this.router.navigate(['/inicio']);
      } catch (error) {
        console.error('Error al crear la empresa:', error);;
      }
    } else {
      this.errorMessage.set('Las contraseñas no coinciden');
    }
  }
  
}
