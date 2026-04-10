import { Component, inject, signal } from '@angular/core';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import { BtnSalir } from '../../shared/btn-salir/btn-salir';
import { email } from '@angular/forms/signals';
import { Persona, PersonaEnum } from '../../data/Persona';
import { PersonaService } from '../../service/persona-service';
import { Router } from '@angular/router';

enum Orden {
  ASC = 'asc',
  DESC = 'desc'
}

@Component({
  selector: 'app-reporte',
  imports: [DatePipe, BtnSalir],
  templateUrl: './reporte.html',
  styleUrl: './reporte.scss',
})
export class Reporte {

  formattedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');

  private router = inject(Router);

  public personas = signal<Persona[]>([]);
  public ordenarPor = signal<PersonaEnum>(PersonaEnum.NOMBRES);
  public sentido = signal<Orden>(Orden.ASC);
  public enum = PersonaEnum;
  public orden = Orden;
  private _personaService = inject(PersonaService);

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(){
    this._personaService.obtenerPersonas()
      .subscribe({
        next: data => {
          if(data !== null){
            this.personas.update(value => data);
          }
        },
        error: err => {
        }
      }); 
  }

  actualizar(id:number){
    this.router.navigate(['/actualizar', id]);
  }

  ordenarStringsPor(valor:PersonaEnum){
    if (this.ordenarPor() === valor) {
      this.cambiarOrden()
    }else{
      this.ordenarPor.update(value => valor)
    }

    switch (this.ordenarPor()) {
      case this.enum.SUELDO:
        this.personas.update(value => this.personas().sort((a,b) => 
          this.sentido() === Orden.ASC ? a.sueldo - b.sueldo : b.sueldo - a.sueldo
      ))
        break;
      case this.enum.FECHA_INGRESO:
        this.personas.update(value => this.personas().sort((a,b) => 
          this.sentido() === Orden.ASC ? 
          new Date(a.fecha_ingreso).getTime() - new Date(b.fecha_ingreso).getTime() :
          new Date(b.fecha_ingreso).getTime() - new Date(a.fecha_ingreso).getTime()))
        break;
      default:
        this.personas.update(value => this.personas().sort((a,b) => 
          this.sentido() === Orden.ASC ? 
          String(a[valor]).localeCompare(String(b[valor])) :
          String(b[valor]).localeCompare(String(a[valor]))
        ))
    } 
  }

  cambiarOrden(){
    if(this.sentido() === Orden.ASC){
      this.sentido.update(value => Orden.DESC)
    }else{
      this.sentido.update(value => Orden.ASC)
    }
  }
}
