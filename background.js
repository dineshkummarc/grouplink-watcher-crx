var JSON_URL = "https://itsupport.grcc.edu:8443/ehelpdesk/tf/ticketFilterStore.glml?filter=true&ticketFilterId=";

var DEFAULT_FILTER = '962',
	DEFAULT_TIME = 5.0;

var COLOR_EMPTY = "#080",
	COLOR_ITEMS = "#F00",
	COLOR_ERROR = "#FF0",
	COLOR_WORKING = "#888";

var last_filter_response = {};

var req = false;

function QueryUrl() {
	return JSON_URL+jsonStorage.setDefault('filter', DEFAULT_FILTER);
}

function update() {
	if (req && req.readyState != req.DONE) return;
	req = new XMLHttpRequest();
	req.addEventListener("load", function(evt) {
		var data = JSON.parse(this.response);
		last_filter_response = data;
		var nr = data.numRows;
		chrome.browserAction.setBadgeText({text: nr.toString()});
		if (nr) {
			chrome.browserAction.setBadgeBackgroundColor({color: COLOR_ITEMS});
		} else {
			chrome.browserAction.setBadgeBackgroundColor({color: COLOR_EMPTY});
		}
	});
	req.addEventListener("error", function(evt) {
		console.error(this);
		chrome.browserAction.setBadgeText({text: "!!"});
		chrome.browserAction.setBadgeBackgroundColor({color: COLOR_ERROR});
	});
	req.addEventListener("loadend", function(evt) {
		req = false;
		jsonStorage.setDefault('polltime', 5.0);
		window.setTimeout(update, jsonStorage.get('polltime')*60*1000);
	});
	req.open("GET", QueryUrl(), true);
	req.send();
}

chrome.browserAction.setBadgeText({text: "..."});
chrome.browserAction.setBadgeBackgroundColor({color: COLOR_WORKING});
window.addEventListener("online", update);

update();
