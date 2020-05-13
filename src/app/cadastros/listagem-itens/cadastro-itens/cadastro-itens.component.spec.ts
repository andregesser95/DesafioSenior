import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroItensComponent } from './cadastro-itens.component';

describe('CadastroItensComponent', () => {
  let component: CadastroItensComponent;
  let fixture: ComponentFixture<CadastroItensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroItensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
