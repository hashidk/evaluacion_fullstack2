<?php

require_once __DIR__ . '/../usecase/Persona.php';
require_once __DIR__ . '/../core/Response.php';

class PersonaController {

    public function index() {
        try {
            $model = new Persona();
            Response::json($model->all());
        } catch (Exception $e) {
            Response::json(["error" => "No se pudo listar: " . $e->getMessage()], 400);
        }
    }

    public function show($id) {
        //Verificar si se envió el id
        if (isset($id)) {
            try {
                $model = new Persona();
                $persona = $model->find($id);
                //Verificar si existe la persona
                if (!$persona) {
                    Response::json(["error" => "No encontrado"], 404);
                }else{
                    Response::json($persona);
                }
            } catch (Exception $e) {
                Response::json(["error" => "No se pudo listar: ". $e->getMessage()], 400);
            }
        }else{
            Response::json(["error" => "Debe proporcionar un id"], 400);
        }
    }

    public function store() {
        //Obtener datos enviados desde el frontend
        $data = json_decode(file_get_contents("php://input"), true);

        //Verificar si el archivo JSON enviado es correcto
        if (json_last_error() !== JSON_ERROR_NONE) {
            Response::json(["error" => "JSON inválido"], 400);
            exit;
        }

        //Verificar si los datos son válidos
        if (!$data || !is_array($data)) {
            Response::json(["error" => "Datos no válidos"], 400);
            exit;
        }

        try {     
            $model = new Persona();

            //Verificar si ya existe el usuario con la misma cédula
            $persona = $model->findByRC($data['ruc_cedula']);
            if (!$persona) {
                $model->create($data);
                Response::json(["message" => 'ok']);
            }else{
                Response::json(["error" => "Otro usuario ya tiene registrado ese RUC/CEDULA"], 400);
            }
        } catch (Exception $e) {
            Response::json(["error" => "No se pudo guardar: " . $e->getMessage()], 400);
        }        
    }

    public function update($id) {
        if (isset($id)) {
            $data = json_decode(file_get_contents("php://input"), true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                Response::json(["error" => "JSON inválido"], 400);
                exit;
            }

            if (!$data || !is_array($data)) {
                Response::json(["error" => "Datos no válidos"], 400);
                exit;
            }

            try {
                $model = new Persona();
                $persona = $model->find($id);
                //Verificar si existe la persona
                if (!$persona) {
                    Response::json(["error" => "No encontrado"], 400);
                }else{
                    $model->update($id,$data);
                    Response::json(["message" => 'ok']);
                }
            } catch (Exception $e) {
                Response::json(["error" => "No se pudo actualizar: " . $e->getMessage()], 400);
            }
        }else{
                Response::json(["error" => "Debe proporcionar un id"], 400);
        }
    }

    public function destroy($id) {
        if (isset($id)) {
            try {
                $model = new Persona();
                $persona = $model->find($id);
                //Verificar si existe la persona
                if (!$persona) {
                    Response::json(["error" => "No encontrado"], 400);
                }else{
                    $model->delete($id);
                    Response::json(["message" => 'ok']);
                }
            } catch (Exception $e) {
                Response::json(["error" => "No se pudo eliminar: " . $e->getMessage()], 400);
            }
        }else{
            Response::json(["error" => "Debe proporcionar un id"], 400);
        }
    }

    public function upload($archivo) {
        //Validar imagen
        if (!isset($archivo)) {
            Response::json(["error" => "No se envió la imagen"], 400);
        }
        //Validar extensión de la imagen
        if (!in_array($archivo['type'], ['image/jpeg', 'image/png', 'image/webp'])) {
            Response::json(["error" => "Solo se admiten imagenes jpeg, png y webp"], 400);
        }

        $carpetaDestino = "uploads/";
        $extension = pathinfo($archivo['name'], PATHINFO_EXTENSION);
        $nombreArchivo = uniqid() . "." . $extension;

        $rutaFinal = $carpetaDestino . $nombreArchivo;

        if (move_uploaded_file($archivo['tmp_name'], $rutaFinal)) {
            Response::json(["message" => 'ok', "ruta" => $nombreArchivo]);
        } else {
            Response::json(["error" => "No se pudo guardar la imagen"], 400);
        }
    }

    public function image($archivo) {
        $ruta = "uploads/" . $archivo;

        //Validar existencia
        if (!file_exists($ruta)) {
            Response::json(["error" => "Imagen no encontrada"], 400);
            exit;
        }

        $tipo = mime_content_type($ruta);
        header("Content-Type: " . $tipo);
        readfile($ruta);
    }
}