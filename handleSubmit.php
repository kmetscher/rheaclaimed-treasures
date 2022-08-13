<?php
try {
    $orders = new PDO('mysql:host=localhost;dbname=rhea', 'web', 'skeet');
    $orders->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch (PDOException $exception) {
    echo $exception->getMessage();
    die();
}


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    foreach ($_POST as $formEntry => $value) {
        echo "$formEntry: $value<br>";
        echo "<br>";
    }
    $subject = "New ${_POST['product-type']} order from ${_POST['name']}";
    $body = "<h2>${_POST['name']} ordered a ${_POST['type']}</h2>
    <h3>Customer phone: ${_POST['phone']}</h3>
    <h3>Customer email: ${_POST['email']}</h3>
    <h3>Design requests, questions:</h3>
    <p>${_POST['questions']}</p>";
    echo $body;

    $stmt = $orders->prepare('INSERT INTO orders 
        (customer_name, phone, email,
        `type`, questions) 
        VALUES (?, ?, ?, ?, ?)');
    $stmt->bindParam(1, $_POST['name']);
    $stmt->bindParam(2, $_POST['phone']);
    $stmt->bindParam(3, $_POST['email']);
    $stmt->bindParam(4, $_POST['type']);
    $stmt->bindParam(5, $_POST['questions']);

    try {
        $stmt->execute();
    }
    catch (PDOException $exception) {
        echo $exception->getMessage();
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