// ==UserScript==
// @name        Slack Taco Reader
// @namespace   slack-taco
// @description Mark :taco: messages as read automatically. Requires the "All Unreads" feature enabled.
// @include     *.slack.com/client/*
// @exclude     none
// @version     1
// @grant       none
// ==/UserScript==


(function(){
	//Check every x seconds
	intervalTime = 3000;
	setInterval( function(){ checkForUnreads(); } , intervalTime);
})();

function checkForUnreads(){
	let elems = document.getElementsByClassName('p-channel_sidebar__link--page_punreads');
	if(elems.length == 0){
		resetCursor();
		return;
	}

	let allUnreads = elems[0];
	let newFound = false;
	allUnreads.classList.forEach(function(item){
		if(item == 'p-channel_sidebar__link--unread'){
			//new unread messages found
			newFound = true;
		}
	});

	if(!newFound){
		resetCursor();
		return;
	}

	//Click into the unreads...
	allUnreads.click();

	//Click the show new messages button if its there...
	let showNew = document.getElementsByClassName('c-button--primary');
	if(showNew.length > 0){
		showNew[0].click();
	}

	let plainMessages = document.getElementsByClassName('c-message_kit__text');
	if(plainMessages.length > 0){
		console.log("Non-Taco message found, leaving unread...");
		resetCursor();
		return;
	}

	let messages = document.getElementsByClassName('p-rich_text_section');
	let nonTacoMsgFound = false;
	for(let i = 0; i < messages.length; i++){
		let childNodes = messages[i].children;
		let foundTaco = false;
		for(let j = 0; j < childNodes.length; j++){
			if(childNodes[j].outerHTML.indexOf(':taco:') > -1){
				foundTaco = true;
			}
		}
		if(!foundTaco){
			nonTacoMsgFound = true;
		}
	}

	if(nonTacoMsgFound){
		console.log("Non-Taco message found, leaving unread...");
	}
	else{
		console.log("Only taco messages found, marking read...");
		let markReadButton = document.getElementsByClassName('c-button--outline')[0];
		markReadButton.click();
	}

	resetCursor();	
}

function resetCursor(){
	//This is to reset the cursor position. If the browser stays on 'All unreads', they won't clear even if read on phone or app.
	let threadsButton = document.getElementsByClassName('p-channel_sidebar__link--all-threads')[0];
	threadsButton.click();
}