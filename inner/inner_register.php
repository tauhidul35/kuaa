<?php
require_once '../model/user.php';

$params = $_POST['user'];

if($params['password'] == $params['confirm_password']) {
    $user = new user();
    $user->new_user($params);
    header('Location: ../index.php');
}
else{
    header('Location: ../registration.php');
}

exit();
