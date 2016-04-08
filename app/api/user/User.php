<?php
namespace SP\App\Api\User;

require_once __DIR__.'/../crud/CRUD.php';
require_once __DIR__.'/../tasks/label/Label.php';
require_once __DIR__.'/../calendars/calendar/Calendar.php';
require_once __DIR__.'/../arrayManipulation.php';

use SP\App\Api\Crud\CRUD;
use SP\App\Api\Tasks\Label\Label;
use SP\App\Api\Calendars\Calendar\Calendar;
use SP\App\Api as Api;

class User extends CRUD
{
    protected $table = 'person';

    /**
    * Must be overridden to account for unhashed password and to create
    * a default label and calendar for the user.
    *
    * @return bool Whether or not user, calendar, and label were created successfully.
    */
    public function create($bindings = array())
    {
        try {
            $this->db->beginTransaction();

            $result = parent::create($this->getBindingsWithHashedPassword($bindings));
            $this->checkForError($result);

            $userID = $this->db->lastInsertId();

            $result = $this->createDefaultLabel($userID);
            $this->checkForError($result);

            $result = $this->createDefaultCalendar($userID);
            $this->checkForError($result);

            return $this->db->commit();
        } catch (\Exception $e) {
            error_log($e->getMessage());
            return false;
        }
    }

    /**
    * Create the default calendar that every user will have.
    * @param  int       $userID ID of the new user.
    * @return int|false         Number of rows added or false on failure.
    */
    private function createDefaultCalendar($userID)
    {
        $calendar = new Calendar($this->db);
        return $calendar->create(
            array(
                'person_id'=>$userID,
                'name'=>'Calendar'
            )
        );
    }

    /**
    * Create the default label that every user will have.
    * @param  int       $userID ID of the new user.
    * @return int|false         Number of rows added or false on failure.
    */
    private function createDefaultLabel($userID)
    {
        $label = new Label($this->db);
        return $label->create(
            array(
                'person_id'=>$userID,
                'name'=>'Inbox'
            )
        );
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
