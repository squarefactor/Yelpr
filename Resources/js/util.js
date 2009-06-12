$(function() {
  $("a").live("click",function() {
    Titanium.Platform.openURL($(this).attr("href"));
    return false;
  });
});