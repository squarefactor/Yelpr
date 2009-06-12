$(function() {
  var categories = [
		{title:'Restaurants',hasChild:true,category_name:"restaurants"},
		{title:'Bars',hasChild:true,category_name:"bars"},
		{title:'Coffee & Tea',hasChild:true,category_name:"coffee"},
		{title:'Banks',hasChild:true,category_name:"banks"},
		{title:'Gas & Service Stations',hasChild:true,category_name:"servicestations"},
		{title:'Drug Stores',hasChild:true,category_name:"drugstores"}
	];
	
	TiUI.createTableView('categories',categories,function(index) {
	  try {
	    // create a new window
  		var win = Titanium.UI.createWindow();
  		Titanium.App.Properties.setString('category',encodeURI(categories[index].category_name));
      win.setURL('results.html');
  		win.setTitle('Results');
      win.setBarColor('#ff0000');

  		//Open the new window with a nice wipe animation
  		win.open({animated:true});
	  } catch (e) {
	    Titanium.API.debug(e.message);
	  }
	});
});