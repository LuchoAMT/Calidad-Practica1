import { Injectable } from '@angular/core';
import { Negocio } from '../interfaces/negocio';

@Injectable({
  providedIn: 'root'
})
export class NegociosService {

  private apiUrl = 'http://localhost:3000/Negocios';

  constructor() { }

  // Método para obtener todas las Negocios
  async getNegocios(): Promise<Negocio[]> {
    const resp = await	fetch(this.apiUrl);
    const Negocios = await resp.json();
    return Negocios;
  }

  async getNegocio(id: number): Promise<Negocio> {
    const resp = await fetch(`${this.apiUrl}/${id}`);
    const Negocio = await resp.json();
    return Negocio;
  }

  async crearNegocio(Negocio: Negocio): Promise<Negocio> {
    const resp = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Negocio),
    });

    if (!resp.ok) {
      throw new Error('Error al crear el Negocio');
    }

    const nuevoNegocio = await resp.json();
    return nuevoNegocio;
  }

  async eliminarNegocio(id: number): Promise<void> {
    const resp = await fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE',
    });

    if (!resp.ok) {
      throw new Error('Error al eliminar la Negocio');
    }

    return;  
  }

}