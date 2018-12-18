<?php
require_once("../data/database_connection.php");
require_once("../data/newFunctions.php");
require_once("../data/sessions.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-type: application/json');

date_default_timezone_set("America/Chicago");

$data = json_decode(file_get_contents("php://input"));

if($data->dba_name){
    $table = 'dispatcher';
    $registration = array(
        "date"=>date('m/d/Y'),
        "broker_type"=>$data->broker_type, 
        "dba_name"=>$data->dba_name, 
        "contact_name"=>$data->contact_name, 
        "ein"=>$data->ein,
        "mc_number"=>$data->mc_number, 
        "us_dot_no"=>$data->us_dot_no, 
        "account_number"=>$data->account_number,
        "email"=>$data->email, 
        "phone"=>$data->phone
    );
} else if ($data->dob) {
    $table = 'driver';
    $registration = array(
        "date"=>date('m/d/Y'),
        "name"=>$data->name, 
        "email"=>$data->email, 
        "status"=>$data->status,
        "dob"=>$data->dob, 
        "address"=>$data->address, 
        "phone"=>$data->phone,
        "type"=>$data->type, 
        "driver_id"=>$data->driver_id, 
        "experience"=>$data->experience,
        "license"=>$data->license, 
        "dl_expiration"=>$data->dl_expiration,
        "dot_medical_card_expiration"=>$data->dot_medical_card_expiration, 
        "truck_number"=>$data->truck_number, 
        "trailer_number"=>$data->trailer_number,
        "advance_money_eligible"=>$data->advance_money_eligible,
        "driver_insurance"=>$data->driver_insurance,
        "insurance_company"=>$data->insurance_company,
        "insurance_expiration_date"=>$data->insurance_expiration_date,
        "group_no"=>$data->group_no,
        "id_no"=>$data->id_no
);
} else if( $data->charge ) {
    $table = 'loads';
    $registration = array(
        "billed"=>"Nope, Bill it now", 
        "date"=>date('m/d/Y'),
        "driver"=>"Not assigned",
        "truck_number"=>"Unknown",
        "trailer_number"=>"Unknown",
        "miles"=>$data->miles,
        "status"=>$data->status, 
        "ref_id"=>$data->ref_id, 
        "eq_type"=>$data->eq_type,
        "length"=>$data->length, 
        "temp"=>$data->temp, 
        "size"=>$data->size,
        "commo"=>$data->commo, 
        "weight"=>$data->weight, 
        "notes"=>$data->notes,
        "shipper"=>$data->shipper, 
        "pick_up"=>$data->pick_up,
        "pick_up_date"=>$data->pick_up_date,
        "shipper_notes"=>$data->shipper_notes,
        "contact"=>$data->contact,
        "phone"=>$data->phone,
        "receiver"=>$data->receiver,
        "drop_off"=>$data->drop_off, 
        "delivery_time"=>$data->delivery_time,
        "instructions"=>$data->instructions,
        "contact_person"=>$data->contact_person,
        "contact_phone"=>$data->contact_phone,
        "rate"=>$data->rate,
        "charge"=>$data->charge
        // "fuel_rate"=>$data->fuel_rate,
        // "fuel_charge"=>$data->fuel_charge
);
} else if ($data->comments){
    $loadUpdate = "update loads set driver = 'not assigned', truck_number = 'Unknown', trailer_number = 'Unknown', status = 'Unassigned', comments = '{$data->comments}' where id = '{$data->id}' limit 1";
    $public->query($loadUpdate);
}
$loadUpdateQuery = "update loads set driver = '{$data->driver->name}', truck_number = '{$data->driver->truck_number}', trailer_number = '{$data->driver->trailer_number}', status = 'Assigned' where id = '{$data->load->id}' limit 1";
if($data){
    $response = $public->insert($registration, $table);
    if($data->driver){
        $public->query($loadUpdateQuery);
    }
}

// echo json_encode($data->comments, $data->id);

?>


