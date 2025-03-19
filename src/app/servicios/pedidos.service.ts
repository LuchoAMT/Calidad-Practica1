// pedidos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../interfaces/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private readonly apiUrl = 'http://localhost:3000/pedidos';  // URL de tu API

  constructor(private readonly http: HttpClient) {}

  // Obtiene los pedidos de un negocio por su id
  obtenerPedidosPorNegocio(id_negocio: number): Observable<Pedido[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id_negocio}`);
  }
}
