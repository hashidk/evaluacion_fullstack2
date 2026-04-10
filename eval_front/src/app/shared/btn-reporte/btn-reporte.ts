import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-btn-reporte',
  imports: [],
  templateUrl: './btn-reporte.html',
  styleUrl: './btn-reporte.scss',
})
export class BtnReporte {
  private router = inject(Router);

  navigateTo(dir:string) {
    this.router.navigate([dir]);
  }
}
