<?php
namespace SP\App\Api\CRUD;

require_once __DIR__.'/../arrayManipulation.php';
require_once __DIR__.'/../database/Database.php';

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
    * @param  mixed[]    $bindings   Column names and values of the entry.
    * @return mixed[]                Promise results with affected row count.
    *                                See Database->query().
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
    * Raw creation query without bindings.
    * For use with nested queries in the values.
    *
    * @param mixed[]    $colsAndVals Column names and values of the entry.
    *
    * @return mixed[]                Promise results with affected row count.
    *                                See Database->query().
    */
    public function createRaw($colsAndVals)
    {
        $lists = Api\toKeyValueList($colsAndVals, '');
        return $this->db->query(
            "INSERT INTO $this->table ({$lists['keys']})
            VALUES ({$lists['values']})"
        );
    }

    /**
    * @param  int       $id     ID of row to be deleted.
    * @return mixed[]           Promise results with affected row count.
    *                           See Database->query().
    */
    public function delete($id)
    {
        return $this->db->query(
            "DELETE FROM $this->table WHERE id = :id",
            array(':id'=>$id)
        );
    }

    /**
    * Delete rows not bounded by an id.
    *
    * @param  string    $where      Where clause, such as 'completed = true'.
    * @param  mixed[]   $bindings   Bindings to sanitize clauses. Should NOT have
    *                               a ':' prefix.
    *
    * @return mixed[]               Promise results with affected row count.
    *                               See Database->query().
    */
    public function deleteAll($where, $bindings = array())
    {
        return $this->db->query(
            "DELETE FROM $this->table WHERE $where",
            Api\addPrefixToKeys($bindings)
        );
    }

    /**
    * @param  int      $id          ID of row to grab or
    * @param  mixed[]  $columns     Column names.
    *
    * @return mixed[]               Promise results with requested row. See Database.php.
    */
    public function get($id, $columns = array())
    {
        $colNameList = empty($columns) ? '*' : implode(', ', $columns);

        $test = $this->db->query(
            "SELECT $colNameList
            FROM $this->table
            WHERE id = :id",
            array(':id'=>$id)
        );

        return $test;
    }

    /**
    * Select rows not bounded by an id.
    *
    * @param  mixed[]   $columns    Column names.
    * @param  mixed[]   $bindings   Bindings to sanitize clauses. Should NOT have
    *                               a ':' prefix.
    * @param  string    $where      Where clause, such as 'completed = true'.
    * @param  string    $order      Order By clause, such as 'completed'.
    *                               Refers to columns.
    * @param  bool      $asc        Order by ascending or descending order.
    *
    * @return mixed[]               Promise results with requested rows.
    *                               See Database->query().
    */
    public function getAll(
        $columns = array(),
        $bindings = array(),
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
            Api\addPrefixToKeys($bindings)
        );
    }

    /**
    * Roll back a transaction if the last query's results were an error.
    */
    protected function checkForError($result)
    {
        if (!$result) {
            $this->db->rollBack();
            throw new \Exception('Error when inserting entry in CRUD->create().');
        }
    }

    /**
    * @param    int           $id           ID of row to be updated.
    * @param    mixed[]       $bindings     Bindings to be updated.
    *
    * @return   mixed[]                     Promise results with affeced row count.
    *                                       See Database->query().
    */
    public function update($id, $bindings = array())
    {
        $bindingSetList = Api\toBindingSetList($bindings);
        $bindings['id'] = $id;

        return $this->db->query(
            "UPDATE $this->table
            SET $bindingSetList
            WHERE id = :id",
            Api\addPrefixToKeys($bindings)
        );
    }
}
