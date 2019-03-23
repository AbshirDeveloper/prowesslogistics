<?php
require_once("../data/database_connection.php");
require_once("../data/newFunctions.php");
require_once("../data/sessions.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
// header('Content-type: application/json');


$data = json_decode(file_get_contents("php://input"));

$returnedDriver = $public->select('driver', '', 'order by id desc');
$returnedDispatcher = $public->select('dispatcher', '', 'order by id desc');
$returnedLoad = $public->select('loads', '', 'order by truck_number desc');
$returnedLoadForBilling = $public->select('loads', '', 'order by billed_date asc');
$returnedDeduction = $public->select('deductions', '', 'order by id desc');
$returnedTransactions = $public->select('transactions', '', 'order by id desc');
$returnedAdvance = $public->select('advance', '', 'order by id desc');
$returnedStaff = $public->select('staff', '', 'order by id desc');
$returnedCarrier = $public->select('dispatcher', "where broker_type = 'Carrier'", 'order by id desc');

$newData = [$returnedDriver, $returnedDispatcher, $returnedLoad, $returnedCarrier, $returnedDeduction, $returnedTransactions, $returnedAdvance, $returnedStaff, $returnedLoadForBilling];
echo json_encode($newData);

?>
