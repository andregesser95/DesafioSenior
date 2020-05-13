import { Data } from '@angular/router';

export interface IItens {
    codigo: string;
    nomeItem: string;
    unidadeMedida: string;
    quantidade: number;
    preco: number;
    perecivel: boolean;
    dataValidade: Date;
    dataFabricacao: Data;
    actions: Array<string>;
}

export class Itens implements IItens{
    codigo: string;
    nomeItem: string;
    unidadeMedida: string;
    quantidade: number;
    preco: number;
    perecivel: boolean;
    dataValidade: Date;
    dataFabricacao: Data;
    actions: Array<string>;
}