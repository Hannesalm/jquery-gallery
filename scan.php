<?php

//$dir = "images/remember";
$dir = $_POST['dir'];

$files = dirToArray($dir);

function dirToArray($dir) {

    $result = array();

    $cdir = scandir($dir);
    foreach ($cdir as $key => $value)
    {
        if (!in_array($value,array(".","..")))
        {
            if (is_dir($dir . DIRECTORY_SEPARATOR . $value))
            {
                $result[$value] = dirToArray($dir . DIRECTORY_SEPARATOR . $value);
            }
            else
            {
                $result[] = $value;
            }
        }
    }

    return $result;
}

function prettyPrint($a) {
    echo "<pre>";
    print_r($a);
    echo "</pre>";
}

//prettyPrint($files);

echo json_encode($files);
