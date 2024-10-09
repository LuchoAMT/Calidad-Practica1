import { Routes,RouterModule } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component'; // Componente inicio
import { ListaProductosComponent } from './paginas/lista-productos/lista-productos.component';
import { ListaEmpresasComponent } from './paginas/lista-empresas/lista-empresas.component';
import { PaginaNoEncontradaComponent } from './paginas/pagina-no-encontrada/pagina-no-encontrada.component'; // Componente pág. no encontrada
import { RegistrarseComponent } from './paginas/registrarse/registrarse.component';
import { IniciarSesionComponent } from './paginas/iniciar-sesion/iniciar-sesion.component';
import { TerminosCondicionesComponent } from './paginas/terminos-condiciones/terminos-condiciones.component';
import { DetallesEmpresaComponent } from './paginas/detalles-empresa/detalles-empresa.component';

export const routes: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: 'productos', component: ListaProductosComponent },
    { path: 'empresas', component: ListaEmpresasComponent },
    { path: 'registrarse', component: RegistrarseComponent },
    { path: 'iniciar-sesion', component: IniciarSesionComponent },
    { path: 'terminos-condiciones', component: TerminosCondicionesComponent },
    { path: 'detalles-empresa/:id', component: DetallesEmpresaComponent},
    { path: '**', component: PaginaNoEncontradaComponent },
];
