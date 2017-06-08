
db.prjdata.aggregate([
	  {
		$lookup:
		{
			from: "detectorstation",
			localField: "DSIntId",
			foreignField: "IntId",
			as: "traffic_stn_loc"
		}
	  },
	  {
		$project:
		{
			DSIntId : 1,
			"traffic_stn_loc": 
			{
				IntId: 1,
				Name: 1,
				Latitude: 1,
				Longitude: 1
			}
		}
	}
])
