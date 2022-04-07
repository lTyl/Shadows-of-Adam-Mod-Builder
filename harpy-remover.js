(function(){
	var cvs = document.createElement('canvas');
	var ctx = cvs.getContext('2d');
	// The sprite to replace the Harpy with
	var replaceWith = ig.Image.cache["media/graphics/monsters/monster_eagle_scaled@4x.png"];
	var harpyPath = "media/graphics/monsters/monster_harpy_scaled@4x.png";

	cvs.width = replaceWith.data.width;
	cvs.height = replaceWith.data.height;

	ctx.drawImage(replaceWith.data, 0, 0);

	// The new reference for the harpy sprite
	if (ig.Image.cache[harpyPath]){
		ig.Image.cache[harpyPath].data = cvs;
	}
	//
	console.log("'Harpy Remover' mod installed!", ig.Image.cache[harpyPath]);
})();
