<?php
namespace SP\Test\Unit\Api\User;

require_once __DIR__.'/../../../../app/api/user/User.php';
require_once __DIR__.'/../../../../app/api/activity/calendar/Calendar.php';
require_once __DIR__.'/../../../../app/api/activity/task/Label.php';
use SP\App\Api\User\User;
use SP\App\Api\Activity\Calendar\Calendar;
use SP\App\Api\Activity\Task\Label;

class UserTest extends \PHPUnit_Framework_TestCase
{
    protected function setUp()
    {
        $this->user = new User();
        $this->calendar = new Calendar();
        $this->label = new Label();
        $this->bindings = array('name'=>'a', 'password'=>'b', 'email'=>'c');
    }

    protected function tearDown()
    {
        unset($this->user);
        unset($this->calendar);
        unset($this->label);
        unset($this->bindings);
    }

    public function testCreate()
    {
        $result = $this->user->create($this->bindings);
        $this->assertTrue($result['success']);
        $result = $this->user->create($this->bindings);
        $this->assertFalse($result['success']);

        $user = $this->user->getBy('name', $this->bindings['name'])['data'][0];

        $result = $this->calendar->getBy('person_id', $user['id'])['data'][0];
        $this->assertEquals($result['person_id'], $user['id']);
        $this->assertEquals($result['name'], 'Calendar');

        $result = $this->label->getBy('person_id', $user['id'])['data'][0];
        $this->assertEquals($result['person_id'], $user['id']);
        $this->assertEquals($result['name'], 'Inbox');
    }

    /**
    * @depends testCreate
    */
    public function testDeleteUser()
    {
        $user = $this->user->getBy('name', $this->bindings['name'])['data'][0];
        $this->user->delete($user['id']);

        $result = $this->calendar->getBy('person_id', $user['id']);
        $this->assertFalse($result['success']);
        $result = $this->label->getBy('person_id', $user['id']);
        $this->assertFalse($result['success']);
    }
}
