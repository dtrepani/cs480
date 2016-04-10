<?php
namespace SP\App\Api\Activity\Shared;

/**
* CRUD should be done through parent activity.
*/

require_once __DIR__.'/../../crud/CRUD.php';
use SP\App\Api\Crud\CRUD;

class Recurrence extends CRUD
{
    protected $table = 'recurrence';
}
