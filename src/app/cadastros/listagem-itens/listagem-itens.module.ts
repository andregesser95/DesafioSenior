import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListagemItensRoutingModule } from './listagem-itens-routing.module';
import { ListagemItensComponent } from './listagem-itens.component';
import { CadastroItensComponent } from './cadastro-itens/cadastro-itens.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ListagemItensComponent,
    CadastroItensComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PoModule,
    ListagemItensRoutingModule,
    SharedModule
  ],
  exports: [
    ListagemItensComponent,
    CadastroItensComponent
  ]
})
export class ListagemItensModule { }
