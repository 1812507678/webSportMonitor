$(document).ready(
	function() {
		//alert("ss");
		
		var height = $(window).height();
		//alert(height); 
		//$('.page_head').height(height*0.1);
		$('.page_body').height(height*1.0);
		$('.page_foot').height(height*0.1);
		
		
		/*$.ajax({
			url : "http://localhost:8080/AmsuClothMonitor/UserInfoAction",
			type : "post",
			data:{
				"parm" : "hhhhh"
			},
			dataType : "text",//设置需要返回的数据类型
			success : processResponse,  
			error: function(data) {
				 alert("error"+data);
			}
		});*/

		/*
		{"com.amsu.online.MyWebSocket@147adb5":{"iconUrl":"http://p1.music.126.net/iOB_WWmen6-mH7z0aba5AQ\u003d\u003d/3444769932752065.jpg?param\u003d180y180",
		"username":"测试用户","onlinestate":1}}
		 */
		
		//var json_1 = '[{"iconUrl":"http://p1.music.126.net/iOB_WWmen6-mH7z0aba5AQ\u003d\u003d/3444769932752065.jpg?param\u003d180y180","username":"测试用户","onlinestate":1},{"iconUrl":"http://p1.music.126.net/iOB_WWmen6-mH7z0aba5AQ\u003d\u003d/3444769932752065.jpg?param\u003d180y180","username":"测试用户","onlinestate":1}]';
		
		

		
		
	});

