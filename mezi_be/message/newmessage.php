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

if (isset($_POST["email"]) and isset($_POST["message"])) {
    $email = $_POST["email"];
    $message = $_POST["message"];

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response["message"] = "Kérem, használjon megfelelő e-mail címet";
        $response["code"] = "-1";
    } else if (strlen($message) < 3) {
        $response["message"] = "Túl rövid üzenet";
        $response["code"] = "-1";
    } else {
        try {
            $stmt = $dbo->prepare("INSERT INTO messagetb(email,msg) VALUES (:email, :message)");
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt->bindParam(':message', $message, PDO::PARAM_STR);
            $stmt->execute();
            $response["message"] = "Sikeres üzenet küldés";
            $response["code"] = "1";
        } catch (PDOException $e) {
            $response["error"] = $e->getMessage();
            echo json_encode($response);
        }
    }
} else {
    $response["message"] = "Hibás adatküldés";
    $response["code"] = "-1";
}

echo json_encode($response);
