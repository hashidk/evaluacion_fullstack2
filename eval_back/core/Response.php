<?php

class Response {
    public static function json($data, $status = 200) { //Respuesta estándar para todas las rutas
        http_response_code($status);
        header('Content-Type: application/json');
        echo json_encode($data);
    }
}