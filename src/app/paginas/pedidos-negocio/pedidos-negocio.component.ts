// pedidos-negocio.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PedidosService } from '../../servicios/pedidos.service';  // Importa el servicio
import { Pedido } from '../../interfaces/pedido';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-pedidos-negocio',
  standalone: true,
  imports: [MatButtonModule, MatTableModule,CommonModule],
  templateUrl: './pedidos-negocio.component.html',
  styleUrls: ['./pedidos-negocio.component.scss'],
  providers: [DatePipe]
})
export class PedidosNegocioComponent implements OnInit {
  displayedColumns: string[] = ['id_pedido', 'fecha_pedido', 'estado_pedido', 'monto_total', 'productos'];
  dataSource: Pedido[] = [];
  id_negocio! : number;  // Aquí puedes definir el negocio cuyo pedido quieres mostrar

  @ViewChild(MatTable) table!: MatTable<Pedido>;

  constructor(
    private readonly pedidosService: PedidosService,
    private readonly route: ActivatedRoute // Inyectamos ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtener el id_negocio de los parámetros de la ruta
    this.route.params.subscribe((params) => {
      this.id_negocio = +params['id'];  // Convertir a número
      this.obtenerPedidos();  // Llamar al método para obtener los pedidos
    });
  }

  obtenerPedidos(): void {
    // Llama al servicio para obtener los pedidos para el negocio con el id especificado
    this.pedidosService.obtenerPedidosPorNegocio(this.id_negocio).subscribe((data) => {
      this.dataSource = data;
    });
  }

  getFechaCorta(fecha: string): string {
    return fecha.slice(0, 10);  // Devuelve los primeros 10 caracteres
  }

}
