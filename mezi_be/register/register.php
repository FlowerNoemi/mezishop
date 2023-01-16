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

if (isset($_POST["email"]) and isset($_POST["password"])) {
    $email = $_POST["email"];
    $password = $_POST["password"];

    $bytes = random_bytes(5);

    $accsesToken = bin2hex($bytes);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response["message"] = "Kérem, használjon megfelelő e-mail címet";
        $response["code"] = "-1";
    } else if (strlen($password) < 8) {
        $response["message"] = "Túl rövid jelszó";
        $response["code"] = "-1";
    } else {
        $stmt = $dbo->prepare("SELECT id FROM users WHERE users.email LIKE :email");
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        $data = $stmt->fetchAll();

        if (!sizeof($data) > 0) {
            try {
                $db_password = password_hash($password, PASSWORD_DEFAULT);
                $stmt = $dbo->prepare("INSERT INTO users(email,password,accsesToken) VALUES (:email, :password, :accsesToken)");
                $stmt->bindParam(':email', $email, PDO::PARAM_STR);
                $stmt->bindParam(':password', $db_password, PDO::PARAM_STR);
                $stmt->bindParam(':accsesToken', $accsesToken, PDO::PARAM_STR);

                if ($stmt->execute()) {
                    try {
                        $stmt = $dbo->prepare("SELECT id FROM users WHERE users.email LIKE :email");
                        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
                        $stmt->execute();

                        $stmt->setFetchMode(PDO::FETCH_ASSOC);
                        $data2 = $stmt->fetchAll();
                        $userid = $data2[0]['id'];

                        $stmt = $dbo->prepare("INSERT INTO level_user(level_id, user_id) VALUES (1, :userid)");
                        $stmt->bindParam(':userid', $userid, PDO::PARAM_INT);
                        $stmt->execute();

                        $response["message"] = "Sikeres Regisztráció";
                        $response["code"] = "1";
                    } catch (PDOException $e) {
                        $response["error"] = $e->getMessage();
                        echo json_encode($response);
                    }
                } else {
                    $response["message"] = "Adatbázis hiba";
                    $response["code"] = "-1";
                }
            } catch (PDOException $e) {
                $response["error"] = $e->getMessage();
                echo json_encode($response);
            }
        } else {
            $response["message"] = "Van ilyen regisztrált email cím";
            $response["code"] = "-1";
        }
    }
} else {
    $response["message"] = "Hibás adatok";
    $response["code"] = "-1";
}

echo json_encode($response);
