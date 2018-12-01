# Shadows of Adam Mod Builder

This is a mod for the turn-based RPG [Shadows of Adam](https://store.steampowered.com/app/506510/Shadows_of_Adam).
This mod builds a .pak file which can be used to modify the original Shadows of Adam game.


## Installation
`npm install shadows-of-adam-mod-builder --save`

## Building
To build a new Shadows of Adam mod, run `node index.js`.

The only current accepted parameter is `--output` of string type. If `--output` is defined, then the built mod will save at the provided location.

**WARNING:** The input file must *always* be named `patch-file.js`. If it is not, the Shadows of Adam MOD API will be unable to read the .pak file and the mod will fail to install. 

The `output.pak` file can be named whatever you'd like.