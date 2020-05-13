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

		this.cancelarModal = { label: 'Não', action: this.fecharModal.bind(this) };
		this.sairModal = { label: 'Sim', action: () => this.router.navigate(["/cadastros/itens"]) };

		this.breadcrumbCadastro = {
			items: [
				{ label: 'Home', link: '/' },
				{ label: 'Itens', action: () => this.verificaInteracaoFormulario(this.formPrincipal) },
				{ label: this.buscaNomePagina() }
			]
		}

		this.acoesForm = [
			{ label: 'Salvar', type: 'submit', action: this.salvarRegistro.bind(this), icon: 'po-icon-plus' },
			{ label: 'Cancelar', action: this.verificaInteracaoFormulario.bind(this, this.formPrincipal) }
		]

	}

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

	private buscaNomePagina(): string {
		if (this.isPageEdit) {
			return 'Editar';
		} else {
			return 'Novo'
		}
	}

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

	private textoParaData(dataTexto) {
		return new Date(dataTexto.split('-').map((item) => item));
	}

	private verificaInteracaoFormulario(formPrincipal: FormGroup): void {
		if (formPrincipal.dirty === true) {
			this.modalCancelar.open();
		} else {
			this.fecharModal();
			this.router.navigate(["/cadastros/itens"]);
		}
	}

	private fecharModal() {
		this.modalCancelar.close();
	}

	private carregaUnidadesMedidas() {
		for (var strUnidade in UnidMedidas) {
			if (UnidMedidas.hasOwnProperty(strUnidade) && (isNaN(parseInt(strUnidade)))) {
				let item = { label: strUnidade, value: UnidMedidas[strUnidade] };
				this.unidadesMedidas.push(item);
			}
		}
	}

	habilitaValidade() {
		if (!this.formPrincipal.controls['perecivel'].value) {
			this.formPrincipal.patchValue({
				dataValidade: null
			});
		}

		return this.formPrincipal.controls['perecivel'].value;
	}

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

export enum UnidMedidas {
	Litros = 'L',
	Quilogramas = 'Kg',
	Unidade = 'UN'
}
