<?php
require_once 'database.php';

class user {
    private $db_connect;
    public $errors = [];

    function __construct() {
        $this->db_connect = database::get_connection();
    }

    private function validate($data){
        //ToDo: Write model validations here
        //array_push($this->errors, 'validation errors');
        return true;
    }

    private function get_encrypted_password($password){
        //ToDo: Write a algorithm to generate encrypted password
        $encrypted_password = $password;

        return $encrypted_password;
    }

    //ToDo: Remove this params dependency using interface
    // $user['name', 'roll', 'graduation_year', 'email', 'phone', 'password', 'current_profession', 'current_organization']
    public function new_user($user){
        if($this->validate($user)){
            try {
                $encrypted_password = $this->get_encrypted_password($user['password']);

                $query = $this->db_connect->prepare("INSERT INTO users(full_name, roll, graduation_year, email, phone, encrypted_password, current_designation, current_organization) " .
                    "VALUES(:full_name, :roll, :graduation_year, :email, :phone, :encrypted_password, :current_designation, :current_organization)");

                $query->bindParam(':full_name', $user['name'], PDO::PARAM_STR);
                $query->bindParam(':roll', $user['roll'], PDO::PARAM_STR);
                $query->bindParam(':graduation_year', $user['graduation_year'], PDO::PARAM_STR);
                $query->bindParam(':email', $user['email'], PDO::PARAM_STR);
                $query->bindParam(':phone', $user['phone'], PDO::PARAM_STR);
                $query->bindParam(':encrypted_password', $encrypted_password, PDO::PARAM_STR);
                $query->bindParam(':current_designation', $user['current_profession'], PDO::PARAM_STR);
                $query->bindParam(':current_organization', $user['current_organization'], PDO::PARAM_STR);

                return $query->execute();
//                var_dump($query->errorInfo());
            }
            catch(Exception $ex) {
                var_dump($ex->getMessage());
            }
        }
        else{
            return false;
        }
    }
}