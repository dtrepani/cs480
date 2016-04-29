<?php
namespace SP\App\Api\Collab;

require_once __DIR__.'/../crud/CollabCRUD.php';
require_once __DIR__.'/../activity/calendar/CalEvent.php';
use SP\App\Api\CRUD\CollabCRUD;
use SP\App\Api\Activity\Calendar\CalEvent;

class CalendarUser extends CollabCRUD
{
    protected $table = 'calendar_person';
    protected $groupTable = 'calendar';

    public function getSharedActivities($userID)
    {
        return parent::getSharedActivitiesFor(new CalEvent($this->db), $userID);
    }
}
