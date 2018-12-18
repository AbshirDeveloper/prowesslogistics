<?php require_once("database_connection.php"); 
require_once("sessions.php"); 
class everything {
    
    // public $password = 'Abshir26';
    // public 

    public static function password_encrypt($password) {
        $hash_format = "$2y$10$";   
        $salt_length = 22; 					
        $salt = static::generate_salt($salt_length);
        $format_and_salt = $hash_format . $salt;
        $hash = crypt($password, $format_and_salt);
        return $hash;
    }

    public static function generate_salt($length) {
        $unique_random_string = md5(uniqid(mt_rand(), true));
        $base64_string = base64_encode($unique_random_string);
        $modified_base64_string = str_replace('+', '.', $base64_string);
        $salt = substr($modified_base64_string, 0, $length);
        return $salt;
    }

    public static function login($username, $password){
        $hashed = password_encrypt($password);
        global $connection;
        $query = "select * from login where username = {$username} and password = {$hashed}";
        $result = mysqli_query($connection, $query);
        if($result){
            return true;
        } else {
            return false;
        }
    }

    public static function checkLoggedInn(){
        if(isset($_SESSION['loggedInn'])) {
        return true;
        } else {
            return false;
        }
    }

    public static function query($query){
        global $connection;
        $result = mysqli_query($connection, $query);
        return $result || false;
    }

    public static function insert($array, $table_name){
        global $connection;
        $keys = "(" . join(", ", array_keys($array)). ")";
        $values = "('" . join("', '", array_values($array)). "')";
        $query = "insert into " . $table_name . " " . $keys . " values " . $values;
        $result = mysqli_query($connection, $query);
        return $result || false;
    }

    public static function select($table_name, $where){
        $data = array();
        global $connection;
        $query = "select * from {$table_name} {$where} order by id desc";
        $result = mysqli_query($connection, $query);
        if($result){
            while($array = mysqli_fetch_array($result)){
                $data[] = $array;
            }
        } 
        return $data; 
    }

    public static function update($table, $field, $new_value, $where){
        global $connection;
        $query = "update {$table} set {$field} = {$new_value} {$where}";
        $result = mysqli_query($connection, $query);
        return $result;
    }

    public static function delete($table, $where){
        global $connection;
        $query = "delete from {$table} {$where}";
        $result = mysqli_query($connection, $query);
    }
    
    public static function count($table, $where){
        global $connection;
        $query = "select COUNT(*) FROM {$table} {$where}";
        $result = mysqli_query($connection, $query);
        $total = mysqli_fetch_array($result);
        return array_shift($total);
    }

    public static function sum($table, $column, $where){
        global $connection;
        $query = "select sum({$column}) from {$table} {$where}";
        $result = mysqli_query($connection, $query);
        $string = mysqli_fetch_object($result);
        foreach ($string as $value) {
            return $value;
        }
    }
};

$public = new everything();
?>