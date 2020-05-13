import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb } from '@po-ui/ng-components';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  breadcrumbHome: PoBreadcrumb;

  constructor() { }

  ngOnInit(): void {
    this.setComponents();
    this.search();
  }

  private setComponents() {

    this.breadcrumbHome = {
      items: [
        { label: 'Home' }
      ]
    }

  }

  private search() {

  }

}
