/***给一条狗赋予属性
var fido={
	
	name:"Fido",//[,]作为分隔
	weight:40,
	breed:"Mixed",
	loves:["walk","fetching balls"],
	//数组作为值。
	
	bark:function(){
	//我们使用了匿名函数，并把它赋给对象的bark属性。
		alert("Woof woof!");
	}
	//向对象增加一个函数，我们不说“对象中的函数”，而会说这是一个方法。

};

var likes=fido.loves;

var likesString="Fido likes";

for(var i=0; i<likes.length; i++){
	
	likesString += "" + likes[i];
	
}
alert(likesString);
***/


//属性shoutimes既不是局部变量，也不是全局变量。
//我们要在方法getNextShowing中引用这个属性showtimes，只能使用this关键字。
var movie1={

	title:"Plan 9 from Outer Space",
	genre:"Cult Classic",
	rating:5,
	showtimes:["3:00pm","7:00pm","11:00pm"],
	
	getNextShowing:function(){
		var now=new Date().getTime();
		//获取当前时间
		for(var i=0;i<this.showtimes.length;i++){
			var showtime=getTimeFromString(this.showtimes[i]);
			if((showtime-now)>0){
				return "Next showing of"+this.title+"is"+this.showtimes[i];
			}
		}
		return null;
	}	
};
var nextShowing=movie1.getNextShowing();
alert(nextShowing);
//调用对象movie1的方法getNextShowing()
