<?php

namespace Krikke\Skeleton\Models;

class HomeModel extends Model {
    
    public $tableName = 'table';
    
    public function getAll() {
        return $this->db->get($this->tableName);
    }

    public function getById($id) {
        if (empty($id) || !is_int($id)) {
            return false;
        }
        // pdo statement && $this->doQuery
        /*$this->db->where('id', $id);
        $result = $this->db->get($this->tableName);
        return !empty($result[0])? $result[0] : false ;*/
    }
    
    public function getIssuesFromActiveProject($id) {
        
    }
}