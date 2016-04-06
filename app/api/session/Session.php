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
    * End a session.
    */
    public function end()
    {
        $this->sessionStart();
        unset($_SESSION);
        session_destroy();
    }

    /**
    * @param string         $name   Name of session variable to get.
    *
    * @return mixed|false           Session variable or false if no such variable exists.
    */
    public function getVar($name)
    {
        $this->sessionStart();

        if (!isset($_SESSION[$name])) {
            return false;
        }

        return $_SESSION[$name];
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
            array('id', 'name', 'admin', 'theme', 'avatar'),
            array('name'=>$username),
            'name = :name'
        )[0];

        foreach ($userInfo as $key => $value) {
            $_SESSION[$key] = $value;
        }
    }

    /**
    * @param string $name   Name of session variable to set.
    * @param mixed  $value  Value to set session variable to.
    */
    public function setVar($name, $value)
    {
        $this->sessionStart();
        $_SESSION[$name] = $value;
    }

    /**
    * Start a session and set appropriate variables.
    *
    * @param string $username User associated with session.
    */
    public function start($username)
    {
        $this->sessionStart();
        $this->setSessionVariables($username);
    }

    /**
    * Start a session.
    * Custom handler is used because session information is in database.
    */
    public function sessionStart()
    {
        $handler = new SessionHandler($this);
        session_set_save_handler($handler, true);
        session_start();
    }
}
