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



if ($_SERVER['REQUEST_METHOD'] === 'GET' && empty($_GET)) {
    $_GET = json_decode(file_get_contents('php://input'), true);
}

class Dataorder
{
    public $id;
    public $orderid;
    public $chekid;
    public $shippingId;
    public $adozo;
    public $pay;
    public $shipping;
    public $adoszam;
    public $EUadoszam;
    public $comment;
    public $total;

    public $userid;

    public $iranyitoszam;
    public $varos;
    public $cim;
    public $telefonszam;
    public $vname;
    public $kname;

    public $iranyitoszam2;
    public $varos2;
    public $cim2;
    public $telefonszam2;
    public $vname2;
    public $kname2;


    function __construct($id, $orderid, $chekid, $shippingId, $adozo, $pay, $shipping, $adoszam, $EUadoszam, $comment, $total, $userid, $iranyitoszam, $varos, $cim, $telefonszam, $vname, $kname, $iranyitoszam2, $varos2, $cim2, $telefonszam2, $vname2, $kname2,)
    {
        $this->id = $id;
        $this->orderid = $orderid;
        $this->chekid = $chekid;
        $this->shippingId = $shippingId;
        $this->adozo = $adozo;
        $this->pay = $pay;
        $this->shipping = $shipping;
        $this->adoszam = $adoszam;
        $this->EUadoszam = $EUadoszam;
        $this->comment = $comment;
        $this->total = $total;
        $this->userid = $userid;
        $this->iranyitoszam = $iranyitoszam;
        $this->varos = $varos;
        $this->cim = $cim;
        $this->telefonszam = $telefonszam;
        $this->vname = $vname;
        $this->kname = $kname;
        $this->iranyitoszam2 = $iranyitoszam2;
        $this->varos2 = $varos2;
        $this->cim2 = $cim2;
        $this->telefonszam2 = $telefonszam2;
        $this->vname2 = $vname2;
        $this->kname2 = $kname2;
    }
}


$response = array();

if (isset($_GET["orderid"])) {
    $orderid = $_GET["orderid"];

    try {

        $stmt = $dbo->prepare("SELECT * FROM finishorder INNER JOIN checkdata ON finishorder.checkId = checkdata.checkid INNER JOIN shippingdata ON finishorder.shippingId = shippingdata.shipid WHERE orderid LIKE :orderid");
        $stmt->bindParam(':orderid', $orderid, PDO::PARAM_INT);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        $i = 0;

        while ($row = $stmt->fetch()) {
            $dataorder = new Dataorder($row["id"], $row["orderid"], $row["checkId"], $row["shippingId"], $row["adozo"], $row["pay"], $row["shipping"],  $row["adoszam"], $row["EUadoszam"], $row["comment"], $row["total"], $row["user_id"],  $row["iranyitoszam"], $row["varos"], $row["cim"], $row["telefonszam"], $row["kname1"], $row["vname1"],  $row["iranyitoszam2"], $row["varos2"], $row["cim2"], $row["telefonszam2"], $row["kname2"], $row["vname2"]);
            $response[$i++] = $dataorder;
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
