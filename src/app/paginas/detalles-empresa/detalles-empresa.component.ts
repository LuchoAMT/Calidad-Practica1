import { Component  } from '@angular/core';
import { ActivatedRoute,RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Empresa } from '../../interfaces/empresa';
import { EmpresasService } from '../../servicios/empresas.service';


@Component({
  selector: 'app-detalles-empresa',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './detalles-empresa.component.html',
  styleUrl: './detalles-empresa.component.scss'
})
export class DetallesEmpresaComponent {

  empresa: Empresa | undefined;

  constructor(
    private route: ActivatedRoute,
    private empresasService: EmpresasService,
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.cargarEmpresa(id);
  }

  async cargarEmpresa(id: number) {
    try {
      this.empresa = await this.empresasService.getEmpresa(id);
      console.log('Empresa cargada:', this.empresa);  // Verifica si los datos se cargan correctamente
    } catch (error) {
      console.error(error);
    }
  }


}
