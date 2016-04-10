<?php
namespace SP\App\Api\Tasks\Task;

require_once __DIR__.'/../../crud/CRUD.php';
require_once __DIR__.'/../../arrayManipulation.php';

use SP\App\Api\Crud\CRUD;
use SP\App\Api as Api;

class Task extends CRUD
{
    protected $table = 'task';
    protected $infoTable = 'activity_info';
    protected $recurrenceTable = 'recurrence';

    /**
    *
    */
    public function create($bindings = array())
    {

    }

    /**
    *
    */
    public function get($id, $columns = array())
    {
        $colNameList = empty($columns) ? '*' : implode(', ', $columns);

        return $this->db->query(
            "SELECT $colNameList
            FROM $this->table
                INNER JOIN $this->infoTable
                ON {$this->table}.id = {$this->prefsTable}.task_id
            WHERE id = :id",
            array(':id'=>$id)
        );
    }

    // /**
    // *
    // */
    // public function update($id, $bindings = array())
    // {

    // }
}
