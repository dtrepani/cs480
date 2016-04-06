<?php
namespace SP\App\Api\Managers;

require_once __DIR__.'/../session/Session.php';
require_once __DIR__.'/../user/Authentication.php';

use SP\App\Api\Session\Session;
use SP\App\Api\User\Authentication;

/**
* @var mixed[] $request Array with 'name' and 'password' to authenticate.
*/
$request = json_decode(file_get_contents('php://input'), true);

$auth = new Authentication($request);
$response = $auth->verify();

if (!$response) {
    echo json_encode($response);
}

$session = new Session();
$session->start($request['name']);

echo json_encode($response);
