<?php
namespace SP\App\Api\Database\CRUD;

require_once __DIR__.'/../../arrayManipulation.php';
require_once __DIR__.'/../Database.php';

use SP\App\Api\Database\Database;
use SP\App\Api as Api;

abstract class CRUD
{
    protected $bindings;
    protected $db;
    protected $pk = 'id';
    protected $table;

    /**
    * @param mixed[][]  $aBindings  Column names and values of the entry.
    * @param Database   $aDB        Database to be injected, if it exists.
    */
    public function __construct($aBindings = array(), $aDB = null)
    {
        $this->db = $aDB ? $aDB : new Database();
        $this->bindings = $aBindings;
    }

    /**
    * @param    string $col   Column name.
    * @return   string|null   The value of the column or null if it doesn't exist.
    */
    public function __get($col)
    {
        return isset($this->bindings[$col]) ? $this->bindings[$col] : null;
    }

    /**
    * @param    string $col   Column name. 'pk' changes the primary key column name.
    * @param    string $val   Value to set the column to.
    */
    public function __set($col, $val)
    {
        if ($col === 'pk') {
            $pk = $val;
        } else {
            $this->bindings[$col] = $val;
        }
    }

    /**
    * @return int|false Number of rows added or false on failure.
    */
    public function create()
    {
        $lists = Api\toQueryLists($this->bindings);

        return $this->db->query(
            "INSERT INTO $this->table ({$lists['columns']})
            VALUES ({$lists['bindings']})",
            Api\addPrefixToKeys($this->bindings)
        );
    }

    /**
    * @return int|false Number of rows added or false on failure.
    */
    public function delete()
    {
        return $this->db->query(
            "DELETE FROM $this->table WHERE $this->pk = $this->bindings[$this->pk]"
        );
    }

    /**
    * Delete rows not bounded by a specific primary key.
    *
    * @param  string    $where  Where clause, such as 'completed = true'.
    *
    * @return int|false         Number of rows added or false on failure.
    */
    public function deleteAll($where)
    {
        return $this->db->query(
            "DELETE FROM $this->table WHERE $where"
        );
    }

    /**
    * @param  mixed[]  $columns  Column names.
    * @return int|false          Number of rows added or false on failure.
    */
    public function get($columns = array())
    {
        $colNameList = empty($columns) ? '*' : implode(', ', $columns);

        return $this->db->query(
            "SELECT $colNameList
            FROM $this->table
            WHERE $this->pk = $this->bindings[$this->pk]"
        );
    }

    /**
    * Select rows not bounded by a specific primary key.
    *
    * @param  mixed[]   $columns    Column names.
    * @param  string    $where      Where clause, such as 'completed = true'.
    * @param  string    $order      Order By clause, such as 'completed'.
    *                               Refers to columns.
    * @param  bool      $asc        Order by ascending or descending order.
    *
    * @return int|false Number of rows added or false on failure.
    */
    public function getAll(
        $columns = array(),
        $where = '',
        $order = '',
        $asc = ''
    ) {
        $colNameList = empty($columns) ? '*' : implode(', ', $columns);
        $where = empty($where) ? '' : 'WHERE ' . $where;

        if (!empty($order)) {
            $order = 'ORDER BY ' . $order;
            $asc = ($asc === true) ? 'ASC' : ($asc === false) ? 'DESC' : '';
        }

        return $this->db->query(
            "SELECT $colNameList FROM $this->table $where $order $asc"
        );
    }

    /**
    * @param    mixed[][]   $updateBindings  Bindings to be updated.
    * @return   int|false                    Number of rows added or false on failure.
    */
    public function update($updateBindings = array())
    {
        $bindingSetList = Api\toBindingSetList($updateBindings);

        return $this->db->query(
            "UPDATE $this->table
            SET $bindingSetList
            WHERE $this->pk = $this->bindings[$this->pk]",
            Api\addPrefixToKeys($updateBindings)
        );
    }
}
