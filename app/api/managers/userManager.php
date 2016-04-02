<?php
namespace SP\App\Api\Managers;

require_once __DIR__.'/../crud/User.php';
require_once __DIR__.'/CrudManager.php';

use SP\App\Api\CRUD\User;

$request = json_decode(file_get_contents('php://input'), true);

$manager = new CrudManager(
    $_SERVER['REQUEST_METHOD'],
    new User(),
    $request,
    isset($_GET['id']) ? $_GET['id'] : null
);

$test = $manager->getResults();

echo json_encode($test);
