goog.provide('willcode4beer.Player');

goog.require('tmpl');

goog.require('goog.dom');
goog.require('goog.events');

willcode4beer.Player = new function(){
};

willcode4beer.Player.states = {
	PAUSED : "",
	PLAYING : ""
};
// set up state machine and transitions
willcode4beer.Player.prototype.start = function(){};
willcode4beer.Player.prototype.pause = function(){};
willcode4beer.Player.prototype.next = function(){};
willcode4beer.Player.prototype.prev = function(){};
willcode4beer.Player.prototype.endTrack = function(){};


// integrate media player last


willcode4beer.TrackQueue = {
	/** @type {Array.willcode4beer.FeedItem} */
	entries : [],
	/** @type {willcode4beer.FeedItem} */
	currentTrack : null,
	next : new function(){},
	previous : new function(){},
	add : new function(){},
	remove : new function(){}
};