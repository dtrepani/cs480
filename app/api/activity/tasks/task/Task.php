<?php
namespace SP\App\Api\Activity\Tasks\Task;

require_once __DIR__.'/../../../crud/ActivityCRUD.php';
use SP\App\Api\Crud\ActivityCRUD;

class Task extends ActivityCRUD
{
    protected $table = 'task';
}
