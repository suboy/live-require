var path = require('path');
var fs = require('fs');

var global = this;
var map = {};

module.exports = function(p){
	var modulePath = require.resolve(p);
	//console.log(modulePath)
	if(needReload(modulePath)){
		console.log('load: '+modulePath);
		delete require.cache[modulePath];
	}
	return require.apply(global, [p]);
}

function needReload(modulePath){
	if(!fs.existsSync(modulePath)){
		console.log('no module file: '+modulePath)
		return false;
	}
	var stat = fs.statSync(modulePath);
	var lastTime = map[modulePath]||0;
	var modifyTime = stat.mtime.getTime();
	if(stat&&lastTime!=modifyTime){
		map[modulePath] = modifyTime;
		//console.log(modifyTime);
		return true;
	}else{
		return false;
	}
}