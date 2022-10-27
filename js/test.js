class classP {
  constructor(a,b){
      this.aa = a
      this.bb = b
  }
}

function funcP (a,b) {
  this.aa = a
  this.bb = b
}

classP.hi = function () {
  console.log(`hi class ${this.aa}`)
}

funcP.hello = function () {
  console.log(`hi func ${this.aa}`)
}

const constP = {
  aa:'',
  bb:'',
  get sett() {
    return this.aa, this.bb
  },
  set sett(ab) {
    [this.aa, this.bb] = ab.split(" ")
  }
}
