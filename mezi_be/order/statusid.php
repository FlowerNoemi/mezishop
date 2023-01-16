<?php


header("Set-Cookie: cross-site-cookie=whatever; SameSite=None; Secure");
header("Content-Type:application/json");
header('Access-Control-Allow-Origin:*');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
require "../assets/connection.php";
require "../function/function.php";



if ($_SERVER['REQUEST_METHOD'] === 'GET' && empty($_GET)) {
    $_POST = json_decode(file_get_contents('php://input'), true);
}

$response = array();

if (isset($_GET["email"])) {
    $email = $_GET["email"];
    $status = "folyamatban";

    try {
        if ($status == "folyamatban") {
            $stmt = $dbo->prepare("SELECT id FROM orderstatus WHERE email LIKE :email and status LIKE :status");
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt->bindParam(':status', $status, PDO::PARAM_STR);
            $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $data = $stmt->fetchAll();

            $id =  $data[0]["id"];

            $response["id"] = $id;
        } else {
            $response["message"] = "id";
            $response["code"] = "-1";
        }
    } catch (PDOException $e) {
        $response["error"] = $e->getMessage();
        echo json_encode($response);
    }
} else {
    $response["message"] = "Helytelen adatmegadás...";
    $response["code"] = "-1";
}

echo json_encode($response);
