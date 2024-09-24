import { Routes,RouterModule } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component'; // Componente inicio 
import { ListaProductosComponent } from './paginas/lista-productos/lista-productos.component';


export const routes: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'productos', component: ListaProductosComponent },
    { path: '**', component: InicioComponent },
];
