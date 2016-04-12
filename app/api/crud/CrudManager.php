<?php
namespace SP\App\Api\CRUD;

class CrudManager
{
    protected $reqMethod;
    protected $itemType;
    protected $bindings;
    protected $id;
    protected $where;

    /**
    * @param    string      $aReqMethod     Request method.
    * @param    CRUD        $anItemType     Item type to act on.
    * @param    mixed[]     $aBindings      Bindings, only applicable to
    *                                       create and update.
    * @param    int         $anId           ID of item.
    * @param    string      $where          Where clause, such as 'completed = true'.
    */
    public function __construct(
        $aReqMethod,
        $anItemType,
        $aBindings = array(),
        $anId = null,
        $aWhere = null
    ) {
        $this->reqMethod = $aReqMethod;
        $this->itemType = $anItemType;
        $this->bindings = $aBindings;
        $this->id = $anId;
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
                return $this->itemType->create($this->bindings);
            case 'PUT':
                return $this->itemType->update($this->bindings);
            case 'DELETE':
                if ($this->where) {
                    return $this->itemType->deleteAll($this->where, $this->bindings);
                }
                return $this->itemType->delete($this->id);
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
        if ($this->where) {
            if (is_a($this->itemType, 'ActivityCRUD')) {
                return $this->itemType->getWhere($this->id, $this->where, '', '', $this->bindings);
            }
            return $this->itemType->getWhere($this->where, '', '', $this->bindings);
        }
        return $this->itemType->get($this->id);
    }
}
