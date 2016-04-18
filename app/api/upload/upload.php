<?php
namespace SP\App\Api\Upload;

class Upload
{
    /**
    * @return mixed[]   Whether or not file uploaded with the relative file path if
    *                   it did or an error message if it did not.
    */
    public static function uploadFile()
    {
        $uploadPath = "files/";
        $relativePath = "api/upload/files/";
        $maxFileSize = 2 * 1024 * 1024;

        $validationInfo = self::isValidFile($maxFileSize);
        if (!$validationInfo['success']) {
            return $validationInfo;
        }

        $fileName = self::getUniqueFileName();

        if (move_uploaded_file($_FILES['file']['tmp_name'], "{$uploadPath}{$fileName}")) {
            return array(
                'success'=>true,
                'data'=>"{$relativePath}{$fileName}"
            );
        }

        return array(
            'success'=>false,
            'title'=>"Upload on move failed with error {$_FILES['file']['error']}."
        );
    }

    /**
    * For security reasons and to prevent overlapping file names, generate a
    * unique file name.
    * TODO: Find better solution besides spinlock.
    * @return string
    */
    private static function getUniqueFileName()
    {
        $fileName = uniqid();
        while (true) {
            if (!file_exists(sys_get_temp_dir() . $fileName)) {
                break;
            }
            $fileName = uniqid();
        }
        $ext = $_FILES['file']['type'] === 'image/png' ? '.png' : '.jpg';
        return "{$fileName}{$ext}";
    }

    /**
    * Security checks. File must be a JPEG or PNG image under 2MB.
    * @param  int     $maxFileSize
    * @return mixed[] Whether or not file is a valid file and error message if it's not.
    */
    private static function isValidFile($maxFileSize)
    {
        if ($_FILES['file']['error'] !== UPLOAD_ERR_OK) {
            return array(
                'success'=>false,
                'title'=>"Upload failed with error {$_FILES['file']['error']}."
            );
        }

        if ($_FILES['file']['size'] > $maxFileSize) {
            return array(
                'success'=>false,
                'title'=>'File must be less than ' . ($maxFileSize / 1024 / 1024) . 'MB.',
                'message'=>"File was {$_FILES['file']['size']} and max file size is {$maxFileSize}."
            );
        }

        $fileInfo = getimagesize($_FILES['file']['tmp_name']);
        if (!$fileInfo || $fileInfo[0] === 0) {
            return array(
                'success'=>false,
                'title'=>'File must be an image.'
            );
        }

        if ($fileInfo[2] !== IMAGETYPE_PNG && $fileInfo[2] !== IMAGETYPE_JPEG) {
            return array(
                'success'=>false,
                'title'=>'File must be a JPEG or PNG.',
                'message'=>"File type was {$fileInfo[2]}."
            );
        }

        return array('success'=>true);
    }
}
