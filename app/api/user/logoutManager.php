<?php
namespace SP\App\Api\User;

require_once __DIR__.'/../session/Session.php';
use SP\App\Api\Session\Session;

$session = new Session();
$session->end();

echo '';
