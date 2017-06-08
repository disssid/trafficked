<?php
require 'vendor/autoload.php';

$username = "";
$password = "";

    
$dataarray = $_POST["paradata"];
$timearray = $_POST["timedata"];
//var_dump($timearray);
 //   echo $dataarray;
  // $intdata = new MongoDB\BSON\Persistable((int)$dataarray);
    $intdata = (int)$dataarray;
    //$intdata = intval($dataarray);
$retarr = array ();

try {
	
	// Specifying the username and password in the connection URI (preferred)
	$mongo = new MongoDB\Driver\Manager ( "mongodb://${username}:${password}@localhost:27017/traffic" );
	/*

	$milliseconds2 = strtotime ( "2007-01-02T00:00:00.000" );
	$mongodt1 = new MongoDB\BSON\UTCDateTime ( $milliseconds1 );
	$mongodt2 = new MongoDB\BSON\UTCDateTime ( $milliseconds2 );*/

	
	// Query to be run on the collection
	// $query = new MongoDB\Driver\Query($filter, $options);
	//$milliseconds1 = strtotime ( "2014-01-01T00:00:00.000" );
	$mongodt1 = new MongoDB\BSON\UTCDateTime ( $timearray );
	$command = new MongoDB\Driver\Command ( [ 
			'aggregate' => "AGGdata",
			'pipeline' => [ 
					 
							['$match' =>
									['DSIntId' => $intdata,
										'SampleTime' => ['$gte' => $mongodt1]	
									]
                  
							 
					],
				/*	[
					        '$group' => ['_id'=>'$DSIntId'
					                    ]
					],*/
					[ 
							'$lookup' => [ 
									'from' => "detectorstation",
									'localField' => "DSIntId",
									'foreignField' => "IntId",
									'as' => "traffic_stn_loc" 
							] 
					],
					[ 
							'$project' => [ 
									'_id' => 0,
									'DSIntId' => 1,
									'SampleTime' => 1,
                                    'Station_Volume' => 1,
                                    'Station_Count' => 1,
                                    'Station_Speed' => 1,
                                    'Station_Occupancy' => 1,
									'traffic_stn_loc' => [ 
									'Name' => 1,
									'Latitude' => 1,
									'Longitude' => 1
									] 
							] 
					],
					[ 
							'$limit' => 1
					] 
			] 
	
	] );
	// execute the command and store the results in the query
	$cursor = $mongo->executeCommand ( 'traffic', $command );
    //var_dump($cursor);
	//push the cursor results into an array
	$resarr = $cursor->toArray ();
    //var_dump($resarr);
	//get the array of result objects
	$resarrobjarr = $resarr [0]->result;
	//print_r($resarrobjarr);
	foreach($resarrobjarr as $val){
	//access the array[n]->Property Name to the value
		$resmilliseconds = ($val-> SampleTime -> milliseconds)/1000;
	//	echo $resmilliseconds;
	//	print_r( $val->DSIntId, + " " + date(($val-> SampleTime)/1000));
        
        array_push($retarr,array($val-> DSIntId, $val-> Station_Volume,$val-> Station_Count,$val-> Station_Speed,$val-> Station_Occupancy));
        
      //  echo $val-> DSIntId ;
      //  echo $resmilliseconds + "\n";
		//echo "\n";
		}
	
	//echo "\n";
   echo json_encode($retarr);
    //print_r($retarr);
} catch ( Exception $e ) {
	echo $e->getMessage (), "\n";
}

?>
