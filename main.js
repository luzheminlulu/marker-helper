

// query

function initialRequest() {


	if(localStorage.getItem('is_loadeed')){
		console.log("你已经是个成熟的插件了！");


	}
	else{
		//var arra=[1,2,3,4];
		var d_link = [];
		var title = [];
		var d_mark = [];
		var d_time = [];
		var pencil = [];
		var pencil_list = ['<mark style="background-color:#00FF90">$1</mark>'];
		var remark = [];
	
		localStorage.setItem('title' ,JSON.stringify(title));
		localStorage.setItem('d_link',JSON.stringify(d_link));
		localStorage.setItem('d_mark',JSON.stringify(d_mark));
		localStorage.setItem('d_time',JSON.stringify(d_time));
		localStorage.setItem('pencil',JSON.stringify(pencil));
		localStorage.setItem('pencil_list',JSON.stringify(pencil_list));
		localStorage.setItem('remark',JSON.stringify(remark));
		
		localStorage.setItem('is_auto',1);
		localStorage.setItem('is_auto_remark',1);
		localStorage.setItem('active_pencil',pencil_list[0]);
		
		localStorage.setItem('is_loadeed',true);
	}
}

// render

function showResult() {
	

	
	
	
	if(localStorage.getItem('is_auto')>0)
	{
		document.getElementById('label_auto').innerHTML="自动标记已打开";
		document.getElementById('autoBtn').value="关闭自动标记";
		
	}
	else{
		document.getElementById('label_auto').innerHTML="自动标记已关闭";
		document.getElementById('autoBtn').value="打开自动标记";
		
	}
	
	if(localStorage.getItem('is_auto_remark')>0)
	{
		document.getElementById('label_auto_remark').innerHTML="备注显示已打开";
		document.getElementById('auto_remark').value="关闭备注显示";
		
	}
	else{
		document.getElementById('label_auto_remark').innerHTML="备注显示已关闭";
		document.getElementById('auto_remark').value="打开备注显示";
		
	}
	
	

	var table = '<table width="600"><thead><tr><th width="250">链接</th><th width="150">标记</th><th width="150">备注</th><th width="100">时间</th><th width="100">操作</th></tr></thead><tbody>';

	var title_read=JSON.parse(localStorage.getItem('title'));
	var d_link_read=JSON.parse(localStorage.getItem('d_link'));
	var d_mark_read=JSON.parse(localStorage.getItem('d_mark'));
	var d_time_read=JSON.parse(localStorage.getItem('d_time'));
	var pencil_read=JSON.parse(localStorage.getItem('pencil'));
	var pencil_list=JSON.parse(localStorage.getItem('pencil_list'));
	var remark_read=JSON.parse(localStorage.getItem('remark'));
	
	var selectID = document.getElementById("selectID");
	selectID.innerHTML = '';
	for (var i in pencil_list) {
		var option = document.createElement("option");// 创建option元素   
		option.appendChild(document.createTextNode(pencil_list[i]));
		option.setAttribute("value", pencil_list[i]);
		option.id=pencil_list[i];
		selectID.appendChild(option);
	}
	selectID.value=localStorage.getItem('active_pencil');

	//arr.forEach(function (item, index, array) {
	d_link_read.forEach(function(item, index, array){
		
		table += '<tr>';
		table += '<td><a href=\"' + d_link_read[index] + '\">' + title_read[index] + '</a></td>';
		table += '<td>' + d_mark_read[index] + '</td>';
		table += '<td>' + remark_read[index] + '</td>';
		table += '<td>' + d_time_read[index] + '</td>';
		table += '<td>' + '<input type="button" id=\"del'+index+'\" value="删除" />' + '</td>';
		table += '</tr>';
		
	})

	table += '</tbody></table>';
	console.log(table) ;   
	

	document.getElementById('link_data').innerHTML = table;
	
	var btnObjs = new Array(d_link_read.length);
	
	d_link_read.forEach(function(item, index, array){
		btnObjs[index]=document.getElementById("del"+index);
		btnObjs[index].onclick = function () {
			title_read.splice(index,1);
			d_link_read.splice(index,1);
			d_mark_read.splice(index,1);
			d_time_read.splice(index,1);
			pencil_read.splice(index,1);
			remark_read.splice(index,1);
			
			localStorage.setItem('title',JSON.stringify(title_read));
			localStorage.setItem('d_link',JSON.stringify(d_link_read));
			localStorage.setItem('d_mark',JSON.stringify(d_mark_read));
			localStorage.setItem('d_time',JSON.stringify(d_time_read));
			localStorage.setItem('pencil',JSON.stringify(pencil_read));
			localStorage.setItem('remark',JSON.stringify(remark_read));
			
			showResult();
		};
	})

	
	
	
}

document.getElementById('changePen').onclick = function() {
	var selectID = document.getElementById("selectID");

	localStorage.setItem('active_pencil',selectID.value);
	alert("画笔已更改为："+selectID.value)
	}




