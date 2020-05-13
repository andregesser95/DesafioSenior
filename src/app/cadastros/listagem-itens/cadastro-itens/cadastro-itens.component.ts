import { Component, OnInit, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoPageAction, PoModalComponent, PoModalAction, PoSelectOption, PoNotificationService } from '@po-ui/ng-components';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Itens, IItens } from 'src/app/shared/models/itens.model';
import { ItensService } from 'src/app/shared/services/itens.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-cadastro-itens',
	templateUrl: './cadastro-itens.component.html',
	styleUrls: ['./cadastro-itens.component.scss']
})
export class CadastroItensComponent implements OnInit {
	@ViewChild('modalCancelar', { static: true }) modalCancelar: PoModalComponent;
	cancelarModal: PoModalAction;
	sairModal: PoModalAction;

	formPrincipal: FormGroup;

	breadcrumbCadastro: PoBreadcrumb;
	acoesForm: Array<PoPageAction>;

	itens = new Itens();

	isPageEdit = this.activatedRoute.routeConfig.path.includes('editar');
	codigoPrincipal = this.activatedRoute.snapshot.params.codigo;

	unidadesMedidas: Array<PoSelectOption> = [];

	tituloQuantidade = 'Quantidade';

	constructor(
		private fb: FormBuilder,
		private itensService: ItensService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private poNotification: PoNotificationService
	) { }

	ngOnInit(): void {
		this.criarFormulario();
		this.setComponentes();
		this.carregar();
	}

	//Função que cria o formulario com os campos respectivos do LocalStorage. 
	private criarFormulario() {
		this.formPrincipal = this.fb.group({
			codigo: ['', Validators.required],
			nomeItem: ['', Validators.required],
			unidadeMedida: ['', Validators.required],
			quantidade: [''],
			preco: ['', Validators.required],
			perecivel: [false],
			dataValidade: [],
			dataFabricacao: [Validators.required]
		})
	}

	private setComponentes() {

		this.carregaUnidadesMedidas();

		// Botões da tela de confirmação de saída da tela se salvar.
		this.cancelarModal = { label: 'Não', action: this.fecharModal.bind(this) };
		this.sairModal = { label: 'Sim', action: () => this.router.navigate(["/cadastros/itens"]) };

		// Navegação das páginas
		this.breadcrumbCadastro = {
			items: [
				{ label: 'Home', link: '/' },
				{ label: 'Itens', action: () => this.verificaInteracaoFormulario(this.formPrincipal) },
				{ label: this.isPageEdit ? 'Editar' : 'Novo' }
			]
		}

		// Botões principais da tela de cadastro de itens
		this.acoesForm = [
			{ label: 'Salvar', type: 'submit', action: this.salvarRegistro.bind(this), icon: 'po-icon-plus' },
			{ label: 'Cancelar', action: this.verificaInteracaoFormulario.bind(this, this.formPrincipal) }
		]

	}

	/* Essafunção carrega as informações dos campos quando está em modo de Edição,
	   que por meio do código recebido busca os dados do registro na basename. */
	private carregar() {
		let property;
		let item: IItens;

		if (this.codigoPrincipal) {
			item = this.itensService.buscaRegistro(this.codigoPrincipal);

			for (property in item) {
				if (this.formPrincipal.controls.hasOwnProperty(property)) {
					this.formPrincipal.controls[property].patchValue(item[property]);
				}
			}

			this.carregaTitulos();
		}
	}

	/* Função que salva o registro na base e volta para a tela de listagem 
	   que é atualizada já com o novo registro ou com a alteração realizada */
	private salvarRegistro() {

		if (!this.validacaoCampos()) {
			return
		}

		if (this.isPageEdit) {
			this.itensService.atualizar(this.formPrincipal.value);
			this.router.navigate(['/cadastros/itens']);
			this.poNotification.success('Alteração efetuada com sucesso!!');
		} else {
			this.itensService.incluir(this.formPrincipal.value);
			this.router.navigate(['/cadastros/itens']);
			this.poNotification.success('Inclusão efetuada com sucesso!');
		}
	}

