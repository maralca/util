function xtrRequire(paths,callback){
	var root = "..\\geochartlibs\\";
	var script;
	var path;
	var pathIndex;

	paths = XtrGraficoUtil.isarray(paths) ? paths : [paths];

	for(pathIndex = 0; paths.length > pathIndex; pathIndex++){
		path = paths[pathIndex];
		script = document.getElementById(path+"_script");
		if(script == null){
			script = document.createElement("script");
		    script.setAttribute("type","text/javascript");
			script.onload = function(){
				console.info("xtrRquire, script loaded with success");
				callback();
			};
		    script.setAttribute("src",root+path+".js");
		    console.info("xtrRquire, loading script",root+path+".js");
		    document.head.appendChild(script);
		}
		else{
			console.info("xtrRequire, script is load, already");
			callback();
		}
	};
}