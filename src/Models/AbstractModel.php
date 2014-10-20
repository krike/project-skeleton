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


    private function getDbConnection()
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

    protected function get($table, $fields = '*', $order = 'id ASC', $limit = null)
    {
        $this->getDbConnection();
        $query = $this->db->from($table)
                            ->orderBy($order)
                            ->select($fields);
        
        if (is_numeric($limit) && $limit > 0) {
            $query->limit($limit);
        }
        
        $results = $query->fetchAll();

        if (count($results) > 0) {
            return $results;
        } else {
            return array();
        }
    }

    protected function getRecordById($table, $id)
    {
        $this->getDbConnection();
        $results = $this->db->from($table)
                            ->where('id = ?', $id)
                            ->fetch();

        if (count($results) > 0) {
            return $results;
        } else {
            return array();
        }
    }

}