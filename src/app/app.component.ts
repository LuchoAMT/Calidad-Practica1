import { Component} from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { CarritoService } from './servicios/carrito.service';
import { AutenticacionService } from './servicios/auth.service';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, MatButtonModule, MatMenuModule,GoogleMapsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent{
  title = 'Proyecto_Grupo_1';

  carritoCount: number = 0;
  isAuthenticated: boolean = false;
  
  constructor(
    private carritoService: CarritoService, 
    private authService: AutenticacionService, 
    private router: Router,
    private snackBar: MatSnackBar  // Inyectamos MatSnackBar para mostrar la alerta
  ) {
    // Obtener el estado de autenticación al inicializar el componente
    this.isAuthenticated = this.authService.isAuthenticated();

    // Suscribirse al observable del carrito para obtener el contador actualizado
    this.carritoService.carritoCount$.subscribe(count => {
      this.carritoCount = count;
    });
  }

  // Verificación para bloquear acceso a Editar Cuenta si no está autenticado
  verificarAutenticacion(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (!this.isAuthenticated) {
      this.snackBar.open('Debes iniciar sesión para acceder a esta sección.', 'Cerrar', {
        duration: 3000,
      });
      this.router.navigate(['/iniciar-sesion']);
    }
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.isAuthenticated = false;
    this.router.navigate(['/inicio']);
  }
}
