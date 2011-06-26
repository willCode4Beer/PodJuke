goog.provide('willcode4beer.PodJuke');

goog.require('tmpl');

goog.require('goog.dom');
goog.require('goog.events');
goog.require("goog.net.XhrIo");
goog.require('goog.Uri');
goog.require("goog.Uri.QueryData");

/* these just shutup compiler warnings from the closure library */
goog.require('goog.events.EventHandler');
goog.require('goog.debug.ErrorHandler');


/**
 * @constructor
 */
willcode4beer.PodJuke = function() {
	this.elems = {}; // placeholder to bind DOM elements to the object
};

/**
 * Initialize the application user interface.
 * @param {string} appNodeName
 */
willcode4beer.PodJuke.prototype.start = function(appNodeName) {
	goog.dom.getElement(appNodeName).innerHTML = 
		  tmpl.mainApp(null, null)
		+ tmpl.player(null, null);
	this.elems.feedUrl = goog.dom.getElement('podcasturl');
	this.elems.feedBtn = document.getElementById('fetchBtn');
	this.elems.feedBtn.onclick = this.fetchFeed["bind"](this);
	this.elems.feedUrl.focus();
};

willcode4beer.PodJuke.prototype.fetchFeed = function() {
	goog.net.XhrIo.send(this.elems.feedUrl.value, this.showFeed["bind"](this));
};

willcode4beer.PodJuke.prototype.showFeed = function(httpResp) {
	var xhr = httpResp.target;
	var data = xhr.getResponseXml();
	var items = data.getElementsByTagName("item");
	var feedList = document.getElementById('feedItems');
	for ( var i = 0; i < items.length; i++) {
		/** @type {willcode4beer.FeedItem} */
		var node = this.getFeedItemFromNode(items[i]);
		var feedEntry = goog.dom.createDom('div', {});
		feedEntry.innerHTML = node.render();
		feedList.appendChild(feedEntry);
		node.htmlNode = feedEntry;
		
		feedEntry.onclick = function(){
			var audio = document.getElementById("audioTag");
			audio.pause();
			audio.src = this.mediaUrl;
			audio.play();
			document.getElementById("nowPlaying").innerText = this.title;
		}["bind"](node);
	}
};

/**
 * @returns {willcode4beer.FeedItem}
 */
willcode4beer.PodJuke.prototype.getFeedItemFromNode = function(node){
	var media = node.getElementsByTagName("enclosure")[0].getAttribute("url");
	return new willcode4beer.FeedItem(
		this.getChildNodeValue(node, "title"),
		new Date(this.getChildNodeValue(node, "pubDate")),
		this.getChildNodeValue(node, "description"),
		media
	);
};

/**
 * @param {string} tagName
 */
willcode4beer.PodJuke.prototype.getChildNodeValue = function(node,tagName){
	return node.getElementsByTagName(tagName)[0].childNodes[0].nodeValue;
};

/**
 * @constructor
 * @param {string} title
 * @param {Date} date
 * @param {string} description
 * @param {string} mediaUrl
 */
willcode4beer.FeedItem = function(title, date, description, mediaUrl) {
	/** @type {string} */ this.title = title;
	/** @type {Date}   */ this.date = date;
	/** @type {string} */ this.description = description;
	/** @type {string} */ this.mediaUrl = mediaUrl;
	this.htmlNode = null;
};

/**
 * @returns {string} a chunk of HTML as the rendered feed item.
 */
willcode4beer.FeedItem.prototype.render = function(){
	return tmpl.feedItem({
		itemTitle       : this.title,
		itemDate        : this.date,
		itemDescription : this.description
	},null);
};

goog.exportSymbol('willcode4beer.PodJuke', willcode4beer.PodJuke);
goog.exportSymbol('willcode4beer.PodJuke.start', willcode4beer.PodJuke.prototype.start);
