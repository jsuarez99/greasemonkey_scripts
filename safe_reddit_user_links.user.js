// ==UserScript==
// @name     Safe Reddit User Links
// @description Removes all urls on a page going to user profiles. Some people have very NSFW/NSFL post histories.
// @include  *.reddit.com/*
// @version  1
// @grant    none
// ==/UserScript==

var allUserLinks = document.querySelectorAll("a.author");
for(var i = 0; i < allUserLinks.length; i++){
  console.log(allUserLinks[i]);
 	allUserLinks[i].href = "#";
}
