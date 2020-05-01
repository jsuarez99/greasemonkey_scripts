// ==UserScript==
// @name     Block Youtube Channels
// @description Remove unwanted channels from appearing in youtube search results
// @version  1
// @include *.youtube.com/results*
// @grant    none
// ==/UserScript==

var resultsListSelect = "#contents.ytd-item-section-renderer",
    videoRenderDivSelect = "div#dismissable",
    channelsToRemove = ['FungBrosComedy','TheYoungTurks','TYTInterviews'];

//Build the query string of channels to remove
var queryStringStart = "a[href*='", 
    queryStringEnd = "' i]",
allQueryStrings = [],
    completeQueryString = "";
for(var j = 0; j < channelsToRemove.length; j++){
  allQueryStrings.push( queryStringStart + channelsToRemove[j] + queryStringEnd );
}
completeQueryString = allQueryStrings.join(", ");


//Callback function
function removeUnwantedVideos(){
  var userLink = document.querySelectorAll(completeQueryString);
  if(userLink.length > 0){
      for(var i = 0; i < userLink.length; i++){
      var dismissable = userLink[i].closest(videoRenderDivSelect);
      if(dismissable == null)
        continue;
      
	  var renderDiv = dismissable.parentNode;
      renderDiv.parentNode.removeChild(renderDiv);
    }
  }
}

//Begin observing the results list
var resultsDiv = document.querySelector(resultsListSelect);
var observer = new MutationObserver(removeUnwantedVideos);
observer.observe(resultsDiv, {childList: true});
