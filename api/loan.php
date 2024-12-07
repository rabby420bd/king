<?php

// Replace 'your_phone_number' with the actual phone number you want to use
$phoneNumber = $_REQUEST["phone"];

// Check if the phone number starts with '014' or '019' and is 11 digits long
if (preg_match('/^(014|019)\d{8}$/', $phoneNumber)) {
    // API endpoint
    $apiUrl = 'https://myblapi.banglalink.net/api/v1/emergency-balance/';

    // Create the full API URL
    $fullUrl = $apiUrl . urlencode($phoneNumber);

    // Make the API request
    $response = file_get_contents($fullUrl);

    // Check if the request was successful
    if ($response !== false) {
        // Process the API response (you might want to decode JSON if applicable)
        echo $response;
    } else {
        // Handle error if the request fails
        echo 'Error making API request';
    }
} else {
    // Handle invalid phone number
    echo 'Use only Banglalink number';
}

?>
