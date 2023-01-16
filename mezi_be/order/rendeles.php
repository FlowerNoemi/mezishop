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


if (isset($_POST["email"]) and isset($_POST["userid"]) and isset($_POST["termekid"]) and isset($_POST["termeknev"]) and isset($_POST["db"]) and isset($_POST["ar"]) and isset($_POST["img"])) {

    $email = $_POST["email"];
    $userid = $_POST["userid"];
    $termekid = $_POST["termekid"];
    $termeknev = $_POST["termeknev"];
    $db = $_POST["db"];
    $ar = $_POST["ar"];
    $img = $_POST["img"];
    $status = "folyamatban";

    try {
        $stmt = $dbo->prepare("SELECT * FROM orderstatus WHERE userid LIKE :userid and status LIKE :status");
        $stmt->bindParam(':userid', $userid, PDO::PARAM_INT);
        $stmt->bindParam(':status', $status, PDO::PARAM_STR);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $data = $stmt->fetchAll();
        if (!empty($data[0])) {
            $orderid =  $data[0]["id"];
            $alapot =  $data[0]["status"];
        }
    } catch (PDOException $e) {
        $response["error"] = $e->getMessage();
        echo json_encode($response);
    }

    if ((!empty($data[0]["status"]) and $data[0]["status"] == "folyamatban")) {
        $stmt1 = $dbo->prepare("SELECT id, termekid, userid,orderid FROM rendeles WHERE userid LIKE :userid and termekid LIKE :termekid and orderid LIKE :orderid");
        $stmt1->bindParam(':termekid', $termekid, PDO::PARAM_INT);
        $stmt1->bindParam(':userid', $userid, PDO::PARAM_INT);
        $stmt1->bindParam(':orderid', $orderid, PDO::PARAM_INT);
        $stmt1->execute();
        $stmt1->setFetchMode(PDO::FETCH_ASSOC);
        $data1 = $stmt1->fetchAll();
        try {

            if ((!empty($data1)) and ($data[0]["status"] == "folyamatban") and ($data1[0]["orderid"] == $orderid)) {
                $stmt = $dbo->prepare("UPDATE rendeles SET db = :db WHERE userid LIKE :userid and termekid LIKE :termekid and orderid LIKE :orderid ");
                $stmt->bindParam(':db', $db, PDO::PARAM_INT);
                $stmt->bindParam(':userid', $userid, PDO::PARAM_INT);
                $stmt->bindParam(':orderid', $orderid, PDO::PARAM_INT);
                $stmt->bindParam(':termekid', $termekid, PDO::PARAM_INT);

                $stmt->execute();

                $response["message"] = "Sikeres frissítés";
                $response["code"] = "1";
            } else {

                $stmt = $dbo->prepare("INSERT INTO rendeles(email, userid, termekid, termeknev, db, ar, img, orderid) VALUES (:email, :userid, :termekid, :termeknev, :db, :ar, :img,  :orderid )");
                $stmt->bindParam(':email', $email, PDO::PARAM_STR);
                $stmt->bindParam(':userid', $userid, PDO::PARAM_INT);
                $stmt->bindParam(':termekid', $termekid, PDO::PARAM_INT);
                $stmt->bindParam(':termeknev', $termeknev, PDO::PARAM_STR);
                $stmt->bindParam(':db', $db, PDO::PARAM_INT);
                $stmt->bindParam(':ar', $ar, PDO::PARAM_INT);
                $stmt->bindParam(':img', $img, PDO::PARAM_STR);
                $stmt->bindParam(':orderid', $orderid, PDO::PARAM_INT);
                $stmt->execute();
                $response["message"] = "Termék kosárhoz adva";
                $response["code"] = "1";
            }
        } catch (PDOException $e) {
            $response["error"] = $e->getMessage();
            echo json_encode($response);
        }
    } else {

        try {
            $stmt = $dbo->prepare("INSERT INTO orderstatus (userid, email, status) VALUES (:userid, :email, :status )");
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt->bindParam(':userid', $userid, PDO::PARAM_INT);
            $stmt->bindParam(':status', $status, PDO::PARAM_STR);
            $stmt->execute();


            $stmt = $dbo->prepare("SELECT * FROM orderstatus WHERE userid LIKE :userid and status LIKE :status");
            $stmt->bindParam(':userid', $userid, PDO::PARAM_INT);
            $stmt->bindParam(':status', $status, PDO::PARAM_STR);
            $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $data = $stmt->fetchAll();


            $alapot =  $data[0]["status"];
            $orderid =  $data[0]["id"];


            $stmt1 = $dbo->prepare("SELECT id, termekid, userid, orderid FROM rendeles WHERE userid LIKE :userid and termekid LIKE :termekid and orderid LIKE :orderid ");
            $stmt1->bindParam(':termekid', $termekid, PDO::PARAM_INT);
            $stmt1->bindParam(':userid', $userid, PDO::PARAM_INT);
            $stmt1->bindParam(':orderid', $orderid, PDO::PARAM_INT);
            $stmt1->execute();
            $stmt1->setFetchMode(PDO::FETCH_ASSOC);
            $data1 = $stmt1->fetchAll();
        } catch (PDOException $e) {
            $response["error"] = $e->getMessage();
            echo json_encode($response);
        }
        try {

            if ((!empty($data1)) and ($data[0]["status"] == "folyamatban") and ($data1[0]["orderid"] == $orderid)) {
                $stmt = $dbo->prepare("UPDATE rendeles SET db = :db WHERE userid LIKE :userid and termekid LIKE  :termekid and orderid LIKE :orderid ");
                $stmt->bindParam(':db', $db, PDO::PARAM_INT);
                $stmt->bindParam(':orderid', $orderid, PDO::PARAM_INT);
                $stmt->bindParam(':userid', $userid, PDO::PARAM_INT);
                $stmt->bindParam(':termekid', $termekid, PDO::PARAM_INT);


                $stmt->execute();
                $response["message"] = "Sikeres frissítés";
                $response["code"] = "1";
            } else {
                $stmt = $dbo->prepare("INSERT INTO rendeles(email, userid, termekid, termeknev, db, ar, img, orderid) VALUES (:email, :userid, :termekid, :termeknev, :db, :ar, :img, :orderid)");
                $stmt->bindParam(':email', $email, PDO::PARAM_STR);
                $stmt->bindParam(':userid', $userid, PDO::PARAM_INT);
                $stmt->bindParam(':termekid', $termekid, PDO::PARAM_INT);
                $stmt->bindParam(':termeknev', $termeknev, PDO::PARAM_STR);
                $stmt->bindParam(':db', $db, PDO::PARAM_INT);
                $stmt->bindParam(':ar', $ar, PDO::PARAM_INT);
                $stmt->bindParam(':img', $img, PDO::PARAM_STR);
                $stmt->bindParam(':orderid', $orderid, PDO::PARAM_INT);
                $stmt->execute();
                $response["message"] = "Termék kosárhoz adva";
                $response["code"] = "1";
            }
        } catch (PDOException $e) {
            $response["error"] = $e->getMessage();
            echo json_encode($response);
        }
    }
} else {
    $response["message"] = "Hibás adatok";
    $response["code"] = "-1";
}

echo json_encode($response);
