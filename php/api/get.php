<?php
require_once("../data/database_connection.php");
require_once("../data/newFunctions.php");
require_once("../data/sessions.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
// header('Content-type: application/json');


$data = json_decode(file_get_contents("php://input"));

$returnedDriver = $public->select('driver', '');
$returnedDispatcher = $public->select('dispatcher', '');
$returnedLoad = $public->select('loads', '');
$returnedDeduction = $public->select('deductions', '');
$returnedTransactions = $public->select('transactions', '');
$returnedCarrier = $public->select('dispatcher', "where broker_type = 'Carrier'");

$newData = [$returnedDriver, $returnedDispatcher, $returnedLoad, $returnedCarrier, $returnedDeduction, $returnedTransactions];
echo json_encode($newData);

?>
