<?php
namespace SP\App\Api\User;

require_once 'User.php';
require_once __DIR__.'/../crud/CrudManager.php';

use SP\App\Api\CRUD\CrudManager;

/**
* @var mixed[] $request Array with user bindings to create user.
*/
$request = json_decode(file_get_contents('php://input'), true);

$manager = new CrudManager(
    $_SERVER['REQUEST_METHOD'],
    new User(),
    $request,
    isset($_GET['id']) ? $_GET['id'] : null,
    isset($_GET['byuser']) ? $_GET['byuser'] : null
);

echo json_encode($manager->getResponse());
