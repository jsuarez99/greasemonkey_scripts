// ==UserScript==
// @name        Sort Yelp By Date
// @namespace   yelp-sort
// @description Automatically sort any yelp page reviews by date (instead of fishy yelp sort)
// @include     *.yelp.com/biz/*
// @exclude     *.yelp.com/*sort_by=date_desc
// @version     1
// @grant       none
// ==/UserScript==

//Get the current url
var curUrl = window.location.toString();

//Just in case the exclude didnt work
if(curUrl.indexOf("sort_by=date_desc") > -1){
  return;
}
//move to the date_desc search
else
  window.location.href = curUrl + "?sort_by=date_desc";
