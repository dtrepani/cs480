<?php
namespace SP\App\Api\Activity\Calendar;

require_once __DIR__.'/../../crud/ActivityCRUD.php';
use SP\App\Api\Crud\ActivityCRUD;

class Event extends ActivityCRUD
{
    protected $table = 'cal_event';
    protected $parentTable = 'calendar';
}
