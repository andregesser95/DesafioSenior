import { Component, OnInit, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoPageFilter, PoPageAction, PoTableColumn, PoModalComponent, PoModalAction } from '@po-ui/ng-components';
import { IItens } from 'src/app/shared/models/itens.model';
import { ItensService } from 'src/app/shared/services/itens.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem-itens',
  templateUrl: './listagem-itens.component.html',
  styleUrls: ['./listagem-itens.component.scss']
})
export class ListagemItensComponent implements OnInit {

  @ViewChild('modalExclusao') modalExclusao: PoModalComponent;

  cancelaExclusao: PoModalAction;
  confirmaExclusao: PoModalAction;

  breadcrumbLista: PoBreadcrumb;

  configFiltro: PoPageFilter;
  codigoItem: string = '';

  acoesListagem: Array<PoPageAction>;
  colunasTabela: Array<PoTableColumn>;

  listaItens: Array<IItens> = new Array<IItens>();
  selecaoMultipla: boolean = false;
  quantSelecionada: number = 0;

  constructor(
    private itensService: ItensService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setComponentes();
    this.carregar();
  }

  private setComponentes() {

    // Ações dos botões de confirmação de exclusão dos itens.
    this.confirmaExclusao = { action: () => this.onConfirmaExclusao(), label: 'Sim' };
    this.cancelaExclusao = { action: () => this.onCancelaExclusao(), label: 'Não' };

    // Botões prinipais da tela de Listagem
    this.acoesListagem = [
      {
        label: 'Adicionar Item',
        icon: 'po-icon-plus',
        disabled: () => !this.selected(),
        action: () => this.router.navigate(['cadastros/itens/novo'])
      },
      {
        label: 'Romover Item(s)',
        action: () => this.validaExclusao(),
        disabled: () => this.selected()
      }
    ]

    //Navegador das páginas.
    this.breadcrumbLista = {
      items: [
        { label: 'Home', link: '/' },
        { label: 'Itens' }
      ]
    }

    //Configuração do campo de busca da tela de listagem.
    this.configFiltro = {
      placeholder: 'Buscar',
      action: 'filtraNome',
      ngModel: 'codigoItem'
    }

    //Definição das colunas da tabela de listagem dos itens.
    this.colunasTabela = [
      { property: 'codigo', type: 'string', label: 'Código', width: '10%' },
      { property: 'nomeItem', type: 'string', label: 'Nome', width: '30%' },
      { property: 'unidadeMedida', type: 'string', label: 'Unid. Medida', width: '8%' },
      { property: 'quantidade', type: 'number', label: 'Quantidade', width: '8%' },
      { property: 'preco', type: 'currency', format: 'BRL', label: 'Preço', width: '10%' },
      { property: 'perecivel', type: 'boolean', label: 'Perecível', width: '10%' },
      { property: 'dataValidade', type: 'date', format: 'dd/MM/yyyy', label: 'Validade', width: '8%' },
      { property: 'dataFabricacao', type: 'date', format: 'dd/MM/yyyy', label: 'Fabricação', width: '8%' },
      {
        //Na coluna de ações, são adicionados os botões de edição do registro, abaixo temos o botão editar.
        property: 'actions', type: 'icon', label: 'Ações', width: '5%',
        icons: [
          {
            color: 'color-12',
            icon: 'po-icon-edit',
            value: 'edit',
            action: (valorLinha) => this.editar(valorLinha)
          }
        ]
      }
    ];

  }

  /* Função chamada ao acionar o botão editar da linha do item que se deseja alterar, 
     chamado a tela de cadastro e enviado o código que se quer alterar. */
  private editar(item: IItens) {
    this.router.navigate(['/cadastros/itens/editar', item.codigo]);
  }

  private validaExclusao(): void {
    const selecionados = this.listaItens.filter((item: any) => item.$selected);

    if (selecionados.length > 1) {
      this.selecaoMultipla = true;
    }

    this.modalExclusao.open();
  }

  private onConfirmaExclusao(): void {
    this.modalExclusao.close();
    this.removeRegistro();
    this.selecaoMultipla = false;
  }

  private onCancelaExclusao(): void {
    this.modalExclusao.close();
    this.selecaoMultipla = false;
  }

  removeRegistro() {
    let count = 0;
    const selecionados = this.listaItens.filter((item: any) => item.$selected);

    if (selecionados.length > 0) {

      selecionados.map((item: IItens) => {
        this.itensService.excluir(item.codigo);

        if (++count === selecionados.length) {
          this.carregar();
        }
      });
    }
  }

  //Função chamada pela configuração do campo de filtro que ao ter albuma informação busca pelo valod do código.
  filtraNome(): void {
    if (this.codigoItem.length > 0) {
      this.listaItens = this.listaItens.filter(item => item.codigo === this.codigoItem);
    } else {
      this.carregar();
    }
  }

  //Carrega todos os dados adicionados no LocalStorage
  private carregar(): void {
    this.listaItens = this.itensService.buscaTodos();
    this.listaItens.forEach(item => item.actions = ['edit', 'copy'])
  }

  private selected() {
    return !this.listaItens.find(item => item['$selected']);
  }

}
