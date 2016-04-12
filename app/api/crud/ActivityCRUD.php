<?php
namespace SP\App\Api\CRUD;

/**
* Acts as a wrapper for its corresponding entries in activity information and recurrence.
* All CRUDing of said entries should be done through this activity.
* Anything not accessing activity with its id will also require the user id the
* activity belongs to. This is to prevent users from viewing or changing other
* users' activities.
*/

require_once __DIR__.'/../activity/shared/ActivityInfo.php';
require_once __DIR__.'/../activity/shared/Recurrence.php';
require_once __DIR__.'/../activity/calendar/Calendar.php';
require_once __DIR__.'/../activity/task/Label.php';
require_once __DIR__.'/../database/Database.php';
require_once __DIR__.'/../ConvertArray.php';

use SP\App\Api\Activity\Shared\ActivityInfo;
use SP\App\Api\Activity\Shared\Recurrence;
use SP\App\Api\Database\Database;
use SP\App\Api\ConvertArray;

abstract class ActivityCRUD
{
    // Default values for testing
    protected $table = 'cal_event';
    protected $infoTable = 'activity_info';
    protected $recurrenceTable = 'recurrence';
    protected $parentTable = 'calendar';
    protected $joinedActivity;
    protected $joinedActivityWithParent;

    /**
    * Get table names from activity's partner tables on creation.
    * @param Database   $aDB        Database to be injected, if it exists.
    */
    public function __construct($aDB = null)
    {
        $this->db = $aDB ? $aDB : new Database();
        $this->joinedActivity = $this->getJoinedActivity();
        $this->joinedActivityWithParent = $this->getJoinedActivityWithParent();
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
    * @param  int        $parentID              ID of the parent of the activity.
    * @param  mixed[]    $bindings              Bindings for the activity. MUST include
    *                                           parent id (label_id or calendar_id).
    * @param  mixed[]    $infoBindings          Bindings for the activity information.
    * @param  mixed[]    $recurrenceBindings    Bindings for the recurrence.
    *
    * @return mixed[] Promise results with whether or not activity and its corresponding
    *                 entries were created successfully. See Database->query().
    */
    public function create(
        $parentID,
        $bindings,
        $infoBindings,
        $recurrenceBindings = array()
    ) {
        try {
            $result = $this->db->beginTransaction();
            $this->checkForError($result);

            $bindingsNameForParent = ($this->table === 'cal_event'
                ? 'calendar_id'
                : 'label_id');
            $bindings[$bindingsNameForParent] = $parentID;

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
    * Deleting the activity info row will delete the activity and recurrence rows, too.
    * @see CRUD->delete().
    */
    public function delete($id)
    {
        return $this->db->query(
            "DELETE {$this->infoTable}
            FROM {$this->joinedActivity}
            WHERE {$this->table}.id = :id",
            array(':id'=>$id)
        );
    }

    /**
    * Delete all children of the parent corresponding to the where clause.
    * Will only ever delete children for a single user.
    *
    * @param  int   $userID   Corresponding user.
    * @see CRUD->deleteWhere().
    */
    public function deleteWhere($userID, $where, $bindings = array())
    {
        $bindings['person_id'] = $userID;
        return $this->db->query(
            "DELETE {$this->infoTable}
            FROM {$this->joinedActivityWithParent}
            WHERE {$this->parentTable}.person_id = :person_id AND $where",
            ConvertArray::addPrefixToKeys($bindings)
        );
    }

    /**
    * Get the specified columns from this activity and its corresponding tables.
    * @see CRUD->get().
    */
    public function get($id, $columns = array())
    {
        $colNameList = ConvertArray::toColNameList($columns);
        return $this->db->query(
            "SELECT $colNameList
            FROM {$this->joinedActivity}
            WHERE {$this->table}.id = :id",
            array(':id'=>$id)
        );
    }

    /**
    * Shorthand to getAll when wanting to select row equal to something.
    * @param  int   $userID   Corresponding user.
    * @see CRUD->getBy().
    */
    public function getBy($userID, $colName, $where, $columns = array())
    {
        $colNameList = ConvertArray::toColNameList($columns);
        $bindings = array(':'.$colName=>$where, ':person_id'=>$userID);

        return $this->db->query(
            "SELECT $colNameList
            FROM {$this->joinedActivityWithParent}
            WHERE {$this->parentTable}.person_id = :person_id AND $colName = :{$colName}",
            $bindings
        );
    }

    /**
    * Select all rows corresponding to where clause.
    * @see CRUD->getWhere().
    */
    public function getWhere(
        $userID,
        $where = '',
        $order = '',
        $asc = '',
        $bindings = array(),
        $columns = array()
    ) {
        $colNameList = ConvertArray::toColNameList($columns);
        $where = (empty($where) ? '' : 'AND ' . $where);
        $bindings['person_id'] = $userID;

        if (!empty($order)) {
            $order = 'ORDER BY ' . $order;
            $asc = ($asc === true) ? 'ASC' : ($asc === false) ? 'DESC' : '';
        }

        return $this->db->query(
            "SELECT $colNameList
            FROM {$this->joinedActivityWithParent}
            WHERE {$this->parentTable}.person_id = :person_id $where $order $asc",
            ConvertArray::addPrefixToKeys($bindings)
        );
    }

    /**
    * Selecting rows from the activity involves left joining on three different tables.
    * @return string The joined tables.
    */
    private function getJoinedActivity()
    {
        $infoAndRecurrenceJoin = "({$this->infoTable}
                    LEFT JOIN $this->recurrenceTable
                    ON {$this->infoTable}.id = {$this->recurrenceTable}.{$this->infoTable}_id)";
        return "{$this->table}
                JOIN $infoAndRecurrenceJoin
                ON {$this->table}.{$this->infoTable}_id = {$this->infoTable}.id";
    }

    /**
    * Get the full join string of the activity ands its label.
    * This is to gain access to the user's id, which is required to by many functions
    * since one user should never be viewing or affecting the activities of
    * another user.
    * @return string
    */
    private function getJoinedActivityWithParent()
    {
        return "{$this->parentTable}
                JOIN ({$this->getJoinedActivity()})
                ON {$this->parentTable}.id = {$this->table}.{$this->parentTable}_id";
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
            "UPDATE {$this->joinedActivity}
            SET $bindingsSetList
            WHERE {$this->table}.id = :id",
            ConvertArray::addPrefixToKeys($bindings)
        );
    }
}
