<?php
namespace SP\App\Api\Activity\Task;

/**
* TODO: move logic to own file.
*/

require_once 'Task.php';
require_once __DIR__.'/../../crud/CrudManager.php';

use SP\App\Api\CRUD\CrudManager;

/**
* @var mixed[] $request Array with task bindings to create task.
*/
$request = json_decode(file_get_contents('php://input'), true);

if (isset($request['subtasks'])) {
    $request['subtasks'] = base64_encode(serialize($request['subtasks']));
}

$manager = new CrudManager(
    $_SERVER['REQUEST_METHOD'],
    new Task(),
    $request,
    isset($_GET['id']) ? $_GET['id'] : null,
    isset($_GET['byUser']) ? $_GET['byUser'] : null,
    isset($_GET['where']) ? $_GET['where'] : null,
    isset($_GET['bindings']) ? $_GET['bindings'] : null
);

$response = $manager->getResponse();

if (is_array($response['data'])) {
    foreach ($response['data'] as &$task) {
        if (!empty($task['subtasks'])) {
            $task['subtasks'] = unserialize(base64_decode($task['subtasks']));
        }
    }
}

echo json_encode($response);
