import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { CadastrosComponent } from './cadastros.component';

const routes: Routes = [
    {
        path: '',
        component: CadastrosComponent,
        children: [
            {
                path: 'itens',
                loadChildren: () => import('./listagem-itens/listagem-itens.module').then(m => m.ListagemItensModule)
            }
        ]
    }
]

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CadastrosRoutingModule { }