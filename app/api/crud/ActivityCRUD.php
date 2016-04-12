<?php
namespace SP\App\Api\CRUD;

/**
* Acts as a wrapper for its corresponding entries in activity information and recurrence.
* All CRUDing of said entries should be done through their parent activity.
*/

require_once __DIR__.'/../activity/shared/ActivityInfo.php';
require_once __DIR__.'/../activity/shared/Recurrence.php';
require_once __DIR__.'/../database/Database.php';
require_once __DIR__.'/../ConvertArray.php';

use SP\App\Api\Activity\Shared\ActivityInfo;
use SP\App\Api\Activity\Shared\Recurrence;
use SP\App\Api\Database\Database;
use SP\App\Api\ConvertArray;

abstract class ActivityCRUD
{
    protected $table = 'cal_event'; // Default value; for testing
    protected $infoTable = 'activity_info';
    protected $recurrenceTable = 'recurrence';
    protected $fullActivityJoinString;

    /**
    * Get table names from activity's partner tables on creation.
    * @param Database   $aDB        Database to be injected, if it exists.
    */
    public function __construct($aDB = null)
    {
        $this->db = $aDB ? $aDB : new Database();
        $this->fullActivityJoinString = $this->getFullActivityJoinString();
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
    * Create the corresponding entries in recurrence and activity information
    * used by the activity.
    *
    * @param  mixed[]    $bindings              Bindings for the activity. MUST include
    *                                           parent id (label_id or calendar_id).
    * @param  mixed[]    $infoBindings          Bindings for the activity information.
    * @param  mixed[]    $recurrenceBindings    Bindings for the recurrence.
    *
    * @return mixed[] Promise results with whether or not activity and its corresponding
    *                 entries were created successfully. See Database->query().
    */
    public function create($bindings, $infoBindings, $recurrenceBindings = array())
    {
        try {
            $result = $this->db->beginTransaction();
            $this->checkForError($result);

            $this->createActivityInfo($infoBindings);
            $bindings['activity_info_id'] = $recurrenceBindings['activity_info_id'] = $this->db->lastInsertId();

            $this->createRecurrence($recurrenceBindings);
            $result = $this->createSelf($bindings);
            $this->checkForError($result['success']);

            return $this->db->commit();
        } catch (\Exception $e) {
            error_log($e->getMessage());
            return array(
                'success'=>false,
                'title'=>'An error occurred while creating activity.',
                'message'=>$e->getMessage()
            );
        }
    }

    /**
    * Create the activity's corresponding information entry.
    * Must be called BEFORE creating activity to pass this id into activity.
    *
    * @param mixed[] $infoBindings Bindings for query. See CRUD->create().
    */
    protected function createActivityInfo($infoBindings)
    {
        $infoBindings['created'] = date('Y-m-d H:i:s');
        $activityInfo = new ActivityInfo($this->db);
        $result = $activityInfo->create($infoBindings);
        $this->checkForError($result['success']);
    }

    /**
    * Create the activity's corresponding recurrence entry.
    * @param mixed[] $recurrenceBindings Bindings for query. See CRUD->create().
    */
    protected function createRecurrence($recurrenceBindings)
    {
        $recurrence = new Recurrence($this->db);
        $result = $recurrence->create($recurrenceBindings);
        $this->checkForError($result['success']);
    }

    /**
    * Create the activity itself.
    *
    * @param  mixed[]    $bindings   Column names and values of the entry.
    * @return mixed[]                Promise results with affected row count.
    *                                See Database->query().
    */
    protected function createSelf($bindings)
    {
        $lists = ConvertArray::toQueryLists($bindings);
        return $this->db->query(
            "INSERT INTO $this->table ({$lists['columns']})
            VALUES ({$lists['bindings']})",
            ConvertArray::addPrefixToKeys($bindings)
        );
    }

    /**
    * Delete the activity and its corresponding entries in the other tables.
    *
    * @param  int       $id     ID of row to be deleted.
    *
    * @return mixed[]           Promise results with affected row count.
    *                           See Database->query().
    */
    public function delete($id)
    {
        return $this->db->query(
            "DELETE {$this->table}, {$this->infoTable}, {$this->recurrenceTable}
            FROM {$this->fullActivityJoinString}
            WHERE {$this->table}.id = :id",
            array(':id'=>$id)
        );
    }

    /**
    * Delete all rows matching where clause.
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
            "DELETE {$this->table}, {$this->infoTable}, {$this->recurrenceTable}
            FROM {$this->getFullActivityJoinString}
            WHERE $where",
            ConvertArray::addPrefixToKeys($bindings)
        );
    }

    /**
    * Get the specified columns from this activity and its corresponding tables.
    *
    * @param  int      $id          ID of row to grab.
    * @param  mixed[]  $columns     Column names.
    *
    * @return mixed[]               Promise results with requested row.
    *                               See Database->query().
    */
    public function get($id, $columns = array())
    {
        $colNameList = ConvertArray::toColNameList($columns);
        return $this->db->query(
            "SELECT $colNameList
            FROM {$this->fullActivityJoinString}
            WHERE {$this->table}.id = :id",
            array(':id'=>$id)
        );
    }

    /**
    * Shorthand to getAll when wanting to select row equal to something.
    *
    * @param  string    $colName    Column name to compare to.
    * @param  string    $where      Item to compare to.
    * @param  mixed[]   $columns    Column names to select.
    *
    * @return mixed[]               Promise results with requested rows.
    *                               See Database->query().
    */
    public function getBy($colName, $where, $columns = array())
    {
        $colNameList = ConvertArray::toColNameList($columns);
        $bindings = array(':'.$colName=>$where);

        return $this->db->query(
            "SELECT $colNameList
            FROM {$this->fullActivityJoinString}
            WHERE $colName = :{$colName}",
            $bindings
        );
    }

    /**
    * Select all rows corresponding to where clause.
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
        $colNameList = ConvertArray::toColNameList($columns);
        $where = empty($where) ? '' : 'WHERE ' . $where;

        if (!empty($order)) {
            $order = 'ORDER BY ' . $order;
            $asc = ($asc === true) ? 'ASC' : ($asc === false) ? 'DESC' : '';
        }

        return $this->db->query(
            "SELECT $colNameList
            FROM {$this->fullActivityJoinString}
            $where $order $asc",
            ConvertArray::addPrefixToKeys($bindings)
        );
    }

    /**
    * Selecting rows from the activity involves left joining on three different tables.
    * @return string The joined tables.
    */
    protected function getFullActivityJoinString()
    {
        $infoAndRecurrenceJoin = "({$this->infoTable}
                    LEFT JOIN $this->recurrenceTable
                    ON {$this->infoTable}.id = {$this->recurrenceTable}.{$this->infoTable}_id)";
        return "{$this->table}
                LEFT JOIN $infoAndRecurrenceJoin
                ON {$this->table}.{$this->infoTable}_id = {$this->infoTable}.id";
    }

    /**
    * The activity takes cares of updating entries in itself as well as
    * its corresponding activity information and recurrence entries.
    * Binding parameters SHOULD NOT contain the table name.
    *
    * @param    int     $id                 ID of row to be updated.
    * @param    mixed[] $bindings           Bindings to be updated.
    *
    * @return   mixed[]                     Promise results with affeced row count.
    *                                       See Database->query().
    */
    public function update($id, $bindings)
    {
        $bindingsSetList = ConvertArray::toBindingSetList($bindings);
        $bindings['id'] = $id;

        return $this->db->query(
            "UPDATE {$this->fullActivityJoinString}
            SET $bindingsSetList
            WHERE {$this->table}.id = :id",
            ConvertArray::addPrefixToKeys($bindings)
        );
    }
}
