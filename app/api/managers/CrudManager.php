<?php
namespace SP\App\Api\Managers;

class CrudManager
{
    protected $reqMethod;
    protected $itemType;
    protected $bindings;
    protected $id;

    /**
    * @param    string      $aReqMethod     Request method.
    * @param    CRUD        $anItemType     Item type to act on.
    * @param    mixed[]     $aBindings      Bindings, only applicable to
    *                                       create and update.
    * @param    int         $anId           ID of item.
    */
    public function __construct($aReqMethod, $anItemType, $aBindings = null, $anId = null)
    {
        $this->reqMethod = $aReqMethod;
        $this->itemType = $anItemType;
        $this->bindings = $aBindings;
        $this->id = $anId;
    }

    /**
    * Execute the appropriate query based on the request method.
    *
    * @return mixed[] Query results.
    */
    public function getResults()
    {
        switch ($this->reqMethod) {
            case 'GET':
                return $this->itemType->get($id);
            case 'POST':
                return $this->itemType->create($this->bindings);
            case 'PUT':
                return $this->itemType->update($this->bindings);
            case 'DELETE':
                return $this->itemType->delete($id);
        }
    }
}
