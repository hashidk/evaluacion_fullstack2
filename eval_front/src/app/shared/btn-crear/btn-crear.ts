import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-btn-crear',
  imports: [],
  templateUrl: './btn-crear.html',
  styleUrl: './btn-crear.scss',
})
export class BtnCrear {
  private router = inject(Router);

  navigateTo(dir:string) {
    this.router.navigate([dir]);
  }
}
