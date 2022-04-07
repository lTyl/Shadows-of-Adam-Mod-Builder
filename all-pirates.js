(function(){
	function createThemArrs() {
		new ig.Image('media/graphics/sprites/npc_pirate_captain.png');
		new ig.Image('media/graphics/sprites/npc_pirate.png');
		console.log("Mod: Pirate Boi: Creating them arrs!");
	}

	// We do hacky things around these parts.
	// The real reason is SOA has dynamic asset loading for sprites, so we just continuously check for new resources.
	setInterval(() => {
		if (!ig.Image.cache['media/graphics/sprites/npc_pirate_captain_scaled@4x.png']
			|| !ig.Image.cache['media/graphics/sprites/npc_pirate_captain_scaled@4x.png'].loaded
			|| !ig.Image.cache['media/graphics/sprites/npc_pirate_scaled@4x.png']
			|| !ig.Image.cache['media/graphics/sprites/npc_pirate_scaled@4x.png'].loaded
		) {
			createThemArrs();
			return;
		}

		var cvs = document.createElement('canvas');
		var ctx = cvs.getContext('2d');
		// The random pirate sprites
		var randomPirateArray = [ig.Image.cache['media/graphics/sprites/npc_pirate_captain_scaled@4x.png'], ig.Image.cache['media/graphics/sprites/npc_pirate_scaled@4x.png']];
		var npcKeyword = 'npc'

		function getRandomPirateBoi() {
			return randomPirateArray[Math.floor(Math.random() * randomPirateArray.length)];
		}

		for (let key in ig.Image.cache) {
			if (key === 'media/graphics/sprites/npc_pirate_captain_scaled@4x.png' || key === 'media/graphics/sprites/npc_pirate_scaled@4x.png' || ig.Image.cache[key].isPirate) {
				continue;
			}
			var pirateBoi = getRandomPirateBoi();

			console.log('Pirate Boi: Original ', key, 'is being replaced by', pirateBoi.path);

			cvs.width = pirateBoi.data.width;
			cvs.height = pirateBoi.data.height;

			ctx.drawImage(pirateBoi.data, 0, 0);

			// The new reference for the pirate boi
			ig.Image.cache[key].data = cvs;
			ig.Image.cache[key].width = cvs.width;
			ig.Image.cache[key].height = cvs.height;
			ig.Image.cache[key].isPirate = true;
		}
	}, 1000);

	console.log("Mod: 'Pirate Boi' mod installed!");
})();
