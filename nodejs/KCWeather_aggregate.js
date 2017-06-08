
db.KCWeather.aggregate([
	{
		$match:
		{
			"KC_YRMODAHRMN" : {
						        $gte : ISODate("2014-01-01T00:00:00.000+0000"),
						        $lt : ISODate("2015-01-01T00:00:00.000+0000")
    						}
		}
	},
	{
		$group : {_id : {day: { $dayOfMonth: "$KC_YRMODAHRMN" },month: { $month: "$KC_YRMODAHRMN" },  year: { $year: "$KC_YRMODAHRMN" } }
					, KCWeather : {$push : "$$ROOT"}
				}
	},
	{
		$project :{_id :0}
	}
])
