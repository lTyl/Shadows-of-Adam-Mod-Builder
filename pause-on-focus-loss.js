(function(){
	window.addEventListener("blur", function() {
		ig.music.mute();
		ig.system.stopRunLoop.call(ig.system);
		console.log("Focus lost: Stopping!");
	});
	window.addEventListener("focus", function () {
		ig.music.unmute();
		ig.system.startRunLoop.call(ig.system);
		console.log("Focus lost: Resuming!");
	});
	console.log("Mod: 'Pause on Blur' has been installed!");
})();
