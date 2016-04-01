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

    public function verify()
    {
        $crud = new User();
        $password = $crud->getAll(
            array('password'),
            array('name'=>$this->user['name']),
            'name = :name'
        );
        var_dump($password);

        return; // TODO: temporary
    }
}
