<?php

class HomeModel extends Model {
    
    public $tableName = 'table';
    
    public function getAll() {
        return $this->db->get($this->tableName);
    }

    public function getById($id) {
        if (empty($id)) {
            return false;
        }
        $this->db->where('id', $id);
        $result = $this->db->get($this->tableName);
        return !empty($result[0])? $result[0] : false ;
    }
    
    public function getIssuesFromActiveProject($id) {
        
    }
}