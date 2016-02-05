var XtrGraficoUtil = {
    convertKMB:function(base10,decimalCases,notBase){
        var val10;
        var UN;
        decimalCases = this.isset(decimalCases) ? decimalCases : 3;
        if(this.isset(notBase) ? notBase : false){
            base10 = Math.log(base10) / Math.log(10);
        }

        UN = "";

        val10 = Math.pow(10,base10);

        if(0 <= base10){
            val10 = val10;
        }
        if(3 <= base10){
            val10 = val10/1000;
            UN = "K";
        }
        if(6 <= base10){
            val10 = val10/1000;
            UN = "M"
        }
        if(9 <= base10){
            val10 = val10/1000;
            UN = "B"
        }
        val10 = val10.toFixed(decimalCases);
        return val10+UN;
    },    
    isset:function(any){
        var amI;

        amI = typeof any!=undefined && typeof any!="undefined";

        return amI;
    },
    isobj:function(any){
        var amI;

        amI = this.isset(any) ? any instanceof Object : false;
        
        return amI
    },
    hasInObj:function(array,prop,needle){
        for (var index = 0; index < array.length; index++) {
            var obj = array[index];
            if(obj[prop] == needle)
                return true;
        }
        return false;
    },
    isnull:function(any){
        var amI;
        var nulos,nulo;
        var nuloIndex;

        nulos = [null,undefined];

        amI = !this.isset(any);

        for(nuloIndex = 0; nulos.length > nuloIndex && !amI; nuloIndex++){
            nulo = nulos[nuloIndex];
            amI = amI && nulo == any;
        }
        
        return amI
    },
    isarray:function(any){
        var amI;

        amI = this.isobj(any) ? any instanceof Array : false;

        return amI;
    },
    iscallable:function(any){
        var amI;

        amI = this.isset(any) ? typeof any === 'function' : false;

        return amI;
    },
    log10:function(){

    },
    somatorium:function(collection){
        var item;
        var itemIndex;
        var sum;

        collection = this.isarray(collection) ? collection : [collection];

        sum = 0;
        for(itemIndex = 0; collection.length > itemIndex; itemIndex++){
            item = collection[itemIndex];
            sum += item;
        }

        return sum;
    },
    maximum:function(collection){
        collection = this.isarray(collection) ? collection : [collection];

        return Math.max.apply(null, collection);
    },
    minimum:function(collection){
        collection = this.isarray(collection) ? collection : [collection];

        return Math.min.apply(null, collection);
    },
    average:function(collection){
        var sum;
        var media;

        collection = this.isarray(collection) ? collection : [collection];

        sum = this.somatorium(collection);

        media = sum / collection.length;

        return media;
    },
    median:function(collection){
        var max,min;
        var mediana;

        max = this.maximum(collection);
        min = this.minimum(collection);

        mediana = max - min;
        mediana /= 2;

        return mediana;
    },
    concat:function(objHP,objLP){
        var propName,propValue;

        var objOut;

        objOut = {};
        for(propName in objLP){
            propValue = objLP[propName];
            objOut[propName] = propValue;
        }
        for(propName in objHP){
            propValue = objHP[propName];
            objOut[propName] = propValue;
        }
        return objOut;
    },
    clone:function(any){        
        if(!XtrGraficoUtil.isset(any))
            return undefined;

        return JSON.parse(JSON.stringify(any));
    },
    color:{    
        hex2rgb:function(color,inRGB){
            var r,g,b;
            if(color.charAt(0) == '#') {
                color = color.substr(1);
            }
            else{
                if(XtrGraficoUtil.isset(inRGB) ? inRGB : false){
                    if(color.indexOf("rgba") >= 0){
                        color = color.slice(5).replace(")","").replace(" ","");
                        color = color.split(",");

                        return {
                            r:parseInt(color.shift()),
                            g:parseInt(color.shift()),
                            b:parseInt(color.shift()),
                            a:eval(color.shift())
                        };
                    }
                    else if(color.indexOf("rgb") >= 0){
                        color = color.slice(4).replace(")","").replace(" ","");
                        color = color.split(",");
                        return {
                            r:parseInt(color.shift()),
                            g:parseInt(color.shift()),
                            b:parseInt(color.shift()),
                            a: 1
                        };
                    }
                }
                return color;
            }
            r = color.charAt(0) + '' + color.charAt(1);
            g = color.charAt(2) + '' + color.charAt(3);
            b = color.charAt(4) + '' + color.charAt(5);

            r = parseInt(r,16);
            g = parseInt(g,16);
            b = parseInt(b,16);

            if(XtrGraficoUtil.isset(inRGB) ? inRGB : false)
                return {r:r,g:g,b:b,a:1};

            return "rgb(" + r + "," + g + "," + b + ")";
        },
        rgbToHsl:function(color){
            var max,min;
            var h,s,l;
            var d;

            color = this.hex2rgb(color,true);

            color.r /= 255;
            color.g /= 255;
            color.b /= 255;

            max = Math.max(r, g, b);
            min = Math.min(r, g, b);

            l = (max + min) / 2;

            if(max == min){ 
                h = 0;
                s = 0; 
            } 
            else {
                d = max - min;

                s = l > 0.5 ? 2 - max - min : max + min;
                s = d / s;

                if(max == r){
                    h = g - b;
                    h /= d;
                    h += b > g ? 0 : 6;
                }
                else if(max == g){
                    h = b - r;
                    h /= d;
                    h += 2;
                }
                else if(max == b){
                    h = r - g;
                    h /= d;
                    h += 4
                }
                
                h /= 6;
            }

            h = h * 100 + 0.5;
            s = s * 100 + 0.5;
            l = l * 100 + 0.5;

            h = Math.floor(h);
            s = Math.floor(s);
            l = Math.floor(l);


            return "hsl("+h+","+s+","+l+")"
        },
        shade:function(color, percent){
            color = this.hex2rgb(color,true);

            color.r *= (1 - percent);
            color.g *= (1 - percent);
            color.b *= (1 - percent);

            color.r = parseInt(color.r);
            color.g = parseInt(color.g);
            color.b = parseInt(color.b);

            return "rgb("+color.r+","+color.g+","+color.b+")"; 
        },
        blend:function(color1, color2, percent){
            var r,g,b;

            color1 = this.hex2rgb(color1,true);
            color2 = this.hex2rgb(color2,true);

            r = color1.a * color1.r * (1 - color2.a) + color2.r * color2.a;
            g = color1.a * color1.g * (1 - color2.a) + color2.g * color2.a;
            b = color1.a * color1.b * (1 - color2.a) + color2.b * color2.a;

            r = parseInt(r);
            g = parseInt(g);
            b = parseInt(b);

            if(!XtrGraficoUtil.isset(percent))
                return "rgb("+r+","+g+","+b+")"; 

            return "rgba("+r+","+g+","+b+","+percent+")";
        }
    },
    splitter:function(splits,strs,pos){
        var split;
        var splitIndex;
        var splited;

        var str;
        var strIndex;

        var wasArray;

        wasArray = this.isarray(strs);

        strs = this.isarray(strs) ? strs : [strs];

        for(strIndex = 0; strs.length > strIndex; strIndex++){
            str = strs[strIndex];
            splited = false;
            for(splitIndex = 0; splits.length > splitIndex && !splited; splitIndex++){
                split = splits[splitIndex];
                str = str.split(split);
                if(str.length > 1){
                    splited = true;
                    str = str[pos];
                }
                else{
                    str = str[0];
                }
            };
            strs.splice(strIndex,1,str);
        };
        strs = wasArray ? strs : strs[0];
        return strs;
    }
}
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}