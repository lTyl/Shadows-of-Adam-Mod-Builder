(function () {
	var originalInputUpdate = Menu.prototype.inputSelectUpdate;
	
	Menu.prototype.inputSelectUpdate = (function(original) {
		return function() {
			original.apply(this);
			if (ig.input.released("up") || ig.input.released("down")) {
				this.timer.reset();
				this.stopTweens();
				console.log("=== Key released. Timer has been reset.");
			}
		};
	})(originalInputUpdate);
	
	
	Menu.prototype.stopTweens = function() {
		this.cursor.stopTweens();
		this.highlight.stopTweens();
	};
	
	console.log("Mod: 'Reset Timer on Keyup' applied!");
})();