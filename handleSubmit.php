<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    foreach ($_POST as $formEntry => $value) {
        echo "$formEntry: $value<br>";
        echo "<br>";
    }
    $subject = "New ${_POST['product-type']} order from ${_POST['name']}";
    $body = "<h2>${_POST['name']} ordered a ${_POST['product-type']}</h2>
    <h3>Customer phone: ${_POST['phone']}</h3>
    <h3>Customer email: ${_POST['email']}</h3>
    <h3>Design requests, questions:</h3>
    <p>${_POST['questions']}</p>";
    echo $body;
    if (mail('kscott.mets@gmail.com', 
    $subject, $body, 'From: mazu@23.236.35.25')) {
        echo "very cool kanye thank u <br>";
        $error = error_get_last()['message'];
        var_dump($error);

    }
    else {
        echo "aww wtf man";
        $error = error_get_last()['message'];
        var_dump($error);
    }
}
?>