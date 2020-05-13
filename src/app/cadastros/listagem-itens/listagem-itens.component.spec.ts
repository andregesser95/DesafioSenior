import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemItensComponent } from './listagem-itens.component';

describe('ListagemItensComponent', () => {
  let component: ListagemItensComponent;
  let fixture: ComponentFixture<ListagemItensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemItensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
