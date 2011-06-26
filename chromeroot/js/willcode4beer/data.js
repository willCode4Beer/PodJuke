goog.provide('willcode4beer.DataStore');

goog.require('tmpl');

goog.require('goog.dom');
goog.require('goog.events');

// id?(url - hash) | Feed Title | Feed URL | Last Access Time

// Feed entries
// Hash | Played | Title | Description | Media URL | FeedId

willcode4beer.DataStore = (function() {
	return {
		db : null,
		initializeData : function(){
			this.db = openDatabase("podcasts", "1.0", "PodcastDB", (5*1000*1000));
			this.db.transaction(function (tx) {
				tx.executeSql(
						"CREATE TABLE IF NOT EXISTS Samples (id unique, title, url, lastAccess)"
					);
				tx.executeSql(
						"CREATE TABLE IF NOT EXISTS Subscriptions (id unique, title, url, lastAccess)"
					);
				tx.executeSql(
					"CREATE TABLE IF NOT EXISTS Entries (id, played, title, description , url, feedId)"
				);
			});
			this.db.transaction(function (tx) {
				tx.executeSql(
					'SELECT * FROM Samples',
					[],
					function (tx, results) {
						console.log("results");
						if(results.rows.length<2){
							//							tx.executeSql('INSERT INTO Samples (id, title, url, lastAccess) VALUES (1, "The Changelog - Open Source moves fast. Keep up.", "http://feeds.feedburner.com/thechangelog", 0)');
							console.log("adding number 2");
							tx.executeSql('INSERT INTO Samples (id, title, url, lastAccess) VALUES (2, "Pragmatic Podcasts", "http://pragprog.com/podcasts/feed.rss", 0)');
//							tx.executeSql('INSERT INTO Samples (id, title, url, lastAccess) VALUES (3, "", "", 0)');
//							tx.executeSql('INSERT INTO Samples (id, title, url, lastAccess) VALUES (4, "", "", 0)');
//							tx.executeSql('INSERT INTO Samples (id, title, url, lastAccess) VALUES (5, "", "", 0)');
							
						}
					},
					null
				);
			});
		}
	};
})();

goog.exportSymbol('willcode4beer.DataStore', willcode4beer.ContextMenu);
goog.exportSymbol('willcode4beer.DataStore.initializeData', willcode4beer.DataStore.initializeData);

/*
db.transaction(function (tx) {
tx.executeSql(
	'SELECT * FROM LOGS', [],
	function (tx, results) {
		var len = results.rows.length, i;
		msg = "<p>Found rows: " + len + "</p>";
		document.querySelector('#status').innerHTML +=  msg;
		for (i = 0; i < len; i++){
			alert(results.rows.item(i).log );
		}
	},
	null);
});
*/