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

    protected function getAll($table, $fields = '*', $order = 'priority ASC')
    {
        $this->getDbConnection();
        $query = $this->db->from($table)
                            ->orderBy($order);

        $results = $query->fetchAll();

        if (count($results) > 0) {
            return $results;
        } else {
            return array();
        }
    }

    protected function get($table, $fields = '*', $order = 'id ASC', $limit = null)
    {
        $this->getDbConnection();
        $query = $this->db->from($table)
            ->orderBy($order);

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

    protected function getRecordWhereKey($table, $fields)
    {
        $this->getDbConnection();
        $query = $this->db->from($table)
            ->where($fields);

        $results = $query->fetchAll();

        if (count($results) > 0) {
            return $results;
        } else {
            return array();
        }
    }

    protected function getRecordWhereKeyNot($table, $key, $fields)
    {
        $this->getDbConnection();
        $query = $this->db->from($table)
            ->where('NOT ' . $key . ' = ?', $fields);

        $results = $query->fetchAll();

        if (count($results) > 0) {
            return $results;
        } else {
            return array();
        }
    }

    protected function updateRecordWhereKey($table, $fields, $id)
    {
        $this->getDbConnection();
        $query = $this->db->update($table)
                          ->set($fields)
                          ->where(array('id' => $id));

        return $query->execute();
    }

    protected function updateRecords($table, $fields)
    {
        $this->getDbConnection();
        $query = $this->db->update($table)
                          ->set($fields);

        return $query->execute();
    }

    protected function insertRecord($table, $fields)
    {
        $this->getDbConnection();
        $query = $this->db->insertInto($table, $fields);
        return $query->execute();
    }

    protected function deleteRecord($table, $field, $value)
    {
        $this->getDbConnection();
        $query = $this->db->deleteFrom($table)->where($field, $value);
        return $query->execute();
    }

}