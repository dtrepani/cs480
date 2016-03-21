<?php
namespace App\Api;

/**
* Convert an array's keys to a string list in the format of 'x, y, z'
*
* @param    string[][]  $array   Array to be converted to a string list.
* @param    string      $prefix  Prefix to a key. Useful for bindings.
*
* @return   string      $stringList
*/
function toStringList($array, $prefix = '')
{
    $stringList = '';
    $keyArray = array_keys($array);
    $lastKey = end($keyArray);

    foreach ($keyArray as $key) {
        $stringList .= $prefix . $key;

        if (!($key === $lastKey)) {
            $stringList .= ', ';
        }
    }

    return $stringList;
}

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
