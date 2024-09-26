import { Injectable } from '@angular/core';
import { Empresa } from '../interfaces/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  private apiUrl = 'http://localhost:3000/proveedores';

  constructor() { }

  // Método para obtener todos los productos
  async getEmpresas(): Promise<Empresa[]> {
    const resp = await	fetch(this.apiUrl);
    const empresas = await resp.json();
    return empresas;
  }
}
