<?php

header("Access-Control-Allow-Origin: *"); //Permitir peticiones de cualquier dominio
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); //Admitir solo ciertos métodos http
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { //El en caso de recibir una petición con el método OPTIONS
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/core/Router.php'; //Directorio /core: métodos para manejar el enrutamiento y respuestas

$router = new Router();

// Cargar rutas
require_once __DIR__ . '/routes/api.php'; //Directorio /routes: se agregan las rutas de la API para gestionar a las personas

// Ejecutar
$router->dispatch();