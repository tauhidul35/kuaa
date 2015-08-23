<?php
class database_sample{
    private static $host = 'localhost';
    private static $db_name = 'kuaa';
    private static $username = 'root';
    private static $password = 'password';
    private static $connection = NULL;

    //Singleton method
    public static function get_connection(){
        if(database::$connection === NULL) {
            database::$connection = new PDO('mysql:host='.database::$host.';dbname='.database::$db_name.';charset=utf8', database::$username, database::$password);
        }
        return database::$connection;
    }

    public static function close_connection(){
        database::$connection = NULL;
    }
}
