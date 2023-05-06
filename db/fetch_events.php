<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$servername = "89.117.139.154"; //remote: 89.117.139.154
$database = "u110901728_cpdb";
$username = "u110901728_cryptopols";
$password = "YWtgaBomQ8%oRpgjNfff5%XU";

$conn = mysqli_connect($servername, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT * FROM events ORDER BY date DESC, politician LIMIT 100";
$result = $conn->query($sql);
$data = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data);

$conn->close();
?>