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

if ($_SERVER['REQUEST_METHOD'] === 'GET' && empty($_GET)) {
    $_GET = json_decode(file_get_contents('php://input'), true);
}
class Products
{
    public $id;
    public $termeknev;
    public $db;
    public $ar;
    public $orderid;
    public $userid;

    function __construct($id, $termeknev, $db, $ar, $orderid, $userid)
    {
        $this->id = $id;
        $this->termeknev = $termeknev;
        $this->db = $db;
        $this->ar = $ar;
        $this->orderid = $orderid;
        $this->userid = $userid;
    }
}

try {
    $stmt = $dbo->prepare("SELECT * FROM rendeles ORDER BY orderid DESC");


    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_ASSOC);

    $i = 0;

    while ($row = $stmt->fetch()) {
        $product = new Products($row["termekid"], $row["termeknev"], $row["db"], $row["ar"],  $row["orderid"], $row["userid"]);
        $response[$i++] = $product;
    }
} catch (PDOException $e) {
    $response["error"] = $e->getMessage();
    echo json_encode($response);
}

echo json_encode($response);
