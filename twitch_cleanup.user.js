// ==UserScript==
// @name        Twitch Cleanup
// @namespace   twitch-cleanup
// @description Remove known channel overlays and prime loot notification
// @include     *.twitch.tv/*
// @exclude     none
// @version     1
// @grant       none
// ==/UserScript==


(function(){
	removeLootNotification();
	
	/* TO-DO: Find a better way of doing this.
	Wait 10 seconds for the video to be played, then look for the overlay to
	remove it. */
	setTimeout(() => {  removeVideoOverlay(); }, 10000);
})();

function removeLootNotification(){
	let elem = document.getElementsByClassName('top-nav__prime');
	elem[0].remove();
}


function removeVideoOverlay(){
	var elem = document.getElementsByClassName('passthrough-events');
	elem[0].remove()
}