<?php

// API request script by Kingi Charles

$url = 'https://hs-consumer-api.espncricinfo.com/v1/edition/details?lang=en&edition=bd&navigation=true&trendingMatches=true&keySeriesItems=true';

$ch = curl_init($url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo 'Error: ' . curl_error($ch);
}

curl_close($ch);

echo $response;

?>
