export interface Persona {
  //Datos personales
  id: number,
  nombres:string,
  apellidos:string,
  ruc_cedula:string,
  email:string,
  provincia:string,
  fecha_nacimiento:Date,
  direccion:string,
  telefono:string,
  discapacidad:string,
  estado_civil:string,
  tipo_sangre:string,
  observaciones_personal:string,
  url_imagen:string

  //Datos laborales
  fecha_ingreso:Date,
  cargo:string,
  departamento:string,
  sueldo:number,
  provincia_trabajo:string,
  categoria:string,
  seccion:string,
  jornada:string,
  codigo:string,
  status:string,
  observaciones_laboral:string,
}


export enum PersonaEnum {
  //Datos personales
  ID =  'id',
  NOMBRES = 'nombres',
  APELLIDOS = 'apellidos',
  RUC_CEDULA = 'ruc_cedula',
  EMAIL = 'email',
  PROVINCIA = 'provincia',
  FECHA_NACIMIENTO = 'fecha_nacimiento',
  DIRECCION = 'direccion',
  TELEFONO = 'telefono',
  DISCAPACIDAD = 'discapacidad',
  ESTADO_CIVIL = 'estado_civil',
  TIPO_SANGRE = 'tipo_sangre',
  OBSERVACIONES_PERSONAL = 'observaciones_personal',
  URL_IMAGEN = 'url_imagen',

  //Datos laborales
  FECHA_INGRESO = 'fecha_ingreso',
  CARGO = 'cargo',
  DEPARTAMENTO= 'departamento',
  SUELDO = 'sueldo',
  PROVINCIA_TRABAJO = 'provincia_trabajo',
  CATEGORIA = 'categoria',
  SECCION = 'seccion',
  JORNADA = 'jornada',
  CODIGO = 'codigo',
  STATUS = 'status',
  OBSERVACIONES_LABORAL = 'observaciones_laboral',
}

