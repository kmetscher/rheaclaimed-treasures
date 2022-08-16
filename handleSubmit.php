<?php
require_once('admin/db.php');

$phoneRegex = "/^[\+]?[(]?\d{3}?[)]?[-\s\.]";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $formatting = array('-', '(', ')', '.', ' ');
    $digits = str_replace($formatting, '', $_POST['phone']);
    $type = htmlspecialchars(strip_tags($_POST['type']));
    $name = htmlspecialchars(strip_tags($_POST['name']));
    $email = htmlspecialchars(strip_tags($_POST['email']));
    $questions = htmlspecialchars(strip_tags($_POST['questions']));
    if(strlen($_POST['name']) > 0 && 
    is_numeric($digits) &&
    strlen($digits) > 9 && 
    strlen($_POST['type']) > 0 && 
    strlen($questions) > 0) {
        $stmt = $orders->prepare('INSERT INTO orders 
        (customer_name, phone, email,
        `type`, questions) 
        VALUES (?, ?, ?, ?, ?)');
        $stmt->bindParam(1, $name);
        $stmt->bindParam(2, $digits);
        $stmt->bindParam(3, $email);
        $stmt->bindParam(4, $type);
        $stmt->bindParam(5, $questions);
        try {
            $stmt->execute();
        }
        catch (PDOException $exception) {
            http_response_code(400);
        }
    }
    else {
        http_response_code(400);
    }

    /*if (mail('kscott.mets@gmail.com', 
    $subject, $body, 'From: mazu@23.236.35.25')) {
        echo "very cool kanye thank u <br>";
        $error = error_get_last()['message'];
        var_dump($error);

    }
    else {
        echo "aww wtf man";
        $error = error_get_last()['message'];
        var_dump($error);
    }*/
}
?>