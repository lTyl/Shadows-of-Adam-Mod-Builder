var wb = require('web-bundle');

var argv = require('minimist')(process.argv.slice(2));

const output = argv["output"] || './patch-file.pak';


var bundle = new wb.Bundle();
bundle.addFile('./patch-file.js', function(err) {
	bundle.write(output, function(err) {
		if (err){
			console.log("ERROR", err);
		} else {
			console.log("Build successful!", output);
		}
	});
});