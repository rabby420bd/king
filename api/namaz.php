<?php

$url = 'http://api.aladhan.com/v1/timingsByCity?city=Dhaka&country=Bangladesh&method=4';

// Fetch JSON data from the API
$json = file_get_contents($url);

// Decode JSON response
$response = json_decode($json, true);

// Function to convert numbers to Bengali numerals
function convertToBengaliNumerals($number) {
    $bengali_numerals = array(
        '0' => '০',
        '1' => '১',
        '2' => '২',
        '3' => '৩',
        '4' => '৪',
        '5' => '৫',
        '6' => '৬',
        '7' => '৭',
        '8' => '৮',
        '9' => '৯'
    );
    return strtr($number, $bengali_numerals);
}

// Function to convert 24-hour format to 12-hour AM/PM format with Bengali numerals
function convertTo12HourWithBengaliNumerals($time) {
    $time_parts = explode(':', $time);
    $hour = convertToBengaliNumerals($time_parts[0]);
    $minutes = convertToBengaliNumerals($time_parts[1]);
    $am_pm = 'AM';
    if ($time_parts[0] >= 12) {
        $am_pm = 'PM';
    }
    if ($time_parts[0] > 12) {
        $hour = convertToBengaliNumerals($time_parts[0] - 12);
    }
    return $hour . ':' . $minutes . ' ' . $am_pm;
}

// Convert timings to 12-hour format with Bengali numerals and AM/PM
$timings = $response['data']['timings'];
foreach ($timings as $key => $value) {
    $timings[$key] = convertTo12HourWithBengaliNumerals($value);
}

// Update the timings in the response
$response['data']['timings'] = $timings;

// Encode the updated response back to JSON
$updated_json = json_encode($response, JSON_UNESCAPED_UNICODE);

// Output the updated JSON
echo $updated_json;

?>
