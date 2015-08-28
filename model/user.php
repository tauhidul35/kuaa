<?php
require_once 'database.php';

class user {
    private $db_connect;
    private $table_name = 'kualu_users';
    public $errors = [];
    private $uploads_photo_path = 'uploads/users/';

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

    // $photo = $_FILES["fileToUpload"]
    private function save_user_photo($photo){
//        echo var_dump($photo);
        $target_dir = "../$this->uploads_photo_path";
        $photo_name = uniqid() . '-' . basename($photo["name"]);
        $target_file = $target_dir . $photo_name;
        $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
        $uploadOk = 1;

        // Check if image file is a actual image or fake image
        $check = getimagesize($photo["tmp_name"]);
        if($check !== false) {
            echo "File is an image - " . $check["mime"] . ".";
            $uploadOk = 1;
        } else {
            echo "File is not an image.";
            $uploadOk = 0;
        }

        // Check file size
        if ($photo["size"] > 500000) {
            echo "Sorry, your file is too large.";
            $uploadOk = 0;
        }

        // Allow certain file formats
        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
            echo "Sorry file type $imageFileType is not allowed, only JPG, JPEG & PNG files are allowed.";
            $uploadOk = 0;
        }

        // Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) {
            echo "Sorry, your file was not uploaded.";
        // if everything is ok, try to upload file
        } else {
            if (move_uploaded_file($photo["tmp_name"], $target_file)) {
                echo "The file ". basename( $photo["name"]). " has been uploaded.";
                return $photo_name;
            } else {
                echo "Sorry, there was an error uploading your file: $photo[tmp_name] to $target_file.";
                return NULL;
            }
        }
    }

    //ToDo: Remove this params dependency using interface
    // $user['name', 'roll', 'graduation_year', 'email', 'phone', 'password', 'current_profession', 'current_organization']
    public function new_user($user, $photo){
        if($this->validate($user)){
            try {
                $encrypted_password = $this->get_encrypted_password($user['password']);
                $photo_name = $this->save_user_photo($photo);

                $query = $this->db_connect->prepare("INSERT INTO $this->table_name(full_name, roll, graduation_year, email, phone, encrypted_password, current_designation, current_organization, photo) " .
                    "VALUES(:full_name, :roll, :graduation_year, :email, :phone, :encrypted_password, :current_designation, :current_organization, :photo)");

                $query->bindParam(':full_name', $user['name'], PDO::PARAM_STR);
                $query->bindParam(':roll', $user['roll'], PDO::PARAM_STR);
                $query->bindParam(':graduation_year', $user['graduation_year'], PDO::PARAM_STR);
                $query->bindParam(':email', $user['email'], PDO::PARAM_STR);
                $query->bindParam(':phone', $user['phone'], PDO::PARAM_STR);
                $query->bindParam(':encrypted_password', $encrypted_password, PDO::PARAM_STR);
                $query->bindParam(':current_designation', $user['current_profession'], PDO::PARAM_STR);
                $query->bindParam(':current_organization', $user['current_organization'], PDO::PARAM_STR);
                $query->bindParam(':photo', $photo_name, PDO::PARAM_STR);

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