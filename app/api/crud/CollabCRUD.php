<?php
namespace SP\App\Api\CRUD;

require_once 'CRUD.php';
use SP\App\Api\CRUD\CRUD;

abstract class CollabCRUD extends CRUD
{
    protected $groupTable = 'calendar';  // Default value for testing

    public function getUsersFor($groupID)
    {
        return $this->db->query(
            "SELECT {$this->table}.*, name
            FROM {$this->table}
                JOIN person
                ON {$this->table}.person_id = person.id
            WHERE {$this->table}.{$this->groupTable}_id = {$groupID}"
        );
    }

    public function getGroupsFor($userID)
    {
        return $this->db->query(
            "SELECT {$this->table}.*,
                {$this->groupTable}.id AS share_id,
                {$this->groupTable}.name AS group_name,
                person.name AS user_name,
                CONCAT(person.name, '\'s ', {$this->groupTable}.name) AS shared_name
            FROM {$this->table}
                JOIN ({$this->groupTable}
                    JOIN person
                    ON {$this->groupTable}.person_id = person.id)
                ON {$this->groupTable}.{$this->groupTable}_id = {$this->groupTable}.id
            WHERE {$this->table}.person_id = {$userID}"
        );
    }
}
