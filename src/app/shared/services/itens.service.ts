import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Itens } from '../models/itens.model';

@Injectable({
  providedIn: 'root'
})
export class ItensService {

  constructor(private db: LocalStorageService) { }

  incluir(item: Itens) {
    this.db.add(item.codigo, item);
  }

  excluir(codigo: string) {
    return this.db.remove(codigo);
  }

  atualizar(item: Itens) {
    this.db.set(item.codigo, item);
  }

  buscaRegistro(codigo: string): Itens {
    return this.db.get(codigo);
  }

  buscaTodos(): Itens[] {
    return this.db.keys().map(codigo => this.buscaRegistro(codigo));
  }

}
