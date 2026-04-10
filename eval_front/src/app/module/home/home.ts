import { Component, inject, signal } from '@angular/core';
import { BtnCrear } from '../../shared/btn-crear/btn-crear';
import { BtnSalir } from '../../shared/btn-salir/btn-salir';
import { BtnReporte } from '../../shared/btn-reporte/btn-reporte';
import { PERSONAS } from '../../data/mockup';
import { Persona } from '../../data/Persona';
import { PersonaService } from '../../service/persona-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [BtnCrear, BtnSalir, BtnReporte],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  public personas = signal<Persona[]>([]);
  public personasAux = signal<Persona[]>([]);
  private _personaService = inject(PersonaService);
  public filtro1 = signal<string>("");
  public filtro2 = signal<string>("");
  private router = inject(Router);


  ngOnInit(): void {
    this.obtenerPersonas();
  }

  obtenerPersonas(){
    this._personaService.obtenerPersonas()
      .subscribe({
        next: data => {
          if(data !== null){
            this.personas.update(value => data);
            this.personasAux.update(value => data);
          }
        },
        error: err => {
        }
      }); 
  }

  onInputChange1(event: Event) {
    this.filtro1.update(v => (event.target as HTMLInputElement).value);
  }

  onInputChange2(event: Event) {
    this.filtro2.update(v => (event.target as HTMLInputElement).value);
  }

  actualizar(id:number){
    this.router.navigate(['/actualizar', id]);
  }

  buscar(){
    this.personas.update(value => this.personasAux())
  }
}
