<?php
namespace SP\App\Api\Session;

require_once 'Session.php';

class SessionHandler implements \SessionHandlerInterface
{
    protected $session;

    public function __construct($session = null)
    {
        $this->session = $session;
    }

    public function open($savePath, $sessionName)
    {
        if (!isset($this->session)) {
            $this->session = new Session();
        }
        return true;
    }

    public function close()
    {
        unset($this->session);
        return true;
    }

    public function read($id)
    {
        $result = $this->session->get($id, array('data'));
        return ($result['success'] && !empty($result['data']) ? $result['data'][0]['data'] : "");
    }

    public function write($id, $data)
    {
        $result = $this->session->get($id, array());

        if ($result['success']) {
            $result = $this->session->update($id, array('data'=>$data, 'last_accessed'=>date('Y-m-d H:i:s')));
        } else {
            $result = $this->session->create(array(
                'id'=>$id,
                'data'=>$data,
                'last_accessed'=>date('Y-m-d H:i:s')
            ));
        }

        return $result['success'];
    }

    public function destroy($id)
    {
        $result = $this->session->delete($id);
        return $result['success'];
    }

    public function gc($maxLifetime)
    {
        $result = $this->session->deleteWhere(
            'last_accessed < :last_accessed',
            array('last_accessed'=>date('Y-m-d H:i:s', strtotime('+1 hour')))
        );
        return $result['success'];
    }
}
