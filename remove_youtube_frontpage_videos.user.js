// ==UserScript==
// @name        Remove Youtube Frontpage Videos
// @namespace   cleanse-yt-fp
// @description Remove suggested and trending videos from the youtube front page
// @include     *.youtube.com/
// @exclude
// @version     1
// @grant       none
// ==/UserScript==

//Get the main content div with all the videos
var contentArr = document.getElementsByClassName("ytd-page-manager");
for(var i = 0; i < contentArr.length; i++){
	if(typeof contentArr[i] !== "undefined"){
    	if(contentArr[i].nodeName == "YTD-BROWSE"){
			contentArr[i].parentElement.removeChild(contentArr[i]);
    }		
  }
}
