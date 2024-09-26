import { Routes,RouterModule } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component'; // Componente inicio 
import { ListaProductosComponent } from './paginas/lista-productos/lista-productos.component'; // Componente Lista Productos
import { PaginaNoEncontradaComponent } from './paginas/pagina-no-encontrada/pagina-no-encontrada.component'; // Componente pág. no encontrada
import { RegistrarseComponent } from './paginas/registrarse/registrarse.component';
import { InicarSesionComponent } from './paginas/inicar-sesion/inicar-sesion.component';
import { TerminosCondicionesComponent } from './paginas/terminos-condiciones/terminos-condiciones.component';

export const routes: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: 'productos', component: ListaProductosComponent },
    { path: 'registrarse', component: RegistrarseComponent },
    { path: 'iniciar-sesion', component: InicarSesionComponent },
    { path: 'terminos-condiciones', component: TerminosCondicionesComponent },
    { path: '**', component: PaginaNoEncontradaComponent },
];
