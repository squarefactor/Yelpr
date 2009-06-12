TiUI = {};
TiUI.platform = Titanium.Platform.name;

//
// setup
//
window.onload = function()
{
	// add platform class to body
	TiUI.addBodyClass(TiUI.platform);
	
	// call ready
	TiUI.ready();
};

//
// Helper function to add a class to the body
// 
TiUI.addBodyClass = function(c)
{
	var classes = document.body.className;
	document.body.className = classes + ' ' + c;
};


//
// setup system property background image
//
TiUI.setPropertyBackground = function()
{
	TiUI.addBodyClass('property_background');
};

//
// create a progress bar
//
TiUI.createProgressBar = function(id)
{
	var el = document.getElementById(id);
	if (!el)
	{
		alert('createProgressBar: invalid element id ' + id);
		return;
	}
	
	el.className += ' progress_bar';
	var html = '<div id="progress_'+id+'" class="value" ></div>';
	el.innerHTML = html;
};

//
// update progress bar
//
TiUI.updateProgressBar = function(id,value)
{
	var el = document.getElementById('progress_'+id);
	if (!el)
	{
		alert('updateProgressBar: invalid element id ' + id);
		return;
	}

	el.style.width = String(value) +"px";
};


//
// Create a on/off switch
//
TiUI.createSwitch = function(id, value, callback)
{
	var el = document.getElementById(id);
	if (!el)
	{
		alert('createSwitch: invalid element id ' + id);
		return;
	}
	
	// create control
	el.className += " switch_container ";
	var html = '<div id="switch_'+id+'" class="switch"><div class="switch_on"></div><div class="switch_off"></div></div>';
	el.innerHTML = html;
	
	// set initial value
	var right = (value ==true)?'0px':'94px';
	document.getElementById("switch_" + id).style.right = right;
	
	// setup touch listener
	el.addEventListener('touchend',function()
	{
	   	var c = document.getElementById("switch_" + id);
		if (c.style.right == '0px')
		{
			c.style.right = '94px';
			c.setAttribute('switch','off');
			if (callback) callback(false);
		}
		else
		{
			c.style.right = '0px';
			c.setAttribute('switch','on');
			if (callback)callback(true);
		}
	},false);
};

//
// create text element
//
TiUI.createTextElement = function(id,bold)
{
	var el = document.getElementById(id);
	if (!el)
	{
		alert('createTextElement: invalid element id ' + id);
		return;
	}
	el.className += 'label ';
	if (bold)
	{
		el.className+='bold';
	}
};


