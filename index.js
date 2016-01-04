var path = require('path');
var fs = require('fs');

var global = this;
var map = {};	//checkTime, modifyTime
var checkInterval = 0;

// var live = function(p){return require('live')(require.resolve(p))};

module.exports.init = function(option){
	checkInterval = option.interval*1000||0;
}

module.exports.liveRequire = function(p){
	var modulePath = require.resolve(p);
	//var d = Date.now();
	//console.log(modulePath)
	if(needReload(modulePath)){
		console.log('load: '+modulePath);
		delete require.cache[modulePath];
	}
	//console.log(Date.now()-d);
	return require.apply(global, [p]);
}

function needReload(mp){
	if(!fs.existsSync(mp)){
		console.log('no module file: '+mp)
		return false;
	}
	var stat = fs.statSync(mp);
	if(!stat) return false;
	var moduleInfo = map[mp] = map[mp]||{};
	if(moduleInfo.checkTime+checkInterval>Date.now()) return false;
	//console.log('date: '+(moduleInfo.checkTime+checkInterval-Date.now()));
	moduleInfo.checkTime = Date.now();
	var lastTime = moduleInfo.modifyTime||0;
	var modifyTime = stat.mtime.getTime();
	if(lastTime!=modifyTime){
		moduleInfo.modifyTime = modifyTime;
		//console.log(modifyTime);
		return true;
	}else{
		return false;
	}
}