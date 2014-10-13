<?php

namespace Krikke\Skeleton\Models;

abstract class AbstractModel {

    public $db = null;
    private $user;
    private $pass;

    public function __construct(){
        if (ENVIRONMENT == 'production') {
            $this->user = 'prod';
            $this->pass = 'prodpass';
        } else {
            $this->user = 'root';
            $this->pass = 'root';
        }
    }


    protected function getDbConnection()
    {
        if ($this->db === null) {
            if (ENVIRONMENT == 'development') {
                $pdo = new \PDO("mysql:dbname=project_manager", $this->user, $this->pass);
            } else if(ENVIRONMENT == 'production') {
                $pdo = new \PDO("mysql:dbname=project_manager", $this->user, $this->pass);
            }
            $this->db = new \FluentPDO($pdo);
        }

        return $this->db;
    }

}