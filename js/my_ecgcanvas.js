var canvas = null;
var canvasline = null;
var ctx = null;
var linectx = null;
var width = 0;
var height = 0;

var bigGridWidth = 25;  //大网格宽度
var bigGridHeight = 25;  //大网格高度
var smallGridWidth = bigGridWidth / 5;  //小网格宽度
var bigLineWidth = 2;
var smallLineWidth = bigLineWidth/2;
var ecgMax = 105;  //心电y轴方向最大值
var count=0;
var ecgOneGroupData = new Array(); 
var ecgPerCount = 10;
var mStartX = 0;
var ecgXOffset = bigGridWidth / ecgPerCount;
var changeEcgData;  //把方法从ready()中抽出来供外部
var marginToNextLine = 35;
var listArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -2, -1, 3, 2, -7, -13, -13, -27, -67, -107, -107, -67, -27, -13, -14, -8, 1, 3, 0, -3, -5, -11, -14, -23, -34, -31, 3, 54, 79, 57, 15, -13, -19, -17, -17, -15, -8, -2, -2, -2, -2, -2, -3, -3, -3, -4, -4, -5, -6, -7, -8, -7, -6, -4, -2, 0, 2, 5, 8, 10, 12, 13, 13, 11, 9, 7, 5, 3, 2, 1, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -6, -12, -15, -22, -32, -26, 8, 55, 72, 47, 5, -17, -17, -13, -13, -12, -6, -1, -1, -2, -2, -1, -2, -3, -4, -4, -4, -5, -6, -7, -7, -6, -5, -3, 0, 1, 3, 6, 8, 11, 12, 13, 12, 10, 7, 6, 4, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -2, -8, -12, -15, -23, -32, -21, 17, 60, 69, 38, -1, -18, -15, -11, -12, -10, -4, -1, -1, -2, -2, -2, -2, -2, -3, -3, -5, -6, -6, -6, -6, -6, -5, -3, -1, 1, 3, 5, 9, 11, 12, 11, 10, 9, 8, 5, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, 0, 0, 0, 0, 0, 0, -1, -1, 0, 1, 1, -3, -10, -14, -20, -32, -35, -8, 42, 76, 65, 23, -10, -18, -15, -15, -15, -9, -2, -1, -2, -3, -2, -1, -2, -4, -5, -5, -6, -6, -6, -6, -6, -6, -5, -3, 0, 1, 4, 7, 9, 11, 12, 12, 11, 10, 8, 6, 4, 2, 1, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, -1, 0, 1, 1, -3, -11, -16, -21, -33, -41, -21, 30, 78, 82, 44, 2, -16, -18, -17, -17, -13, -7, -4, -3, -3, -2, -3, -4, -5, -5, -5, -6, -8, -10, -10, -10, -9, -8, -5, -1, 2, 5, 8, 11, 14, 16, 16, 15, 14, 12, 9, 6, 4, 2, 1, 0, 0, 0, 0, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, -1, -1, -1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, -2, -9, -15, -19, -29, -40, -33, 7, 61, 87, 65, 20, -11, -21, -22, -23, -19, -11, -4, -3, -3, -2, -3, -3, -4, -3, -3, -4, -7, -8, -6, -5, -5, -1, 11, 25, 27, 17, 6, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, -1, 0, 1, 0, -6, -13, -17, -26, -39, -36, 0, 54, 81, 61, 17, -11, -16, -14, -15, -13, -7, -1, -1, -2, -2, -1, -1, -2, -3, -4, -5, -5, -6, -6, -7, -7, -6, -4, -2, 0, 2, 5, 8, 10, 11, 12, 12, 11, 9, 7, 5, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -2, -1, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 1, -2, -8, -14, -18, -29, -38, -24, 22, 69, 78, 44, 2, -18, -19, -18, -17, -13, -5, -1, -2, -2, -1, -1, -2, -2, -3, -4, -5, -5, -6, -7, -7, -7, -6, -4, -2, 0, 3, 5, 7, 9, 11, 12, 11, 9, 8, 6, 4, 2, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 1, 0, -6, -11, -15, -23, -37, -35, 0, 53, 79, 58, 14, -12, -16, -12, -13, -12, -6, 0, 0, -1, -1, -1, -2, -2, -3, -4, -4, -5, -5, -6, -6, -6, -5, -3, -1, 0, 2, 5, 7, 9, 11, 12, 11, 10, 9, 7, 5, 3, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -3, -10, -15, -20, -31, -38, -16, 32, 75, 75, 37, -3, -18, -17, -16, -16, -12, -4, -1, -2, -2, -2, -2, -3, -3, -3, -4, -5, -5, -5, -5, -6, -6, -5, -2, 0, 2, 4, 5, 7, 9, 10, 10, 9, 8, 6, 4, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -2, -2, -1, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, -4, -11, -14, -20, -34, -41, -15, 38, 78, 69, 27, -7, -16, -13, -13, -14, -9, -3, -1, -2, -2, -2, -2, -2, -2, -2, -3, -4, -5, -6, -6, -6, -5, -3, -2, 0, 1, 4, 6, 9, 10, 11, 12, 11, 9, 7, 5, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -6, -12, -16, -24, -35, -31, 5, 56, 81, 59, 15, -13, -18, -16, -16, -14, -8, -2, -2, -3, -2, -2, -1, -2, 0, 3, 7, 8, 5, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, -4, -10, -14, -20, -33, -39, -14, 37, 75, 67, 26, -8, -16, -13, -13, -13, -9, -2, 0, -1, -2, -2, -1, -1, -2, -3, -4, -4, -5, -5, -6, -5, -5, -4, -2, 0, 2, 5, 8, 10, 11, 11, 11, 11, 9, 7, 6, 4, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 1, 1, 0, 0, 0, -1, 0, 1, 1, -3, -10, -15, -22, -35, -40, -12, 42, 81, 73, 30, -7, -18, -16, -15, -15, -9, -3, -1, -2, -2, -2, -2, -2, -2, -2, -3, -2, -2, -3, -3, -4, -4, -5, -5, -6, -5, -5, -5, -3, -1, 0, 2, 4, 6, 8, 9, 9, 9, 8, 7, 5, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, -4, -11, -14, -20, -34, -40, -13, 40, 79, 69, 26, -8, -16, -13, -13, -14, -8, -2, 0, -2, -2, -2, -2, -3, -3, -4, -5, -5, -5, -6, -6, -6, -6, -4, -2, 0, 1, 3, 5, 6, 5, 2, 0, -3, -4, -5, -6, -7, -6, -4, -2, 0, 1, 3, 5, 8, 9, 10, 10, 9, 8, 6, 4, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, -1, -7, -11, -15, -26, -40, -29, 16, 67, 78, 45, 2, -16, -15, -13, -14, -11, -5, -1, -2, -3, -2, -2, -2, -3, -4, -4, -4, -5, -6, -6, -5, -5, -4, -3, 0, 2, 4, 5, 7, 9, 10, 10, 9, 8, 6, 5, 3, 1, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -3, -4, -3, 0, 3, 3, 1, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -5, -10, -13, -20, -36, -37, -3, 50, 80, 60, 16, -12, -17, -14, -14, -13, -7, -2, -1, -1, -1, -1, -2, -2, -2, -2, -3, -4, -5, -5, -5, -5, -4, -2, -1, 0, 2, 4, 6, 7, 9, 10, 9, 8, 7, 6, 4, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -3, -11, -16, -19, -29, -40, -26, 20, 66, 72, 36, -2, -16, -13, -11, -12, -9, -3, 0, -1, -2, -2, -2, -2, -3, -3, -4, -4, -4, -5, -5, -5, -5, -4, -3, 0, 1, 3, 5, 7, 8, 9, 10, 9, 9, 7, 5, 4, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -7];
var isOpenResultPage = false;
var firstSportUserRankData;


