<?php

// Validate functions
function validateX($xVal) {

    $correctX = array(-5, -4, -3, -2, -1, 0, 1, 2, 3);

    if (!isset($xVal))
        return false;
    $numX = str_replace(',', '.', $xVal);

    if (!in_array($xVal, $correctX)){
        return false;
    }
    return true;
}

function validateY($yVal) {
    $Y_MIN = -3;
    $Y_MAX = 3;

    if (!isset($yVal))
        return false;
    $numY = str_replace(',', '.', $yVal);

    if ($numY < $Y_MIN || $numY > $Y_MAX) {
        return false;
    }
    return is_numeric($numY) && $numY >= $Y_MIN && $numY <= $Y_MAX;
}

function validateR($rVal) {
    $correctR = array(1, 2, 3, 4);


    if (!isset($rVal))
        return false;

    $numR = str_replace(',', '.', $rVal);
    if (!in_array($rVal, $correctR)){
        return false;
    }
    return true;
}

function validateForm($xVal, $yVal, $rVal) {
    return validateX($xVal) && validateY($yVal) && validateR($rVal);
}

// ok
function checkTriangle($x, $y, $r) {
    return $y >= 0 && $x <= 0 &&
        $x >= (-$r) && $y <= ($r/2) && $y <= ($x + 0.5*$r);
}

// ok
function checkSquare($x, $y, $r) {
    return $y <= 0 && $x <= 0 &&
        $x >= -$r && $y >= -$r;
}

// ok
function checkCircle($x, $y, $r) {
    return $x >= 0 && $y >= 0 &&
        ($x*$x + $y*$y) <= $r*$r;
}

function checkHit($x, $y, $r) {
    return checkTriangle($x, $y, $r) || checkSquare($x, $y, $r) ||
        checkCircle($x, $y, $r);
}

// Main logic
$x = $_POST['xval'];
$y = $_POST['yval'];
$r = $_POST['rval'];

date_default_timezone_set("Europe/Moscow");
$timezoneOffset = date("H:i:s");

$isValid = validateForm($x, $y, $r);
if ($isValid) {
    $converted_isValid = $isValid ? 'true' : 'false';
    $isHit = checkHit($x, $y, $r);
    $converted_isHit = $isHit ? 'true' : 'false';

    $currentTime = $timezoneOffset;
    $executionTime = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 7);

    $jsonData = '{' .
        "\"validate\":$converted_isValid," .
        "\"xval\":\"$x\"," .
        "\"yval\":\"$y\"," .
        "\"rval\":\"$r\"," .
        "\"curtime\":\"$currentTime\"," .
        "\"exectime\":\"$executionTime\"," .
        "\"hitres\":$converted_isHit" .
        "}";
    echo $jsonData;

}
else{
    $jsonData = '{' .
        "\"validate\":\"false\"," .
        "\"errorMsg\":\"Wrong value\"," .
        "\"response_code\":\"406\"," .
        "}";
    header(406);
    echo $jsonData;

}

