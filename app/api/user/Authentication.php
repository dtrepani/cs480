<?php
namespace SP\App\Api\User;

require_once __DIR__.'/User.php';

use SP\App\Api\User\User;

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
    * @return string|bool The hashed password or false on error.
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
    * @return bool Whether or not the passwords match.
    */
    public function verify()
    {
        $passForUser = $this->getPassword();

        if (!$passForUser) {
            return $passForUser;
        }

        return password_verify($this->user['password'], $passForUser['password']);
    }
}
