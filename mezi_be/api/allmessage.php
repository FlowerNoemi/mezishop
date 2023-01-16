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


class Messages
{
    public $id;
    public $email;
    public $message;
    public $date;


    function __construct($id, $email, $message, $date)
    {
        $this->id = $id;
        $this->email = $email;
        $this->message = $message;
        $this->date = $date;
    }
}


$response = array();



try {
    $stmt = $dbo->prepare("SELECT id, email,msg,date  FROM messagetb ORDER BY date DESC");
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_ASSOC);

    $i = 0;

    while ($row = $stmt->fetch()) {
        $message = new Messages($row["id"], $row["email"], $row["msg"], $row["date"]);
        $response[$i++] = $message;
    }
} catch (PDOException $e) {
    $response["error"] = $e->getMessage();
    json_encode($response);
}

echo json_encode($response);
