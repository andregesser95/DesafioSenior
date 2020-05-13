import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';

import { CadastrosRoutingModule } from './cadastros-routing.module';
import { CadastrosComponent } from './cadastros.component';
import { ListagemItensModule } from './listagem-itens/listagem-itens.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CadastrosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PoModule,
    CadastrosRoutingModule,
    ListagemItensModule
  ]
})
export class CadastrosModule { }
