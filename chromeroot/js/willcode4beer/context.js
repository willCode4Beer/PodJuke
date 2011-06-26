goog.provide('willcode4beer.ContextMenu');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.positioning.Corner');
goog.require('goog.ui.MenuItem');
goog.require('goog.ui.PopupMenu');

/* these just shutup compiler warnings from the closure library */
goog.require('goog.events.EventHandler');
goog.require('goog.debug.ErrorHandler');


/**
 * @constructor
 */
willcode4beer.ContextMenu = function() {
	this.pm = new goog.ui.PopupMenu();
};

/**
 * Initialize the application user interface.
 * @param {string} contextMenuNodeName
 */
willcode4beer.ContextMenu.prototype.start = function(contextMenuNodeName) {
	
	var link = goog.dom.createDom('a', {"href":"about.html"}, 'About PodJuke');
	var about = new goog.ui.MenuItem(link);
	
	var pm = this.pm;
	pm.addChild(new goog.ui.MenuItem('Help'),true);
	pm.addChild(about,true);
	pm.setToggleMode(false);
	pm.render(document.body);
	goog.events.listen(
		document, goog.events.EventType.CONTEXTMENU,
		function(e){
			e.preventDefault();
			this.pm.showAt(
				e.offsetX,
				e.offsetY
			);
		}["bind"](this)
	);
};
willcode4beer.ContextMenu.prototype.show = function(e){
	e.preventDefault();
};

goog.exportSymbol('willcode4beer.ContextMenu', willcode4beer.ContextMenu);
goog.exportSymbol('willcode4beer.ContextMenu.start', willcode4beer.ContextMenu.prototype.start);
