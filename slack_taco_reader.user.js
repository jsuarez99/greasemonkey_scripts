// ==UserScript==
// @name        Slack Taco Reader
// @namespace   slack-taco
// @description Mark :taco: messages and bot messages as read automatically. Requires the "All Unreads" feature enabled.
// @include     *.slack.com/client/*
// @exclude     none
// @version     2
// @grant       none
// ==/UserScript==

timesMarkedRead = 0;

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

	//----------------------------------------------------
	//Checking for ignored user messages. Only marks read if only ignored users are found.
	let senders = document.getElementsByClassName('c-message__sender_link');
	let allSpamMsgs = false;
	for(let i = 0; i < senders.length; i++){
		allSpamMsgs = checkIgnoredUser(senders[i].innerHTML);
	}

	if(allSpamMsgs){
		console.log("Taco_Reader: Only ignored user messages found, marking read...(" + (++timesMarkedRead) + ")");
		let markReadButton = document.getElementsByClassName('c-button--outline')[0];
		markReadButton.click();
		resetCursor();
		return;
	}

	//----------------------------------------------------
	//Checking if there are plain text messages. If so, no tacos, leave them unread
	let plainMessages = document.getElementsByClassName('c-message_kit__text');
	if(plainMessages.length > 0){
		console.log("Taco_Reader: Non-Taco message found, leaving unread...");
		resetCursor();
		return;
	}

	//----------------------------------------------------
	//Check rich text messages for tacos. If there are nothing but tacos, mark all as read.
	let messages = document.getElementsByClassName('p-rich_text_section');
	let nonTacoMsgFound = false;
	for(let i = 0; i < messages.length; i++){
		let childNodes = messages[i].children;
		let foundTaco = false;
		for(let j = 0; j < childNodes.length; j++){
			foundTaco = checkIgnoredContent(childNodes[j].outerHTML);
			if(foundTaco){
				break;
			}
		}
		if(!foundTaco){
			nonTacoMsgFound = true;
		}
	}

	if(nonTacoMsgFound){
		console.log("Taco_Reader: Non-Taco message found, leaving unread...");
	}
	else{
		console.log("Taco_Reader: Only taco messages found, marking read...(" + (++timesMarkedRead) + ")");
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

function checkIgnoredContent(msg){
	let ignoreContent = [':taco:', ':sadtaco:'];
	for(let i = 0; i < ignoreContent.length; i++){
		if(msg.indexOf(ignoreContent[i]) > -1){
			return true;
		}
	}
}

function checkIgnoredUser(username){
	let ignoreUsers = [/*Places user names as strings here*/];
	for(let i = 0; i < ignoreUsers.length; i++){
		if(username.toLowerCase() == ignoreUsers[i].toLowerCase()){
			return true;
		}
	}
	return false;
}