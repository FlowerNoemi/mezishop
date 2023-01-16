<?php
header("Set-Cookie: cross-site-cookie=whatever; SameSite=None; Secure");
header("Content-Type:application/json");
header('Access-Control-Allow-Origin:*');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

require "../assets/connection.php";

$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && empty($_POST)) {
    $_POST = json_decode(file_get_contents('php://input'), true);
}


if (isset($_POST["id"]) and isset($_POST["shipid"]) and isset($_POST["checkid"])) {
    $id = $_POST["id"];
    $shipid = $_POST["shipid"];
    $checkid = $_POST["checkid"];
    $comment = $_POST["comment"];
    $adoszam = $_POST["adoszam"];
    $EUadoszam = $_POST["EUadoszam"];
    $adozo = $_POST["adozo"];
    $szallitas = $_POST["szallitas"];
    $fizetes = $_POST["fizetes"];
    $total = $_POST["total"];

    try {
        $stmt = $dbo->prepare("INSERT INTO finishorder(orderid, checkId, shippingId, adozo, pay, shipping, adoszam, EUadoszam, comment, total) VALUES (:id,:checkid, :shipid, :adozo, :fizetes, :szallitas, :adoszam, :EUadoszam, :comment, :total)");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':checkid', $checkid, PDO::PARAM_INT);
        $stmt->bindParam(':shipid', $shipid, PDO::PARAM_INT);
        $stmt->bindParam(':adozo', $adozo, PDO::PARAM_STR);
        $stmt->bindParam(':fizetes', $fizetes, PDO::PARAM_STR);
        $stmt->bindParam(':szallitas', $szallitas, PDO::PARAM_STR);
        $stmt->bindParam(':adoszam', $adoszam, PDO::PARAM_STR);
        $stmt->bindParam(':EUadoszam', $EUadoszam, PDO::PARAM_STR);
        $stmt->bindParam(':comment', $comment, PDO::PARAM_STR);
        $stmt->bindParam(':total', $total, PDO::PARAM_INT);
        $stmt->execute();

        $status = "kiszállításra vár";
        $stmt2 = $dbo->prepare("UPDATE orderstatus SET status = :status WHERE id LIKE :id");
        $stmt2->bindParam(':status', $status, PDO::PARAM_STR);
        $stmt2->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt2->execute();
        $response["message"] = "Sikeres megrendelés";
        $response["code"] = "1";
    } catch (PDOException $e) {
        $response["error"] = $e->getMessage();
        echo json_encode($response);
    }
} else {
    $response["message"] = "Hibás adatok vannak";
    $response["code"] = "-1";
}

echo json_encode($response);
