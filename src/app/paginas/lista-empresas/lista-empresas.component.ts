import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { EmpresasService } from '../../servicios/empresas.service';
import { Empresa } from '../../interfaces/empresa';

@Component({
  selector: 'app-lista-empresas',
  standalone: true,
  imports: [MatCardModule, RouterLink],
  templateUrl: './lista-empresas.component.html',
  styleUrl: './lista-empresas.component.scss'
})
export class ListaEmpresasComponent implements OnInit {
  empresas: Empresa[] = [];

  constructor(private readonly empresaService: EmpresasService) {}

  async obtenerEmpresas() {
    this.empresas = await this.empresaService.getEmpresas();
  }

  ngOnInit(): void {
    this.obtenerEmpresas();
  }
}

