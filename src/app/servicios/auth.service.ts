// autenticacion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private apiUrl = 'http://localhost:3000';  // Cambia la URL según tu backend

  constructor(private http: HttpClient) {}

  async iniciarSesion(email: string, password: string, userType: string): Promise<any> {
    try {
      const respuesta = await firstValueFrom(this.http.post(`${this.apiUrl}/auth/iniciar-sesion`, { email, password, userType }));
    return respuesta;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }
}

