<?php
namespace SP\App\Api\Collab;

require_once 'CalendarUser.php';
require_once __DIR__.'/../crud/CollabCrudManager.php';

use SP\App\Api\CRUD\CollabCrudManager;

/**
* @var mixed[] $request Array with event bindings to create event.
*/
$request = json_decode(file_get_contents('php://input'), true);

$manager = new CollabCrudManager(
    $_SERVER['REQUEST_METHOD'],
    new CalendarUser(),
    $request,
    isset($_GET['id']) ? $_GET['id'] : null,
    isset($_GET['byUser']) ? $_GET['byUser'] : null,
    isset($_GET['where']) ? $_GET['where'] : null,
    isset($_GET['bindings']) ? $_GET['bindings'] : null
);

echo json_encode($manager->getResponse());
