<?php
session_start();
require_once '../model/user.php';

$params = $_POST['user'];

$user = new user();

if($login_as = $user->user_authentication($params['roll'], $params['password'])) {
    header('Location: ../dashboard.php');
}else{
    $_SESSION['flash_error_once'] = 'Wrong Roll or/and Password';
    header('Location: ../login.php');
}
exit();
