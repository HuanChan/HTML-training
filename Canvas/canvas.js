window.onload = init;

function init() {
/*     // 检测浏览器是否支持画布
    var canvas = document.getElementById("tshirtCanvas");
    if (canvas.getContext) {
        //检查方法getContext()是否存在
        drawCanvas();
    }
    else{
        alert("您的浏览器IE9以下不支持画布，请升级您的浏览器");
    } */

    // 单击预览按钮
    var button = document.getElementById("previewButton");
    button.onclick = previewHandler;
}

/* function drawCanvas() {
    var canvas = document.getElementById("tshirtCanvas");
    var context = canvas.getContext("2d");
    // context是与画布关联的一个对象（接口），用来确定绘制的类型：2d，3d等。
    // 我们使用2d上下文在画布上绘制一个填充矩形。
    context.fillRect(10,20,200,100);
    // 左上角坐标体系；x=10,y=20。矩形长宽:x=200,y=100。
} */

function previewHandler() {
    var canvas = document.getElementById("tshirtCanvas");
    var context = canvas.getContext("2d");
    // 要在画布中绘制，首先需要创建一个上下文congtext。
    // 上下文context是一个对象，用来控制对画布canvas的访问。
    // canvas和context：在画布canvas中生成context。
    // 使用对象context属性和方法访问画布。

    fillBackgroundColor(canvas, context);
    // 绘制背景色

/*     // 画一个三角形triangle
    context.beginPath();
    // 开始一个路径
    context.moveTo(100,150);
    // 设置路径起始点
    context.lineTo(250,75);
    // 从起始点到这个新点(250,75)画一条线。
    context.lineTo(125,30);
    // 从上一点到(125,30)，完成三角形第二条边的路径。
    context.closePath();
    // 关闭路径：把最后一个点和起始点用线连接，完成一个闭合的图形路径。
    context.lineWidth = 5;
    // 完成路径，然后使用笔沿路径画线：它的线宽为5px
    context.stroke();
    // stroke，划。绘制已定义的路径。
    context.fillStyle = "red";
    // 填充颜色：红色。
    context.fill(); */

    var selectObj = document.getElementById("shape");
    // 获得一个数组selectObj
    var index = selectObj.selectedIndex;
    // 获得数组的索引index
    var shape = selectObj[index].value;
    // 获得数组元素的值
    if (shape == "squares") {
        for (var i = 0; i < 20; i++) {
            // for()循环：会不停的循环20次，从0~19.
            drawSquare(canvas, context);
        }
    }else if (shape == "circles") {
        for (var i = 0; i < 20; i++) {
            drawCircle(canvas, context);
        }
    }
    drawText(canvas, context);
    drawText2(canvas, context);
    // 绘制文本
    drawBird(canvas, context);
    // 绘制图像
}

function fillBackgroundColor(canvas, context) {
    var selectObj = document.getElementById("backgroundColor");
    var index = selectObj.selectedIndex;
    /* selectedIndex 属性可设置或返回下拉列表中被选选项的索引号。
    注释：若允许多重选择，则仅会返回第一个被选选项的索引号。 */
    var bgColor = selectObj[index].value;
    //这里获得bgColor=value="white"or"black"

    context.fillStyle = bgColor;
    //一般来说，JS中设置属性值要加双引号""见下文，如果不加双引号，那么JS就会认为这个属性名是一个变量而不是一个字符串。
    //但是，假设你有一个变量fgColor="black"，可以写出代码context.fillStyle=fgColor，因为fgColor的值是“black”。
    context.fillRect(0,0,canvas.width,canvas.height);
    // 哗了狗，0写成o。
}

function drawSquare(canvas, context) {
    var w = Math.floor(Math.random() * 40);
    //指定宽度：0~40之间的整数
    var x = Math.floor(Math.random() * canvas.width);
    //指定x轴：0~画布宽度
    var y = Math.floor(Math.random() * canvas.height);
    //指定y轴：0~画布高度
    context.fillStyle = "lightblue";
    //填充颜色：当context中设置一个属性fillStyle，告诉画布canvas“不管你接下来画什么，都要使用这个颜色”。
    //CSS中设置属性不需要引号，JS和HTML需要引号。
    context.fillRect(x,y,w,w);
    //创建矩形：坐标轴和宽度
}

function drawCircle (canvas, context) {
    var x = Math.floor(Math.random() * canvas.width);
    var y = Math.floor(Math.random() * canvas.height);
    var r = Math.floor(Math.random() * 40);
    context.beginPath();
    context.arc(x, y, r, 360, 0, true);
    context.stroke();
    // 绘制已定义的路径
    context.lineWidth = 5;
    context.strokeStyle = "black";
    // 设置或返回用于笔触的颜色、渐变或模式
    context.fillStyle = "red";
    context.fill();
    // 填充当前绘图（路径）
}

function updateTweets(tweets) {
    var tweetsSelection = document.getElementById("tweets");

    for (var i = 0; i < tweets.length; i++){
        tweet = tweets[i];
        //从数组中得到一个微博
        var option = document.createElement("option");
        option.text = tweet.text;
        // <option> text </option>
        option.value = tweet.text.replace("\"", "'");
        // 将tweet.text中的双引号改为单引号，可以避免HTML中格式化问题。
        tweetsSelection.options.add(option);
        // 然后取这个新选项，把它增加到表单中的tweet选择元素。
        tweetsSelection.selectedIndex = 0;
        // 最后，确保选中第一个微博。
    }
}

function drawText(canvas, context) {
    var selectObj = document.getElementById("foregroundColor");
    var index = selectObj.selectedIndex;
    var fgColor = selectObj[index].value;
    // 在画布中插入第一行文字：我看到这个微博
    context.fillStyle = fgColor;
    // 设置填充颜色
    context.font = "bold 1em sans-serif";
    // 设置字体属性，可以使用CSS中使用的相同格式。
    context.textAlign = "left";
    // 设置字体对齐方式
    context.fillText("我看到这个微博", 20, 40);
    // 设置填充的字体，一共四个属性：字体内容，字体最大宽度，x轴坐标，y轴坐标。
    
    // 在画布中插入微博
    var selectObj = document.getElementById("tweets");
    var index = selectObj.selectedIndex;
    var tweet = selectObj[index].value;
    context.font = "italic 1.2em serif";
    context.fillText(tweet, 30, 100);
}

function drawText2(canvas, context) {
    var selectObj = document.getElementById("foregroundColor");
    var index = selectObj.selectedIndex;
    var fgColor = selectObj[index].value;
    context.fillStyle = fgColor;    
    context.font = "bold 1em sans-serif";
    // 粗体 1倍字体 无衬线字体
    context.textAlign = "right";
    // 右对齐
    context.fillText("我获取的是这件糟糕的T",
        canvas-20, canvas-40);
}

function drawBird(canvas, context) {
    var twitterBird = new Image();
    // Image()是构建函数，用于创建一个对象：图像
    twitterBird.src = "twitterBird.png";
    twitterBird.onload = function() {
        context.drawImage(twitterBird, 20, 120, 70, 70);
        // “20,120”:坐标。“70,70”：图像长宽。
    };
}