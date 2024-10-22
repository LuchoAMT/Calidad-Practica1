import { Injectable } from '@angular/core';
import { Empresa } from '../interfaces/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  private apiUrl = 'http://localhost:3000/empresas';

  constructor() { }

  // Método para obtener todas las empresas
  async getEmpresas(): Promise<Empresa[]> {
    const resp = await	fetch(this.apiUrl);
    const empresas = await resp.json();
    return empresas;
  }

  async getEmpresa(id: number): Promise<Empresa> {
    const resp = await fetch(`${this.apiUrl}/${id}`);
    const empresa = await resp.json();
    return empresa;
  }

  async crearEmpresa(empresa: Empresa): Promise<Empresa> {
    const resp = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(empresa),
    });

    if (!resp.ok) {
      throw new Error('Error al crear la empresa');
    }

    const nuevoEmpresa = await resp.json();
    return nuevoEmpresa;
  }

  async eliminarEmpresa(id: number): Promise<void> {
    const resp = await fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE',
    });

    if (!resp.ok) {
      throw new Error('Error al eliminar la empresa');
    }

    return;  // No se espera ninguna respuesta del servidor al eliminar
  }

}
