import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Router,RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
//Angular Material
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {merge} from 'rxjs';
//usuarios
import { usuario } from '../../interfaces/usuario'; 

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, RouterLink, RouterLinkActive, RouterOutlet, MatButtonModule],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrarseComponent {
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly nombre = new FormControl('', [Validators.required]);
  readonly password = new FormControl('', [Validators.required]);
  readonly password_confirm = new FormControl('', [Validators.required]);


  errorMessage = signal('');

  constructor(private router: Router) {
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
      this.errorMessage.set('El email ingresado no es valido');
    } else {
      this.errorMessage.set('');
    }
  }
  

  usuario: usuario = {  
    nombre: '',
    correo: '',
    contraseña: '',
    descripcion: '',
    direccion: '',
    contacto: '',
    foto: ''
  };

  terms: boolean = false;

onSubmit() {
    // Verificar si algún campo está vacío
  if (!this.usuario.nombre || !this.usuario.correo || !this.usuario.contraseña ) {
    alert('Todos los campos son obligatorios, llena los datos faltantes');
    return;
  }

  // Verificar términos y condiciones
  if (!this.terms) {
    alert('Debe aceptar los términos y condiciones');
    return;
  }

  }
}
