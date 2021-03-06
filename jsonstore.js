function _JsonStorage() {
}

_JsonStorage.prototype = {
	get: function(key) {
		var value = localStorage.getItem(key);
		try {
			return value && JSON.parse(value);
		} catch(err) {
			console.log(err);
		}
	},
	set: function(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	},
	del: function(key) {
		localStorage.removeItem(key);
	},
	has: function(key) {
		return typeof localStorage[key] != "undefined";
	},
	setDefault: function(key, value) {
		if (typeof localStorage[key] == "undefined") {
			this.set(key, value);
		}
		return this.get(key);
	},
	each: function(callback) {
		for (var k in localStorage) {
			callback(k, this.get(k));
		}
	},
	clear: function() {
		localStorage.clear();
	},
	key: function(i) {
		return localStorage.key(i);
	},
	get length() {
		return localStorage.length;
	}
}

jsonStorage = new _JsonStorage();

