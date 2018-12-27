<?php
require_once("../data/database_connection.php");
require_once("../data/newFunctions.php");
require_once("../data/sessions.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-type: application/json');

date_default_timezone_set("America/Chicago");

$data = json_decode(file_get_contents("php://input"));

if($data->broker_type){
    $table = 'dispatcher';
    if($data->broker_type == 'Dispatcher'){
        $registration = array(
            "date"=>date('m/d/Y'),
            "broker_type"=>$data->broker_type, 
            "dba_name"=>$data->dba_name, 
            "company_name"=>$data->company_name, 
            "contact_name"=>$data->contact_name, 
            "ein"=>$data->ein,
            "mc_number"=>$data->mc_number, 
            "us_dot_no"=>$data->us_dot_no, 
            "account_number"=>$data->account_number,
            "email"=>$data->email, 
            "phone"=>$data->phone
        );
    } else if ($data->broker_type == 'Carrier') {
        $registration = array(
            "date"=>date('m/d/Y'),
            "broker_type"=>$data->broker_type, 
            // "dba_name"=>$data->dba_name, 
            "company_name"=>$data->company_name, 
            "contact_name"=>$data->contact_name, 
            // "ein"=>$data->ein,
            "mc_number"=>$data->mc_number, 
            "us_dot_no"=>$data->us_dot_no, 
            // "account_number"=>$data->account_number,
            "email"=>$data->email, 
            "phone"=>$data->phone
        );
    } else {
        $registration = array(
            "date"=>date('m/d/Y'),
            "broker_type"=>$data->broker_type, 
            "dba_name"=>$data->dba_name, 
            "company_name"=>$data->company_name, 
            "contact_name"=>$data->contact_name, 
            "ein"=>$data->ein,
            // "mc_number"=>$data->mc_number, 
            // "us_dot_no"=>$data->us_dot_no, 
            "account_number"=>$data->account_number,
            "email"=>$data->email, 
            "phone"=>$data->phone
        );
    }
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
        "assigned"=>0, 
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
    $loadUpdate = "update loads set carrier = '', carrier_contact_name = '', carrier_contact_phone = '', driver = 'Not assigned', truck_number = 'Unknown', trailer_number = 'Unknown', status = 'Unassigned', assigned = 0, comments = '{$data->comments}' where id = '{$data->id}' limit 1";
    $public->query($loadUpdate);
} else if ($data->always){
    $status = $data->checked ? 'Active' : 'Inactive';
    $loadUpdate = "update driver set status = '{$status}' where id = '{$data->id}' limit 1";
    $public->query($loadUpdate);
} else if ($data->owner_id){
    $table = 'transactions';
    $registration = array(
    "type"=>$data->type, 
    "date"=>date('m/d/Y'),
    "amount"=>$data->amount,
    "owner_id"=>$data->owner_id,
    "total_deductions"=>$data->total_deductions,
    "number_of_loads"=>$data->number_of_loads
    );
}


$loadUpdateQuery = "update loads set 
driver = '{$data->driver->name}', 
driver_id = '{$data->driver->id}', 
assigned = 1, 
truck_number = '{$data->driver->truck_number}', 
trailer_number = '{$data->driver->trailer_number}', 
status = 'Assigned' 
where id = '{$data->load->id}' limit 1";

$loadCarrier = "update loads set 
carrier = '{$data->carrier->company_name}', 
assigned = 1, 
carrier_contact_name = '{$data->carrier->contact_name}', 
carrier_contact_phone = '{$data->carrier->phone}', 
status = 'Assigned to a Carrier ({$data->carrier->company_name})'
where id = '{$data->load->id}' limit 1";
if($data){
    $response = $public->insert($registration, $table);
    if($data->driver){
        $public->query($loadUpdateQuery);
    } else if ($data->carrier) {
        $public->query($loadCarrier);
    }
};

if($data->owner_id) {
    $returnedTransaction = $public->select("transactions", "where owner_id = $data->owner_id");
    $number = $returnedTransaction[0]['id'];
    $today = date('m/d/Y');
    foreach ($data->selectedLoads as $value) {
    $loadUpdateForTransaction = "update loads set settled = 'yes', date_settled = '{$today}', transaction_number = {$number} where id = '{$value}'";
    $public->query($loadUpdateForTransaction);
    }

    $deductionRegistration = array(
    "type"=>'driver deductions', 
    "date"=>date('m/d/Y'),
    "amount"=>$data->deductions->deduction,
    "description"=>$data->deductions->description,
    "driver_id"=>$data->owner_id,
    "transaction_number"=>$number
    );

    $public->insert($deductionRegistration, 'deductions');
}
?>


