<?php
$host = "localhost";
$dbname = "mezidb";
$username = "root";
$pwd = "";

try {
  $dbo = new PDO("mysql:dbname=$dbname;host=$host", $username, $pwd);
  $dbo->query("SET NAMES utf8");
  $dbo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}