$(document).ready(function() {
    //alert(listArray[0]);
    //
    
    

    
    drawecg();
    //ecgConver(99);
    /*var tempStrs = "F0{sss}";
    
    console.log(tempStrs.substr(2, tempStrs.length-1));*/


    function drawecg() {
        canvas = document.getElementById("background");
        canvasline = document.getElementById("line");

        if (canvas!=null) {
            width = canvas.width;
            height = canvas.height;

            /*width = parseInt(canvas.offsetWidth);
            height = parseInt(width*0.3492);*/
            ctx = canvas.getContext("2d");
            linectx = canvasline.getContext("2d");
            linectx.strokeStyle="red";

            //console.log("width:"+width+",height:"+height);  
            //console.log("bigGridWidth:"+bigGridWidth);
            //alert("width:"+width+",height:"+height);                         
            drawgrid();
            //deawRealTimeLine();
            //window.open("result.html");
            //window.location.href="http://www.jb51.net";
        }
        
    }

    function drawgrid() {
        
        var tempLineWidth = 0;
        var tempLineHeight = 0;
        var canvasWidth = width;  //画布宽度
        var canvasHeight= height;  //画布高度
        ctx.lineWidth = bigLineWidth;  //大网格线宽度
        ctx.strokeStyle = "#C9C9C9";
        ctx.moveTo(tempLineWidth, tempLineHeight);
        ctx.lineTo(canvasWidth, tempLineHeight);
        ctx.stroke();
        //alert(canvasWidth+","+canvasWidth);
        
        while (tempLineHeight < canvasHeight) {
            tempLineHeight = tempLineHeight + bigGridHeight;
            ctx.moveTo(tempLineWidth, tempLineHeight - bigLineWidth/2);
            ctx.lineTo(canvasWidth, tempLineHeight - bigLineWidth/2);
            ctx.stroke();
        }
        tempLineHeight = 0;
        ctx.moveTo(tempLineWidth, tempLineHeight);
        ctx.lineTo(tempLineWidth, canvasHeight);
        ctx.stroke();
        while (tempLineWidth < canvasWidth) {
            tempLineWidth = tempLineWidth + bigGridWidth;
            ctx.moveTo(tempLineWidth - bigLineWidth/2, tempLineHeight);
            ctx.lineTo(tempLineWidth - bigLineWidth/2, canvasHeight);
            ctx.stroke();
        }
        ctx.lineWidth = smallLineWidth;
        ctx.strokeStyle = "#E8E8E8";
        tempLineWidth = 0;
        tempLineHeight = 0;
        canvasWidth = width;
        canvasHeight = height;
        while (tempLineHeight < canvasHeight) {
            for (var i = 0; i < 4; i++) {
                tempLineHeight = tempLineHeight + smallGridWidth;
                ctx.moveTo(tempLineWidth, tempLineHeight - smallLineWidth/2);
                ctx.lineTo(canvasWidth, tempLineHeight - smallLineWidth/2);
                ctx.stroke();
            }
        }
        tempLineWidth = 0;
        tempLineHeight = 0;
        canvasWidth = width;
        canvasHeight = height;
        while (tempLineWidth < canvasWidth) {
            for (var A = 0; A < 4; A++) {
                tempLineWidth = tempLineWidth + smallGridWidth;
                ctx.moveTo(tempLineWidth - smallLineWidth/2, tempLineHeight);
                ctx.lineTo(tempLineWidth - smallLineWidth/2, canvasHeight);
                ctx.stroke();
            }
        }
    }

    //开始画实时曲线
    function deawRealTimeLine(){
        linectx.beginPath();
        linectx.moveTo(0,height/2);
        setInterval(function(){drawWaveOneGroup()},1000/15);
        
    }

    var indexOf =  0;


    //画一组数据
    function drawWaveOneGroup(){
        //console.log("画图");
        /*for(var i=0;i<10;i++){
            ecgOneGroupData[i] = randomNumBoth(-255,255);
            //ecgOneGroupData[i] = height/2;    //
        }*/

        /*//测试
        for (i=0;i<10;i++ ){ 
            ecgOneGroupData[i] = parseInt(listArray[indexOf++]);
        } 
        if (indexOf>=listArray.length) {
            return;
        }*/

       
        clearCanvansNextMargin();
        
        if(ecgOneGroupData.length == ecgPerCount){
            for(var i=0;i<ecgPerCount;i++){
                var newX = mStartX + ecgXOffset;
                var newY = ecgConver(ecgOneGroupData[i]);
                
                linectx.lineTo(newX,newY);
                mStartX = newX;
            }
        }


        //console.log("mStartX:"+mStartX);
        
        linectx.stroke();

        //到最右端，将下标设为0，从头开始画图
        if (mStartX >= width) {
            mStartX = 0;
            //linectx.clearRect(0,0,width,height);
            linectx.closePath();  
            linectx.beginPath();  //调用次方法，path将从新算
            linectx.moveTo(0,height/2);
        }
    }

    //清除Canvans,与之前的波流出空白
    function clearCanvansNextMargin(){
        linectx.clearRect(mStartX,0,ecgXOffset*ecgPerCount+marginToNextLine,height);
    }

    //生成范围内的随机数
    function randomNumBoth(Min,Max){
          var Range = Max - Min;
          var Rand = Math.random();
          var num = Min + Math.round(Rand * Range); //四舍五入
          return num;
    }

    //将数据点转化到宽高范围内
    function ecgConver(yData){
        return (1-((yData+ecgMax)/(ecgMax*2)))*height;
    }

    var websocket = null;
    var isReceive = false;
    var isReceiveUserList = false;

           
    //判断当前浏览器是否支持WebSocket
    if('WebSocket' in window){
      //alert("a");
      //websocket = new WebSocket("ws://localhost:8080");
      //websocket = new WebSocket("ws://192.168.0.112:8080/SportMonitor/websocket");
        websocket = new WebSocket("ws://www.amsu-new.com:8081/SportMonitor/websocket");
      //alert("b");
    }
    else{
        alert('Not support websocket');
    }

    //连接发生错误的回调方法
    websocket.onerror = function(){
        setMessageInnerHTML("连接成出错error");
    };

    //连接成功建立的回调方法
    websocket.onopen = function(event){
        setMessageInnerHTML("连接成功");

        //打开之后给服务器发生json数据，让服务器推送app端的数据下来
        //{"ret":2,"errDesc":"startData"}
        //var requestDataJson = '{"ret":2,"errDesc":"startData"}';
        var requestDataJson = 'W1,网页在线';
        websocket.send(requestDataJson);

       
        

    };

    var tempStrs= new Array(); 

    //接收到消息的回调方法
    websocket.onmessage = function(){
        console.log("服务器数据："+event.data);
        console.log("curWebSocketIndex："+curWebSocketIndex);

        
        //setMessageInnerHTML(event.data);
        //var isStartAtF0 = event.data.indexOf("F0");
        //console.log("isStartAtF0："+isStartAtF0);
        
        /*实时心电数据格式：F0,28,18,6,-2,-3,0,3,5,1,-1
            app端在线（上传用户信息）：F1,http://119.29.201.120:83/usericons/f81241db11c869f3c8e57ff96538abbc.png,1,天空之城,广东省深圳市,男,24岁    (头像url,在线状态【1在线，0离线】,昵称)
                服务器给app回发：F1,服务器正常
            网页端在线：F2,网页在线
                服务器给网页回发用户列表信息：F3,{}
            网页点击获取指定用户的数据：
                F4,0   (0未服务器端在线app所在的webSocket索引(webSocketIndex))  此时如果有其他app在传输数据，让其终止传输

                */
        

        if (event.data.indexOf("A1")==0) {
            //以A1开头，是实时心电数据
            if (curWebSocketIndex==-1) {
                return;
            }
            if (!isReceive) {
                isReceive = true;
                linectx.beginPath();
                linectx.moveTo(0,height/2);
            }

            tempStrs = event.data.substr(7, event.data.length-2).split(","); //字符分割 
            console.log("tempStrs:"+tempStrs);
            for (i=0;i<tempStrs.length-1;i++ ){ 
                ecgOneGroupData[i] = parseInt(tempStrs[i]);
            } 
            //console.log("ecgOneGroupData："+ecgOneGroupData);
            //console.log("ecgOneGroupData.length："+ecgOneGroupData.length);
            drawWaveOneGroup();
        }
        if (event.data.indexOf("A4")==0) {
            //上传用户实时运动数据
            if (curWebSocketIndex==-1) {
                return;
            }
            processUserRealtimeSportData(event.data);
        }
        else if (event.data.indexOf("F3")==0){
            //用户列表数据
           /*F3,[{"c":"http://119.29.201.120:83/","username":"eric","onlinestate":1,"province":"广东省深圳市","sex":"男","age":"0岁","webSocketIndex":2,"heartRate":0,"kcal":0},{"iconUrl":"http://119.29.201.120:83/usericons/fae474ee34f1d5daa6ae1818077c8de7.png","username":"路口","onlinestate":1,"province":"山东省青岛市","sex":"男","age":"0岁","webSocketIndex":3,"heartRate":0,"kcal":7}]

           */
            var userData = event.data.substr(3, event.data.length-1);


            //console.log("userData:"+userData);

            if (canvas!=null) {
                processResponse(userData);
            }
            

            //var data = '[{"iconUrl":"url","username":"天空之城","province":"深圳","sex":"男","age":25,"prematureCount":2,"missCount":3,"overScore":3,"averageHeart":100,"averageHeartScore":4,"maxHeart":121,"maxHeartScore":4,"kcal":45,"kcalScore":2,"allscore":23,"rank":2},{"iconUrl":"url","username":"天空之城","province":"深圳","sex":"男","age":25,"prematureCount":2,"missCount":3,"overScore":3,"averageHeart":100,"averageHeartScore":4,"maxHeart":121,"maxHeartScore":4,"kcal":45,"kcalScore":2,"allscore":23,"rank":2},{"iconUrl":"url","username":"天空之城","province":"深圳","sex":"男","age":25,"prematureCount":2,"missCount":3,"overScore":3,"averageHeart":100,"averageHeartScore":4,"maxHeart":121,"maxHeartScore":4,"kcal":45,"kcalScore":2,"allscore":23,"rank":2},{"iconUrl":"url","username":"天空之城","province":"深圳","sex":"男","age":25,"prematureCount":2,"missCount":3,"overScore":3,"averageHeart":100,"averageHeartScore":4,"maxHeart":121,"maxHeartScore":4,"kcal":45,"kcalScore":2,"allscore":23,"rank":2},{"iconUrl":"url","username":"天空之城","province":"深圳","sex":"男","age":25,"prematureCount":2,"missCount":3,"overScore":3,"averageHeart":100,"averageHeartScore":4,"maxHeart":121,"maxHeartScore":4,"kcal":45,"kcalScore":2,"allscore":23,"rank":2},{"iconUrl":"url","username":"天空之城","province":"深圳","sex":"男","age":25,"prematureCount":2,"missCount":3,"overScore":3,"averageHeart":100,"averageHeartScore":4,"maxHeart":121,"maxHeartScore":4,"kcal":45,"kcalScore":2,"allscore":23,"rank":2},{"iconUrl":"url","username":"天空之城","province":"深圳","sex":"男","age":25,"prematureCount":2,"missCount":3,"overScore":3,"averageHeart":100,"averageHeartScore":4,"maxHeart":121,"maxHeartScore":4,"kcal":45,"kcalScore":2,"allscore":23,"rank":2},{"iconUrl":"url","username":"天空之城","province":"深圳","sex":"男","age":25,"prematureCount":2,"missCount":3,"overScore":3,"averageHeart":100,"averageHeartScore":4,"maxHeart":121,"maxHeartScore":4,"kcal":45,"kcalScore":2,"allscore":23,"rank":2},{"iconUrl":"url","username":"天空之城","province":"深圳","sex":"男","age":25,"prematureCount":2,"missCount":3,"overScore":3,"averageHeart":100,"averageHeartScore":4,"maxHeart":121,"maxHeartScore":4,"kcal":45,"kcalScore":2,"allscore":23,"rank":2},{"iconUrl":"url","username":"天空之城","province":"深圳","sex":"男","age":25,"prematureCount":2,"missCount":3,"overScore":3,"averageHeart":100,"averageHeartScore":4,"maxHeart":121,"maxHeartScore":4,"kcal":45,"kcalScore":2,"allscore":23,"rank":2},{"iconUrl":"url","username":"天空之城","province":"深圳","sex":"男","age":25,"prematureCount":2,"missCount":3,"overScore":3,"averageHeart":100,"averageHeartScore":4,"maxHeart":121,"maxHeartScore":4,"kcal":45,"kcalScore":2,"allscore":23,"rank":2},{"iconUrl":"url","username":"天空之城","province":"深圳","sex":"男","age":25,"prematureCount":2,"missCount":3,"overScore":3,"averageHeart":100,"averageHeartScore":4,"maxHeart":121,"maxHeartScore":4,"kcal":45,"kcalScore":2,"allscore":23,"rank":2},{"iconUrl":"url","username":"天空之城","province":"深圳","sex":"男","age":25,"prematureCount":2,"missCount":3,"overScore":3,"averageHeart":100,"averageHeartScore":4,"maxHeart":121,"maxHeartScore":4,"kcal":45,"kcalScore":2,"allscore":23,"rank":2},{"iconUrl":"url","username":"天空之城","province":"深圳","sex":"男","age":25,"prematureCount":2,"missCount":3,"overScore":3,"averageHeart":100,"averageHeartScore":4,"maxHeart":121,"maxHeartScore":4,"kcal":45,"kcalScore":2,"allscore":23,"rank":2},{"iconUrl":"url","username":"天空之城","province":"深圳","sex":"男","age":25,"prematureCount":2,"missCount":3,"overScore":3,"averageHeart":100,"averageHeartScore":4,"maxHeart":121,"maxHeartScore":4,"kcal":45,"kcalScore":2,"allscore":23,"rank":2}]';
            //processUserRankResponse(data);
    
            
        }
        else if (event.data.indexOf("F4")==0){
            //有用户跑步结束
            //A6,{"iconUrl":"url","username":"天空之城","province":"深圳","sex":"男","age":25,"prematureCount":2,"missCount":3,"overScore":3,"averageHeart":100,"averageHeartScore":4,"maxHeart":121,"maxHeartScore":4,"kcal":45,"kcalScore":2,"allscore":23,"rank":2}
            var sportUserRankData = event.data.substr(3, event.data.length-1);
            
            if (canvas!=null) {
                //在跑步页面，需要打开跑步结果界面
                if (!isOpenResultPage) {
                    window.open("result.html");
                    isOpenResultPage = true;
                    firstSportUserRankData = sportUserRankData;
                }
            }
            else{
                processUserRankResponse(sportUserRankData);
            }
            
        }
       

    };

    //连接关闭的回调方法
    websocket.onclose = function(){
      setMessageInnerHTML("连接关闭");
    };

    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function(){
      websocket.close();
    };

    //将消息显示在网页上
    function setMessageInnerHTML(innerHTML){
      //document.getElementById('socketConnectState').innerHTML  = innerHTML + '<br/>';
    }

    //关闭连接
    function closeWebSocket(){
      websocket.close();
    }

    //发送消息
    function send(){
      var message = document.getElementById('text').value;
      websocket.send(message);
    }






    var curWebSocketIndex = -1;  //当前选中的条目

    //切换在线app传输数据的用户
    changeEcgData = function(target){

        //清除之前画的数据
        linectx.clearRect(0,0,width,height);
        linectx.closePath();  
        mStartX = 0 ;
        isReceive = false;

        $("#left_speed_text").html("--");
        $("#left_distance_text").html("--");
        $("#left_time_text").html("--");
        $("#left_isoxygen_text").html("--");
        $("#left_rate_text").html("--");
        $("#left_stridefre_text").html("--");
        $("#left_kcal_text").html("--");
        

        var webSocketIndex = $(target).find('div').html();
        console.log("curWebSocketIndex:"+curWebSocketIndex+",webSocketIndex:"+webSocketIndex);

        //alert(html);
        if (webSocketIndex!=curWebSocketIndex) {
            
            //document.querySelectorAll("right_icon_list_item").css("backgroundColor","#222d32")$('.className');
            //var list = document.getElementsByClassName('right_icon_list_item');
            var list = $('.right_icon_list_item');
            console.log("list:"+list.length);
            var i;
            //遍历设备
            for (i = 0; i < list.length; ++i){
                //console.log("list[i]:"+list[i]);
                //list[i].css("backgroundColor","#222d32"); 
                //list[i].style.backgroundColor='#2b3a40';
                //list[i].style.border="none";
            }
            //$(target).parent().css("backgroundColor","#222d32"); //设置选中背景色
            $(target).parent().css("border","5px solid #8E8E38");
            curWebSocketIndex = webSocketIndex;
            var msg = "W4,"+webSocketIndex;
            console.log(msg);
            websocket.send(msg);
        }
    }
        
    //模版
    String.prototype.tmp = function(obj) {
        return this.replace(/\$\w+\$/g, function(matchs) {
            var returns = obj[matchs.replace(/\$/g, "")];
            return (returns + "") == "undefined"? "": returns;
        });
        return "";
    }

    var htmlTemp;
    var isLoadPage;

    //解析服务器返回的数据，并在页面上显示        
    function processResponse(data){
        //console.log("data:"+data);
        //alert("成功 "+data);
        var json_data = eval("(" + data + ")");
        //alert("成功 "+json_data.userList[0].iconUrl);
        json_data.sort(sortBy('heartRate', true, parseInt));

        var htmlList = '';
        
        if (!isLoadPage) {
            htmlTemp = $("#list_box script[data-id='list_tpl']").html();
        }
        isLoadPage = true;

        var userCount = 0;
        json_data.forEach(function(object) {
            htmlList += htmlTemp.tmp(object);
            userCount++;
        });
        //console.log("userCount:"+userCount);
        $("#right_head_usercount").html("在线用户："+userCount);
        $("#list_box").html(htmlList);

        if (curWebSocketIndex!=-1) {
            //设置选中的背景色
            //console.log("$(list[0]).value:"+$(list[0]).html());
            var list = $(".right_a_index");
            var i;
            for (i = 0; i < list.length; ++i){
                if ($(list[i]).html()==curWebSocketIndex) {
                    $(list[i]).parent().parent().css("border","5px solid #8E8E38"); //设置选中背景色
                }
            }
        }
    }

    function processUserRankResponse(data){
        console.log("data:"+data);
        console.log("isLoadPage:"+isLoadPage);
        //alert("成功 "+data);
        var json_data = eval("(" + data + ")");

        var htmlList = '';
        
        if (!isLoadPage) {
            htmlTemp = $("#list_result script[data-id='list_result_tpl']").html();
        }
        isLoadPage = true;

        json_data.forEach(function(object) {
            htmlList += htmlTemp.tmp(object);
        });

        $("#list_result").html(htmlList);

        
    }

    //解析服务器返回的用户实时运动数据，并在界面上显示
    function processUserRealtimeSportData(data){
        console.log("data:"+data);
        var userRealtimeDataArray = data.substr(3, data.length-2).split(","); //字符分割 
        $("#left_speed_text").html(userRealtimeDataArray[0]);
        $("#left_distance_text").html(userRealtimeDataArray[1]);
        $("#left_time_text").html(userRealtimeDataArray[2]);
        $("#left_isoxygen_text").html(userRealtimeDataArray[3]);
        $("#left_rate_text").html(userRealtimeDataArray[4]);
        $("#left_stridefre_text").html(userRealtimeDataArray[5]);
        $("#left_kcal_text").html(userRealtimeDataArray[6]);
        $("#right_userecgdata_state").html(userRealtimeDataArray[7]);
    }

    var sortBy = function (filed, rev, primer) {
         rev = (rev) ? -1 : 1;
         return function (a, b) {
             a = a[filed];
             b = b[filed];
             if (typeof (primer) != 'undefined') {
                 a = primer(a);
                 b = primer(b);
             }
             if (a < b) { return rev * -1; }
             if (a > b) { return rev * 1; }
             return 1;
         }
     };

     //点击开始，向服务器发送数据，服务器需要清空分析结果用户列表
    $('.bu_start').click(function(){
        //alert("点击");
        //var  bu_start = $('.bu_start'); 
        //bu_start.disabled=true; 
        $(".bu_start").attr("disabled", true);
        $(".bu_start").attr("style","background:#CFCFCF");

  
        if (websocket!=null) {
            var msg = "W5,0";
            websocket.send(msg);
        }
        

    });



});




