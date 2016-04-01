<?php
namespace SP\App\Api\Managers;

require_once __DIR__.'/../crud/User.php';
require_once __DIR__.'/../Authentication.php';

use SP\App\Api\CRUD\User;
use SP\App\Api as Api;

$request = json_decode(file_get_contents('php://input'), true);

// got: username, password
// get: password for name = username
// verify
// return error if false
// else start session
// return true
$auth = new Api\Authentication($request);
$response = $auth->verify();

echo json_encode($response);
