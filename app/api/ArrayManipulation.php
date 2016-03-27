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
* Convert an array's keys to a list in the form of 'x = :x, y = :y'.
* Used for update queries.
*
* @param    string[][]  $array  Array to be converted to a string list.
*
* @return   string              List in the form of 'x = :x, y = :y, z = :z'.
*/
function toBindingSetList($array)
{
    $bindingSetList = '';
    $keyArray = array_keys($array);
    $lastKey = end($keyArray);

    foreach ($keyArray as $key) {
        $bindingSetList .= "$key = :$key";

        if (!($key === $lastKey)) {
            $bindingSetList .= ', ';
        }
    }

    return $bindingSetList;
}

/**
* Convert an array's keys to lists needed in some query statements.
* Need two lists of array keys, one without prefixes and one with the prefix ':'.
*
* @param    string[][]    $bindings     Array to make the lists out of.
*
* @return   string[][]                  'columns' in the form of 'x, y, z' and
*                                       'bindings' in the form of ':x, :y, :z'.
*/
function toQueryLists($bindings)
{
    $colNames = array_keys($bindings);
    $colNameList = implode(', ', $colNames);
    $bindingList = ':' . implode(', :', $colNames);

    return array('columns' => $colNameList, 'bindings' => $bindingList);
}
