<?php

namespace Krikke\Skeleton\Models;

class HomeModel extends AbstractModel {
    
    public $tableName = 'table';
    
    public function getAll() {
        return $this->db->get($this->tableName);
    }

    public function getById($id) {
        if (empty($id) || !is_int($id)) {
            return false;
        }
        $this->getDbConnection();
        $results = $this->db->from('projects')
            ->orderBy('created_ts DESC')
            ->where('id', 2);

        if (count($results) > 0) {
            return $results;
        } else {
            return null;
        }
    }
    
    public function getIssuesFromActiveProject($id) {
        
    }
}