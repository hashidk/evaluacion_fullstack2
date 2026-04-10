
## Run 1: Crear base de datos
CREATE DATABASE eval_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

## Run 2: Crear usuario con el que se iniciará sesión a la base de datos desde el backend
CREATE USER 'user_db'@'localhost' IDENTIFIED BY '123456789';

## Run 3: Otorgar permisos al usuarios a la base de datos creada
GRANT ALL PRIVILEGES ON eval_database.* TO 'user_db'@'localhost';
FLUSH PRIVILEGES;

## Run 4: Crear datos de personas
CREATE TABLE eval_database.personas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    -- Datos personales
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    url_imagen VARCHAR(255),
    ruc_cedula VARCHAR(13) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL,
    provincia VARCHAR(100),
    fecha_nacimiento DATE,
    direccion VARCHAR(255),
    telefono VARCHAR(15),
    discapacidad VARCHAR(10),
    estado_civil VARCHAR(20),
    tipo_sangre VARCHAR(5),
    observaciones_personal TEXT,

    -- Datos laborales
    fecha_ingreso DATE,
    cargo VARCHAR(100),
    departamento VARCHAR(100),
    provincia_trabajo VARCHAR(100),
    sueldo DECIMAL(10,2),
    categoria VARCHAR(50),
    seccion VARCHAR(100),
    jornada VARCHAR(50),
    codigo VARCHAR(20) UNIQUE,
    status VARCHAR(20),
    observaciones_laboral TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

## Run 5: Insertar 20 registros de ejemplo a la tabla
INSERT INTO personas (
nombres, apellidos, url_imagen, ruc_cedula, email, provincia, fecha_nacimiento, direccion,
telefono, discapacidad, estado_civil, tipo_sangre, observaciones_personal,
fecha_ingreso, cargo, departamento, provincia_trabajo, sueldo,
categoria, seccion, jornada, codigo, status, observaciones_laboral
) VALUES

