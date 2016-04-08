<?php
namespace SP\App\Api\Tasks\Task;

require_once __DIR__.'/../../crud/CRUD.php';
require_once __DIR__.'/../../arrayManipulation.php';

use SP\App\Api\Crud\CRUD;
use SP\App\Api as Api;

class Task extends CRUD
{
    protected $table = 'task';

    /**
    *
    */
    // public function create($bindings = array())
    // {

    // }

    // /**
    // *
    // */
    // public function update($id, $bindings = array())
    // {

    // }
}
