import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CarritoService } from './servicios/carrito.service';
import { AutenticacionService } from './servicios/auth.service';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, MatButtonModule, MatMenuModule, GoogleMapsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  title = 'Proyecto_Grupo_1';
  carritoCount: number = 0;
  isAuthenticated: boolean = false;
  UsuarioNegocio: boolean = false;
  userId: string | null = null;

  constructor(
    private readonly carritoService: CarritoService,
    private readonly authService: AutenticacionService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.UsuarioNegocio = this.authService.esUsuarioNegocio();
    this.userId = localStorage.getItem('userId')

    this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
      this.UsuarioNegocio = this.authService.esUsuarioNegocio();
    });

    this.carritoService.carritoCount$.subscribe(count => {
      this.carritoCount = count;
    });
  }

  verificarAutenticacion(): void {
    if (!this.isAuthenticated) {
      this.snackBar.open('Debes iniciar sesión para acceder a esta sección.', 'Cerrar', {
        duration: 3000,
      });
      this.router.navigate(['/iniciar-sesion']);
    }
  }

  cerrarSesion() {
    this.carritoService.vaciarCarrito();
    sessionStorage.clear();

    this.authService.cerrarSesion();

    this.isAuthenticated = false;
    this.UsuarioNegocio = false;
    this.router.navigate(['/inicio']);
  }
}
