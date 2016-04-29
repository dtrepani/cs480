<?php
namespace SP\App\Api\CRUD;

require_once 'CRUD.php';
use SP\App\Api\CRUD\CRUD;

abstract class CollabCRUD extends CRUD
{
    protected $userTable = 'person';
    protected $groupTable = 'calendar';  // Default value for testing

    public function getUsersFor($groupID)
    {
        return $this->db->query(
            "SELECT {$this->table}.*, name
            FROM {$this->table}
                JOIN {$this->userTable}
                ON {$this->table}.person_id = {$this->userTable}.id
            WHERE {$this->table}.{$this->groupTable}_id = {$groupID}"
        );
    }

    public function getGroupsFor($userID)
    {
        return $this->db->query(
            "SELECT {$this->table}.*,
                {$this->groupTable}.name AS group_name,
                {$this->userTable}.name AS user_name,
                CONCAT({$this->userTable}.name, '\'s ', {$this->groupTable}.name) AS shared_name
            FROM {$this->table}
                JOIN ({$this->groupTable}
                    JOIN {$this->userTable}
                    ON {$this->groupTable}.person_id = {$this->userTable}.id)
                ON {$this->groupTable}_id = {$this->groupTable}.id
            WHERE {$this->table}.person_id = {$userID}"
        );
    }

    protected function getSharedActivitiesFor($activity, $userID)
    {
        return $this->db->query(
            "SELECT {$activity->getSelectWithParent()}
            FROM {$this->table}
                JOIN ({$activity->getJoinedActivityWithParent})
                ON {$this->groupTable}_id = {$this->groupTable}.id
            WHERE {$this->table}.{$this->groupTable}_id = {$groupID}"
        );
    }
}
