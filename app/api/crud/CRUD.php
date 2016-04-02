<?php
namespace SP\App\Api\CRUD;

require_once __DIR__.'/../arrayManipulation.php';
require_once __DIR__.'/../Database/Database.php';

use SP\App\Api\Database\Database;
use SP\App\Api as Api;

abstract class CRUD
{
    protected $db;
    protected $table;

    /**
    * @param Database   $aDB        Database to be injected, if it exists.
    */
    public function __construct($aDB = null)
    {
        $this->db = $aDB ? $aDB : new Database();
    }

    /**
    * @param mixed[]    $bindings       Column names and values of the entry.
    * @return mixed[success][result]    Number of rows added.
    */
    public function create($bindings = array())
    {
        $lists = Api\toQueryLists($bindings);

        return $this->db->query(
            "INSERT INTO $this->table ({$lists['columns']})
            VALUES ({$lists['bindings']})",
            Api\addPrefixToKeys($bindings)
        );
    }

    /**
    * @param  int       $id             ID of row to be deleted.
    * @return mixed[success][result]    Number of rows deleted.
    */
    public function delete($id)
    {
        return $this->db->query(
            "DELETE FROM $this->table WHERE id = $id"
        );
    }

    /**
    * Delete rows not bounded by an id.
    *
    * @param  string    $where          Where clause, such as 'completed = true'.
    *
    * @return mixed[success][result]    Number of rows deleted.
    */
    public function deleteAll($where)
    {
        return $this->db->query(
            "DELETE FROM $this->table WHERE $where"
        );
    }

    /**
    * @param  int      $id              ID of row to grab.
    * @param  mixed[]  $columns         Column names.
    * @param  bool      $singleRow      Get a single row.
    *
    * @return mixed[success][result]    Row matching primary key.
    */
    public function get($id, $columns = array(), $singleRow = false)
    {
        $colNameList = empty($columns) ? '*' : implode(', ', $columns);

        return $this->db->query(
            "SELECT $colNameList
            FROM $this->table
            WHERE id = $id",
            array(),
            $singleRow
        );
    }

    /**
    * Select rows not bounded by an id.
    *
    * @param  mixed[]   $columns        Column names.
    * @param  mixed[]   $bindings       Bindings to sanitize clauses. Should NOT have
    *                                   a ':' prefix. The DB will take care of that.
    * @param  bool      $singleRow      Get a single row.
    * @param  string    $where          Where clause, such as 'completed = true'.
    * @param  string    $order          Order By clause, such as 'completed'.
    *                                   Refers to columns.
    * @param  bool      $asc            Order by ascending or descending order.
    *
    * @return mixed[success][result]    Row(s) matching query.
    */
    public function getAll(
        $columns = array(),
        $bindings = array(),
        $singleRow = false,
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
            "SELECT $colNameList FROM $this->table $where $order $asc",
            Api\addPrefixToKeys($bindings),
            $singleRow
        );
    }

    /**
    * @param    int           $id            ID of row to be updated.
    * @param    mixed[]       $bindings      Bindings to be updated.
    *
    * @return   mixed[success][result]       Number of rows updated.
    */
    public function update($id, $bindings = array())
    {
        $bindingSetList = Api\toBindingSetList($bindings);

        return $this->db->query(
            "UPDATE $this->table
            SET $bindingSetList
            WHERE id = $id",
            Api\addPrefixToKeys($bindings)
        );
    }
}
