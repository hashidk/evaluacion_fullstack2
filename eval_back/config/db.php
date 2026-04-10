<?php

class Database {
    // Servidor MySQL
    private static $host = '127.0.0.1';
    private static $db   = 'eval_database';
    private static $user = 'user_db';
    private static $pass = '123456789';
    private static $port = '3308';

    private static $charset = 'utf8mb4';

    public static function connect() {
        $dsn = "mysql:host=" . self::$host . ";port=" . self::$port . ";dbname=" . self::$db . ";charset=" . self::$charset;

        try {
            return new PDO($dsn, self::$user, self::$pass, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]);
        } catch (PDOException $e) {
            die("Error DB: " . $e->getMessage());
        }
    }
}