<?php
require_once '../model/user.php';

$params = $_POST['user'];

$user = new user();

if($login_as = $user->user_authentication($params['roll'], $params['password'])) {
    header('Location: ../dashboard.php');
}else{
    header('Location: ../login.php');
}
exit();