('Carlos','Mena','img1.jpg','1710000001','carlos@mail.com','Pichincha','1992-03-15','Quito Norte','0991111111','No','Soltero/a','O+',NULL,'2021-01-10','Desarrollador','Tecnologia','Pichincha',1200,'Senior','Backend','Completa','TEC001','Activo',NULL),
('Andrea','Torres','img2.jpg','1710000002','andrea@mail.com','Guayas','1995-07-20','Guayaquil','0992222222','No','Casado/a','A+',NULL,'2022-02-15','Diseñadora','Marketing','Guayas',900,'Junior','UI','Completa','MAR001','Activo','Creativa'),
('Luis','Herrera','img3.jpg','1710000003','luis@mail.com','Azuay','1988-11-02','Cuenca','0993333333','No','Casado/a','B+',NULL,'2020-09-01','Administrador','Administracion','Azuay',1300,'Senior','General','Completa','ADM001','Activo',NULL),
('Sofia','Vargas','img4.jpg','1710000004','sofia@mail.com','Manabi','1998-01-12','Manta','0994444444','No','Soltero/a','O-',NULL,'2023-03-10','QA Tester','Tecnologia','Manabi',800,'Junior','Testing','Completa','TEC002','Activo',NULL),
('Pedro','Castillo','img5.jpg','1710000005','pedro@mail.com','Loja','1991-06-30','Loja','0995555555','No','Casado/a','AB+',NULL,'2019-05-01','Contador','Finanzas','Loja',1100,'Semi Senior','Contabilidad','Completa','FIN001','Activo',NULL),
('Juan','Paredes','img6.jpg','1710000006','juan@mail.com','Pichincha','1993-05-10','Quito','0996666666','No','Soltero/a','O+',NULL,'2022-01-01','Dev','Tecnologia','Pichincha',1000,'Semi Senior','Backend','Completa','TEC003','Activo',NULL),
('Ana','Ruiz','img7.jpg','1710000007','ana@mail.com','Guayas','1996-08-08','Guayaquil','0997777777','No','Soltero/a','A+',NULL,'2023-01-01','Marketing','Marketing','Guayas',850,'Junior','Ads','Completa','MAR002','Activo',NULL),
('Diego','Leon','img8.jpg','1710000008','diego@mail.com','Azuay','1987-02-14','Cuenca','0998888888','No','Casado/a','B-',NULL,'2018-06-10','Financiero','Finanzas','Azuay',1400,'Senior','Analisis','Completa','FIN002','Activo',NULL),
('Paola','Diaz','img9.jpg','1710000009','paola@mail.com','Manabi','1999-09-09','Portoviejo','0999999999','No','Soltero/a','O+',NULL,'2023-05-05','QA','Tecnologia','Manabi',750,'Junior','Testing','Completa','TEC004','Activo',NULL),
('Ricardo','Paz','img10.jpg','1710000010','ricardo@mail.com','Loja','1990-12-12','Loja','0980000000','No','Casado/a','AB-',NULL,'2020-03-03','Admin','Administracion','Loja',1200,'Senior','General','Completa','ADM002','Activo',NULL),
('Maria','Lopez','img11.jpg','1710000011','maria@mail.com','Pichincha','1994-04-04','Quito','0981111111','No','Soltero/a','O+','Participa en eventos','2021-07-07','RRHH','Administracion','Pichincha',950,'Semi Senior','RRHH','Completa','ADM003','Activo',NULL),
('Jorge','Salas','img12.jpg','1710000012','jorge@mail.com','Guayas','1989-10-10','Guayaquil','0982222222','No','Casado/a','A-','Buen liderazgo','2019-09-09','Ventas','Marketing','Guayas',1050,'Senior','Ventas','Completa','MAR003','Activo',NULL),
('Lucia','Mora','img13.jpg','1710000013','lucia@mail.com','Azuay','1997-03-03','Cuenca','0983333333','No','Soltera','B+','Puntual','2022-08-08','QA','Tecnologia','Azuay',780,'Junior','Testing','Completa','TEC005','Activo',NULL),
('Fernando','Rojas','img14.jpg','1710000014','fernando@mail.com','Manabi','1985-05-05','Manta','0984444444','No','Casado/a','O-','Responsable','2017-01-01','Finanzas','Finanzas','Manabi',1500,'Senior','Contabilidad','Completa','FIN003','Activo',NULL),
('Daniela','Cruz','img15.jpg','1710000015','daniela@mail.com','Loja','1998-11-11','Loja','0985555555','No','Soltero/a','A+','Creativa','2023-02-02','Diseño','Marketing','Loja',880,'Junior','UI','Completa','MAR004','Activo',NULL),
('Kevin','Suarez','img16.jpg','1710000016','kevin@mail.com','Pichincha','1993-09-19','Quito','0986666666','No','Soltero/a','O+','Proactivo','2021-04-04','DevOps','Tecnologia','Pichincha',1300,'Senior','Infraestructura','Completa','TEC006','Activo',NULL),
('Patricia','Nunez','img17.jpg','1710000017','patricia@mail.com','Guayas','1996-06-06','Guayaquil','0987777777','No','Casado/a','B+','Ordenada','2022-05-05','Contador','Finanzas','Guayas',1000,'Semi Senior','Contabilidad','Completa','FIN004','Activo',NULL),
('Esteban','Ortega','img18.jpg','1710000018','esteban@mail.com','Azuay','1988-08-08','Cuenca','0988888888','No','Casado/a','AB+','Experiencia','2018-02-02','Admin','Administracion','Azuay',1250,'Senior','General','Completa','ADM004','Activo',NULL),
('Camila','Pinto','img19.jpg','1710000019','camila@mail.com','Manabi','1999-01-01','Portoviejo','0989999998','No','Soltero/a','O+','Dinámica','2023-06-06','Marketing','Marketing','Manabi',820,'Junior','Ads','Completa','MAR005','Activo',NULL),
('Andres','Vera','img20.jpg','1710000020','andres@mail.com','Loja','1992-12-25','Loja','0989999997','No','Soltero/a','A+','Responsable','2020-10-10','Backend','Tecnologia','Loja',1150,'Semi Senior','Backend','Completa','TEC007','Activo',NULL);


## Run 6: Crear trigger para que se genere el código laboral de la persona antes de insertar los registros (considera el departamento y el número de personas pertenecientes a es departamento + 1)
DELIMITER $$

CREATE TRIGGER before_insert_empleado
BEFORE INSERT ON eval_database.personas
FOR EACH ROW
BEGIN
    DECLARE prefijo VARCHAR(3);
    DECLARE numero INT;

    SET prefijo = UPPER(LEFT(NEW.departamento, 3));

    SELECT IFNULL(MAX(CAST(SUBSTRING(codigo, 4) AS UNSIGNED)), 0)
    INTO numero
    FROM eval_database.personas
    WHERE codigo LIKE CONCAT(prefijo, '%');

    SET numero = numero + 1;

    SET NEW.codigo = CONCAT(prefijo, LPAD(numero, 3, '0'));
END$$

DELIMITER ;