<?php
require 'vendor/autoload.php';

$username = "";
$password = "";
$retarr = array();

try {
// Specifying the username and password in the connection URI (preferred)
$mongo = new MongoDB\Driver\Manager("mongodb://${username}:${password}@localhost:27017/traffic");


//$IntId = 7289;
//$filter = ['IntId' => $IntId];
$filter = [];
$options = ['projection' => ['_id' => 0,'Name' => 1,'Latitude' => 1,'Longitude' => 1,'DateCreated' => 1,'IntId' => 1]];

$query = new MongoDB\Driver\Query($filter, $options);

$rows = $mongo->executeQuery('traffic.detectorstation', $query); // $mongo contains the connection object to MongoDB

//$retarr = $rows->toArray();
foreach($rows as $r){
	array_push($retarr,array($r-> Name,$r-> Latitude,$r->Longitude, $r->DateCreated, $r->IntId));
}
// encode as a JSON object to return to javascript
echo json_encode($retarr);

} catch (Exception $e) {
	echo $e->getMessage(), "\n";
}

?>
