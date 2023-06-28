<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$servername = "localhost"; //remote: 89.117.139.154
$database = "u110901728_cpdb";
$username = "u110901728_cryptopols";
$password = "#c2tiQCVeNnnDRcSpP";

$conn = mysqli_connect($servername, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT * FROM congress_letters ORDER BY date DESC, prim_signer_id";
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