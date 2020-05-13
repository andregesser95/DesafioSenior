import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { ListagemItensComponent } from './listagem-itens.component';
import { CadastroItensComponent } from './cadastro-itens/cadastro-itens.component';

const routes: Routes = [
    {
        path: '',
        component: ListagemItensComponent
    },
    {
        path: 'novo',
        component: CadastroItensComponent
    },
    {
        path: 'editar/:codigo',
        component: CadastroItensComponent
    }
]

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListagemItensRoutingModule { }