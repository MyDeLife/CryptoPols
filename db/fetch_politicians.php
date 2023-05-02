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

ini_set('display_errors', 1);
error_reporting(E_ALL);


$sql = "SELECT p.party, p.full_name AS name, p.category AS office, p.district, p.current_sentiment AS cfr
        FROM politicians AS p";

$result = $conn->query($sql);

$politicians = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        if ($row['party'] === 'Democrat') {
            $row['party'] = 'Dem';
        } elseif ($row['party'] === 'Republican') {
            $row['party'] = 'Rep';
        } elseif ($row['party'] === 'Independent') {
            $row['party'] = 'Ind';
        } elseif ($row['party'] === 'Green') {
            $row['party'] = 'Grn';
        }

        if ($row['office'] === 'sen') {
            $row['office'] = 'Senate';
        } elseif ($row['office'] === 'rep') {
            $row['office'] = 'House of Rep.';
        }

        $politicians[] = $row;
    }
} else {
    echo "0 results";
}

echo json_encode($politicians);

$conn->close();
?>


