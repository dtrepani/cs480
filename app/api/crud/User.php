<?php
namespace SP\App\Api\CRUD;

require_once 'CRUD.php';
require_once __DIR__.'/../arrayManipulation.php';

use SP\App\Api as Api;

class User extends CRUD
{
    protected $table = 'person';

    /**
    * Must be overridden to account for unhashed password.
    */
    public function create($bindings = array())
    {
        parent::create($this->getBindingsWithHashedPassword($bindings));
    }

    /**
    * Must be overridden to account for unhashed password.
    */
    public function update($id, $bindings = array())
    {
        parent::update($id, $this->getBindingsWithHashedPassword($bindings));
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
