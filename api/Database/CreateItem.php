<?php
namespace App\Api\Database;

require_once 'vendor/autoload.php';

use App\Api as Api;

$request = json_decode(file_get_contents('php://input'));

$items = $colNames = $bindings = null;
setQueryStrings();
$bindingMap = Api\addPrefixToKeys($items);

$db = new Database();
$db->query(
    "INSERT INTO $request->type ($colNames) VALUES ($bindings)",
    $bindingMap
);

// TODO: echo success or failure

function setQueryStrings()
{
    $items = array_slice($request, 1);
    $colNames = Api\toStringList($items);
    $bindings = Api\toStringList($items, ':');
}
