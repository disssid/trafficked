<?php
require 'vendor/autoload.php';

$username="";
$password="";
    
$milliseconds1 = $_POST["paratime"];

    //print_r( "$milliseconds"+$milliseconds);
$retarr = array();

try {
// Specifying the username and password in the connection URI (preferred)
$mongo = new MongoDB\Driver\Manager("mongodb://${username}:${password}@localhost:27017/traffic");

    //$date = new DateTime();
    $date = new DateTime('2014-01-01');
    $date->setTime(14, 55);
   // echo $date->format('Y-m-d H:i:s') . "\n";
   // $date->setISODate(2008, 2);
    //echo $date->format('Y-m-d') . "\n";
    
   // $date->setISODate(2008, 2, 7);
    
    //echo $date->format('Y-m-d') . "\n";
    $mongodate = $date->format('Y-m-d H:i:s');
    
    
$orig_dt = strtotime('2016-01-01 00:00:00')*1000;
//print_r($orig_dt);
    //$milliseconds1 =  strtotime($inputtime);
    //$milliseconds2 =  strtotime("2007-01-02T00:00:00.000");
    $mongodt1 = new MongoDB\BSON\UTCDateTime($milliseconds1);
    //$mongodt2 = new MongoDB\BSON\UTCDateTime($milliseconds2);
    //var_dump($mongodt->toDateTime());
    //var_dump(strtotime('2014-01-03T08:45:00.000Z'));
    $filter = ["KC_YRMODAHRMN" => ['$gte' => $mongodt1]];
   // $filter = [];
   // $options = [];
$options = ['projection' => ['_id' => 0,'KC_DIR' => 1,'KC_SPD' => 1,'KC_GUS' => 1,'KC_TEMP' => 1,'KC_MAX' => 1,'KC_MIN' => 1,'KC_SD' => 1,'KC_YRMODAHRMN' => 1], 'limit' => 1];

//dont need to change for this line
$query = new MongoDB\Driver\Query($filter, $options);
   //var_dump($query);
   // $query = array(
       //            'sessions' => array( '$gt' => 1 ),
            //       'n_friends' => array( '$lt' => 50 ),

$rows = $mongo->executeQuery('traffic.KCWeather', $query); // $mongo contains the connection object to MongoDB


foreach($rows as $r){
	array_push($retarr,array($r-> KC_DIR,$r-> KC_SPD,$r->KC_GUS,$r->KC_TEMP,$r->KC_MAX,$r->KC_MIN,$r->KC_SD));
}
// encode as a JSON object to return to javascript
echo json_encode($retarr);

} catch (Exception $e) {
	echo $e->getMessage(), "\n";
}

?>
