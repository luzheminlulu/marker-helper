//chrome.runtime.sendMessage({greeting: '你好，我是content-script呀，我主动发消息给后台！'}, function(response) {
//    console.log('收到来自后台的回复：' + response);
//});

var tabURL = window.location.href;
//var queryString = window.location.search;

console.log(tabURL);
//console.log(queryString);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	// console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
	//if(request.cmd == 'test') alert(request.value);
	
	
	var URL = window.location.href;
	console.log(request.value);
	console.log(URL);
	sendResponse(URL);
});


	
chrome.runtime.sendMessage(tabURL, function(response) {
    //console.log(response);
	var res_data = response.split(",");
	console.log(res_data);
	var is_mark=res_data[0].substr(5,1);
	var is_remark=res_data[0].substr(4,1);
	
	var mark=res_data[1];
	var pencil=res_data[2];
	var remark=res_data[3];
		
	
	//console.log(mark);
	if(is_mark=='y'){

		
		//window.document.body.innerHTML = window.document.body.innerHTML.replace(/mark/g, "<span style="/" mce_style="/""background-color:yellow/">$1</span>");
		console.log("标记:"+mark);
		
		var content = document.getElementsByTagName("body")[0].innerHTML;
		//console.log(content);
		var reg = new RegExp("(" + mark + ")", "g");   
		var newstr = content.replace(reg,pencil);
		//document.getElementsByTagName("body")[0] = newstr;
		document.getElementsByTagName("body")[0].innerHTML = newstr;
		
	}
	else{
		console.log("不添加标记");
	}
	
	
	
	
	if(is_remark=='y')
	{
				//--------------------------------------------------------------
		//var boxObj = document.getElementById('box');
		var boxObj = document.getElementsByTagName("body")[0];
		var ulObj  = document.createElement("div");
		
		ulObj.id="draggable";
		
		ulObj.style['width']     = '300px';
		ulObj.style['height']    = 'auto';
		ulObj.style['line-height']    = '26px';
		ulObj.style['border-radius']    = '4px';
		ulObj.style['text-align']    = 'left';
		ulObj.style['margin-left']    = '10px';
		ulObj.style['margin-top']    = '20';
		ulObj.style['font-size']    = '1em';
		ulObj.style['display']    = 'inline-block';
		ulObj.style['position']  = 'fixed';
		ulObj.style['top']       = '150px';
		ulObj.style['right']     = '100px';
		ulObj.style['border']    = '1pxsolid#ccc';
		ulObj.style['color']= '#FFFFFF';
		//ulObj.style['color']= '#000000';
		ulObj.style['background']= 'orange';
		ulObj.style['padding']   = '10px';
		ulObj.style['cursor']    = 'default';
		ulObj.style['z-index']    = '999';

		ulObj.innerHTML=remark;
		boxObj.appendChild(ulObj);
		
		
		var oDrag = document.getElementById('draggable');
		var isDraging = false;
		var startX = 0;
		var startY = 0;
		oDrag.addEventListener('mousedown', function(e) {
			//鼠标事件1 - 在标题栏按下（要计算鼠标相对拖拽元素的左上角的坐标 ，并且标记元素为可拖动） 
			var e = e || window.event;
			mouseOffsetX = e.pageX - oDrag.offsetLeft;
			mouseOffsetY = e.pageY - oDrag.offsetTop;
			isDraging = true;
		})
		document.onmouseup = function(e) {
			//鼠标事件3 - 鼠标松开的时候（标记元素为不可拖动）
			isDraging = false;
		}
		document.onmousemove = function(e) {
			//鼠标事件2 - 鼠标移动时（要检测，元素是否标记为移动）
			var e = e || window.event;

			var mouseX = e.pageX; //鼠标当前的位置
			var mouseY = e.pageY;

			var moveX = 0; //浮层元素的新位置
			var moveY = 0;

			if (isDraging === true) {
				moveX = mouseX - mouseOffsetX;
				moveY = mouseY - mouseOffsetY;

				// 范围限定 moveX>0 并且 moveX < (页面最大宽度-浮层的宽度)
				//		   moveY>0 并且 moveY < (页面最大高度-浮层的高度)
				//页面宽高
				var pageWidth = document.documentElement.clientWidth;
				var pageHeight = document.documentElement.clientHeight;
				//图层宽高
				var dialogWidth = oDrag.offsetWidth;
				var dialogHeight = oDrag.offsetHeight;

				var maxX = pageWidth - dialogWidth;
				var maxY = pageHeight - dialogHeight;

				var moveX = Math.min(maxX, Math.max(0, moveX));
				var moveY = Math.min(maxY, Math.max(0, moveY));

				oDrag.style.left = moveX + 'px';
				oDrag.style.top = moveY + 'px';
			}
		};
	}
	else
	{
		console.log("备注显示已关闭");
	}
});



