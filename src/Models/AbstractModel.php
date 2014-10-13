<?php

namespace Krikke\Skeleton\Models;

abstract class AbstractModel {

    /** private maken */
    public $db = null;
    private $user;
    private $pass;

    public function __construct(){
        if (ENVIRONMENT == 'production') {
            $this->user = 'prod';
            $this->pass = 'prodpass';
        } else {
            $this->user = 'dev';
            $this->pass = 'devpass';
        }
    }

    /*
     * http://fluentpdo.com/ als query builder
     */
    protected function doQuery(PDOStatement $statement)
    {
        $db = $this->getDbConnection();
        //....
    }


    private function getDbConnection()
    {
        /*if (ENVIRONMENT == 'development') {
            $this->db  = new MySqlDb('localhost', 'root', 'root', 'db');
        } elseif ($_SERVER['HTTP_HOST'] == 'localhost') {
            $this->db  = new MySqlDb('localhost', 'root', '', 'db');
        }*/

        if ($this->db === null) {
            $this->db = new PDO();
        }
        return $this->db;
    }

}