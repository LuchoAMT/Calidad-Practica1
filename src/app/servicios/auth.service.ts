// autenticacion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface AuthResponse {
  token: string;
  userId: string; 
}

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private apiUrl = 'http://localhost:3000';  // Cambia la URL según tu backend

  constructor(private http: HttpClient) {}

  async iniciarSesion(email: string, password: string, userType: string): Promise<any> {
    try {
      const respuesta: AuthResponse = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.apiUrl}/auth/iniciar-sesion`, { email, password, userType })
      );
      localStorage.setItem('token', respuesta.token); 
      localStorage.setItem('userId', respuesta.userId);      
      return respuesta;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
  
  cerrarSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
}

