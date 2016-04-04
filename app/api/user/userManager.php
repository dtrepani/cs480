<?php
namespace SP\App\Api\User;

require_once 'User.php';
require_once __DIR__.'/../crud/CrudManager.php';

use SP\App\Api\CRUD\CrudManager;

$request = json_decode(file_get_contents('php://input'), true);

$manager = new CrudManager(
    $_SERVER['REQUEST_METHOD'],
    new User(),
    $request,
    isset($_GET['id']) ? $_GET['id'] : null
);

echo json_encode($manager->getResponse());