//
// Create a Grouped View
// id: the ID of the element
// type: the type of grouped list.  there are 3 supported types:
//		1. option - show a list of selectable options (1 active at a time)
//		2. input - show a list of editable values. sub-types are: (switch, input, select, readonly)
//      3. button - show a list of buttons (simply clickable)
TiUI.createGroupedView = function(id,type,data,callback)
{
	var list = document.getElementById(id);
	
	if (!list)
	{
		alert('createGroupedView: invalid element id ' + id);
		return;
	}
	if (type != 'option' && type != 'input' && type != 'button')
	{
		alert('createGroupedView: invalid type ' + type);
		return;
	}

	//
	// row delegates for each supported type.  row delegates create structure for each type
	//
	function optionRowDelegate(data)
	{
		var image = '';
		if (data.image)
		{
			image = '<img src="'+data.image+'" width="26px" height="26px" style="position:relative;top:7px;margin-right:10px"/>';
		}
		if (data.selected == true)
		{
			return '<span class="active"> '+ image + ' ' + data.title + '</span><div class="option_selected" style="display:block"></div>';
		}
		return '<span> '+ image + ' ' + data.title + '</span><div class="option_selected" style="display:none"></div>';
	};
	function buttonRowDelegate(data)
	{
		var image = '';
		if (data.image)
		{
			image = '<img src="'+data.image+'" width="26px" height="26px" style="position:relative;top:7px;margin-right:10px"/>';
		}

		return '<div class="button"> '+ image + ' ' + data.title + '</div>';		
	};
	function inputRowDelegate(data)
	{
		var image = '';
		if (data.image)
		{
			image = '<img src="'+data.image+'" width="26px" height="26px" style="position:relative;top:7px;margin-right:10px"/>';
		}
		switch (data.type)
		{
			case 'input':
			{
				return '<span> '+ image + ' ' + data.title + '</span><span class="'+data.type+'"><input id="'+data.id+'" type="text" value="'+data.value+'" /></span>';
			}
			case 'select':
			{
				return '<span> '+ image + ' ' + data.title + '</span><span class="'+data.type+'"><span id="'+data.id+'" style="position:relative;left:-15px">'+data.value+'</span></span>';
			}
			case 'switch':
			{
				return '<div style="float:left"> '+ image + ' '+data.title+'</div><div  id="'+data.id+'" value="'+data.value+'" style="float:right;position:relative;top:6px;right:10px"></div>';
			}
			case 'readonly':
			{
				return '<span> '+ image + ' ' + data.title + '</span><span class="'+data.type+'"><span id="'+data.id+'">'+data.value+'</span></span>';
			}
		}
	};

	//
	// event delegates for each support type.  event delegates add input listeners and wire up any other required events
	//
	function optionEventDelegate(e,data, callback)
	{
		var classes = e.className;
		e.addEventListener('touchstart',function()
		{
			// row selection classes
			this.className = classes + ' row_click';

			// add text effect
			this.getElementsByTagName('SPAN')[0].className = 'option_press_text';
			
			// add check effect if we are already active
			var selected = this.getElementsByClassName('option_selected');
			if (selected[0].style.display == 'block')
			{		
				selected[0].className = 'option_press_check';
			}
			
		},false);
		
		e.addEventListener('touchend',function()
		{						
			// remove selection class
			this.className = classes;
			
			// reset class name of check
			this.getElementsByTagName('DIV')[0].className = 'option_selected';

			// turn everything off
			var list = document.getElementById('group_list_' + id);
			var selectedIcons = list.getElementsByClassName('option_selected');
			for (var i=0;i<selectedIcons.length;i++)
			{
				selectedIcons[i].style.display = 'none';
			}
			var rows = list.getElementsByClassName('row');
			for (var i=0;i<rows.length;i++)
			{
				rows[i].setAttribute('selected','false');
				rows[i].getElementsByTagName('SPAN')[0].className = '';
			}
			
			// show check mark
			var notSelected = this.getElementsByClassName('option_selected');
			notSelected[0].style.display = 'block';

			// add selected attribute
			this.setAttribute('selected','true');
			
			// add active text class
			this.getElementsByTagName('SPAN')[0].className = 'active';
			
			// execute row callback
			if (callback) callback(parseInt(this.getAttribute('row')));
			
		},false);
		
	};
	function buttonEventDelegate(e,data,callback)
	{
		var classes = e.className;
		e.addEventListener('touchstart',function()
		{
			this.className = classes + ' row_click';
			
		},false);
		
		e.addEventListener('touchend',function()
		{						
			this.className = classes;
			if (callback) callback(parseInt(this.getAttribute('row')));
			
		},false);
		
	};
	function inputEventDelegate(e,data,callback)
	{
		var el = document.getElementById(data.id);
		if (!el)return;
		
		switch(data.type)
		{
			case 'input':
			{
				el.onblur = function()
				{
					if (callback) callback({id:data.id,value:el.value});
				};
				break;
			}
			case 'switch':
			{
				TiUI.createSwitch(data.id,data.value,function(value)
				{
					if (callback) callback({id:data.id,value:value})
				});
				break;
			}
			case 'select':
			{
				el.onclick = function()
				{
					if (callback) callback({id:data.id, value:parseInt(el.getAttribute('row'))});
				};

				break;
			}
		}
	};

	// map delegate functions
	var rowDelegate = (type=='option')?optionRowDelegate:(type=='input')?inputRowDelegate:buttonRowDelegate;
	var eventDelegate = (type=='option')?optionEventDelegate:(type=='input')?inputEventDelegate:buttonEventDelegate;
	
	// create basic row template
	var html = '<div id="group_list_'+id+'" class="grouped_view">';
	for (var i=0;i<data.length;i++)
	{
		var classes = 'row ';
		// if row 1
		if (i==0)
		{
			classes += ' top';
		}
		// if last row
		else if (i==(data.length -1))
		{
			classes += ' bottom';
		}
		// if only one row
		if (i==(data.length -1) && i==0)
		{
			classes = 'row single_row';
		}
		html += '<div row="' + i + '"  class="'+classes+'">';
		
		// now delegate to 'type' handler
		html += rowDelegate(data[i]);
		html += '</div>';
	}
	html += '</div>';
	list.innerHTML = html;

	// now call event delegates
	var rows = list.getElementsByClassName('row');
	for (var i=0;i<rows.length;i++)
	{
		eventDelegate(rows[i],data[i],callback);
	}

};

// 
// Create Table View
// TODO: 1. Support custom heights
// TODO: 2. Support icons on the left
// TODO: 3. Support edit modde
//
TiUI.createTableView = function(id, data, callback)
{
	var list = document.getElementById(id);
	if (!list)
	{
		alert('createTableView: invalid element id ' + id);
		return;
	}
	
	if (data)
	{
		var html = '';
		var count = (data.length < 9)?9:data.length;
		for (var i=0;i<count;i++)
		{
			html += "<div row='"+i+"' class='table_view'>";

			if (i < data.length)
			{
				var image = data[i].image;
				var text = data[i].title;
				var hasChild = data[i].hasChild;
				var hasDetail = data[i].hasDetail;
				var detailClass = (hasChild==true)?'arrow':(hasDetail==true)?'detail':'';

				if (image)
				{
					html += '<img height="32px" width="32px" style="position:relative;top:7px;margin-right:10px" src="'+image+'"/>';
				}
				html += '<span>' + text + '</span>';
				html += '<div id="detail_' + id + '_' + i + '" class="'+detailClass+'"></div>';
				
			}
			html+= '</div>';
			
		}
	}
	list.innerHTML =  html;
	var rows = list.getElementsByClassName('table_view');
	for (var i=0;i<rows.length;i++)
	{	
		var classes = rows[i].getElementsByClassName('detail');
		if (classes.length == 0 && data.length > i)
		{
			rows[i].addEventListener('touchstart',function()
			{
				this.className += ' row_click';
				var arrow = this.getElementsByClassName('arrow');
				if (arrow.length == 1)
				{
					arrow[0].className = 'arrow_touch';
				}
			},false);
		}
		rows[i].addEventListener('touchend',function()
		{
			if (callback) callback(parseInt(this.getAttribute('row')));
			this.className = this.className.replace(' row_click','');
			var arrow = this.getElementsByClassName('arrow_touch');
			if (arrow.length == 1)
			{
				arrow[0].className = 'arrow';
			}
			
		},false);
	}
	
};


