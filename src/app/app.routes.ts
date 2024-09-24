import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListaProductosComponent } from './componentes/lista-productos/lista-productos.component';

export const routes: Routes = [
    { path:'productos', component: ListaProductosComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }