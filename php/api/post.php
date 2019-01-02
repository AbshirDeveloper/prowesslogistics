<?php
require_once("../data/database_connection.php");
require_once("../data/newFunctions.php");
require_once("../data/sessions.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-type: application/json');

date_default_timezone_set("America/Chicago");

$data = json_decode(file_get_contents("php://input"));

if($data) {
if(isset($data->broker_type)){
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
    $response = $public->insert($registration, $table);
} else if (isset($data->registeringDriver)) {
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
$response = $public->insert($registration, $table);
} else if( isset($data->charge)) {
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
        "charge"=>$data->total
        // "fuel_rate"=>$data->fuel_rate,
        // "fuel_charge"=>$data->fuel_charge
);
$response = $public->insert($registration, $table);
} else if (isset($data->comments)){
    $loadUpdate = "update loads set carrier = '', carrier_contact_name = '', carrier_contact_phone = '', driver = 'Not assigned', truck_number = 'Unknown', trailer_number = 'Unknown', status = 'Unassigned', assigned = 0, comments = '{$data->comments}' where id = '{$data->id}' limit 1";
    $public->query($loadUpdate);
} else if (isset($data->always)){
    $status = $data->checked ? 'Active' : 'Inactive';
    $loadUpdate = "update driver set status = '{$status}' where id = '{$data->id}' limit 1";
    $public->query($loadUpdate);
} else if (isset($data->owner_id)){
    $table = 'transactions';
    $registration = array(
        "type"=>$data->type, 
        "date"=>date('m/d/Y'),
        "amount"=>$data->amount,
        "owner_id"=>$data->owner_id,
        "total_deductions"=>$data->total_deductions,
        "number_of_loads"=>$data->number_of_loads,
        "afterFactoring"=>$data->afterFactoring
    );
    $response = $public->insert($registration, $table);

    if($data->selectedLoads) {
        $returnedTransaction = $public->select("transactions", "where owner_id = $data->owner_id");
        $number = $returnedTransaction[0]['id'];
        $today = date('m/d/Y');
    foreach ($data->selectedLoads as $value) {
    $loadUpdateForTransaction = "update loads set settled = 'yes', date_settled = '{$today}', transaction_number = {$number} where id = '{$value}'";
    $public->query($loadUpdateForTransaction);
    }
    } else if($data->selectedLoad){
        $returnedTransaction = $public->select("transactions", "where owner_id = $data->owner_id");
        $number = $returnedTransaction[0]['id'];
        $today = date('m/d/Y');
        foreach ($data->selectedLoad as $value) {
        $loadUpdateForTransaction = "update loads set billed = 'Yup', billed_date = '{$today}', net_profit = {$value->netProfit} where id = '{$value->id}'";
        $public->query($loadUpdateForTransaction);  
        }
    }

    foreach ($data->deductions as $value) {
    $deductionRegistration = array(
        "type"=>"{$data->type}",  
        "date"=>date('m/d/Y'),
        "amount"=>$value->deduction,
        "description"=>$value->description,
        "driver_id"=>$data->owner_id,
        "transaction_number"=>$number
    );
    $public->insert($deductionRegistration, 'deductions');
    }

    $updateAdvance = "Update advance set paid = 'yes' where owner_id = $data->owner_id";
    $public->query($updateAdvance);
    echo json_encode($data);

} else if (isset($data->toA)) {
    if($data->toA === 'Driver'){
    $returnedTransaction = $public->select("driver", "where id = $data->id");
    $name = $returnedTransaction[0]['name'];
    } else {
    $returnedTransaction = $public->select("dispatcher", "where id = $data->id");
    $name = $returnedTransaction[0]['contact_name'];   
    }
    $table = 'advance';
    $registration = array(
        "toA"=>$data->toA, 
        "date"=>date('m/d/Y'),
        "amount"=>$data->amount,
        "load_number"=>$data->loadNumber,
        "owner_id"=>$data->id,
        "name"=>$name
    );
    $response = $public->insert($registration, $table);
} else if (isset($data->delete)) {
    $query = "delete from advance where id = $data->id limit 1";
    $public->query($query);

} else if (isset($data->staff)) {
    $table = 'staff';
    $password = $public->password_encrypt('staff@prowess');
    $registration = array(
        "type"=>$data->staff,
        "name"=>$data->name, 
        "date"=>date('m/d/Y'),
        "email"=>$data->email,
        "password"=>$password,
        "phone"=>$data->phone,
        "registration"=>$data->registration,
        "deletion"=>$data->deletion,
        "dispatching"=>$data->dispatching,
        "billing"=>$data->billing,
        "seeReports"=>$data->seeReports,
        "payAdvance"=>$data->payAdvance,
        "reset"=>'yes'
    );
    $response = $public->insert($registration, $table);
} else if (isset($data->updatingStaff)) {
    $loadUpdateStaff = "update staff set 
        name = '{$data->name}', 
        phone = '{$data->phone}', 
        email = '{$data->email}', 
        registration = '{$data->registration}',
        deletion = '{$data->deletion}',
        dispatching = '{$data->dispatching}',
        billing = '{$data->billing}',
        seeReports = '{$data->seeReports}',
        payAdvance = '{$data->payAdvance}',
        status = '{$data->status}'
        where id = $data->id";
    $public->query($loadUpdateStaff);
} else if (isset($data->password)) {
    $response = $public->login($data->email, $data->password);
    echo json_encode($response);
} else if (isset($data->newPasswordOne)){
    $password = $public->password_encrypt($data->newPasswordOne);
    $passwordReset = "update staff set 
    password = '{$password}', reset = '' where id = $data->id limit 1";
    $response = $public->query($passwordReset);
    if($response) {
    echo json_encode('success');
    } else {
    echo json_encode('failed');
    }
    
} else if (isset($data->staffDeleting)) {
    $query = "delete from staff where id = $data->id limit 1";
    $public->query($query);
} else if(isset($data->driver)){
    $loadUpdateQuery = "update loads set 
        driver = '{$data->driver->name}', 
        driver_id = '{$data->driver->id}', 
        assigned = 1, 
        truck_number = '{$data->driver->truck_number}', 
        trailer_number = '{$data->driver->trailer_number}', 
        status = 'Assigned' 
        where id = '{$data->load->id}' limit 1";
$public->query($loadUpdateQuery);
} else if(isset($data->carrier)) {
    $loadCarrier = "update loads set 
        carrier = '{$data->carrier->company_name}', 
        assigned = 1, 
        carrier_contact_name = '{$data->carrier->contact_name}', 
        carrier_contact_phone = '{$data->carrier->phone}', 
        status = 'Assigned to a Carrier ({$data->carrier->company_name})'
        where id = '{$data->load->id}' limit 1";
    $public->query($loadCarrier);
} else if (isset($data->toBeEdited)){
    $driverUpdate = "update driver set 
        name = '{$data->name}', 
        email = '{$data->email}', 
        dob = '{$data->dob}', 
        address = '{$data->address}', 
        phone = '{$data->phone}',
        type = '{$data->type}', 
        experience = '{$data->experience}',
        license ='{$data->license}', 
        dl_expiration = '{$data->dl_expiration}',
        dot_medical_card_expiration = '{$data->dot_medical_card_expiration}', 
        truck_number = '{$data->truck_number}', 
        trailer_number = '{$data->trailer_number}',
        advance_money_eligible = '{$data->advance_money_eligible}',
        driver_insurance = '{$data->driver_insurance}',
        insurance_company = '{$data->insurance_company}',
        insurance_expiration_date = '{$data->insurance_expiration_date}',
        group_no = '{$data->group_no}',
        id_no = $data->id_no
        where id = $data->id";

    $public->query($driverUpdate);  
} else if (isset($data->loadToBeEdited)){

    $loadUpdate = "update load set
        truck_number = $data->truck_number,
        trailer_number = $data->trailer_number,
        miles = $data->miles,
        status = $data->status,
        ref_id =  $data->ref_id, 
        eq_type = $data->eq_type,
        length = $data->length, 
        temp = $data->temp, 
        size = $data->size,
        commo = $data->commo, 
        weight = $data->weight, 
        notes = $data->notes,
        shipper = $data->shipper, 
        pick_up = $data->pick_up,
        pick_up_date = $data->pick_up_date,
        shipper_notes = $data->shipper_notes,
        contact = $data->contact,
        phone = $data->phone,
        receiver = $data->receiver,
        drop_off = $data->drop_off, 
        delivery_time = $data->delivery_time,
        instruction = $data->instructions,
        contact_person = $data->contact_person,
        contact_phone = $data->contact_phone,
        rate = $data->rate,
        charge = $data->total
        where id = $data->id";

        $public->query($loadUpdate); 
}
// if(isset($data)){
    
// };

// if(isset($data->owner_id)) {

// }
}
?>


