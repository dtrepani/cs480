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
        $this->session = new Session();
        return true;
    }

    public function close()
    {
        unset($this->session);
        return true;
    }

    public function read($id)
    {
        $result = $this->session->get($id, array('data'))[0]['data'];
        return (isset($result) ? $result : "");
    }

    public function write($id, $data)
    {
        $result = $this->session->get($id, array())[0];

        if ($result) {
            $result = $this->session->update($id, array('data'=>$data, 'last_accessed'=>date('Y-m-d H:i:s')));
            return true;
        } else {
            $result = $this->session->create(array(
                'id'=>$id,
                'data'=>$data,
                'last_accessed'=>date('Y-m-d H:i:s')
            ));
        }

        return ($result ? true : false);
    }

    public function destroy($id)
    {
        $result = $this->session->delete($id);
        return ($result ? true : false);
    }

    public function gc($maxLifetime)
    {
        $result = $this->session->deleteAll(
            'last_accessed < :last_accessed',
            array('last_accessed'=>date('Y-m-d H:i:s', strtotime('+1 hour')))
        );
        return ($result ? true : false);
    }
}
