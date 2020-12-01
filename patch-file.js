(function(){
	const injection = {
		update: function() {
			this.parent();
			if (!ig.game.gotoMenu) {
				this.kill();
			} else {
				this.currentAnim.alpha += ig.system.tick * 8;
				if (this.currentAnim.alpha >= this.time) {
					this.kill();
				}
			}
		}
	};

	window.EntityFlash.inject(injection);

	console.log("Mod: 'Flash Removal' Mod Installed!");
})();
