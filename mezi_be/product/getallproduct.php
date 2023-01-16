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
    public $mennyiseg;
    public $ar;
    public $img;
    public $status;

    function __construct($id, $termeknev, $mennyiseg, $ar, $img, $status)
    {
        $this->id = $id;
        $this->termeknev = $termeknev;
        $this->mennyiseg = $mennyiseg;
        $this->ar = $ar;
        $this->img = 'http://localhost/mezi_be/images/' . $img;
        $this->status = $status;
    }
}



$response = array();


try {
    $stmt = $dbo->prepare("SELECT * FROM product WHERE status LIKE 'active'");
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_ASSOC);

    $i = 0;

    while ($row = $stmt->fetch()) {
        $product = new Products($row["id"], $row["termeknev"], $row["mennyiseg"], $row["ar"], $row["img"], $row["status"]);
        $response[$i++] = $product;
    }
} catch (PDOException $e) {
    $response["error"] = $e->getMessage();
    json_encode($response);
}


echo json_encode($response);
