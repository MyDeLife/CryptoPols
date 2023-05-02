<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$servername = "89.117.139.154"; //remote: 89.117.139.154
$database = "u110901728_cpdb";
$username = "u110901728_cryptopols";
$password = "WoYUn3E*8VcaSaqPt*";

$conn = mysqli_connect($servername, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT state_abbr, current_rating_state, current_sentiment_state FROM states";
$result = $conn->query($sql);

$statesData = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $statesData[] = [
            "id" => "US-" . $row["state_abbr"],
            "value" => $row["current_rating_state"],
            "name" => $row["state_abbr"],
            "sentiment" => $row["current_sentiment_state"]
        ];
    }
} else {
    echo "0 results";
}

echo json_encode($statesData);

$conn->close();
?>