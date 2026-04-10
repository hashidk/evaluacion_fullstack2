import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnCrear } from './btn-crear';

describe('BtnCrear', () => {
  let component: BtnCrear;
  let fixture: ComponentFixture<BtnCrear>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnCrear],
    }).compileComponents();

    fixture = TestBed.createComponent(BtnCrear);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
