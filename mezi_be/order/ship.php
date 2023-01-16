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
    public $img;

    function __construct($id, $termeknev, $db, $ar, $img)
    {
        $this->id = $id;
        $this->termeknev = $termeknev;
        $this->db = $db;
        $this->ar = $ar;
        $this->img = $img;
    }
}

if (isset($_GET["orderid"])) {

    $orderid = $_GET["orderid"];

    try {
        $stmt = $dbo->prepare("SELECT * FROM rendeles WHERE orderid LIKE :orderid ");
        $stmt->bindParam(':orderid', $orderid, PDO::PARAM_INT);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        $i = 0;

        while ($row = $stmt->fetch()) {
            $product = new Products($row["termekid"], $row["termeknev"], $row["db"], $row["ar"],  $row["img"]);
            $response[$i++] = $product;
        }
    } catch (PDOException $e) {
        $response["error"] = $e->getMessage();
        echo json_encode($response);
    }
} else {
    $response["message"] = "Hibás adatok";
    $response["code"] = "-1";
}

echo json_encode($response);
