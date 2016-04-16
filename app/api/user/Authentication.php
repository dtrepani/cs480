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
        return $crud->getBy('name', $this->user['name']);
    }

    /**
    * Compare the given password to the stored.
    *
    * @return mixed[] Promise results with whether or not the passwords match.
    *                 See Database->query().
    */
    public function verify()
    {
        $passForUser = $this->getPassword();

        if ($passForUser['success'] !== false && !empty($passForUser['data'])) {
            $result = password_verify(
                $this->user['password'],
                $passForUser['data'][0]['password']
            );
        } else {
            $result = false;
        }

        if ($result) {
            return array(
                'success'=>true,
                'data'=>true
            );
        }

        return array(
            'success'=>false,
            'title'=>'Username or password is incorrect.',
            'message'=>"{$this->user['name']} or given password is incorrect."
        );
    }
}
