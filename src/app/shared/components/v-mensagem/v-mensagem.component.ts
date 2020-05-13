import { Component, Input } from '@angular/core';

@Component({
  selector: 'ap-mensagem',
  templateUrl: './v-mensagem.component.html',
  styleUrls: ['./v-mensagem.component.scss']
})
export class VMensagemComponent {

  @Input() texto = "";
  
}
