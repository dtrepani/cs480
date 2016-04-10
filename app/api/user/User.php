<?php
namespace SP\App\Api\User;

require_once __DIR__.'/../crud/CRUD.php';
require_once __DIR__.'/../activity/tasks/label/Label.php';
require_once __DIR__.'/../activity/calendars/calendar/Calendar.php';
require_once __DIR__.'/../ConvertArray.php';

use SP\App\Api\Crud\CRUD;
use SP\App\Api\Activity\Tasks\Label\Label;
use SP\App\Api\Activity\Calendars\Calendar\Calendar;
use SP\App\Api\ConvertArray;

class User extends CRUD
{
    protected $table = 'person';

    /**
    * Must be overridden to account for unhashed password and to create
    * a default label and calendar for the user.
    *
    * @return mixed[] Promise results with whether or not user, calendar, and label
    *                 were created successfully. See Database->query().
    */
    public function create($bindings = array())
    {
        try {
            $result = $this->db->beginTransaction();
            $this->checkForError($result);

            $result = parent::create($this->getBindingsWithHashedPassword($bindings));
            $this->checkForError($result['success']);

            $userID = $this->db->lastInsertId();

            $this->createDefaultLabel($userID);
            $this->createDefaultCalendar($userID);

            return $this->db->commit();
        } catch (\Exception $e) {
            error_log($e->getMessage());
            return array(
                'success'=>false,
                'title'=>'An error occurred while creating user.',
                'message'=>$e->getMessage()
            );
        }
    }

    /**
    * Create the default calendar that every user will have.
    * @param  int       $userID     ID of the new user.
    */
    private function createDefaultCalendar($userID)
    {
        $calendar = new Calendar($this->db);
        $result = $calendar->create(
            array(
                'person_id'=>$userID,
                'name'=>'Calendar'
            )
        );
        $this->checkForError($result['success']);
    }

    /**
    * Create the default label that every user will have.
    * @param  int       $userID     ID of the new user.
    */
    private function createDefaultLabel($userID)
    {
        $label = new Label($this->db);
        $result = $label->create(
            array(
                'person_id'=>$userID,
                'name'=>'Inbox'
            )
        );
        $this->checkForError($result['success']);
    }

    /**
    * Must be overridden to account for unhashed password.
    */
    public function update($id, $bindings = array())
    {
        return parent::update($id, $this->getBindingsWithHashedPassword($bindings));
    }

    /**
    * Hash password in bindings.
    *
    * @param mixed[] $bindings
    *
    * @return mixed[] Bindings with hashed password.
    */
    private function getBindingsWithHashedPassword($bindings)
    {
        if (isset($bindings['password'])) {
            $bindings['password'] = password_hash($bindings['password'], PASSWORD_DEFAULT);
        }

        return $bindings;
    }
}
