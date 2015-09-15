var path = require('path');
var fs = require('fs');

var global = this;
var map = {};

module.exports = function(p){
	p = p.indexOf('/')<0?p:path.join(process.cwd(),p);
	if(pickFileTime(p)){
		//console.log(require.cache[p]);
		delete require.cache[p];
	}
	return require.apply(global, [p]);
}

function pickFileTime(p){
	if(!fs.existsSync(p)){
		console.log('no exists: '+p)
		return false;
	}
	var stat = fs.statSync(p);
	var lastTime = map[p]||0;
	var modifyTime = stat.mtime.getTime();
	if(stat&&lastTime!=modifyTime){
		map[p] = modifyTime;
		//console.log(modifyTime);
		return true;
	}else{
		return false;
	}
}