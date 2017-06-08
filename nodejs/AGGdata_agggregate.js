
db.AGGdata.aggregate([
	{
		$match:
		{
			"SampleTime" : {
						        $gte : ISODate("2014-01-01T00:00:00.000+0000"),
						        $lt : ISODate("2014-01-02T00:00:00.000+0000")
    						}
		}
	},
	{
		$project :{
						"minu" : {$minute : "$SampleTime"}
					}
	},
	{
		$group : {_id : {day: { $dayOfMonth: "$SampleTime" },month: { $month: "$SampleTime" },  year: { $year: "$SampleTime" } , dsitit : "$DSIntId", "$_id.minu":[5, 10, 15]} 
					, Aggdata : {$push : "$$ROOT"}
				}
	}
], {allowDiskUse:true}
)