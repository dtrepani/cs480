<?php
namespace SP\App\Api\Activity\Calendar;

require_once __DIR__.'/../../crud/CRUD.php';
use SP\App\Api\CRUD\CRUD;

class Calendar extends CRUD
{
    protected $table = 'calendar';
}
