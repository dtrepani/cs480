<?php
namespace SP\App\Api\Activity\Tasks\Label;

require_once __DIR__.'/../../../crud/CRUD.php';
use SP\App\Api\Crud\CRUD;

class Label extends CRUD
{
    protected $table = 'label';
}
