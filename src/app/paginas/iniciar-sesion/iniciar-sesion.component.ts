// iniciar-sesion.component.ts
import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, RouterModule, CommonModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss']
})
export class IniciarSesionComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;

  constructor(private router: Router) {}

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  onSubmit() {
    if (this.email.invalid || this.password.invalid) {
      alert('Por favor completa los campos correctamente.');
      return;
    }
    
    // Lógica de autenticación aquí, puedes conectar con tu backend
    alert('Inicio de sesión exitoso');
  }

  forgotPassword() {
    // Aquí puedes redirigir o mostrar un modal para la recuperación de contraseña
    alert('Funcionalidad de recuperación de contraseña aún no implementada.');
  }
}
