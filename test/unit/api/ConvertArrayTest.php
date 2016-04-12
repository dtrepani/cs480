<?php
namespace SP\Test\Unit\Api;

require_once __DIR__.'/../../../app/api/ConvertArray.php';

use SP\App\Api\ConvertArray;

class ConvertArrayTest extends \PHPUnit_Framework_TestCase
{
    protected function setUp()
    {
        $this->assocArray = array('a'=>'1', 'b'=>'2', 'c'=>'3');
        $this->emptyArray = array();
        $this->singleArray = array('a', 'b', 'c');
    }

    protected function tearDown()
    {
        unset($this->assocArray);
        unset($this->emptyArray);
        unset($this->singleArray);
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

    public function testToColNameList()
    {
        $this->assertEquals(
            ConvertArray::toColNameList($this->singleArray),
            'a, b, c'
        );
        $this->assertEquals(
            ConvertArray::toColNameList($this->emptyArray),
            '*'
        );
    }

    public function testToKeyValueList()
    {
        $lists = ConvertArray::toKeyValueList($this->assocArray);
        $this->assertEquals($lists['keys'], 'a, b, c');
        $this->assertEquals($lists['values'], '1, 2, 3');
    }

    public function testToQueryLists()
    {
        $lists = ConvertArray::toQueryLists($this->assocArray);
        $this->assertEquals($lists['columns'], 'a, b, c');
        $this->assertEquals($lists['bindings'], ':a, :b, :c');
    }
}
