<!DOCTYPE html>

<?php
require_once('db.php');
$stmt = $orders->prepare('SELECT * FROM orders ORDER BY id DESC');
try {
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
} 
catch (PDOException $exception) {
    echo $exception;
}
?>

<html>

<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cookie&family=Figtree:wght@500&family=Playfair+Display:wght@900&display=swap" rel="stylesheet">
    <link href="/wireframe.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
</head>

<body>
    <div class="orders">
        <h1>Orders</h1>
        <?php
        foreach ($rows as $index => $row) {
            $date = strtotime($row['order_date']);
            $formattedDate = date('l, F j, Y, g:i a', $date);
            echo "
            <div class=\"order\" id=\"${row['id']}\">
                <div class=\"order-header\">
                    <h2>Order ID: ${row['id']}</h2>
                    <h2>${row['customer_name']}</h2>
                </div>
                <div class=\"order-info\">
                    <h3>Phone: ${row['phone']}</h3>
                    <h3>Email: ${row['email']}</h3>
                </div>
                <div class=\"order-instructions\">
                    <h3>Order type: ${row['type']}</h3>
                    <p>${row['questions']}</p>
                </div>
                <div class=\"order-dates\">
                    <h3>Ordered on ${formattedDate}</h3>";
                    if(strlen($row['fulfilled_date']) == 0) {
                        echo "
                        <h3 id=\"status-${$row['id']}\">Not fulfilled</h3>
                        <form method=\"post\" action=\"orderFulfilled.php\">
                            <input type=\"hidden\" 
                            id=\"order_id\" 
                            name=\"order-id\" 
                            value=\"${row['id']}\">
                            <button id=\"status-button-${row['id']}\" type=\"submit\">Mark as fulfilled</button>
                        </form>
                        ";
                    }
                    else {
                        $fulfilledDate = strtotime($row['fulfilled_date']);
                        $fulfilledFormattedDate = date('l, F j, Y, g:i a', $fulfilledDate);
                        echo "
                        <h3 id=\"status-${$row['id']}\">Marked fulfilled on ${fulfilledFormattedDate}</h3>
                        <form method=\"post\" action=\"orderNotFulfilled.php\">
                            <input type=\"hidden\" 
                            id=\"order_id\" 
                            name=\"order-id\" 
                            value=\"${row['id']}\">
                            <button id=\"status-button-${row['id']}\" type=\"submit\">Mark as not fulfilled</button>
                        </form>";
                    }
                    echo "
                </div>
            </div>
        ";
        }
        ?>
    </div>
</body>

</html>