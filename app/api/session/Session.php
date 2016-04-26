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
    * @param string         $name   Name of session variable to get. 'all' will get
    *                               all variables for the session.
    *
    * @return mixed[]               Promise results with session variable or error
    *                               message if it doesn't exist. See Database->query().
    */
    public function getVar($name)
    {
        $this->sessionStart();

        if ($name === 'all') {
            return $this->getAllVariables();
        }

        if (!isset($_SESSION[$name])) {
            return array(
                'success'=>false,
                'title'=>'Error getting variable.',
                'message'=>"The session variable '{$name}' does not exist."
            );
        }

        return array(
            'success'=>true,
            'data'=>$_SESSION[$name]
        );
    }

    /**
    * @return mixed[]               Promise results with session variables or error
    *                               message if no session active. See Database->query().
    */
    private function getAllVariables()
    {
        if (empty($_SESSION)) {
            return array(
                'success'=>false,
                'title'=>'Error getting variable.',
                'message'=>"No session active."
            );
        }

        return array(
            'success'=>true,
            'data'=>$_SESSION
        );
    }

    /**
    * Set all the session variables for corresponding user.
    * Only called when it is known that the user exists.
    *
    * @param string $username User associated with session.
    */
    public function setSessionVariables($username)
    {
        $user = new User($this->db);
        $userInfo = $user->getBy('name', $username)['data'][0];
        unset($userInfo['password']);

        foreach ($userInfo as $key => $value) {
            $_SESSION[$key] = $value;
        }
    }

    /**
    * @param string $name   Name of session variable to set.
    * @param mixed  $value  Value to set session variable to.
    *
    * @return mixed[]       Promise results with success. See Database->query().
    */
    public function setVar($name, $value)
    {
        $this->sessionStart();
        $_SESSION[$name] = $value;
        return array(
            'success'=>true,
            'data'=>true
        );
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

    /**
    * @param string $name   Name of session variable to unset
    * @param mixed  $value  Value to set session variable to.
    *
    * @return mixed[]       Promise results with success. See Database->query().
    */
    public function unsetVar($name)
    {
        unset($_SESSION[$name]);
        return array(
            'success'=>true,
            'data'=>true
        );
    }
}
