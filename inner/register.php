<?php
require_once '../model/user.php';

$params = $_POST['user'];
$photo = $_FILES['user_photo'];

if($params['password'] == $params['confirm_password']) {
    $user = new user();
    $user->new_user($params, $photo);
    header('Location: ../dashboard.php');
}
else{
    header('Location: ../registration.php');
}

exit();
