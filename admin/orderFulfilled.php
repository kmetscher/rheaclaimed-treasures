<?php
require_once('db.php');

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $orderID = $_POST['order-id'];
    $date = date('Y-m-d H:i:s');
    try {
        $stmt = $orders->prepare(
            'UPDATE orders SET fulfilled_date = ? WHERE id = ?'
        );
        $stmt->bindParam(1, $date);
        $stmt->bindParam(2, $orderID);
        $stmt->execute();
        header("location: /admin/orders.php#${orderID}");
    }
    catch (PDOException $exception) {
        echo $exception;
    }
}

