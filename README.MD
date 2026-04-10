# 📦 Proyecto Fullstack: Angular + PHP API

Aplicación web compuesta por:
- **Frontend:** Angular
- **Backend:** PHP (API REST)
- **Base de datos:** MySQL

---

# 1. Requisitos

Antes de iniciar, asegúrate de tener instalado:

- Node.js (>= 16)
- Angular CLI
- PHP (>= 7.4 u 8.3.28 recomendado)
- MySQL
- XAMPP / Laragon / servidor local (desarrollado en WAMPServer)

--- 

# 2. Estructura del Proyecto

## 🔹 Frontend (Angular)

```

eval_front/
├── src/
│   ├── app/
│   │   ├── data/ -> modelos de datos y mockup (datos quemados)
│   │   ├── layout/ -> componente principal estático: Header
│   │   ├── module/ -> componentes (páginas) de la aplicación
│   │   ├── service/ -> servicios, peticiones al servidor
│   │   ├── shared/ -> componentes reutilizables
│   │   └── app.routes.ts -> rutas usadas de compomentes de /module
│   ├── assets/imgs
│   └── index.html
│   └── main.ts
├── angular.json
├── package.json
└── tsconfig.json

```

---

## 🔹 Backend (PHP)

```

eval_back/
├── config/
│   └── db.php -> Configuración e inicialización de la base de datos
├── controllers/ -> funciones (handlers) de las las rutas
├── model/
├── core/ -> 
│   ├── Response.php -> respuesta estándar de las funciones en controllers/
│   └── Router.php -> función para manejo de rutas (añadir rutas) y controlar peticiones (POST + route -> controller->funcion())
├── routes/ -> rutas de las peticiones
│   └── api.php
├── uploads/ -> imagenes subidas desde el front
├── usecase/ -> casos de uso
└── index.php -> Inicio del servidor PHP

```

Orden de ejecución:
```
index.php ── routes ── controllers ── usecase ── db.php
    └──  Router.php                       └── model

```

---

## 🔹 Base de Datos

```
database/
└── script.sql

```

---

# 3. Configuración del Proyecto

---

## Frontend (Angular)

### Instalación

```
cd eval_front
npm install 
```


 
### Ejecución
```
bash
ng serve
```

Se iniciará el servidor en en:

```
http://localhost:4200
```

---

## Backend (PHP)

### Configuración

Editar archivo:

```
backend/config/db.php
```

Ejemplo:

```php
    $host = '127.0.0.1';
    $db   = 'eval_database';
    $user = 'user_db';
    $pass = '123456789';
    $port = '3308';
```
###### En mi caso ya tenía un servidor usando el puerto por defecto 3306 por lo que tuve que cambiar al 3308, sin embargo eso dependerá de su servidor (colocar en 3306) 
---

### Ejecución

Si usa PHP nativo:

```bash
cd eval_back
php -S localhost:8001
```

API disponible en:

```
http://localhost:8001
```
Nota: El frontend usa el puerto 8001, por ende su importancia.

---

# 4. Despliegue de Base de Datos

1. Crear base de datos en MySQL:

```sql
CREATE DATABASE eval_database;
```

2. Importar el script:

```bash
mysql -u root -p eval_database < database/script.sql
```

O desde phpMyAdmin:

* Importar archivo `script.sql`

---

# 5. Configurar conexión Frontend ↔ Backend

Editar en Angular:

```
frontend/src/environments/env.ts
```

```ts
export const environment = {
  apiUrl: 'http://localhost:8001'
};
```

---

# 🧪 6. Uso de la API

Ejemplo de endpoint:

```
GET    /api/personas           -> listar todas las personas
GET    /api/personas?id=1      -> listar la persona con id = 1
POST   /api/personas           -> guardar una nueva persona
PUT    /api/personas?id=1      -> actualizar persona
POST   /api/personas/upload    -> subir imagen
GET    /api/personas/upload?file=img.png  -> obtener imagen
```

---

# 7. Capturas de la Aplicación

## Página principal

![Home](docs/screenshots/home.png)

## Listado

![Listado](docs/screenshots/list.png)

## Crear nuevo

![Formulario](docs/screenshots/form.png)

## Actualizar

![Formulario](docs/screenshots/form.png)

---

# 8. Posibles Problemas

### Error CORS

Solución: habilitar headers en PHP

```php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
```

---

### Error conexión DB

Verificar:

* credenciales
* puerto MySQL
* servidor activo

---

# Autor

Desarrollado por: **Willian Medina**, el 9 de abril de 2026.

# Contacto

Linkedin: https://www.linkedin.com/in/willian-m-3539ab19a/
Correo: andres_mv1@hotmail.es
Teléfono: +593 99 5079 657

```
```
