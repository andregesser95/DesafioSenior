import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

/* Rotas para a Home Page e o centralizador de cadastros. 
   Nesse modelo de rotas foi utilizado o recurso de Carregamento Lentro (Lazy-Loading) onde os módulos são carregados
   conforme necessário, reduzindo o tamanho dos pacotes iniciais */
const routes: Routes = [
  {
    path: 'cadastros',
    loadChildren: () => import('./cadastros/cadastros.module').then(m => m.CadastrosModule)
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
