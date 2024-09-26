import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-pagina-no-encontrada',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, MatButtonModule],
  templateUrl: './pagina-no-encontrada.component.html',
  styleUrl: './pagina-no-encontrada.component.scss'
})
export class PaginaNoEncontradaComponent {

}
