<?php
namespace SP\Test\Unit\Api\CRUD;

/**
* Uses the 'person' table to test the CRUD methods.
*/

require_once __DIR__.'/../../../../app/api/crud/CRUD.php';
use SP\App\Api\CRUD\CRUD;

class CRUDTest extends \PHPUnit_Framework_TestCase
{
    protected function setUp()
    {
        $this->stub = $this->getMockForAbstractClass('SP\\App\\Api\\CRUD\\CRUD');
        $this->bindings = array('name'=>'a', 'password'=>'b', 'email'=>'c');
    }

    protected function tearDown()
    {
        unset($this->stub);
        unset($this->bindings);
    }

    public function testCreate()
    {
        $result = $this->stub->create($this->bindings);
        $this->assertTrue($result['success']);
        $result = $this->stub->create($this->bindings);
        $this->assertFalse($result['success']);
    }

    /**
    * @depends testCreate
    */
    public function testGetBy()
    {
        $result = $this->stub->getBy('name', $this->bindings['name'])['data'][0];
        $this->assertEquals($result['name'], $this->bindings['name']);
        $this->assertEquals($result['password'], $this->bindings['password']);
        $this->assertEquals($result['email'], $this->bindings['email']);

        $result = $this->stub->getBy('name', 'ERROR');
        $this->assertFalse($result['success']);
    }

    /**
    * @depends testCreate
    * @depends testGetBy
    */
    public function testGet()
    {
        $data = $this->stub->getBy('name', $this->bindings['name'])['data'][0];
        $result = $this->stub->get($data['id'])['data'][0];

        $this->assertEquals($result['id'], $data['id']);
        $this->assertEquals($result['name'], $this->bindings['name']);
        $this->assertEquals($result['password'], $this->bindings['password']);
        $this->assertEquals($result['email'], $this->bindings['email']);

        $result = $this->stub->get(-1);
        $this->assertFalse($result['success']);
    }

    /**
    * @depends testCreate
    * @depends testGetBy
    */
    public function testUpdate()
    {
        $updateBindings = array('email'=>'d', 'admin'=>true);

        $data = $this->stub->getBy('name', $this->bindings['name'])['data'][0];
        $result = $this->stub->update($data['id'], $updateBindings);
        $data = $this->stub->getBy('name', $this->bindings['name'])['data'][0];

        $this->assertEquals($result['data'], 1);
        $this->assertEquals($data['email'], $updateBindings['email']);
        $this->assertEquals($data['admin'], $updateBindings['admin']);
    }

    /**
    * @depends testCreate
    * @depends testGetBy
    */
    public function testDelete()
    {
        $data = $this->stub->getBy('name', $this->bindings['name'])['data'][0];
        $result = $this->stub->delete($data['id']);
        $this->assertEquals($result['data'], 1);
        $result = $this->stub->delete($data['id']);
        $this->assertEquals($result['data'], 0);
    }

    /**
    * @depends testCreate
    * @depends testDelete
    */
    public function testGetAll()
    {
        $bindings2 = array(
            'name'=>'x',
            'password'=>'y',
            'email'=>$this->bindings['email']
        );
        $bindings3 = array('name'=>'f', 'password'=>'g', 'email'=>'h');
        $this->stub->create($this->bindings);
        $this->stub->create($bindings2);
        $this->stub->create($bindings3);

        $result = $this->stub->getAll(
            array(),
            array('email'=>$this->bindings['email']),
            'email = :email',
            'name'
        )['data'];
        $this->assertEquals($result[0]['name'], $this->bindings['name']);
        $this->assertEquals($result[1]['name'], $bindings2['name']);
        $this->assertFalse(isset($result[2]));

        $result = $this->stub->getBy('name', $this->bindings['name'])['data'][0];
        $this->stub->delete($result['id']);
        $result = $this->stub->getBy('name', $bindings2['name'])['data'][0];
        $this->stub->delete($result['id']);
        $result = $this->stub->getBy('name', $bindings3['name'])['data'][0];
        $this->stub->delete($result['id']);
    }
}
