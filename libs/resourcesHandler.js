/**
 * Create a new html resource
 * @param elementType {String}
 * @param properties {Array}
 */
export var loadResourceAsHtml = function(elementType = null, properties = null) {
    var newElement = document.createElement(elementType);
    
    if(properties) {
        for(var i = 0; i < properties.length; i++) {
            newElement.setAttribute(properties[i].name, properties[i].value);
        }
    }

    return newElement;
};