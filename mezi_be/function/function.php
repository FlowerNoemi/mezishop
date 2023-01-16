<?php

function email_exists($email, $dbo)
{

    $stmt = $dbo->prepare("SELECT id FROM users WHERE users.email LIKE :email");
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);

    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_ASSOC);

    $data = $stmt->fetchAll();

    if (sizeof($data) == 1) {
        return true;
    } else {
        return false;
    }
}
