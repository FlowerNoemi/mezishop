<?php
header("Set-Cookie: cross-site-cookie=whatever; SameSite=None; Secure");
header("Content-Type:application/json");
header('Access-Control-Allow-Origin:*');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');


require "../assets/connection.php";

class Products
{
    public $id;
    public $termeknev;
    public $db;
    public $ar;
    public $img;

    function __construct($id, $termeknev, $db, $ar, $img,)
    {
        $this->id = $id;
        $this->termeknev = $termeknev;
        $this->db = $db;
        $this->ar = $ar;
        $this->img = $img;
    }
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

        $statusvar = "folyamatban";

        $stmt = $dbo->prepare("SELECT * FROM rendeles INNER JOIN orderstatus ON orderstatus.id = rendeles.orderid WHERE rendeles.userid LIKE :id and orderstatus.status LIKE  :status ");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':status', $statusvar, PDO::PARAM_STR);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        $i = 0;

        while ($row = $stmt->fetch()) {
            $product = new Products($row["termekid"], $row["termeknev"], $row["db"], $row["ar"], $row["img"], $row["status"],);
            $response[$i++] = $product;
        }
    } catch (PDOException $e) {
        $response["error"] = $e->getMessage();
        json_encode($response);
    }
} else {
    $response["message"] = "Hibás adatok";
    $response["code"] = "-1";
}

echo json_encode($response);
