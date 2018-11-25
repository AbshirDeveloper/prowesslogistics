<?php require_once("Database_connection.php"); 
require_once("sessions.php"); 
class everything {
	
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

public static function login(){
	if(!isset($_SESSION['name'])) {
		header ("location: ../index.html");
}
}

public static function get_by_id($id){
	global $connection;
	$query = "select * from login where id = {$id}";
	$result = mysqli_query($connection, $query);
	while($array = mysqli_fetch_array($result))
	return $array;
}

public static function get_by_sql($sql){
	global $connection;
	$result = mysqli_query($connection, $sql);
	while($array = mysqli_fetch_array($result)){
	return $array;
	}
}
//works
public static function update($array, $table_name, $where_attribute, $where_value){
	global $connection;
	foreach($array as $attribute => $value) {
	$query = "update {$table_name} set {$attribute} = '{$value}' where {$where_attribute} = '{$where_value}' and id_customer = {$_SESSION['id']}";
	$result = mysqli_query($connection, $query);
	return $result;
	}
}

public static function update_invent($array, $table_name, $where_attribute, $where_value){
	global $connection;
	foreach($array as $attribute => $value) {
	$query = "update {$table_name} set {$attribute} = '{$value}' where {$where_attribute} = '{$where_value}' and id_customer = {$_SESSION['id']}";
	$que = "delete from today where name = '{$where_value}' and id_customer = {$_SESSION['id']} limit 1";
	$result = mysqli_query($connection, $query);
	$ans = mysqli_query($connection, $que);
	return $result;
	}
}

//works
public static function delete($table_name, $where_attribute, $where_value){
	global $connection;
	$query = "delete from " . $table_name . " where " . $where_attribute . " = " . "'".$where_value."'" . " and id_customer = {$_SESSION['id']}";
	$result = mysqli_query($connection, $query);
	return $result;
}

//works
public static function insert($array, $table_name){
	global $connection;
	$keys = "(" . join(", ", array_keys($array)). ")";
	$values = "('" . join("', '", array_values($array)). "')";
	$query = "insert into " . $table_name . " " . $keys . " values " . $values;
	$result = mysqli_query($connection, $query);
	return $result;
}

//works
public static function select_all($table_name){
	global $connection;
	$query = "select * from " . $table_name . " where id_customer = {$_SESSION['id']}";
	$result = mysqli_query($connection, $query);
	return $result;	
}

public static function select_all_sales($table_name, $date1, $date2){
	global $connection;
	$query = "select * from " . $table_name . " where id_customer = {$_SESSION['id']} and date > {$date1} and date < {$date2}";
	$result = mysqli_query($connection, $query);
	return $result;	
}

public static function select_finshing($table_name){
	global $connection;
	$query = "select * from {$table_name} where product_amount < 5 and id_customer = {$_SESSION['id']} limit 35";
	$result = mysqli_query($connection, $query);
	return $result;	
}

//works
public static function select_where($table_name, $attribute, $value){
	global $connection;
	$query = "select * from " . $table_name . " where " . $attribute . " = " . "'".$value."'". " and id_customer = {$_SESSION['id']}";
	$result = mysqli_query($connection, $query);
	if($result){
		while($array = mysqli_fetch_array($result)){
	return $array;
	}
	}
	
}

public static function select_where_more($table_name, $attribute){
	global $connection;
	$query = "select * from " . $table_name . " where " . $attribute;
	$result = mysqli_query($connection, $query);
	while($array = mysqli_fetch_array($result)){
	return $array;
	}
}

public static function select_sum_column($table, $column){
	global $connection;
	$query = "select sum({$column}) from {$table} where id_customer = {$_SESSION['id']} limit 1";
	$result = mysqli_query($connection, $query);
	$string = mysqli_fetch_object($result);
	foreach ($string as $value) {
	return $value;
}
}
public static function select_sum_column_sales($table, $column){
	global $connection;
	if($_SESSION['date1']){
	$query = "select sum({$column}) from {$table} where id_customer = {$_SESSION['id']} and date >= '{$_SESSION['date1']}' and date <= '{$_SESSION['date2']}' limit 1";
	$result = mysqli_query($connection, $query);
	$string = mysqli_fetch_object($result);
	foreach ($string as $value) {
	return $value;
	}
	}else {
	$query = "select sum({$column}) from {$table} where id_customer = {$_SESSION['id']} limit 1";
	$result = mysqli_query($connection, $query);
	$string = mysqli_fetch_object($result);
	foreach ($string as $value) {
	return $value;	
	}
}
}


public static function select_sum_column_where($table, $column, $id){
	global $connection;
	$query = "select sum({$column}) from {$table} where id_customer = {$id} limit 1";
	$result = mysqli_query($connection, $query);
	$string = mysqli_fetch_object($result);
	foreach ($string as $value) {
	return $value;
}
}

public static function update_single($table, $new_value, $name){
	global $connection;
	$query = "update {$table} set product_amount = {$new_value} where product_name = '{$name}' and id_customer = {$_SESSION['id']}";
	$result = mysqli_query($connection, $query);
	return $result;
}

public static function select_count($table){
	global $connection;
	$query = "select COUNT(*) FROM {$table} where id_customer = {$_SESSION['id']}";
	$result = mysqli_query($connection, $query);
	$total = mysqli_fetch_array($result);
	return array_shift($total);

}

public static function select_count_late($table){
	global $connection;
	$today = time();
	$query = "select COUNT(*) FROM {$table} where id_customer = {$_SESSION['id']} and due_date<=$today";
	$result = mysqli_query($connection, $query);
	$total = mysqli_fetch_array($result);
	return array_shift($total);

}

public static function select_count_where($table, $abshir){
	global $connection;
	$query = "select COUNT(*) FROM {$table} where id_customer = '{$abshir}'";
	$result = mysqli_query($connection, $query);
	$total = mysqli_fetch_array($result);
	return array_shift($total);
}

public static function offset($number){
	global $connection;
	$query = "select * from data where id_customer = {$_SESSION['id']} limit 20  offset {$number}";
	$result = mysqli_query($connection, $query);
	return $result;
}
public static function offset_customer($number){
	global $connection;
	$query = "select * from amano where id_customer = {$_SESSION['id']} ORDER BY id DESC limit 12  offset {$number}";
	$result = mysqli_query($connection, $query);
	return $result;
}
	

public static function offset_sales($number, $date){
	global $connection;
	if($_SESSION['date1']){
	$query = "select * from today where id_customer = {$_SESSION['id']} and date > '{$_SESSION['date1']}' and date < '{$_SESSION['date2']}' ORDER BY id DESC limit 50  offset {$number}";
	$result = mysqli_query($connection, $query);
	return $result;
} else {
	$query = "select * from today where id_customer = {$_SESSION['id']} ORDER BY id DESC limit 50  offset {$number}";
	$result = mysqli_query($connection, $query);
	return $result;
	}
}

public static function offset_dayn($number){
	global $connection;
	$query = "select * from dayn where id_customer = {$_SESSION['id']} ORDER BY id DESC limit 50  offset {$number}";
	$result = mysqli_query($connection, $query);
	return $result;
}

public static function offset_dayn_late($number){
	global $connection;
	$today = time();
	$query = "select * from dayn where id_customer = {$_SESSION['id']} and due_date<=$today ORDER BY id DESC limit 30 offset {$number}";
	$result = mysqli_query($connection, $query);
	return $result;
}
	
public static function offset_admin_late($number){
	global $connection;
	$today = time();
	$query = "select * from login where status = 'pending' limit 30 offset {$number}";
	$result = mysqli_query($connection, $query);
	return $result;
}

public static function offseta($number){
	global $connection;
	$query = "select * from customer limit 1  offset {$number}";
	$result = mysqli_query($connection, $query);
	return $result;
}
public static function temp_login_check(){
	if(!isset($_SESSION['name'])){
		header("location: ../wrong.html");
	}
}

  public static function delete_product($awb){
        global $connection;
        $query = "delete from products where awb = {$awb} limit 1";
        $result = mysqli_query($connection, $query);
    }
    
    public static function delete_customer($id){
        global $connection;
        $query = "delete from customer where id = {$id} limit 1";
        $result = mysqli_query($connection, $query);
    }

}

$public = new everything();

?>