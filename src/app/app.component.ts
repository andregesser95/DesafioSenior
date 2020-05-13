import { Component } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	//Objeto de contrução do Menu com os itens apresentados nele.
	readonly menus: Array<PoMenuItem> = [
		{
			label: 'Home',
			icon: 'po-icon-home',
			link: './',
			shortLabel: 'Home'
		},
		{
			label: 'Cadastros',
			icon: 'po-icon-document',
			shortLabel: 'Cadastros',
			subItems: [
				{
					label: 'Itens',
					link: './cadastros/itens'
				}
			]
		}
	];

}
