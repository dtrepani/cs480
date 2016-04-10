<?php
namespace SP\App\Api\Activity\Shared;

/**
* CRUD should be done through parent activity.
*/

require_once __DIR__.'/../../crud/CRUD.php';
use SP\App\Api\Crud\CRUD;

class ActivityInfo extends CRUD
{
    protected $table = 'activity_info';
}
