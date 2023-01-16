<?php
header("Set-Cookie: cross-site-cookie=whatever; SameSite=None; Secure");
header("Content-Type:application/json");
header('Access-Control-Allow-Origin:*');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

require "../assets/connection.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET' && empty($_GET)) {
    $_POST = json_decode(file_get_contents('php://input'), true);
}

$response = array();

if (isset($_GET["email"])) {
    $email = $_GET["email"];
    try {
        $stmt = $dbo->prepare("SELECT id FROM users WHERE users.email LIKE :email");
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $data = $stmt->fetchAll();

        $id =  $data[0]["id"];



        $stmt2 = $dbo->prepare("SELECT shipid, kname1,vname1,iranyitoszam,varos,cim,telefonszam FROM users LEFT JOIN shippingdata ON `user_id` = users.id  WHERE users.id LIKE :id ");

        $stmt2->bindParam(':id', $id, PDO::PARAM_STR);
        $stmt2->execute();
        $stmt2->setFetchMode(PDO::FETCH_ASSOC);
        $data2 = $stmt2->fetchAll();

        $j = 0;


        while ($j < sizeof($data2)) {
            $shipid = $data2[$j]["shipid"];
            $userkname = $data2[$j]["kname1"];
            $uservname = $data2[$j]["vname1"];
            $iranyito = $data2[$j]["iranyitoszam"];
            $varos = $data2[$j]["varos"];
            $cim = $data2[$j]["cim"];
            $telefonszam = $data2[$j]["telefonszam"];
            $j++;
        }


        $stmt3 = $dbo->prepare("SELECT checkid,kname2,vname2,iranyitoszam2,varos2,cim2,telefonszam2 FROM users LEFT JOIN checkdata ON `user_id` = users.id  WHERE users.id LIKE :id ");

        $stmt3->bindParam(':id', $id, PDO::PARAM_STR);
        $stmt3->execute();
        $stmt3->setFetchMode(PDO::FETCH_ASSOC);
        $data3 = $stmt3->fetchAll();

        $k = 0;


        while ($k < sizeof($data3)) {
            $checkid = $data3[$k]["checkid"];
            $userkname2 = $data3[$k]["kname2"];
            $uservname2 = $data3[$k]["vname2"];
            $iranyito2 = $data3[$k]["iranyitoszam2"];
            $varos2 = $data3[$k]["varos2"];
            $cim2 = $data3[$k]["cim2"];
            $telefonszam2 = $data3[$k]["telefonszam2"];
            $k++;
        }

        $response["kname"] = $userkname;
        $response["vname"] = $uservname;
        $response["shipid"] = $shipid;
        $response["checkid"] = $checkid;
        $response["id"] = $id;
        $response["iranyito"] = $iranyito;
        $response["varos"] = $varos;
        $response["cim"] = $cim;
        $response["telefon"] = $telefonszam;
        $response["kname2"] = $userkname2;
        $response["vname2"] = $uservname2;
        $response["iranyito2"] = $iranyito2;
        $response["varos2"] = $varos2;
        $response["cim2"] = $cim2;
        $response["telefon2"] = $telefonszam2;
    } catch (PDOException $e) {
        $response["error"] = $e->getMessage();
        echo json_encode($response);
    }
} else {
    $response["message"] = "Helytelen adatmegadás...";
    $response["code"] = "-1";
}

echo json_encode($response);
