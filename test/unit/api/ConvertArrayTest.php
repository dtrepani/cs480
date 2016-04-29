<?php
namespace SP\Test\Unit\Api;

require_once __DIR__.'/../../../app/api/ConvertArray.php';

use SP\App\Api\ConvertArray;

class ConvertArrayTest extends \PHPUnit_Framework_TestCase
{
    protected function setUp()
    {
        $this->assocArray = array('a'=>'1', 'b'=>'2', 'c'=>'3');
    }

    protected function tearDown()
    {
        unset($this->assocArray);
    }

    public function testAddPrefixToKeys()
    {
        $this->assertEquals(
            ConvertArray::addPrefixToKeys($this->assocArray),
            array(':a'=>'1', ':b'=>'2', ':c'=>'3')
        );
    }

    public function testToBindingSetList()
    {
        $this->assertEquals(
            ConvertArray::toBindingSetList($this->assocArray),
            'a = :a, b = :b, c = :c'
        );
    }

    public function testToKeyValueList()
    {
        $lists = ConvertArray::toKeyValueList($this->assocArray);
        $this->assertEquals($lists['keys'], 'a, b, c');
        $this->assertEquals($lists['values'], '1, 2, 3');
    }

    public function testToSubgroups()
    {
        $bindings = array('location'=>'a', 'summary'=>'b', 'note'=>'c', 'freq'=>'hourly', 'repeat_interval'=>1);

        $subgroups = ConvertArray::toSubgroups($bindings);
        $this->assertArrayHasKey('location', $subgroups['activity']);
        $this->assertArrayHasKey('summary', $subgroups['info']);
        $this->assertArrayHasKey('note', $subgroups['info']);
        $this->assertArrayHasKey('freq', $subgroups['recurrence']);
        $this->assertEquals(count($subgroups['activity']), 1);
        $this->assertEquals(count($subgroups['info']), 2);
        $this->assertEquals(count($subgroups['recurrence']), 2);
    }

    public function testToQueryLists()
    {
        $lists = ConvertArray::toQueryLists($this->assocArray);
        $this->assertEquals($lists['columns'], 'a, b, c');
        $this->assertEquals($lists['bindings'], ':a, :b, :c');
    }
}
