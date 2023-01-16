<?php
header("Set-Cookie: cross-site-cookie=whatever; SameSite=None; Secure");
header("Content-Type:multipart/form-data");
header('Access-Control-Allow-Origin:*');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

require "../assets/connection.php";

$response = array();

if (isset($_POST["id"]) and isset($_POST["termeknev"]) and isset($_POST["mennyiseg"]) and isset($_POST["ar"]) and isset($_POST["status"])) {


    $id = $_POST["id"];
    $termeknev = $_POST["termeknev"];
    $mennyiseg = $_POST["mennyiseg"];
    $ar = $_POST["ar"];
    $status = $_POST["status"];

    if (isset($_FILES["img"])) {
        $image = $_FILES['img']['name'];

        $fileinfo = @getimagesize($_FILES["img"]["tmp_name"]);
        $width = $fileinfo[0];
        $height = $fileinfo[1];

        $allowed_image_extension = array(
            "png",
            "jpg",
            "jpeg"
        );


        $file_extension = pathinfo($_FILES["img"]["name"], PATHINFO_EXTENSION);


        if (!file_exists($_FILES["img"]["tmp_name"])) {
            $response["message"] = "Hibás kép adatok";
            $response["code"] = "-1";
        } else if (!in_array($file_extension, $allowed_image_extension)) {
            $response["message"] = "Hibás formátum";
            $response["code"] = "-1";
        } else if (($_FILES["img"]["size"] > 2000000)) {
            $response["message"] = "Túl nagy fájlméret";
            $response["code"] = "-1";
        } else {

            $filename = $_FILES['img']['name'];
            if (move_uploaded_file($_FILES['img']['tmp_name'], '../images/' . $filename)) {
                $response["message"] = "Sikeres fájl feltöltés";
                $response["code"] = "2";
            } else {
                $response["message"] = "Hibás feltöltés";
                $response["code"] = "-1";
            }
        }

        $img = $image;

        try {
            $stmt = $dbo->prepare("UPDATE product SET termeknev = :termeknev , mennyiseg = :mennyiseg ,ar = :ar, img = :img, status = :status  WHERE id LIKE :id");
            $stmt->bindParam(':termeknev', $termeknev, PDO::PARAM_STR);
            $stmt->bindParam(':mennyiseg', $mennyiseg, PDO::PARAM_STR);
            $stmt->bindParam(':ar', $ar, PDO::PARAM_INT);
            $stmt->bindParam(':img', $img, PDO::PARAM_STR);
            $stmt->bindParam(':status', $status, PDO::PARAM_STR);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
            $response["message"] = "Sikeres módosítás";
            $response["code"] = "1";
        } catch (PDOException $e) {
            $response["error"] = $e->getMessage();
            echo json_encode($response);
        }
    } else {
        try {
            $stmt = $dbo->prepare("UPDATE product SET termeknev = :termeknev , mennyiseg = :mennyiseg ,ar = :ar, status = :status  WHERE id LIKE :id");
            $stmt->bindParam(':termeknev', $termeknev, PDO::PARAM_STR);
            $stmt->bindParam(':mennyiseg', $mennyiseg, PDO::PARAM_STR);
            $stmt->bindParam(':ar', $ar, PDO::PARAM_INT);
            $stmt->bindParam(':status', $status, PDO::PARAM_STR);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
            $response["message"] = "Sikeres módosítás";
            $response["code"] = "1";
        } catch (PDOException $e) {
            $response["error"] = $e->getMessage();
            echo json_encode($response);
        }
    }
} else {
    $response["message"] = "Hibás adatok!";
    $response["code"] = "-1";
}

echo json_encode($response);
