<?php
namespace SP\App\Api\Activity\Task;

require_once __DIR__.'/../../crud/CRUD.php';
use SP\App\Api\CRUD\CRUD;

class Label extends CRUD
{
    protected $table = 'label';
}
