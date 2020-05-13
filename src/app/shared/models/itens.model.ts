// Interface de itens para a construção do formulário e base de dados.
export interface IItens {
    codigo: string;
    nomeItem: string;
    unidadeMedida: string;
    quantidade: number;
    preco: number;
    perecivel: boolean;
    dataValidade: Date;
    dataFabricacao: Date;
    actions: Array<string>;
}

// classe Itens com implementação da interface de Itens.
export class Itens implements IItens{
    codigo: string;
    nomeItem: string;
    unidadeMedida: string;
    quantidade: number;
    preco: number;
    perecivel: boolean;
    dataValidade: Date;
    dataFabricacao: Date;
    actions: Array<string>;
}