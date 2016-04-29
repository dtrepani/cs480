<?php
namespace SP\App\Api\Activity\Calendar;

require_once __DIR__.'/../../crud/ParentCRUD.php';
use SP\App\Api\CRUD\ParentCRUD;

class Calendar extends ParentCRUD
{
    protected $table = 'calendar';
}
