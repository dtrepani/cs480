<?php
namespace SP\App\Api\Activity\Task;

require_once __DIR__.'/../../crud/ParentCRUD.php';
use SP\App\Api\CRUD\ParentCRUD;

class Label extends ParentCRUD
{
    protected $table = 'label';
}
