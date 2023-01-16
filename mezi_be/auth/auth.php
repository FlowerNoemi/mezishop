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



if ($_SERVER['REQUEST_METHOD'] === 'POST' && empty($_POST)) {
    $_POST = json_decode(file_get_contents('php://input'), true);
}

$response = array();

if (isset($_POST["email"]) and isset($_POST["password"])) {
    $email = $_POST["email"];
    $password = $_POST["password"];

    try {

        if (email_exists($email, $dbo)) {
            $stmt = $dbo->prepare("SELECT password,id FROM users WHERE users.email LIKE :email");
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $data = $stmt->fetchAll();


            $pwd_hash = $data[0]['password'];
            $id =  $data[0]["id"];
            if (password_verify($password, $pwd_hash)) {


                try {
                    $stmt = $dbo->prepare("SELECT code, users.id, accsesToken  FROM `level_user` INNER JOIN level ON `level_id` = level.id INNER JOIN users ON `user_id` = users.id  WHERE users.id LIKE :id ");
                    $stmt->bindParam(':id', $id, PDO::PARAM_STR);

                    $stmt->execute();
                    $stmt->setFetchMode(PDO::FETCH_ASSOC);
                    $data = $stmt->fetchAll();

                    $i = 0;


                    while ($i < sizeof($data)) {
                        $datalevel = $data[$i]["code"];
                        $userid = $data[$i]["id"];
                        $accesstoken = $data[$i]["accsesToken"];
                        $responsecode[$i++] =  $datalevel;
                    }

                    $response["accsesToken"] = $accesstoken;
                    $response["message"] = "Sikeres Bejelentkezés..";
                    $response["code"] = "1";
                    $response["roles"] = $responsecode;
                    setcookie($email, $accesstoken, time() + 3600);
                } catch (PDOException $e) {
                    $response["error"] = $e->getMessage();
                    echo json_encode($response);
                }
            } else {
                $response["message"] = "Rossz jelszó vagy email!";
                $response["code"] = "-1";
                http_response_code(401);
            }
        } else {
            $response["message"] = "Email cím  nem regisztrált ";
            $response["code"] = "-1";
            http_response_code(401);
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