// add Pencil
document.getElementById('addPencil').onclick = function() {
	var con_top     = document.getElementById('con_top'   );
	var link_data   = document.getElementById('link_data' );
	var o_button    = document.getElementById('o_button'  );
	var addBtn      = document.getElementById('addBtn'    );
	var listBtn     = document.getElementById('listBtn'   );
	var autoBtn     = document.getElementById('autoBtn'   );
	var label_auto  = document.getElementById('label_auto');
	var changePen   = document.getElementById('changePen' );
	var selectID    = document.getElementById('selectID'  );
	var addPencil   = document.getElementById('addPencil' );
	var delPencil   = document.getElementById('delPencil' );


	con_top .removeChild(link_data  );
	o_button.removeChild(addBtn     );
	o_button.removeChild(listBtn    );
	o_button.removeChild(autoBtn    );
	o_button.removeChild(label_auto );
	o_button.removeChild(changePen  );
	o_button.removeChild(selectID   );
	o_button.removeChild(addPencil  );
	o_button.removeChild(delPencil  );

		
	var name_link = document.createElement("p");
	name_link.innerHTML = "画笔：";	

  
	var input_link = document.createElement('input');
	input_link.type = 'text';
	input_link.id = 'new_pencil';


	var saveBtn = document.createElement('input');
	saveBtn.type  = 'button';
	saveBtn.id    = 'saveBtn';
	saveBtn.value = 'save';

	
	o_button.appendChild(name_link);
	o_button.appendChild(input_link);
	o_button.appendChild(saveBtn);
	
	var error_label = document.createElement("p");
	error_label.innerHTML = "";	
	o_button.appendChild(error_label);

	document.getElementById('saveBtn').onclick = function() {
		var new_pencil_value = document.getElementById('new_pencil').value; 

		if(!new_pencil_value)
		{
			//var error_label = document.createElement("p");
			error_label.innerHTML = "错误！";	
			//o_button.appendChild(error_label);
		}	
		else{

			var pencil_list=JSON.parse(localStorage.getItem('pencil_list'));

			pencil_list.push(new_pencil_value);

			localStorage.setItem('pencil_list',JSON.stringify(pencil_list));


			o_button.removeChild(name_link);
			o_button.removeChild(input_link);
			o_button.removeChild(saveBtn);
			

			o_button.appendChild(addBtn     );
			o_button.appendChild(listBtn    );
			o_button.appendChild(addPencil  );
			o_button.appendChild(delPencil  );
			o_button.appendChild(autoBtn    );
			o_button.appendChild(label_auto );
			o_button.appendChild(selectID   );
			o_button.appendChild(changePen  );
			
			con_top .appendChild(link_data  );

			
			showResult();
		}
	}
}

function del_pencil_func(con_top) {

	

	
	var table = '<table width="600"><thead><tr><th width="250">画笔</th><th width="150">操作</th></tr></thead><tbody>';

	var pencil_list=JSON.parse(localStorage.getItem('pencil_list'));

	pencil_list.forEach(function(item, index, array){
		
		table += '<tr>';
		table += '<td><xmp>' + pencil_list[index] + '</xmp></td>';
		table += '<td>' + '<input type="button" id=\"delpencil'+index+'\" value="删除" />' + '</td>';
		table += '</tr>';
		
	})

	table += '</tbody></table>';
		
	document.getElementById('pencil_list').innerHTML = table;
	
	var btnObjs = new Array(pencil_list.length);
	
	pencil_list.forEach(function(item, index, array){
		btnObjs[index]=document.getElementById("delpencil"+index);
		btnObjs[index].onclick = function () {

			pencil_list.splice(index,1);
			localStorage.setItem('pencil_list',JSON.stringify(pencil_list));
			del_pencil_func();
			
	}})
	
	
}
// add Pencil
document.getElementById('delPencil').onclick = function() {

	var con_top     = document.getElementById('con_top'   );
	var link_data   = document.getElementById('link_data' );
	var o_button    = document.getElementById('o_button'  );
	var addBtn      = document.getElementById('addBtn'    );
	var listBtn     = document.getElementById('listBtn'   );
	var autoBtn     = document.getElementById('autoBtn'   );
	var label_auto  = document.getElementById('label_auto');
	var changePen   = document.getElementById('changePen' );
	var selectID    = document.getElementById('selectID'  );
	var addPencil   = document.getElementById('addPencil' );
	var delPencil   = document.getElementById('delPencil' );
	
	con_top .removeChild(link_data  );
	o_button.removeChild(addBtn     );
	o_button.removeChild(listBtn    );
	o_button.removeChild(autoBtn    );
	o_button.removeChild(label_auto );
	o_button.removeChild(changePen  );
	o_button.removeChild(selectID   );
	o_button.removeChild(addPencil  );
	o_button.removeChild(delPencil  );

	var input_link = document.createElement('div');
	input_link.id = 'pencil_list';
	con_top.appendChild(input_link);	
	
	del_pencil_func(con_top);

};


