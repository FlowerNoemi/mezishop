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


class Users
{
    public $id;
    public $email;


    function __construct($id, $email)
    {
        $this->id = $id;
        $this->email = $email;
    }
}

$response = array();

try {
    $stmt = $dbo->prepare("SELECT id, email  FROM users");
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_ASSOC);

    $i = 0;

    while ($row = $stmt->fetch()) {
        $user = new Users($row["id"], $row["email"]);
        $response[$i++] = $user;
    }
} catch (PDOException $e) {
    $response["error"] = $e->getMessage();
    json_encode($response);
}


echo json_encode($response);
