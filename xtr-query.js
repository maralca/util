	function XtrElement(element){
		var xtrElement = Object.create(this,{
			"hide":{
			    value: function() {
			        element.style.display = "none";
			    }
			},
			"show":{
				value:function(){
					element.style.display = "";
				}
			},
			"hasClass":{
				value:function(needle){
					var myClasses = element.className;
					var arrayMyClasses = myClasses.split(" ");
					var hasClass=false;
					if(arrayMyClasses.length > 0){
						var indexInArray = arrayMyClasses.indexOf(needle);
						hasClass = indexInArray >= 0;
					}
					else{
						hasClass = needle == myClasses;
					}
					return hasClass;
				}
			},
			"addClass":{
				value:function(addClassName){
					var x = element.className +" "+ addClassName;
					if(!this.hasClass(addClassName))
						element.className = x;
				}
			},
			"removeClass":{
				value:function(removeClassName){
					var myClasses = element.className;
					var arrayMyClasses = myClasses.split(" ");
					if(arrayMyClasses.length > 1){
						var indexInArray = arrayMyClasses.indexOf(removeClassName);
						if(indexInArray >= 0){
							arrayMyClasses.splice(indexInArray,1);
							var classes = arrayMyClasses.toString().replace(","," ");
							element.className = classes;
						}
					}
					else{
						if(myClasses==removeClassName)
							element.className="";
					}
				}
			},
			"tabId":{
				get:function(){
					return "#"+element.getAttribute("data-xtr-tab");
				}			
			},
			"tabIdName":{
				get:function(){
					return element.getAttribute("data-xtr-tab");
				}
			},
			"target":{
				get:function(){
					return XtrQuery(this.tabId);
				}
			},
			"element":{
				get:function(){
					return element;
				}			
			},
			"children":{
				value:function(childSelector){
					var xtrq = XtrQuery(this.element,childSelector);
					return xtrq;
				}
			},
			"onLoad":{
				value:function(){
					var func = element.getAttribute("data-xtr-tab-onload");
					var alreadyLoad = element.getAttribute("data-xtr-tab-alreadyload");
					alreadyLoad = alreadyLoad!=null;
					if((XtrGraficoUtil.isset(func) ? func!=null : false) && !alreadyLoad){
						element.setAttribute("data-xtr-tab-alreadyload",true);
						eval(func);
					}
				}
			},
			"addEventListener":{
				value:function(type,func){
					element.addEventListener(type,func);
				}
			},
			"data":{
				value:function(dataType,dataValue){
					if(!XtrGraficoUtil.isset(dataValue)){
						var x = element.getAttribute("data-"+dataType);
						x = JSON.parse(x);
						return x;
					}
					element.setAttribute("data-"+dataType,dataValue);
				}
			},
			"background":{
				value:function(color){
					element.style.background=color;
				}
			},
			"color":{
				value:function(color){
					element.style.color=color;
				}
			}
		});
		
		return xtrElement;
	}
	function XtrQuery(selector,childSelector){
		if(XtrGraficoUtil.isset(childSelector)){
			var realElements = selector.querySelectorAll(childSelector);
		}
		else{
			var realElements = document.querySelectorAll(selector);
		}
		var xtrElements = [];
		for (var i = 0; i < realElements.length; i++) {
			var realElement = realElements[i];
			var xtrElement = new XtrElement(realElement); 
			xtrElements.push(xtrElement);
		};
		if(xtrElements.length == 1) xtrElements = xtrElements[0];
		return xtrElements;
	}