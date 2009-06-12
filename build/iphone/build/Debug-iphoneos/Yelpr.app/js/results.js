$(function() {
  try {
    TiUI.setPropertyBackground();

    //Get query parameters
    var category = Titanium.App.Properties.getString("category");
    var term = Titanium.App.Properties.getString("term");
    Titanium.App.Properties.setString("category", "");
    Titanium.App.Properties.setString("term", "");

    //Make request
    Titanium.Geolocation.getCurrentPosition(function(pos) {
      var latitude = pos.coords.latitude;
      var longitude = pos.coords.longitude;
      var query = "http://api.yelp.com/business_review_search?term="+term+"&category="+category+"&lat="+latitude+"&long="+longitude+"&num_biz_requested=20&ywsid=6SVw8vw3j9cTgdj4P56mJQ";
      var xhr = Titanium.Network.createHTTPClient();
      xhr.onreadystatechange = function() {
        try {
          if (this.readyState == 4) {
    				var results = JSON.parse(this.responseText);
    				$(".indicator").hide();
    				$.each(results.businesses,function(item) {
    				  html = "<div class='item-result'>";
    				  html += "<table><tr><td valign='top'>";
    				  html += "<img src='"+results.businesses[item].photo_url_small+"'></img>";
    				  html += "<p class='help'><img src='"+results.businesses[item].rating_img_url_small+"'><br/>\
    				    "+results.businesses[item].review_count+" reviews</p></td><td valign='top'>";
    				  html += "<div style='padding-left:5px'><h4>"+results.businesses[item].name+"</h4>";
    				  html += "<p><strong>"+results.businesses[item].reviews[0].user_name+"</strong> \
    				    ("+results.businesses[item].reviews[0].rating+" of 5 stars):\"\
    				    "+results.businesses[item].reviews[0].text_excerpt+"\"</p>";
    				  html += "<p><a href='http://maps.google.com/maps?q=\
    				    "+results.businesses[item].latitude+"+"+results.businesses[item].longitude+"\
    				    '>Map</a> | <a href='"+results.businesses[item].mobile_url+"'>More...</a>";
    				  html += "</div></td></tr></table></div>";
    				  $("#search-results").append(html);
    				});
    			}
        } catch(e) {
          alert(e);
        }
      };
      xhr.open('GET',query);
  		xhr.send();
    });
  } catch(e) {
    var w = Titanium.UI.createAlertDialog();
    w.setMessage(e.message);
    w.show();
  }
});