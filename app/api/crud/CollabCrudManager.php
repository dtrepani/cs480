<?php
namespace SP\App\Api\CRUD;

require_once __DIR__.'/../session/Session.php';
require_once 'CrudManager.php';

use SP\App\Api\Session\Session;
use SP\App\Api\CRUD\CrudManager;

class CollabCrudManager extends CrudManager
{
    /**
    * TODO: fix this filthy override done for the sake of time.
    */
    protected function getGetResponse()
    {
        if (is_array($this->bindings)) {
            switch ($this->where) {
                case 'users':
                    return $this->itemType->getUsersFor($this->id);
                case 'groups':
                    return $this->itemType->getGroupsFor($this->getUserID());
                case 'activities':
                    return $this->itemType->getSharedActivities($this->getUserID());
            }

            return $this->itemType->getWhere($this->where, '', '', $this->bindings);
        }
        return $this->itemType->get($this->id);
    }

    /**
    * @see getGetResponse(), except for 'DELETE'
    */
    protected function getDeleteResponse()
    {
        if ($this->byUser) {
            return $this->itemType->getWhere($this->getUserID());
        }
        return $this->itemType->delete($this->id);
    }
}
