function doSomething(){}
console.log( doSomething.prototype );
console.log( doSomething.constructor );
// It does not matter how you declare the function, a
//  function in JavaScript will always have a default
//  prototype property.
var doSomething = function(){};
console.log( doSomething.prototype );
console.log( doSomething.constructor );