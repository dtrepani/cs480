<?php
namespace App\Api\Database;

require_once('../ArrayManipulation.php');
require_once('Database.php');

use App\Api as Api;

$request = json_decode(file_get_contents('php://input'), true);

$items = $request;
$colNames = $bindings = null;
setQueryStrings($items, $colNames, $bindings);
$bindingMap = Api\addPrefixToKeys($items);

$db = new Database();
$db->query(
    "INSERT INTO $request->type ($colNames) VALUES ($bindings)",
    $bindingMap
);

// TODO: echo success or failure

function setQueryStrings(&$items, &$colNames, &$bindings)
{
    array_shift($items);
    $colNames = Api\toStringList($items);
    $bindings = Api\toStringList($items, ':');
}
