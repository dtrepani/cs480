<?php
namespace SP\App\Api;

require_once __DIR__.'/crud/User.php';

use SP\App\Api\CRUD\User;

class Authentication
{
    protected $user;

    public function __construct($aUser)
    {
        $this->user = $aUser;
    }

    /**
    * Get the password for the given user.
    *
    * @return string[success][result]   The hashed password.
    *                                   Error message on success == false.
    */
    private function getPassword()
    {
        $crud = new User();
        return $crud->getAll(
            array('password'),
            array('name'=>$this->user['name']),
            true,
            'name = :name'
        );
    }

    /**
    * Compare the given password to the stored.
    *
    * @return string[success][result]   Whether or not the passwords match.
    *                                   Error message if they do not.
    */
    public function verify()
    {
        $passForUser = $this->getPassword();
        var_dump($passForUser);

        if (!$passForUser['success']) {
            return $passForUser;
        }

        $passwordsMatch = password_verify($this->user['password'], $passForUser['result']['password']);
        $message = $passwordsMatch ? '' : 'Password does not match.';

        return array(
            'success'=>$passwordsMatch,
            'result'=>$message
        );
    }
}
