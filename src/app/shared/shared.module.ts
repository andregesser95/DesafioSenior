import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VMensagemComponent } from './components/v-mensagem/v-mensagem.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    VMensagemComponent
  ],
  declarations: [
    VMensagemComponent
  ]
})
export class SharedModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    }
  }
}
