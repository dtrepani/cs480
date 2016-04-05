<?php
namespace SP\App\Api\Session;

require_once 'SessionHandler.php';
require_once __DIR__.'/../user/User.php';
require_once __DIR__.'/../crud/CRUD.php';

use SP\App\Api\User\User;
use SP\App\Api\CRUD\CRUD;

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

    /**
    * Start a session.
    * Custom handler is used because session information is in database.
    *
    * @param string $username User associated with session.
    */
    public function start($username)
    {
        $handler = new SessionHandler($this);
        session_set_save_handler($handler, true);
        session_start();

        $this->setSessionVariables($username);
    }

    /**
    * End a session.
    */
    public function end()
    {
        unset($_SESSION);
        session_destroy();
    }

    /**
    * Set all the session variables for corresponding user.
    *
    * @param string $username User associated with session.
    */
    public function setSessionVariables($username)
    {
        $user = new User();
        $userInfo = $user->getAll(
            array('id', 'name', 'theme', 'avatar'),
            array('name'=>$username),
            'name = :name'
        )[0];

        foreach ($userInfo as $key => $value) {
            $_SESSION[$key] = $value;
        }
    }
}