	//Validação de preenchimento dos campos
	private validacaoCampos() {
		let isOk = true;
		let today = new Date();

		if (!this.formPrincipal.controls['codigo'].value) {
			this.poNotification.error('Código deve ser informado!');
			isOk = false;
		}

		if (!this.formPrincipal.controls['nomeItem'].value) {
			this.poNotification.error('Nome do Item deve ser informado!');
			isOk = false;
		}

		if (!this.formPrincipal.controls['unidadeMedida'].value) {
			this.poNotification.error('Unidade de Medida deve ser informado!');
			isOk = false;
		}

		if (!this.formPrincipal.controls['preco'].value) {
			this.poNotification.error('Preço deve ser informado!');
			isOk = false;
		}

		if (!this.formPrincipal.controls['dataFabricacao'].value) {
			this.poNotification.error('Data de fabricação deve ser informada!');
			isOk = false;
		}

		if (this.formPrincipal.controls['perecivel'].value) {

			if (!this.formPrincipal.controls['dataValidade'].value) {
				this.poNotification.error('Data de validade deve ser informada!');
				isOk = false;
			} else {
				let dataValidade = this.textoParaData(this.formPrincipal.controls['dataValidade'].value);
				if (dataValidade && dataValidade < today) {
					this.poNotification.error('O produto encontra-se vencido!');
					isOk = false;
				}
			}
		}

		if (this.formPrincipal.controls['dataFabricacao'].value && this.formPrincipal.controls['dataValidade'].value) {
			if (this.formPrincipal.controls['dataFabricacao'].value > this.formPrincipal.controls['dataValidade'].value) {
				this.poNotification.error('A data de validade não pode ser menor que a data de fabricação!');
				isOk = false;
			}
		}

		return isOk;
	}

	//Converte a data que está em formato texto para Date.
	private textoParaData(dataTexto) {
		return new Date(dataTexto.split('-').map((item) => item));
	}

	//Verificação de manipulação do formulário
	private verificaInteracaoFormulario(formPrincipal: FormGroup): void {
		if (formPrincipal.dirty) {
			this.modalCancelar.open();
		} else {
			this.fecharModal();
			this.router.navigate(["/cadastros/itens"]);
		}
	}

	private fecharModal() {
		this.modalCancelar.close();
	}

	//Carrega as unidades de medida para o Array do campo Select, por meio de uma Enum.
	private carregaUnidadesMedidas() {
		for (var strUnidade in UnidMedidas) {
			if (UnidMedidas.hasOwnProperty(strUnidade) && (isNaN(parseInt(strUnidade)))) {
				let item = { label: strUnidade, value: UnidMedidas[strUnidade] };
				this.unidadesMedidas.push(item);
			}
		}
	}

	//Habilita/Desabilita o campo de Data de validade caso o checkbox Perecivel seja marcado/desmarcado.
	habilitaValidade() {
		if (!this.formPrincipal.controls['perecivel'].value) {
			this.formPrincipal.patchValue({
				dataValidade: null
			});
		}

		return this.formPrincipal.controls['perecivel'].value;
	}

	//Titulos do componente de Qauntidade de acordo com o que é selecionado no componente de unidade de medida.
	carregaTitulos() {
		switch (this.formPrincipal.controls['unidadeMedida'].value) {
			case 'L':
				this.tituloQuantidade = 'Quantidade (L)';
				break;
			case 'Kg':
				this.tituloQuantidade = 'Quantidade (Kg)';
				break;
			case 'UN':
				this.tituloQuantidade = 'Quantidade (UN)';
				break;
		}
	}

}

//Enum de unidades de Medida
export enum UnidMedidas {
	Litros = 'L',
	Quilogramas = 'Kg',
	Unidade = 'UN'
}
