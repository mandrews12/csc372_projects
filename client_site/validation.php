<?php
function validateText($text, $min, $max) {
    $length = strlen(trim($text));
    return ($length >= $min && $length <= $max);
}

function validateNumber($num, $min, $max) {
    return is_numeric($num) && $num >= $min && $num <= $max;
}

function validateOption($value, $allowed) {
    return in_array($value, $allowed);
}
?>