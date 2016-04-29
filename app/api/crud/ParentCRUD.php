<?php
namespace SP\App\Api\CRUD;

require_once 'CRUD.php';
require_once __DIR__.'/../ConvertArray.php';
use SP\App\Api\CRUD\CRUD;
use SP\App\Api\ConvertArray;

abstract class ParentCRUD extends CRUD
{
    /**
    * TODO: Complete refractor. This method is ruined with the shared items implemented.
    */
    public function getWhere(
        $where,
        $order = '',
        $asc = '',
        $bindings = array()
    ) {
        if (!empty($where)) {
            $where = 'WHERE ' . $where;
        }

        if (!empty($order)) {
            $order = 'ORDER BY ' . $order;
            $asc = ($asc === true) ? 'ASC' : ($asc === false) ? 'DESC' : '';
        }

        $result = $this->db->query(
            "SELECT *
            FROM $this->table
            $where $order $asc",
            ConvertArray::addPrefixToKeys($bindings)
        );

        if (!$result['success']) {
            return $result;
        }

        $resultShared = $this->db->query(
            "SELECT {$this->table}_person.*,
                {$this->table}_person.id AS share_id,
                {$this->table}_person.{$this->table}_id AS id,
                {$this->table}.name AS label_name,
                CONCAT(person.name, '\'s ', {$this->table}.name) AS name
            FROM {$this->table}_person
                JOIN ({$this->table}
                    JOIN person
                    ON {$this->table}.person_id = person.id)
                ON {$this->table}_id = {$this->table}.id
            WHERE {$this->table}_person.person_id = {$bindings['person_id']}"
        );

        if (!$resultShared['success']) {
            return $resultShared;
        }

        return array(
            'success'=>true,
            'data'=>array_merge($result['data'], $resultShared['data'])
        );
    }
}
