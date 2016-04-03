<?php
namespace SP\App\Api\Managers;

require_once __DIR__.'/../crud/User.php';
require_once __DIR__.'/../handlers/SessionHandler.php';
require_once __DIR__.'/../Authentication.php';

use SP\App\Api\CRUD\User;
use SP\App\Api\Handlers\SessionHandler;
use SP\App\Api\Authentication;

$request = json_decode(file_get_contents('php://input'), true);

$auth = new Authentication($request);
$response = $auth->verify();

if (!$response) {
    echo json_encode($response);
}

$handler = new SessionHandler();
session_set_save_handler($handler, true);
session_start();

$_SESSION['name'] = $request['name'];
// get person cols
// set ALL the variables!

echo json_encode($response);
