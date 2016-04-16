<?php
namespace SP\App\Api\Activity\Calendar;

require_once 'CalEvent.php';
require_once __DIR__.'/../../crud/CrudManager.php';

use SP\App\Api\CRUD\CrudManager;

/**
* @var mixed[] $request Array with event bindings to create event.
*/
$request = json_decode(file_get_contents('php://input'), true);

$manager = new CrudManager(
    $_SERVER['REQUEST_METHOD'],
    new CalEvent(),
    $request,
    isset($_GET['id']) ? $_GET['id'] : null,
    isset($_GET['usewhere']) ? $_GET['usewhere'] : null,
    isset($_GET['where']) ? $_GET['where'] : null
);

echo json_encode($manager->getResponse());
