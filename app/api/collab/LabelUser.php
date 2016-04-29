<?php
namespace SP\App\Api\Collab;

require_once __DIR__.'/../crud/CollabCRUD.php';
require_once __DIR__.'/../activity/task/Task.php';
use SP\App\Api\CRUD\CollabCRUD;
use SP\App\Api\Activity\Task\Task;

class LabelUser extends CollabCRUD
{
    protected $table = 'label_person';
    protected $groupTable = 'label';
}
