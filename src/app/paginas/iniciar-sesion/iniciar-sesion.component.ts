// iniciar-sesion.component.ts
import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AutenticacionService } from '../../servicios/auth.service';


@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss']
})
export class IniciarSesionComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  userType = new FormControl('', [Validators.required]);
  hide = true;

  constructor(private router: Router, private authService: AutenticacionService) {}

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  async onSubmit(event: Event) {
    console.log('formulario enviado');
    event.preventDefault();

    if (this.email.invalid || this.password.invalid || this.userType.invalid) {
      alert('Por favor completa los campos correctamente.');
      return;
    }
    try {
      const response = await this.authService.iniciarSesion(this.email.value!, this.password.value!, this.userType.value!);
      console.log('Respuesta del server: ', response);
      alert('Inicio de sesion exitoso');
      this.router.navigate(['/empresas']);
    } catch (error) {
      console.error('Error al iniciar sesion', error);
      alert('Credenciales incorrectas');
    }
    
  }

  forgotPassword() {
    // Aquí puedes redirigir o mostrar un modal para la recuperación de contraseña
    alert('Funcionalidad de recuperación de contraseña aún no implementada.');
  }
}
