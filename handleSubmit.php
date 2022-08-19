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
    // Validation and database
    if(strlen($_POST['honeybee']) == 0 &&
    strlen($_POST['name']) > 0 && 
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
        // Email
        $to = "rheaclaimedtreasures@outlook.com";
        $subject = "New ${type} order from ${name}";
        $body = "
        <html>
            <head><title>New order</title></head>
            <body>
                <h1>${name} requested a quote for a ${type}</h1>
                <h2>Phone: ${digits}</h2>
                <h2>Email: ${email}</h2>
                <h2>Customer's details and questions:</h2>
                <p>${questions}</p>
            </body>
        </html>";
        $headers = 
        'MIME-Version: 1.0' . "\r\n" .
        'Content-type: text/html; charset=utf-8' . "\r\n" .
        'From: Orders <orders@rheaclaimedtreasures.com>' . "\r\n" .
        'Reply-To: orders@rheaclaimedtreasures.com' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

        mail($to, $subject, $body, $headers);
    }
    else {
        http_response_code(400);
    }
}
?>