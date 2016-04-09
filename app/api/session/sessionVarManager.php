<?php
namespace SP\App\Api\Session;

require_once __DIR__.'/../session/Session.php';

use SP\App\Api\Session\Session;

/**
* @var mixed[] $request Array with name of variable, 'name', and 'value' (empty on get).
*/
$request = json_decode(file_get_contents('php://input'), true);

$reqMethod = $_SERVER['REQUEST_METHOD'];
$session = new Session();
$response = false;

switch ($reqMethod) {
    case 'GET':
        $response = $session->getVar($_GET['var']);
        break;
    case 'DELETE':
        $response = $session->unsetVar($_GET['var']);
        break;
    case 'POST':
    case 'PUT':
        $response = $session->setVar($_GET['var'], $request);
}

echo json_encode($response);
