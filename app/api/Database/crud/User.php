<?php
namespace SP\App\Api\Database\CRUD;

require_once 'CRUD.php';

class User extends CRUD
{
    protected $table = 'person';

    /**
    * @param mixed[][]  $aBindings  Column names and values of the entry.
    * @param Database   $aDB        Database to be injected, if it exists.
    */
    public function __construct($aBindings = array(), $aDB = null)
    {
        parent::__construct($aBindings, $aDB);

        if (isset($this->bindings['password'])) {
            $this->hashPassword($aBindings['password']);
        }
    }

    /**
    * @param    string $col   Column name. 'pk' changes the primary key column name.
    * @param    string $val   Value to set the column to.
    */
    public function __set($col, $val)
    {
        parent::__set($col, $val);

        if ($col == 'password') {
            $this->hashPassword($val);
        }
    }

    /**
    * @param string $password Password to be hashed and set to bindings.
    */
    protected function hashPassword($password)
    {
        $this->bindings['password'] = password_hash($password, PASSWORD_DEFAULT);
    }
}
