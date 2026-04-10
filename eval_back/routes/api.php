<?php

require_once __DIR__ . '/../controllers/PersonaController.php';

$router->add('GET', '/api/personas', function() {
    $id = $_GET['id'] ?? null;
    if ($id === null) {
        (new PersonaController())->index();
    }else{
        (new PersonaController())->show($id);
    }
});

$router->add('POST', '/api/personas', function() {
    (new PersonaController())->store();
});

$router->add('PUT', '/api/personas', function() {
    $id = $_GET['id'] ?? null;
    (new PersonaController())->update($id);
});

$router->add('DELETE', '/api/personas', function() { //Se implementó, pero no se menciona dentro del alcance de la evaluación
    $id = $_GET['id'] ?? null;
    (new PersonaController())->destroy($id);
});

$router->add('POST', '/api/personas/upload', function() { //Sube las imagenes cargadas en el frontend y las almacena en /uploads 
    $archivo = $_FILES['image'];
    (new PersonaController())->upload($archivo);
});

$router->add('GET', '/api/personas/upload', function() { //Devuelve la imagen img.png de la dirección base_ruta/uploads?file=img.png
    $archivo = $_GET['file'];
    (new PersonaController())->image($archivo);
});