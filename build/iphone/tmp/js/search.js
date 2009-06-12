$(function() {
  function doSearch() {
    try {
      Titanium.App.Properties.setString("term", $("#term").val());
      // create a new window
  		var win = Titanium.UI.createWindow();
  		win.setURL("results.html")
  		win.setTitle('Results');
      win.setBarColor('#ff0000');

  		//Open the new window with a nice wipe animation
  		win.open({animated:true});
    } catch(e) {
      var w = Titanium.UI.createAlertDialog();
      w.setMessage(e.message);
      w.show();
    }
  }
  
  TiUI.setPropertyBackground();
  TiUI.createGroupedView('search-button','button',[{title:"Search Reviews"}],function(index) {
    doSearch();
	});
	
	$("#term").keypress(function(e) {
	  if (e.keyCode == 10) {
	    doSearch();
	  }
	});
});