<?php
require_once('db.php');

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $orderID = $_POST['order-id'];
    try {
        $stmt = $orders->prepare(
            'UPDATE orders SET fulfilled_date = NULL WHERE id = ?'
        );
        $stmt->bindParam(1, $orderID);
        $stmt->execute();
        header("location: /admin/orders.php#${orderID}");
    }
    catch (PDOException $exception) {
        echo $exception;
    }
}

