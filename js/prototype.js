function funca(input1, input2) {
  this.a1 = input1
  this.a2 = input2
}

const A = new funca(1, 2)

console.log(A.a1)
console.log(A.a1)
A.a3
undefined
A.a3 = 3
3
funca.a3 = 33
33
A.a3
3
funca.a3
33
const A1 = new funca(1, 2)
A1.a3         // undefined
funca
funca(input1, input2) {
  this.a1 = input1
  this.a2 = input2
}
funca.prototype.a3 = 333
A.a3          // 3
A1.a3         // 333
A.hi = function () {
  console.log('A hi')
}
A.hi()        // A hi
funca.hi = function () {
  console.log('funca hi')
}
funca.hi()    //