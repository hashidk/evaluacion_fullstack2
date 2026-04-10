import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnSalir } from './btn-salir';

describe('BtnSalir', () => {
  let component: BtnSalir;
  let fixture: ComponentFixture<BtnSalir>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnSalir],
    }).compileComponents();

    fixture = TestBed.createComponent(BtnSalir);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
