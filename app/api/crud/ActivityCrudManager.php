<?php
namespace SP\App\Api\CRUD;

require_once __DIR__.'/../session/Session.php';
require_once 'CrudManager.php';

use SP\App\Api\Session\Session;
use SP\App\Api\CRUD\CrudManager;

class ActivityCrudManager extends CrudManager
{
    /**
    * 'GET' can have different responses depending on the parameters provided.
    * Activities (subclasses of ActivityCRUD) require user id to be passed as a parameter
    * in getWhere, where as other classes require it in the where clause.
    *
    * @return mixed[] Promise with query results. See Database->query().
    */
    protected function getGetResponse()
    {
        if ($this->byUser) {
            return $this->itemType->getWhere($this->getUserID());
        } else if (is_array($this->bindings)) {
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
