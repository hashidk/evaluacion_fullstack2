<?php

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../model/Persona.php';

class Persona {
    private $db;

    public function __construct() {
        $this->db = Database::connect();
    }

    public function all() {
        $model = new PersonaModel();
        $sql = $model->toQuerySelect();
        return $this->db->query($sql)->fetchAll();
    }

    public function find($id) {
        $model = new PersonaModel();
        $sql = $model->toQuerySelectFilterById($id);
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        return $stmt->fetch();
    }

    public function findByRC($rc) {
        $model = new PersonaModel();
        $sql = $model->toQuerySelectFilterByCI($rc);
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        return $stmt->fetch();
    }

    public function create($data) {
        $model = new PersonaModel();
        $sql = $model->toQueryInsertInto($data);
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
    }

    public function update($id, $data) {
        $model = new PersonaModel();
        $sql = $model->toQueryUpdate($id, $data);
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
    }

    public function delete($id) {
        $model = new PersonaModel();
        $sql = $model->toQueryDelete($id);
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
    }
}