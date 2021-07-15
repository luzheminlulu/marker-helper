


function sendMessageToContentScript(message, callback)
{
 chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
 {
 chrome.tabs.sendMessage(tabs[0].id, message, function(response)
 {
 if(callback) callback(response);
 });
 });
}


chrome.contextMenus.create({
	title:'标记：%s',// %s表示选中的文字
	contexts:['selection'],// 只有当选中文字时才会出现此右键菜单
	onclick:function(params)
	{
	// 注意不能使用location.href，因为location是属于background的window对象
	// chrome.tabs.create({url:'https://www.baidu.com/s?ie=utf-8&wd='+ encodeURI(params.selectionText)});
	
	
	
	
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
		
			
		var remark=prompt("请输入备注","");
		
		if(remark==null)
		{
			remark='';
		}
		var URL = tabs[0].url;
		console.log(URL);
		
		var new_title = tabs[0].title;
		var new_link_value = URL; 
		var new_mark_value = params.selectionText; 
		
		var dd = new Date();
		var y = dd.getFullYear();
		var m = dd.getMonth() + 1;
		var d = dd.getDate();
		if(dd.getHours()<10)
			{var h = "0"+dd.getHours();}
		else
			{var h = dd.getHours();}
		if(dd.getMinutes()<10)
			{var mi = "0"+dd.getMinutes();}
		else
			{var mi = dd.getMinutes();}
		
		var new_time_value = y + "年" + m + "月" + d + "日" + h+":"+mi ;
		
		var title_read=JSON.parse(localStorage.getItem('title'));
		var d_link_read=JSON.parse(localStorage.getItem('d_link'));
		var d_mark_read=JSON.parse(localStorage.getItem('d_mark'));
		var d_time_read=JSON.parse(localStorage.getItem('d_time'));
		var pencil_read=JSON.parse(localStorage.getItem('pencil'));
		var remark_read=JSON.parse(localStorage.getItem('remark'));
		
		
		title_read.push(new_title);
		d_link_read.push(new_link_value);
		d_mark_read.push(new_mark_value);
		d_time_read.push(new_time_value);
		pencil_read.push(localStorage.getItem('active_pencil'));
		remark_read.push(remark);
		
		localStorage.setItem('title',JSON.stringify(title_read));
		localStorage.setItem('d_link',JSON.stringify(d_link_read));
		localStorage.setItem('d_mark',JSON.stringify(d_mark_read));
		localStorage.setItem('d_time',JSON.stringify(d_time_read));
		localStorage.setItem('pencil',JSON.stringify(pencil_read));
		localStorage.setItem('remark',JSON.stringify(remark_read));
	
	});
	
	//sendMessageToContentScript({cmd:'test', value:'给我url！'}, function(response)
	//{
	//	console.log('来自content的回复：'+response);
	//	var url_link = response;
	//	
	//});
		


	}
});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    //console.log('收到来自content-script的消息：');
    //console.log(request, sender, sendResponse);
	

	var title_read=JSON.parse(localStorage.getItem('title'));
	var d_link_read=JSON.parse(localStorage.getItem('d_link'));
	var d_mark_read=JSON.parse(localStorage.getItem('d_mark'));
	var d_time_read=JSON.parse(localStorage.getItem('d_time'));
	var pencil_read=JSON.parse(localStorage.getItem('pencil'));
	var remark_read=JSON.parse(localStorage.getItem('remark'));
	
	var url_0 = JSON.stringify(request);
	var url   = url_0.substr(1,url_0.length-2);
	var a     = d_link_read.indexOf(url);
	var cmd="mark";
	var remark = '';
	//var is_mark = 0;
	
	if(a>=0)
	{
			chrome.notifications.create(null, {
				type: 'basic',
				iconUrl: 'images/icon128.png',
				title: '发现标记!',
				message: '时间：'+d_time_read[a]+'\n标记：'+d_mark_read[a]
			});
				
			if(remark_read[a]){
				remark = '标记：'+d_mark_read[a]+'<br>时间：'+d_time_read[a]+'<br>备注：'+remark_read[a];
			}
			else{
				remark  = '内容：'+d_mark_read[a]+'<br>时间：'+d_time_read[a]+'<br>备注：'+"你还没有添加备注哦~";
			}
			

			if(localStorage.getItem('is_auto_remark')>0)
			{
				cmd+="y";
			}
			else
			{
				cmd+="n";
			}
			
			if(localStorage.getItem('is_auto')>0)
			{
				cmd+="y";
			}
			else
			{
				cmd+="n";
			}
	}
	else{
		cmd+='nn';
	}
	

	sendResponse(cmd+','+d_mark_read[a]+','+pencil_read[a]+','+remark);

    
});





