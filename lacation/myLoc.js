window.onload=getMyLocation;

function getMyLocation(){
	//获取当前位置
	if(navigator.geolocation){
		//利用这个检查来确保浏览器支持地理定位API。
		//如果navigator.geolocation对象存在，说明这个浏览器支持这个API。
		navigator.geolocation.getCurrentPosition(displayLocation,displayError);
		//如果浏览器支持地理定位API，则调用getCurrentPosition()方法。
		//并传入一个处理函数displayLocation。
		//displayLocation()函数将要操纵位置的处理程序。
	}else{
		alert("Oops,no geolocation support");
	}
};

//navigator.geoLocation存在，那么调用方法getCurrentLocation()，并传入函数displayLocation
function displayLocation(position){
	
	var latitude=position.coords.latitude;
	//获取纬度。latitude，纬度。coords，坐标。
	var longitude=position.coords.longitude;
	//获取经度。
	
	//显示当前的坐标
	var div=document.getElementById("location");
	div.innerHTML="你的纬度是"+latitude+",经度"+longitude;
	div.innerHTML+="（精度："+position.coords.accuracy+"米）";
	
	//显示亮点之间的距离
	var km = computeDistance(position.coords, ourCoords);
	var distance = document.getElementById("distance");
	distance.innerHTML = "You are " + km + " km from the WickedlySmart HQ";
	
};

//navigator.geoLocation不存在，那么调用方法getCurrentLocation()，并传入函数displayError
function displayError(error){
	
	var errorTypes={
		o:"未知错误",
		1:"permission denied by user用户拒绝访问",
		2:"position is not available位置不可用",
		3:"Request timed out请求超时",
	};
	//创建一个对象，包含四个错误消息属性。
	
	var errorMessage=errorTypes[error.code];
	//使用error.code属性，将一个错误消息串赋给一个新变量errorMessage。
	if(error.code==0 || error.code==2){
		//错误0和2
		
		errorMessage=errorMessage+""+error.message;		//对于错误0和2，有时error.message属性中会有一些额外的信息。所以把这些信息加到errorMessage串中。
	}
	var div=document.getElementById("location");
	div.innerHTML=errorMessage;
	//让用户知道。
};

// --------------------- Ready Bake ------------------
//
// Uses the Spherical Law of Cosines to find the distance
// between two lat/long points
//测量两点之间的距离
function computeDistance(startCoords, destCoords) {
	var startLatRads = degreesToRadians(startCoords.latitude);
	var startLongRads = degreesToRadians(startCoords.longitude);
	var destLatRads = degreesToRadians(destCoords.latitude);
	var destLongRads = degreesToRadians(destCoords.longitude);

	var Radius = 6371; // radius of the Earth in km
	var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + 
					Math.cos(startLatRads) * Math.cos(destLatRads) *
					Math.cos(startLongRads - destLongRads)) * Radius;

	return distance;
};

function degreesToRadians(degrees) {
	radians = (degrees * Math.PI)/180;
	return radians;
};