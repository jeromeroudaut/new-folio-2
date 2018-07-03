<?php

namespace Engine\Bundle\File;

class FileUnknowExt {

    public static function path ($pathWithoutExt) {
        return self::get('path', $pathWithoutExt, false);
    }

    public static function pathExternal ($pathWithoutExt) {
        return self::get('path', $pathWithoutExt, true);
    }

    public static function ext ($pathWithoutExt) {
        return self::get('ext', $pathWithoutExt, false);
    }

    public static function delete ($pathWithoutExt) {
        $relativePathWithoutExt = self::getRelativePath($pathWithoutExt);
        $filePath = self::path($relativePathWithoutExt);
        if($filePath && file_exists($filePath)) {
            unlink(ROOT . self::path($relativePathWithoutExt));
        }
    }

    private static function get ($return, $pathWithoutExt, $newRoot) {
        $relativePathWithoutExt = self::getRelativePath($pathWithoutExt);

        if ($newRoot === true) {
            $glob = glob(IMG_ROOT . $pathWithoutExt . '.*');
        } else {
            $glob = glob(ROOT . $relativePathWithoutExt . '.*');
        }
        $file = sizeof($glob) > 0 ? $glob[0] : null;

        if(is_null($file)) {
            return false;
        } else {
            $fileExt = pathinfo($file, PATHINFO_EXTENSION);
            if($return === 'ext') {
                return $fileExt;
            } else if ($newRoot) {
                return IMG_PATH . $pathWithoutExt . '.' . $fileExt;
            } else {
                return $pathWithoutExt . '.' . $fileExt;
            }
        }
    }

    private static function getRelativePath ($pathWithoutExt) {
        return substr($pathWithoutExt, 0, 1) === '/' ? substr($pathWithoutExt, 1) : $pathWithoutExt;
    }

}
