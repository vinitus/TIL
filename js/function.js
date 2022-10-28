function a(a1,a2) {
    this.a1 = a1
    this.a2 = a2
}

function b(b1,b2) {
    this.b1 = b1
    this.b2 = b2
}

const A = new a(1,2)

console.log(A)

A.hello = () => console.log('A_hello')

console.log(A)
console.log(A.hello)
A.hello()
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')

console.log(A.prototype)        // undefined
console.log(A.constructor)      // a
console.log(A.__proto__)        // {constructor: ƒ}
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>1')

console.log(A.constructor)              // a
console.log(A.constructor.prototype)    // {constructor: ƒ}
console.log(A.constructor.constructor)  // Function() { [native code] }
console.log(A.constructor.__proto__)    // ƒ () { [native code] }
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>2')

console.log(A.constructor.prototype)                // {constructor: ƒ}
console.log(A.constructor.prototype.prototype)      // undefined
console.log(A.constructor.prototype.constructor)    // a
console.log(A.constructor.prototype.__proto__)      // {} .. == Object.prototype
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>3')

console.log(A.constructor.constructor)              // Function() { [native code] }
console.log(A.constructor.constructor.prototype)    // ƒ () { [native code] }
console.log(A.constructor.constructor.constructor)  // Function() { [native code] }
console.log(A.constructor.constructor.__proto__)    // ƒ () { [native code] }
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>4')

console.log(A.constructor.__proto__)                // ƒ () { [native code] }
console.log(A.constructor.__proto__.prototype)      // undefined
console.log(A.constructor.__proto__.constructor)    // Function() { [native code] }
console.log(A.constructor.__proto__.__proto__)      // {} .. == Object.prototype
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5')

console.log(A.constructor.prototype.__proto__)              // {} .. == Object.prototype
console.log(A.constructor.prototype.__proto__.prototype)    // underfined
console.log(A.constructor.prototype.__proto__.constructor)  // ƒ Object() { [native code] }
console.log(A.constructor.prototype.__proto__.__proto__)    // null
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>6')

console.log(Object)
console.log(Object.prototype)           // {} .. == Object.prototype
console.log(Object.constructor)         // Function() { [native code] }
console.log(Object.__proto__)           // ƒ () { [native code] }
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>7')

console.log(A.constructor.prototype.__proto__.__proto__)                //
console.log(A.constructor.prototype.__proto__.__proto__.prototype)      //
console.log(A.constructor.prototype.__proto__.__proto__.constructor)    //
console.log(A.constructor.prototype.__proto__.__proto__.__proto__)      //