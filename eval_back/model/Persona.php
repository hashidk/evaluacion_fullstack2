<?php

class PersonaModel {

    public $data = [];

    public $campos = [
        'id',
        'nombres',
        'apellidos',
        'url_imagen',
        'ruc_cedula',
        'email',
        'provincia',
        'fecha_nacimiento',
        'direccion',
        'telefono',
        'discapacidad',
        'estado_civil',
        'tipo_sangre',
        'observaciones_laboral',
        'fecha_ingreso',
        'cargo',
        'departamento',
        'provincia_trabajo',
        'sueldo',
        'categoria',
        'seccion',
        'jornada',
        'codigo',
        'status',
        'observaciones_personal',
    ];

    private $required = [
        'nombres',
        'apellidos',
        'ruc_cedula',
        'email',
        'provincia',
        'fecha_nacimiento',
        'direccion',
        'telefono',
        'discapacidad',
        'estado_civil',
        'tipo_sangre',
        'fecha_ingreso',
        'cargo',
        'departamento',
        'provincia_trabajo',
        'sueldo',
        'categoria',
        'seccion',
        'jornada',
    ];


    public function dataRequired($data){
        foreach ($this->required as $field) {
            if (!isset($data[$field]) || empty(trim($data[$field]))) {
                throw new Exception("El campo '$field' es obligatorio");
            }
        }
    }

    public function dataValidate($campo, $valor){
        switch ($campo) {
            case 'ruc_cedula':
                if (!preg_match('/^\d{10}(\d{3})?$/', $valor)) {
                    throw new Exception("RUC/Cédula inválido");
                }
                break;
            case 'email':
                if (!filter_var($valor, FILTER_VALIDATE_EMAIL)) {
                    throw new Exception("Email inválido, formato: joe@gmail.com");
                }
                break;
            case 'fecha_nacimiento':
                if (!DateTime::createFromFormat('Y-m-d', $valor)) {
                    throw new Exception("Fecha de nacimiento inválida");
                }

                if ($valor > date('Y-m-d')) {
                    throw new Exception("Fecha de nacimiento no válida, no puede ser una fecha superior a la de hoy");
                }
                break;
            case 'telefono':
                if (!preg_match('/^09\d{8}$/', $valor)) {
                    throw new Exception("Teléfono inválido: formato: 09XXXXXXXX");
                }
                break;
            case 'fecha_ingreso':
                if (!DateTime::createFromFormat('Y-m-d', $valor)) {
                    throw new Exception("Fecha de ingreso inválida");
                }
                break;
            case 'sueldo':
                if (!is_numeric($valor) || $valor < 0) {
                    throw new Exception("Sueldo inválido, debe ser mayor a 0 y debe ser un dato numérico");
                }
                break;
            
            default:
                break;
        }
    }

    public function checkData($data) {
        //Verificar si todos los campos obligatorios se incluyeron en los datos recibidos
        $this->dataRequired($data);
        
        foreach ($this->campos as $campo) {
            //Verificar el formato de datos recibidos
            $this->dataValidate($campo, $data[$campo]);
            $this->data[$campo] =  $data[$campo] ?? null;
        }
    }

    //Generar consultas a la Base de Datos
    public function toQuerySelect() {
        return "SELECT " . implode(", ", $this->campos) . " FROM personas";
    }

    public function toQuerySelectFilterById($id) {
        return $this->toQuerySelect() . " WHERE id = " . $id;
    }

    public function toQuerySelectFilterByCI($ruc_cedula) {
        return $this->toQuerySelect() . " WHERE ruc_cedula = " . $ruc_cedula ;
    }

    public function toQueryUpdate($id, $data) {
        $this->checkData($data);
        $sets = [];

        foreach ($this->data as $campo => $valor) {
            if ($campo !== 'id' && $campo !== 'ruc_cedula' && $campo !== 'codigo') {
                $valor = $this->escape($valor);
                $sets[] = "$campo = $valor";
            }
        }

        return "UPDATE personas SET " . implode(", ", $sets) . 
               " WHERE id = " . intval($id);
    }

    public function toQueryInsertInto($data) {
        $this->checkData($data);
        $this->data['status'] = "ACTIVO";

        $campos = [];
        $valores = [];

        foreach ($this->data as $campo => $valor) {
            if ($campo !== 'id') {
                $campos[] = $campo;
                $valores[] = $this->escape($valor);
            }
        }

        return "INSERT INTO personas (" . implode(", ", $campos) . ") 
                VALUES (" . implode(", ", $valores) . ")";
    }

    public function toQueryDelete($id) {
        return "DELETE FROM personas WHERE id = " . intval($id);
    }

    private function escape($valor) {
        if (is_null($valor)) return "NULL";
        return "'" . addslashes($valor) . "'";
    }
}