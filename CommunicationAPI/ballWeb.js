var lastReportTime = 0;

window.onload = init;

function init() {
    var interval = setInterval(handleRefresh, 3000);
    handleRefresh();
}

////定时刷新的JSONP
function handleRefresh() {
    //console.log("here"); 这是什么意思？
    var url = "http://gumball.wickedlysmart.com" +
        "?callback=updateSales" +
        "&lastReportTime=" + lastReportTime +
        "&random=" + (new Date()).getTime();
	var newScriptElement = document.createElement("script");
	newScriptElement.setAttribute("src",url);
	newScriptElement.setAttribute("id","jsonp");
	var oldScriptElement = document.getElementById("jsonp");
	var head = document.getElementsByTagName("head")[0];
	if (oldScriptElement == null) {
		head.appendChild(newScriptElement);
	}else {
		head.replaceChild(newScriptElement, oldScriptElement);
	}
}

//ball.html页面最后Web服务传回JSONP，以下是处理JSONP对象代码。
//JSONP代码量相对JSON少很多。
function updateSales(sales) {
    //Web服务使用updateSates()函数传回JSONP对象sales。
	var salesDiv = document.getElementById("sales");
	for (var i = 0; i < sales.length; i++) {
		var sale = sales[i];
		var div = document.createElement("div"); //创建<div>元素，用来存储sale对象中的元素
		div.setAttribute("class","saleItem");  //为每个新建的<div>元素设置属性：指定类<class>为saleItem
		div.innerHTML = sale.name + " 卖出 " + sale.sales + " 个球ball"; //<div>元素中插入HTML内容

        if (salesDiv.childElementCount == 0) {
            salesDiv.appendChild(div);	//在salesDiv下，附加子孙<div>元素
        }
        else {
            salesDiv.insertBefore(div, salesDiv.firstChild);
            //在saleDiv第一个子元素之前插入div
            //fk，saleDiv少了一个“s”。
        }
	}
	
	if (sales.length > 0) {
        lastReportTime = sales[sales.length - 1].time;
        //确定报告的最后时间
	}
}