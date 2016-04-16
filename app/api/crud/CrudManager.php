<?php
namespace SP\App\Api\CRUD;

class CrudManager
{
    protected $reqMethod;
    protected $itemType;
    protected $data;
    protected $id;
    protected $useWhere;
    protected $where;

    /**
    * @param    string      $aReqMethod     Request method.
    * @param    CRUD        $anItemType     Item type to act on.
    * @param    mixed[]     $aData          Bindings (only applies to create and update).
    * @param    int         $anId           ID of item.
    * @param    string      $aUseWhere         Whether or not to use where.
    * @param    string      $aWhere         Where clause.
    */
    public function __construct(
        $aReqMethod,
        $anItemType,
        $aData = array(),
        $anId = null,
        $aUseWhere = null,
        $aWhere = null
    ) {
        $this->reqMethod = $aReqMethod;
        $this->itemType = $anItemType;
        $this->data = $aData;
        $this->id = $anId;
        $this->useWhere = $aUseWhere;
        $this->where = $aWhere;
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
    * Activities (subclasses of ActivityCRUD) require user id to be passed in in getWhere,
    * where as other classes do not.
    *
    * @return mixed[] Promise with query results. See Database->query().
    */
    private function getGetResponse()
    {
        if ($this->useWhere) {
            if ($this->itemType instanceof ActivityCRUD) {
                return $this->itemType->getWhere($this->id, $this->where);
            }
            return $this->itemType->getWhere($this->where);
        }
        return $this->itemType->get($this->id);
    }

    /**
    * @see getGetResponse(), except for 'DELETE'
    */
    private function getDeleteResponse()
    {
        if ($this->where) {
            if (is_a($this->itemType, 'ActivityCRUD')) {
                return $this->itemType->deleteWhere($this->id, $this->data, '', '');
            }
            return $this->itemType->deleteWhere($this->data, '', '');
        }
        return $this->itemType->delete($this->id);
    }
}
