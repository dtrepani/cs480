<?php
namespace SP\Test\Unit\Api\CRUD;

/**
* Uses the 'cal_event' table to test the ActivityCRUD methods.
*/

require_once __DIR__.'/../../../../app/api/crud/ActivityCRUD.php';
require_once __DIR__.'/../../../../app/api/activity/shared/ActivityInfo.php';
require_once __DIR__.'/../../../../app/api/activity/calendar/Calendar.php';
require_once __DIR__.'/../../../../app/api/activity/shared/Recurrence.php';
require_once __DIR__.'/../../../../app/api/user/User.php';
use SP\App\Api\CRUD\ActivityCRUD;
use SP\App\Api\Activity\Shared\ActivityInfo;
use SP\App\Api\Activity\Calendar\Calendar;
use SP\App\Api\Activity\Shared\Recurrence;
use SP\App\Api\User\User;

class ActivityCRUDTest extends \PHPUnit_Framework_TestCase
{
    protected function setUp()
    {
        $this->stub = $this->getMockForAbstractClass('SP\\App\\Api\\CRUD\\ActivityCRUD');
        $this->info = new ActivityInfo();
        $this->recurrence = new Recurrence();
        $this->user = new User();
        $this->cal = new Calendar();

        $this->userBindings = array('name'=>'b', 'password'=>'b');
        $this->bindings = array('description'=>'a', 'location'=>'b');
        $this->infoBindings = array('summary'=>'c', 'note'=>'d');
        $this->recBindings = array('freq'=>'weekly', 'repeat_interval'=>2);

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
        unset($this->info);
        unset($this->recurrence);
        unset($this->bindings);
        unset($this->infoBindings);
        unset($this->recBindings);
    }

    public function testCreate()
    {
        $this->user->create($this->userBindings);
        $this->userID = $this->user->getBy('name', $this->userBindings['name'])['data'][0]['id'];
        $this->calID = $this->cal->getBy('person_id', $this->userID)['data'][0]['id'];
        $this->bindings['calendar_id'] = $this->calID;

        $result = $this->stub->create(
            $this->bindings,
            $this->infoBindings,
            $this->recBindings
        );
        $this->assertTrue($result['success']);
    }

    /**
    * @depends testCreate
    */
    public function testGetBy()
    {
        $result = $this->stub->getBy(
            'summary',
            $this->infoBindings['summary']
        )['data'][0];
        $this->assertEquals($result['description'], $this->bindings['description']);
        $this->assertEquals($result['summary'], $this->infoBindings['summary']);
        $this->assertEquals($result['freq'], $this->recBindings['freq']);

        $result = $this->stub->getBy('summary', 'ERROR');
        $this->assertFalse($result['success']);
    }

    /**
    * @depends testCreate
    * @depends testGetBy
    */
    public function testGet()
    {
        $data = $this->stub->getBy(
            'summary',
            $this->infoBindings['summary']
        )['data'][0];
        $result = $this->stub->get($data['id'])['data'][0];

        $this->assertEquals($result['id'], $data['id']);
        $this->assertEquals($result['description'], $this->bindings['description']);
        $this->assertEquals($result['summary'], $this->infoBindings['summary']);
        $this->assertEquals($result['freq'], $this->recBindings['freq']);

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
        $result = $this->stub->getBy('summary', $this->infoBindings['summary'])['data'][0];
        $result = $this->stub->update($result['id'], $updateBindings);
        $this->assertGreaterThanOrEqual(1, $result['data']);

        $result = $this->stub->getBy('summary', $this->infoBindings['summary'])['data'][0];
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
        $data = $this->stub->getBy('summary', $this->infoBindings['summary'])['data'][0];
        $result = $this->stub->delete($data['id']);
        $this->assertGreaterThanOrEqual(1, $result['data']);
        $result = $this->stub->delete($data['id']);
        $this->assertEquals($result['data'], 0);
    }

    /**
    * @depends testCreate
    * @depends testDelete
    */
    public function testGetAll()
    {
        $bindings1 = array(
            'event'=>array('calendar_id'=>$this->calID, 'description'=>'a1'),
            'info'=>array('summary'=>'c1', 'note'=>'d1'),
            'rec'=>array('freq'=>'hourly', 'repeat_interval'=>1)
        );
        $bindings2 = array(
            'event'=>array('calendar_id'=>$this->calID, 'description'=>'a2'),
            'info'=>array('summary'=>'c2', 'note'=>'d2'),
            'rec'=>array('freq'=>'daily', 'repeat_interval'=>5)
        );
        $bindings3 = array(
            'event'=>array('calendar_id'=>$this->calID, 'description'=>'a3'),
            'info'=>array('summary'=>'c3', 'note'=>'d3'),
            'rec'=>array('freq'=>'weekly', 'repeat_interval'=>5)
        );

        $this->stub->create($bindings1['event'], $bindings1['info'], $bindings1['rec']);
        $this->stub->create($bindings2['event'], $bindings2['info'], $bindings2['rec']);
        $this->stub->create($bindings3['event'], $bindings3['info'], $bindings3['rec']);

        $result = $this->stub->getAll(
            array(),
            array(),
            'repeat_interval > 1',
            'summary'
        )['data'];
        $this->assertEquals($result[0]['summary'], $bindings2['info']['summary']);
        $this->assertEquals($result[1]['summary'], $bindings3['info']['summary']);
        $this->assertFalse(isset($result[2]));

        $result = $this->stub->getBy('summary', $bindings1['info']['summary'])['data'][0];
        $this->stub->delete($result['id']);
        $result = $this->stub->getBy('summary', $bindings2['info']['summary'])['data'][0];
        $this->stub->delete($result['id']);
        $result = $this->stub->getBy('summary', $bindings3['info']['summary'])['data'][0];
        $this->stub->delete($result['id']);

        $this->user->delete($this->userID);
    }
}
