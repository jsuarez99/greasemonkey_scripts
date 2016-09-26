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
var contentArr = document.getElementsByClassName("branded-page-v2-primary-col");
if(contentArr.length > 0){
	if(typeof contentArr[0] !== "undefined")
		contentArr[0].parentElement.removeChild(contentArr[0]);
}