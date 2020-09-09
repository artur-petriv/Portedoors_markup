<?php
$name = stripslashes(htmlspecialchars($_POST['client']));
$phone = stripslashes(htmlspecialchars($_POST['tel']));
$email = stripslashes(htmlspecialchars($_POST['email']));
if ($_GET['product_id']) {
    $product_id = 'Portedoor';
} else {
    $product_id = 'Portedoor';
}
if ((!empty($name) && !empty($phone)) || !empty($email)) {
    $subject = 'Заказ товара - Portedoors';
    $addressat = "portedoor2000@gmail.com";
    $success_url = './success.php?name='.$_POST['client'].
    '&phone='.$_POST['tel'].
    '&time='.$_POST['Время_звонка'].
    '';
    $message = "ФИО: {$name}\nКонтактный телефон: {$phone}\nТовар: {$product_id}\nE-mail: {$email}";
    $verify = mail($addressat, $subject, $message, "Content-type:text/plain;charset=utf-8\r\n");
    if ($verify == 'true') {
        header('Location: '.$success_url);
        echo '<h1 style="color:green;">Success! You application sended!</h1>';
        exit;
    } else {
        echo '<h1 style="color:red;">Error! Try to send again or call us.</h1>';
    }
} else {
    echo '<h1 style="color:red;">Please, type again you name and phone!</h1>';
    echo '<meta http-equiv="refresh" content="2; url=http://'.$_SERVER['SERVER_NAME'].
    '">';
} 
?>