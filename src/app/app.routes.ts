import { Routes,RouterModule } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component'; // Componente inicio
import { ListaProductosComponent } from './paginas/lista-productos/lista-productos.component';
import { ListaEmpresasComponent } from './paginas/lista-empresas/lista-empresas.component';


export const routes: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'productos', component: ListaProductosComponent },
    { path: 'empresas', component: ListaEmpresasComponent },
    { path: '**', component: InicioComponent },
];
