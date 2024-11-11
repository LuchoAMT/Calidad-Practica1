import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosNegocioComponent } from './pedidos-negocio.component';

describe('PedidosNegocioComponent', () => {
  let component: PedidosNegocioComponent;
  let fixture: ComponentFixture<PedidosNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidosNegocioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
