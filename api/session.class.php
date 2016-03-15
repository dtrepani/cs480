<?php
namespace App\Api\SessionClass;

session_start();

$db = new Database();

// get from angularJS
$postData   = file_get_contents("php://input");
$loginData  = json_decode($postData);

$userInfo = $db->query(
    'SELECT * FROM user WHERE name = :name',
    array(':name' => $loginData->username),
    true
);

if (!$userInfo) {
    // false login
    // user not found
}

if (!password_verify($loginData->password, $userInfo['password'])) {
    // false login
    // password incorrect
}

$_SESSION['admin']          = $userinfo['admin'];
$_SESSION['theme']          = $userinfo['theme'];
$_SESSION['week_start']     = $userinfo['week_start'];
$_SESSION['time_zone']      = $userinfo['time_zone'];
$_SESSION['avatar']         = $userinfo['avatar'];
$_SESSION['email']          = $userinfo['email'];
$_SESSION['phone_number']   = $userinfo['phone_number'];
$_SESSION['notify_email']   = $userinfo['notify_email'];
$_SESSION['notify_text']    = $userinfo['notify_text'];
