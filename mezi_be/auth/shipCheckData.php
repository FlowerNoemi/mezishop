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


if (isset($_POST["id"]) and isset($_POST["email"])) {
    $id = $_POST["id"];
    $email = $_POST["email"];

    $vname = $_POST["vname"];
    $kname = $_POST["kname"];
    $iranyito = $_POST["iranyito"];
    $cim = $_POST["cim"];
    $varos = $_POST["varos"];
    $telefon = $_POST["telefon"];
    $vname2 = $_POST["vname2"];
    $kname2 = $_POST["kname2"];
    $iranyito2 = $_POST["iranyito2"];
    $cim2 = $_POST["cim2"];
    $varos2 = $_POST["varos2"];
    $telefon2 = $_POST["telefon2"];

    try {
        if (isset($_POST["shipid"])) {
            $shipid = $_POST["shipid"];
            $stmt = $dbo->prepare("UPDATE shippingdata SET vname1 = :vname, kname1 = :kname, iranyitoszam = :iranyito , varos = :varos,  cim = :cim, telefonszam = :telefon WHERE shipid LIKE :shipid");
            $stmt->bindParam(':shipid', $shipid, PDO::PARAM_INT);
            $stmt->bindParam(':vname', $vname, PDO::PARAM_STR);
            $stmt->bindParam(':kname', $kname, PDO::PARAM_STR);
            $stmt->bindParam(':iranyito', $iranyito, PDO::PARAM_STR);
            $stmt->bindParam(':varos', $varos, PDO::PARAM_STR);
            $stmt->bindParam(':cim', $cim, PDO::PARAM_STR);
            $stmt->bindParam(':telefon', $telefon, PDO::PARAM_STR);

            $stmt->execute();
            $response["message"] = "Sikeres frissítés";
            $response["code"] = "1";
        } else {
            $stmt = $dbo->prepare("INSERT INTO shippingdata(user_id, iranyitoszam, varos, cim, telefonszam, vname1, kname1) VALUES (:id,:iranyito, :varos, :cim, :telefon, :vname, :kname)");
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->bindParam(':vname', $vname, PDO::PARAM_STR);
            $stmt->bindParam(':kname', $kname, PDO::PARAM_STR);
            $stmt->bindParam(':iranyito', $iranyito, PDO::PARAM_STR);
            $stmt->bindParam(':varos', $varos, PDO::PARAM_STR);
            $stmt->bindParam(':cim', $cim, PDO::PARAM_STR);
            $stmt->bindParam(':telefon', $telefon, PDO::PARAM_STR);
            $stmt->execute();
            $response["message"] = "Sikeres feltöltés";
            $response["code"] = "1";
        }
        if (isset($_POST["checkid"])) {
            $checkid = $_POST["checkid"];
            $stmt = $dbo->prepare("UPDATE checkdata SET vname2 = :vname2, kname2 = :kname2, iranyitoszam2 = :iranyito2 , varos2 = :varos2,  cim2 = :cim2, telefonszam2 = :telefon2 WHERE checkid  LIKE :checkid");
            $stmt->bindParam(':checkid', $checkid, PDO::PARAM_INT);
            $stmt->bindParam(':vname2', $vname2, PDO::PARAM_STR);
            $stmt->bindParam(':kname2', $kname2, PDO::PARAM_STR);
            $stmt->bindParam(':iranyito2', $iranyito2, PDO::PARAM_STR);
            $stmt->bindParam(':varos2', $varos2, PDO::PARAM_STR);
            $stmt->bindParam(':cim2', $cim2, PDO::PARAM_STR);
            $stmt->bindParam(':telefon2', $telefon2, PDO::PARAM_STR);

            $stmt->execute();
            $response["message"] = "Sikeres frissítés";
            $response["code"] = "1";
        } else {
            $stmt = $dbo->prepare("INSERT INTO checkdata(user_id, iranyitoszam2, varos2, cim2, telefonszam2, vname2, kname2) VALUES (:id,:iranyito2, :varos2, :cim2, :telefon2, :vname2, :kname2)");
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->bindParam(':vname2', $vname2, PDO::PARAM_STR);
            $stmt->bindParam(':kname2', $kname2, PDO::PARAM_STR);
            $stmt->bindParam(':iranyito2', $iranyito2, PDO::PARAM_STR);
            $stmt->bindParam(':varos2', $varos2, PDO::PARAM_STR);
            $stmt->bindParam(':cim2', $cim2, PDO::PARAM_STR);
            $stmt->bindParam(':telefon2', $telefon2, PDO::PARAM_STR);
            $stmt->execute();
            $response["message"] = "Sikeres feltöltés";
            $response["code"] = "1";
        }
    } catch (PDOException $e) {
        $response["error"] = $e->getMessage();
        echo json_encode($response);
    }
} else {
    $response["message"] = "Hibás adatok vannak";
    $response["code"] = "-1";
}

echo json_encode($response);
