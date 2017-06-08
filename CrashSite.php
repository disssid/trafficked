<?php
require 'vendor/autoload.php';

$username="";
$password="";

$retarr = array();

try {
// Specifying the username and password in the connection URI (preferred)
$mongo = new MongoDB\Driver\Manager("mongodb://${username}:${password}@localhost:27017/traffic");


$milliseconds1 =  strtotime('2010-01-03T08:45:00.000');
$milliseconds2 =  strtotime("2015-01-02T00:00:00.000Z");
//var_dump($milliseconds1);
$mongodt1 = new MongoDB\BSON\UTCDateTime(1198456000000);
//$mongodt1 = new MongoDB\BSON\UTCDateTime($milliseconds1);
$mongodt2 = new MongoDB\BSON\UTCDateTime($milliseconds2);
//var_dump($mongodt->toDateTime());
//var_dump(strtotime('2014-01-03 08:45:00.000'));
$filter = ["DATETIME_OF_AC" => ['$gte' => $mongodt1] ];
//var_dump($mongodt1);
//$filter = [];
$options = ['projection' => ['_id' => 0,'AT_ROAD_NA' => 1,'DOT_LATITU' => 1,'DOT_LONGIT' => 1, 'DATETIME_OF_AC' => 1], 'limit' => 4000];

//dont need to change for this line
$query = new MongoDB\Driver\Query($filter, $options);
//var_dump($query);

$rows = $mongo->executeQuery('traffic.crashGeometry', $query); // $mongo contains the connection object to MongoDB


foreach($rows as $r){
	array_push($retarr,array($r-> AT_ROAD_NA,$r-> DOT_LATITU,$r->DOT_LONGIT, $r ->DATETIME_OF_AC));
}
// encode as a JSON object to return to javascript
echo json_encode($retarr);

} catch (Exception $e) {
	echo $e->getMessage(), "\n";
}

?>
