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

// console.log(A.prototype.constructor)

console.log(A.constructor.prototype)    // {constructor: ƒ}
console.log(A.constructor.__proto__)    // ƒ () { [native code] }
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>2')

console.log(A.__proto__.prototype)      // undefined
console.log(A.__proto__.constructor)    // a

console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>3')

console.log(A.constructor.prototype.constructor)    // a
console.log(A.constructor.prototype.prototype)
console.log(A.constructor.prototype.__proto__)


console.log(A.constructor.__proto__.prototype)      // undefined
console.log(A.constructor.__proto__.constructor)    // ƒ Function() { [native code] }
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>4')

console.log(A.__proto__.prototype)              // undefined
console.log(A.__proto__.constructor)            // a

console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5')

console.log(A.__proto__.constructor.prototype)  // {constructor: ƒ}
console.log(A.__proto__.constructor.__proto__)  // ƒ () { [native code] }

console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>6')

console.log(A.constructor.__proto__.prototype)
console.log(A.constructor.__proto__.constructor)
console.log(A.constructor.__proto__.__proto__)

console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>7')

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

// console.log(A.prototype.constructor)

console.log(A.constructor.prototype)    // {constructor: ƒ}
console.log(A.constructor.__proto__)    // ƒ () { [native code] }
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>2')

console.log(A.__proto__.prototype)      // undefined
console.log(A.__proto__.constructor)    // a

console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>3')

console.log(A.constructor.prototype.constructor)    // a
console.log(A.constructor.prototype.prototype)
console.log(A.constructor.prototype.__proto__)


console.log(A.constructor.__proto__.prototype)      // undefined
console.log(A.constructor.__proto__.constructor)    // ƒ Function() { [native code] }
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>4')

console.log(A.__proto__.prototype)              // undefined
console.log(A.__proto__.constructor)            // a

console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5')

console.log(A.__proto__.constructor.prototype)  // {constructor: ƒ}
console.log(A.__proto__.constructor.__proto__)  // ƒ () { [native code] }

console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>6')

// console.log(A.constructor.__proto__.prototype)
// console.log(A.constructor.__proto__.constructor)
// console.log(A.constructor.__proto__.__proto__)

console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>7')

console.log(A.constructor.__proto__.constructor)
console.log(A.constructor.__proto__.constructor.prototype)
console.log(A.constructor.__proto__.constructor.constructor)
console.log(A.constructor.__proto__.constructor.__proto__)