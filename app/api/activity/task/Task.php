<?php
namespace SP\App\Api\Activity\Task;

require_once __DIR__.'/../../crud/ActivityCRUD.php';
use SP\App\Api\Crud\ActivityCRUD;

class Task extends ActivityCRUD
{
    protected $table = 'task';
    protected $parentTable = 'label';
}
