<?php
namespace SP\App\Api;

/**
* Add a prefix to every key in an array.
* 'key'=>'value' becomes ':key'=>'value' by default.
*
* @param  string[][] $array     Array to be converted.
* @param  string     $prefix    Prefix to add to keys.
*
* @return string[][] Converted array.
*/
function addPrefixToKeys($array, $prefix = ':')
{
    $prefixedArray = array();

    foreach ($array as $key => $value) {
        $prefixedArray[$prefix . $key] = $array[$key];
    }

    return $prefixedArray;
}

/**
* Convert an array's keys and values to lists for raw query statements.
*
* @param    string[][]  $array  Array to make the lists out of.
*
* @return   string              'keys' and 'values' in the form of 'x, y, z'.
*/
function toKeyValueList($array)
{
    $delimiter = ', ';
    $keyArray = array_keys($array);
    $valArray = array_values($array);

    return array(
        'keys'=>implode($delimiter, $keyArray),
        'values'=>implode($delimiter, $valArray),
    );
}

/**
* Convert an array's keys to a list in the form of 'x = :x, y = :y'.
* Used for update queries.
*
* @param    string[][]  $array  Array to be converted to a string list.
* @param    string      $prefix Prefix to add to key value.
*
* @return   string              List in the form of 'x = :x, y = :y, z = :z'.
*/
function toBindingSetList($array, $prefix = ':')
{
    $bindingSetList = '';
    $keyArray = array_keys($array);
    $lastKey = end($keyArray);

    foreach ($keyArray as $key) {
        $bindingSetList .= "$key = {$prefix}{$key}";

        if (!($key === $lastKey)) {
            $bindingSetList .= ', ';
        }
    }

    return $bindingSetList;
}

/**
* Convert an array's keys to lists needed in some query statements.
* Need two lists of array keys, one without prefixes and one with a prefix.
*
* @param    string[][]    $bindings     Array to make the lists out of.
* @param    string        $prefix       Prefix to add to binding list.
*
* @return   string[][]                  'columns' in the form of 'x, y, z' and
*                                       'bindings' in the form of ':x, :y, :z'.
*/
function toQueryLists($bindings, $prefix = ':')
{
    $colNames = array_keys($bindings);
    $colNameList = implode(', ', $colNames);
    $bindingList = $prefix . implode(", $prefix", $colNames);

    return array('columns' => $colNameList, 'bindings' => $bindingList);
}
