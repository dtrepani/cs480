<?php
namespace SP\App\Api\Session;

require_once __DIR__.'/../crud/CRUD.php';

use SP\App\Api\Crud\CRUD;

class Session extends CRUD
{
    protected $table = 'session';

    /**
    * @param string         $name   Name of session variable to get.
    *
    * @return mixed|false           Session variable or false if no session exists.
    */
    public function __get($name)
    {
        if (!isset($_SESSION)) {
            return false;
        }

        return $_SESSION[$name];
    }

    /**
    * @param string $name   Name of session variable to set.
    * @param mixed  $value  Value to set session variable to.
    *
    * @return bool          True is variable set or false if no session exists.
    */
    public function __set($name, $value)
    {
        if (!isset($_SESSION)) {
            return false;
        }

        $_SESSION[$name] = $value;
        return true;
    }
}
