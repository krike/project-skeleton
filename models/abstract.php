<?php

abstract class Model {

    public $db;

    public function __construct(){
        if ($_SERVER['HTTP_HOST'] == 'localhost:8888') {
            $this->db  = new MySqlDb('localhost', 'root', 'root', 'db');
        } elseif ($_SERVER['HTTP_HOST'] == 'localhost') {
            $this->db  = new MySqlDb('localhost', 'root', '', 'db');
        }
    }

}