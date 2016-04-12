<?php
namespace SP\Test\Unit\Api\Session;

require_once __DIR__.'/../../../../app/api/session/Session.php';
use SP\App\Api\Session\Session;

class SessionTest extends \PHPUnit_Framework_TestCase
{
    protected function setUp()
    {
        $this->session = new Session();
    }

    protected function tearDown()
    {
        unset($this->session);
    }

    public function testSetVar()
    {
    }
}
