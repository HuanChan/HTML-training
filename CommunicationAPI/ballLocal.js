window.onload=init;
function init(){
	//请求JSON格式数据
	var url="http://localhost/CommunicationAPI/sales.json";//测试一个本地文件
	/*var url="http://gumball.wickedlysmart.com/";*/
	var request=new XMLHttpRequest();
	request.open("GET",url);
	request.onload=function(){
		if(request.status==200){
			updateSales(request.responseText);//请求到数据时调用函数updateSales
		}
	};
	request.send(null);
}

function updateSales(responseText){
	var salesDiv=document.getElementById("sales");
	/*salesDiv.innerHTML=responseText;*/
	var sales=JSON.parse(responseText);	//将请求得到的JSON串解析为对象：数组sales（该数组包含一堆对象）
	for(var i=0;i<sales.length;i++){
		var sale=sales[i];
		var div=document.createElement("div"); //创建<div>元素，用来存储sale对象中的元素
		div.setAttribute("class","saleItem");  //为每个新建的<div>元素设置属性：指定类<class>为saleItem
		div.innerHTML=sale.name+"卖出"+sale.sales+"球ball"; //<div>元素中插入HTML内容
		salesDiv.appendChild(div);	//在salesDiv下，附加子孙<div>元素
	}
}