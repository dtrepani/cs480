<?php
namespace SP\App\Api;

class ConvertArray
{
    /**
    * Add a prefix to every key in an array.
    * 'key'=>'value' becomes ':key'=>'value' by default.
    *
    * @param  string[][] $array     Array to be converted.
    * @param  string     $prefix    Prefix to add to keys.
    *
    * @return string[][] Converted array.
    */
    public static function addPrefixToKeys($array, $prefix = ':')
    {
        $prefixedArray = array();

        foreach ($array as $key => $value) {
            $prefixedArray[$prefix . $key] = $value;
        }

        return $prefixedArray;
    }

    /**
    * TODO: Find better way to do this.
    *
    * Separate the bindings into their appropriate subgroups.
    * Bindings not in any of the subgroups are thrown out.
    * Only to be called by ActivityCRUD.
    *
    * @param  mixed[] $aBindings Unorganized bindings.
    *
    * @return mixed[]            Bindings with subgroups activity, info, and recurrence.
    */
    public static function toSubgroups($aBindings)
    {
        $bindings = array('activity'=>array(), 'info'=>array(), 'recurrence'=>array());
        $cols = array(
            'activity'=>array('label_id', 'calendar_id', 'dt_start', 'dt_end', 'all_day', 'location', 'due', 'completed', 'subtasks'),
            'info'=>array('summary', 'color', 'note', 'reminder', 'priority', 'recurrence', 'attachment'),
            'recurrence'=>array('freq', 'until', 'count', 'repeat_interval'),
        );

        foreach ($aBindings as $key => $value) {
            foreach (array_keys($cols) as $colKey) {
                if (in_array($key, $cols[$colKey]) ||
                    ($colKey === 'recurrence' && preg_match('/^by_.*/', $colKey) === 1)
                ) {
                    $bindings[$colKey][$key] = $value;
                    break;
                }
            }
        }

        return $bindings;
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
    public static function toBindingSetList($array, $prefix = ':')
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
    * Convert an array's keys and values to lists for raw query statements.
    *
    * @param    string[][]  $array  Array to make the lists out of.
    *
    * @return   string              'keys' and 'values' in the form of 'x, y, z'.
    */
    public static function toKeyValueList($array)
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
    * Convert an array's keys to lists needed in some query statements.
    * Need two lists of array keys, one without prefixes and one with a prefix.
    *
    * @param    string[][]    $bindings     Array to make the lists out of.
    * @param    string        $prefix       Prefix to add to binding list.
    *
    * @return   string[][]                  'columns' in the form of 'x, y, z' and
    *                                       'bindings' in the form of ':x, :y, :z'.
    */
    public static function toQueryLists($bindings, $prefix = ':')
    {
        $colNames = array_keys($bindings);
        $colNameList = implode(', ', $colNames);
        $bindingList = $prefix . implode(", $prefix", $colNames);

        return array('columns' => $colNameList, 'bindings' => $bindingList);
    }
}
