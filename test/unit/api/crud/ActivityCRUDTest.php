<?php
namespace SP\Test\Unit\Api\CRUD;

/**
* Uses the 'cal_event' table to test the ActivityCRUD methods.
*/

require_once __DIR__.'/../../../../app/api/crud/ActivityCRUD.php';
require_once __DIR__.'/../../../../app/api/activity/calendar/Calendar.php';
require_once __DIR__.'/../../../../app/api/user/User.php';
use SP\App\Api\CRUD\ActivityCRUD;
use SP\App\Api\Activity\Calendar\Calendar;
use SP\App\Api\User\User;

class ActivityCRUDTest extends \PHPUnit_Framework_TestCase
{
    protected function setUp()
    {
        $this->stub = $this->getMockForAbstractClass('SP\\App\\Api\\CRUD\\ActivityCRUD');
        $this->user = new User();
        $this->cal = new Calendar();

        $this->userBindings = array('name'=>'b', 'password'=>'b');
        $this->bindings1 = array(
            'event'=>array('description'=>'a1'),
            'info'=>array('summary'=>'c1', 'note'=>'d1'),
            'rec'=>array('freq'=>'hourly', 'repeat_interval'=>1)
        );
        $this->bindings2 = array(
            'event'=>array('description'=>'a2'),
            'info'=>array('summary'=>'c2', 'note'=>'d2'),
            'rec'=>array('freq'=>'daily', 'repeat_interval'=>5)
        );
        $this->bindings3 = array(
            'event'=>array('description'=>'a3'),
            'info'=>array('summary'=>'c3', 'note'=>'d3'),
            'rec'=>array('freq'=>'weekly', 'repeat_interval'=>5)
        );

        $this->userID = $this->user->getBy('name', $this->userBindings['name']);
        // Will only succeed after testCreate creates new user.
        if ($this->userID['success']) {
            $this->userID = $this->userID['data'][0]['id'];
            $this->calID = $this->cal->getBy('person_id', $this->userID)['data'][0]['id'];
        }
    }

    protected function tearDown()
    {
        unset($this->stub);
        unset($this->user);
        unset($this->cal);
        unset($this->userID);
        unset($this->calID);
        unset($this->userBindings);
        unset($this->bindings1);
        unset($this->bindings2);
        unset($this->bindings3);
    }

    public function testCreate()
    {
        $this->user->create($this->userBindings);
        $this->userID = $this->user->getBy('name', $this->userBindings['name'])['data'][0]['id'];
        $this->calID = $this->cal->getBy('person_id', $this->userID)['data'][0]['id'];

        $result = $this->stub->create(
            $this->calID,
            $this->bindings1['event'],
            $this->bindings1['info'],
            $this->bindings1['rec']
        );
        $this->assertTrue($result['success']);
    }

    /**
    * @depends testCreate
    */
    public function testGetBy()
    {
        $result = $this->stub->getBy(
            $this->userID,
            'summary',
            $this->bindings1['info']['summary']
        )['data'][0];
        $this->assertEquals($result['description'], $this->bindings1['event']['description']);
        $this->assertEquals($result['summary'], $this->bindings1['info']['summary']);
        $this->assertEquals($result['freq'], $this->bindings1['rec']['freq']);

        $result = $this->stub->getBy($this->userID, 'summary', 'ERROR');
        $this->assertFalse($result['success']);
    }

    /**
    * @depends testCreate
    * @depends testGetBy
    */
    public function testGet()
    {
        $data = $this->stub->getBy(
            $this->userID,
            'summary',
            $this->bindings1['info']['summary']
        )['data'][0];
        $result = $this->stub->get($data['id'])['data'][0];

        $this->assertEquals($result['id'], $data['id']);
        $this->assertEquals($result['description'], $this->bindings1['event']['description']);
        $this->assertEquals($result['summary'], $this->bindings1['info']['summary']);
        $this->assertEquals($result['freq'], $this->bindings1['rec']['freq']);

        $result = $this->stub->get(-1);
        $this->assertFalse($result['success']);
    }

    /**
    * @depends testCreate
    * @depends testGetBy
    */
    public function testUpdate()
    {
        $updateBindings = array(
            'description'=>'updated description',
            'note'=>'updated note',
            'freq'=>'daily'
        );
        $result = $this->stub->getBy($this->userID, 'summary', $this->bindings1['info']['summary'])['data'][0];
        $result = $this->stub->update($result['id'], $updateBindings);
        $this->assertGreaterThanOrEqual(1, $result['data']);

        $result = $this->stub->getBy($this->userID, 'summary', $this->bindings1['info']['summary'])['data'][0];
        $this->assertEquals($result['description'], $updateBindings['description']);
        $this->assertEquals($result['note'], $updateBindings['note']);
        $this->assertEquals($result['freq'], $updateBindings['freq']);
    }

    /**
    * @depends testCreate
    * @depends testGetBy
    */
    public function testDelete()
    {
        $data = $this->stub->getBy($this->userID, 'summary', $this->bindings1['info']['summary'])['data'][0];
        $result = $this->stub->delete($data['id']);
        $this->assertEquals($result['data'], 1);
        $result = $this->stub->delete($data['id']);
        $this->assertEquals($result['data'], 0);
    }

    /**
    * @depends testCreate
    * @depends testDelete
    */
    public function testGetWhere()
    {
        $this->stub->create($this->calID, $this->bindings1['event'], $this->bindings1['info'], $this->bindings1['rec']);
        $this->stub->create($this->calID, $this->bindings2['event'], $this->bindings2['info'], $this->bindings2['rec']);
        $this->stub->create($this->calID, $this->bindings3['event'], $this->bindings3['info'], $this->bindings3['rec']);

        $result = $this->stub->getWhere($this->userID, '', 'summary')['data'];
        $this->assertEquals($result[0]['summary'], $this->bindings1['info']['summary']);
        $this->assertEquals($result[1]['summary'], $this->bindings2['info']['summary']);
        $this->assertEquals($result[2]['summary'], $this->bindings3['info']['summary']);

        $result = $this->stub->getWhere($this->userID, 'repeat_interval > 1', 'summary')['data'];
        $this->assertEquals($result[0]['summary'], $this->bindings2['info']['summary']);
        $this->assertEquals($result[1]['summary'], $this->bindings3['info']['summary']);
        $this->assertFalse(isset($result[2]));
    }

    /**
    * @depends testGetWhere
    */
    public function testDeleteWhere()
    {
        $result = $this->stub->deleteWhere($this->userID, 'repeat_interval > 1');
        $this->assertEquals($result['data'], 2);

        $result = $this->stub->deleteWhere($this->userID, 'repeat_interval = 1');
        $this->assertEquals($result['data'], 1);

        $result = $this->stub->deleteWhere($this->userID, 'repeat_interval < 10');
        $this->assertEquals($result['data'], 0);

        $this->user->delete($this->userID);
    }
}
