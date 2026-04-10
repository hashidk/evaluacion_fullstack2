<?php

class Router {
    private $routes = [];

    public function add($method, $path, $callback) { //Agregar rutas
        $this->routes[] = compact('method', 'path', 'callback');
    }

    public function dispatch() { //Recibir peticiones y redireccionarlos a sus respectivas rutas, en caso de 
    //que no se encuentre la ruta responde con un error 404.
        $requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $requestMethod = $_SERVER['REQUEST_METHOD'];

        foreach ($this->routes as $route) {
            if ($route['method'] === $requestMethod && $route['path'] === $requestUri) {
                call_user_func($route['callback']);
                return;
            }
        }

        http_response_code(404);
        echo json_encode(["error" => "Ruta no encontrada"]);
    }
}