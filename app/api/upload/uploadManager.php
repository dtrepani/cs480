<?php
namespace SP\App\Api\Upload;

require_once 'Upload.php';
use SP\App\Api\Upload\Upload;

$request = json_decode(file_get_contents('php://input'), true);

echo json_encode(Upload::uploadFile());
