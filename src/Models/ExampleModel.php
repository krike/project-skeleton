<?php

namespace Krikke\Skeleton\Models;

class ExampleModel extends AbstractModel {
    
    public $tableName = 'projects';
    
    public function getAllItems() {
        return $this->get($this->tableName);
    }

    public function getById($id) {
        if (empty($id) || !is_int($id)) {
            return false;
        }
        return $this->getRecordById($this->tableName, $id);
    }
    
    public function getIssuesFromActiveProject($id) {
        
    }
}