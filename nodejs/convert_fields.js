var c=0;
var arr = [0,0.0,0,0.0,0];
var cursor = db.testagg.find()

cursor.forEach(function (doc) {
if (c%3==0 && c!=0)
{
  	arr[0] = arr[0] + doc. Station_Count
	arr[1] = arr[1] + doc. Station_Volume
	arr[2] = arr[2] + doc. Station_Speed
	arr[3] = arr[3] + doc. Lane1_Data
	arr[4] = arr[4] + doc. Lane2_Data
	print((doc.SampleTime).toGMTString() + " " + arr)
	arr = [0,0.0,0,0.0,0]
}
else
{
	arr[0] = arr[0] + doc. Station_Count
	arr[1] = arr[1] + doc. Station_Volume
	arr[2] = arr[2] + doc. Station_Speed
	arr[3] = arr[3] + doc. Lane1_Data
	arr[4] = arr[4] + doc. Lane2_Data
}
c++
})