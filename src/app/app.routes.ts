import { Routes,RouterModule } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component'; // Componente inicio 


export const routes: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: '**', component: InicioComponent },
];
