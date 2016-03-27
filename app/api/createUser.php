<?php
namespace SP\App\Api;

require_once 'database/crud/User.php';

use SP\App\Api\Database\CRUD\User;

$request = json_decode(file_get_contents('php://input'), true);

$user = new User($request);
$response = $user->create();

echo json_encode($response);
