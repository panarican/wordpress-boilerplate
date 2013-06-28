// requireIf
var requireIf = function(moduleArray, condition, elseFunction) {
    if ( typeof condition == "undefined"  || condition ) { 
            return require(moduleArray);
        } else if (typeof elseFunction != "undefined") {
            elseFunction();
    }
}