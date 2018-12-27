<?php
require_once("../data/database_connection.php");
require_once("../data/newFunctions.php");
require_once("../data/sessions.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-type: application/json');

date_default_timezone_set("America/Chicago");

$data = json_decode(file_get_contents("php://input"));

if($data){
    $where = "where id = {$data->id}";
    $public->delete($data->table, $where);
}

echo json_encode($returnedData);

?>


