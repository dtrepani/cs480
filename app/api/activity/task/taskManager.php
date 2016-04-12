<?php
namespace SP\App\Api\Activity\Task;

require_once 'Task.php';
require_once __DIR__.'/../../crud/CrudManager.php';

use SP\App\Api\CRUD\CrudManager;

/**
* @var mixed[] $request Array with task bindings to create task.
*/
$request = json_decode(file_get_contents('php://input'), true);

$manager = new CrudManager(
    $_SERVER['REQUEST_METHOD'],
    new Task(),
    $request,
    isset($_GET['id']) ? $_GET['id'] : null,
    isset($_GET['where']) ? $_GET['where'] : null
);

echo json_encode($manager->getResponse());
