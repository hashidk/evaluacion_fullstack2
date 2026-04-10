import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Persona } from '../data/Persona';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/env';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
    public base_url:string;
    public headers:HttpHeaders
    private _http = inject(HttpClient)

    constructor(
    ){
        this.base_url = environment.apiUrl;
        this.headers = new HttpHeaders().set('Content-Type','application/json');
    }

    obtenerPersonas(){
        return this._http.get<Persona[]>(this.base_url,{headers:this.headers});
    }

    añadirPersona(persona:Persona):Observable<any>{
        let params=JSON.stringify(persona);
        console.log(params);
        
        return this._http.post(this.base_url,params,{headers:this.headers});
    }

    obtenerPersona(id:any):Observable<any>{
        return this._http.get(this.base_url+'?id='+id,{headers:this.headers});
    }

    actualizarPersona(persona:Persona):Observable<any>{
        let params=JSON.stringify(persona);
        return this._http.put(this.base_url+'?id='+persona.id,params,{headers:this.headers});
    }

    eliminarPersona(id:String):Observable<any>{
        return this._http.delete(this.base_url+'?id='+id,{headers:this.headers});
    }

    guardarImagen(formData:FormData):Observable<any>{
        return this._http.post(this.base_url+'/upload',formData);
    }
}
