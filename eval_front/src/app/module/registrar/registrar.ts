import { Component, inject, signal } from '@angular/core';
import { BtnReporte } from '../../shared/btn-reporte/btn-reporte';
import { BtnSalir } from '../../shared/btn-salir/btn-salir';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Persona } from '../../data/Persona';
import { PersonaService } from '../../service/persona-service';

@Component({
  selector: 'app-registrar',
  imports: [BtnReporte, BtnSalir, ReactiveFormsModule],
  templateUrl: './registrar.html',
  styleUrl: './registrar.scss',
})
export class Registrar {
    step:number = 1;
    private router = inject(Router);
    selectedFile!: File;
    public previewUrl = signal<string | ArrayBuffer | null>(null);
    private _personaService = inject(PersonaService);

    form1!: FormGroup;
    form2!: FormGroup;

    public success = signal<boolean>(false);
    public error = signal<string>('');

    constructor(private fb: FormBuilder) {}

    ngOnInit(){
      this.form1 = this.fb.group({
        // Datos personales
        nombres: ['', [Validators.required, Validators.minLength(3)]],
        apellidos: ['', [Validators.required, Validators.minLength(3)]],
        ruc_cedula: ['', [Validators.required, Validators.pattern(/^\d{10}$|^\d{13}$/)]],
        email: ['', [Validators.required, Validators.email]],
        provincia: ['', Validators.required],
        fecha_nacimiento: ['', Validators.required],
        direccion: ['', Validators.required],
        telefono: ['', [Validators.required, Validators.pattern(/^09\d{8}$/)]],
        discapacidad: ['', Validators.required],
        estado_civil: ['', Validators.required],
        tipo_sangre: ['', Validators.required],
        observaciones_personal: [''],
      });

      this.form2 = this.fb.group({
        // Datos laborales
        fecha_ingreso: ['', Validators.required],
        cargo: ['', Validators.required],
        departamento: ['', Validators.required],
        provincia_trabajo: ['', Validators.required],
        sueldo: [0, [Validators.required, Validators.min(1)]],
        jornada: ['', Validators.required],
        categoria: ['', Validators.required],
        seccion: ['', Validators.required],
        // codigo: ['', Validators.required],
        // status: ['', Validators.required],
        observaciones_laboral: ['']
        });
    }

    onFileSelected(event: any) {
      const file = event.target.files[0];

      if (file) {
        this.selectedFile = file;

        const reader = new FileReader();
        reader.onload = () => {
          this.previewUrl.update(value => reader.result);
        };
        reader.readAsDataURL(file);
      }
    }

    cambiarPaso(event: Event,paso:number){
      event.preventDefault(); 
      this.step = paso
    }

    guardar(){      
      if (this.form2.invalid) {
        this.form2.markAllAsTouched();
        return;
      }

      if (!this.selectedFile) {
        this.enviarDatos('')
      }else{
        const formData = new FormData();
        formData.append('image', this.selectedFile);
        this._personaService.guardarImagen(formData)
        .subscribe({
          next: (data) => {
            this.enviarDatos(data.ruta)
          },
          error: (err) => this.enviarDatos('')
        });
      }      
    }

    enviarDatos(url_img:string){
      let nuevaPersona:Persona = {...this.form1.value,...this.form2.value, url_imagen:url_img} as Persona;
      this._personaService.añadirPersona(nuevaPersona)
        .subscribe({
          next: data => {
            if(data !== null){
              this.success.update(value => true)
              this.error.update(value => '')
              setTimeout(() => {
                this.router.navigate(['/']);
              },3000)
            }
          },
          error: err => {
            this.error.update(value => err.error.error)
            this.success.update(value => false)
          }
        }); 
    }

    siguientePaso(){
      if (this.form1.invalid) {
        this.form1.markAllAsTouched();
        return;
      }
      this.step = 2;
    }
    
}