// add 
document.getElementById('addBtn').onclick = function() {
	var con_top     = document.getElementById('con_top'   );
	var link_data   = document.getElementById('link_data' );
	var o_button    = document.getElementById('o_button'  );
	var addBtn      = document.getElementById('addBtn'    );
	var listBtn     = document.getElementById('listBtn'   );
	var autoBtn     = document.getElementById('autoBtn'   );
	var label_auto  = document.getElementById('label_auto');
	var changePen   = document.getElementById('changePen' );
	var selectID    = document.getElementById('selectID'  );
	var addPencil   = document.getElementById('addPencil' );
	var delPencil   = document.getElementById('delPencil' );
	
	con_top .removeChild(link_data  );
	o_button.removeChild(addBtn     );
	o_button.removeChild(listBtn    );
	o_button.removeChild(autoBtn    );
	o_button.removeChild(label_auto );
	o_button.removeChild(changePen  );
	o_button.removeChild(selectID   );
	o_button.removeChild(addPencil  );
	o_button.removeChild(delPencil  );

		
		
	var name_link = document.createElement("p");
	name_link.innerHTML = "链接：";	
	var name_mark = document.createElement("p");
	name_mark.innerHTML = "标记：";
	var name_rema = document.createElement("p");
	name_rema.innerHTML = "备注：";
  
	var input_link = document.createElement('input');
	input_link.type = 'text';
	input_link.id = 'new_link';
	var input_mark = document.createElement('input');
	input_mark.type = 'text';
	input_mark.id = 'new_mark';
	var input_rema = document.createElement('input');
	input_rema.type = 'text';
	input_rema.id = 'new_rema';

	var saveBtn = document.createElement('input');
	saveBtn.type  = 'button';
	saveBtn.id    = 'saveBtn';
	saveBtn.value = 'save';


	

	
	o_button.appendChild(name_link);
	o_button.appendChild(input_link);
	
	o_button.appendChild(name_mark);
	o_button.appendChild(input_mark);
	
	o_button.appendChild(name_rema);
	o_button.appendChild(input_rema);
	
	o_button.appendChild(saveBtn);
	
	var error_label = document.createElement("p");
	error_label.innerHTML = "";	
	o_button.appendChild(error_label);

	document.getElementById('saveBtn').onclick = function() {
		var new_link_value = document.getElementById('new_link').value; 
		var new_mark_value = document.getElementById('new_mark').value; 
		var new_rema_value = document.getElementById('new_rema').value; 
		
		if(!new_link_value || !new_mark_value)
		{
			//var error_label = document.createElement("p");
			error_label.innerHTML = "错误！";	
			//o_button.appendChild(error_label);
		}	
		else{
			error_label.innerHTML = "";
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
			
			
			
			title_read.push(new_link_value);
			d_link_read.push(new_link_value);
			d_mark_read.push(new_mark_value);
			d_time_read.push(new_time_value);
			pencil_read.push("");
			remark_read.push(new_rema_value);
			
			localStorage.setItem('title',JSON.stringify(title_read));
			localStorage.setItem('d_link',JSON.stringify(d_link_read));
			localStorage.setItem('d_mark',JSON.stringify(d_mark_read));
			localStorage.setItem('d_time',JSON.stringify(d_time_read));
			localStorage.setItem('pencil',JSON.stringify(pencil_read));
			localStorage.setItem('remark',JSON.stringify(remark_read));
			
			//showResult();
	
	
			o_button.removeChild(name_link);
			o_button.removeChild(new_link);
			o_button.removeChild(name_mark);
			o_button.removeChild(new_mark);
			o_button.removeChild(name_rema);
			o_button.removeChild(input_rema);
			o_button.removeChild(saveBtn);
			
			o_button.appendChild(addBtn     );
			o_button.appendChild(listBtn    );
			o_button.appendChild(addPencil  );
			o_button.appendChild(delPencil  );
			o_button.appendChild(autoBtn    );
			o_button.appendChild(label_auto );
			o_button.appendChild(selectID   );
			o_button.appendChild(changePen  );
			
			con_top .appendChild(link_data  );

			
			showResult();
		}
	}
}

document.getElementById('listBtn').onclick = function() {
	showResult();
}

document.getElementById('autoBtn').onclick = function() {
	
	if(localStorage.getItem('is_auto')>0)
	{
		localStorage.setItem('is_auto',0);
		document.getElementById('label_auto').innerHTML="自动标记已关闭";
		document.getElementById('autoBtn').value="打开自动标记";
		
	}
	else{
		localStorage.setItem('is_auto',1);
		document.getElementById('label_auto').innerHTML="自动标记已打开";
		document.getElementById('autoBtn').value="关闭自动标记";

	}

}

document.getElementById('auto_remark').onclick = function() {
	
	if(localStorage.getItem('is_auto_remark')>0)
	{
		localStorage.setItem('is_auto_remark',0);
		document.getElementById('label_auto_remark').innerHTML="备注显示已关闭";
		document.getElementById('auto_remark').value="打开备注显示";
		
	}
	else{
		localStorage.setItem('is_auto_remark',1);
		document.getElementById('label_auto_remark').innerHTML="备注显示已打开";
		document.getElementById('auto_remark').value="关闭备注显示";

	}

}



initialRequest();
showResult();

