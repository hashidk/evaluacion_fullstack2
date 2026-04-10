import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BtnSalir } from '../../shared/btn-salir/btn-salir';
import { BtnReporte } from '../../shared/btn-reporte/btn-reporte';
import { Persona } from '../../data/Persona';
import { PersonaService } from '../../service/persona-service';
import { environment } from '../../../enviroments/env';

@Component({
  selector: 'app-actualizar',
  imports: [BtnReporte, BtnSalir, ReactiveFormsModule],
  templateUrl: './actualizar.html',
  styleUrl: './actualizar.scss',
})
export class Actualizar {
    step:number = 1;
    private router = inject(Router);
    selectedFile!: File;
    public previewUrl = signal<string | ArrayBuffer | null>(null);
    form1!: FormGroup;
    form2!: FormGroup;
    public url_base:string = environment.apiUrl + "/upload?file=";

    public success = signal<boolean>(false);
    public error = signal<string>("");

    constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    }

    public persona = signal<Persona>({} as Persona);
    private _personaService = inject(PersonaService);

    obtenerPersonas(){
      const id = this.route.snapshot.paramMap.get('id');
      this._personaService.obtenerPersona(id)
        .subscribe({
          next: data => {
            if(data !== null){
              this.persona.update(value => data as Persona);
              this.patchValues();
            }
          },
          error: err => {
          }
        }); 
    }
  
    patchValues(){
      this.form1.patchValue({
        nombres:this.persona().nombres,
        apellidos:this.persona().apellidos,
        ruc_cedula:this.persona().ruc_cedula,
        email:this.persona().email,
        provincia:this.persona().provincia,
        fecha_nacimiento:this.persona().fecha_nacimiento,
        direccion:this.persona().direccion,
        telefono:this.persona().telefono,
        discapacidad:this.persona().discapacidad,
        estado_civil:this.persona().estado_civil,
        tipo_sangre:this.persona().tipo_sangre,
        observaciones_personal:this.persona().observaciones_personal,
      })

      this.form2.patchValue({
        fecha_ingreso:this.persona().fecha_ingreso,
        cargo:this.persona().cargo,
        departamento:this.persona().departamento,
        provincia_trabajo:this.persona().provincia_trabajo,
        sueldo:this.persona().sueldo,
        jornada:this.persona().jornada,
        categoria:this.persona().categoria,
        seccion:this.persona().seccion,
        codigo:this.persona().codigo,
        status:this.persona().status,
        observaciones_laboral:this.persona().observaciones_laboral,
      })
    }

    ngOnInit(){
      this.obtenerPersonas();
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
        codigo: ['', Validators.required],
        status: ['', Validators.required],
        observaciones_laboral: ['']
        });
    }

    onFileSelected(event: any) {
      const file = event.target.files[0];

      if (file) {
        this.selectedFile = file;

        const reader = new FileReader();
        reader.onload = () => {
          this.previewUrl.update(value => reader.result)
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
      const id = this.route.snapshot.paramMap.get('id');
      let nuevaPersona:Persona = {...this.form1.value,...this.form2.value, id:id, url_imagen:url_img} as Persona;
      console.log(nuevaPersona);
      
      this._personaService.actualizarPersona(nuevaPersona)
        .subscribe({
          next: data => {
            if(data !== null){
              this.success.update(value => true)
              this.error.update(value => '')

              setTimeout(()=>{
                window.location.reload()
              },3000)
            }
          },
          error: err => {
            console.log(err);
            
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