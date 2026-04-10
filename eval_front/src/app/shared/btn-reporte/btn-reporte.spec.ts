import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnReporte } from './btn-reporte';

describe('BtnReporte', () => {
  let component: BtnReporte;
  let fixture: ComponentFixture<BtnReporte>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnReporte],
    }).compileComponents();

    fixture = TestBed.createComponent(BtnReporte);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
