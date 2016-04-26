<?php
namespace SP\App\Api\CRUD;

require_once __DIR__.'/../session/Session.php';
use SP\App\Api\Session\Session;

class CrudManager
{
    private $reqMethod;
    private $itemType;
    private $data;
    private $id;
    private $byUser;

    /**
    * @param    string      $aReqMethod     Request method.
    * @param    CRUD        $anItemType     Item type to act on.
    * @param    mixed[]     $aData          Bindings (only applies to create and update).
    * @param    string      $anId           ID of item.
    * @param    string      $aByUser        Get item types that belong to the currently
    *                                       logged in user. Leave blank if do not want
    *                                       to do this.
    */
    public function __construct(
        $aReqMethod,
        $anItemType,
        $aData = array(),
        $anId = null,
        $aByUser = null
    ) {
        $this->reqMethod = $aReqMethod;
        $this->itemType = $anItemType;
        $this->data = $aData;
        $this->id = $anId;
        $this->byUser = $aByUser;
    }

    /**
    * Execute the appropriate query based on the request method.
    * @return mixed[] Promise with query results. See Database->query().
    */
    public function getResponse()
    {
        switch ($this->reqMethod) {
            case 'GET':
                return $this->getGetResponse();
            case 'POST':
                return $this->itemType->create($this->data);
            case 'PUT':
                return $this->itemType->update($this->id, $this->data);
            case 'DELETE':
                return $this->getDeleteResponse();
        }
    }

    /**
    * 'GET' can have different responses depending on the parameters provided.
    * Activities (subclasses of ActivityCRUD) require user id to be passed as a parameter
    * in getWhere, where as other classes require it in the where clause.
    *
    * @return mixed[] Promise with query results. See Database->query().
    */
    private function getGetResponse()
    {
        if ($this->byUser) {
            if ($this->itemType instanceof ActivityCRUD) {
                return $this->itemType->getWhere($this->getUserID());
            }
            return $this->itemType->getWhere('person_id = :person_id', '', '', array('person_id'=>$this->getUserID()));
        }
        return $this->itemType->get($this->id);
    }

    /**
    * @see getGetResponse(), except for 'DELETE'
    */
    private function getDeleteResponse()
    {
        if ($this->byUser) {
            if ($this->itemType instanceof ActivityCRUD) {
                return $this->itemType->getWhere($this->getUserID());
            }
            return $this->itemType->deleteWhere('person_id = :person_id', array('person_id'=>$this->getUserID()));
        }
        return $this->itemType->delete($this->id);
    }

    /**
    * Where clauses for activities require a user ID.
    * @return string User ID. -1 if no user logged in.
    */
    private function getUserID()
    {
        $session = new Session();
        $result = $session->getVar('id');
        return $result['success'] ? $result['data'] : '-1';
    }
}
