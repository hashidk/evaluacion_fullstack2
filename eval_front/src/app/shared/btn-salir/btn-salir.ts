import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-btn-salir',
  imports: [],
  templateUrl: './btn-salir.html',
  styleUrl: './btn-salir.scss',
})
export class BtnSalir {
  private router = inject(Router);

  navigateTo(dir:string) {
    this.router.navigate([dir]);
  }
}
