# async와 await

## 1. async

[async function 공식문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function)

async는 function을 비동기 함수로 정의해주는 선언으로써 암시적으로 Promise를 사용하여 Promise객체를 반환한다. 따라서 function의 return을 new Promise를 통해 Promise 객체를 만드는 것과 유사하나 코드를 간결하게 바꿔주기 때문에 코드를 구현하는데 있어서 편리하고 또, 가시적으로 보기 좋게 만들어준다.

### async는 사실 Promise랑 같다

```js
async function one() {
  return 1
}

function one() {
  return Promise.resolve(1)
}
```

위의 두 코드는 같은 것이다. async function는 Promise 객체를 반환하니까 return 1을 해주면 항상 해석되며 이행됨 상태와 함께 값에 1을 담아서 Promise객체로 반환하는 것!

## 2. await

[await 공식문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/await)

await는 Promise를 기다리기 위해 사용한다 = then과 같다. 하지만 async function내에서만 사용할 수 있다는 것과 이전 요청의 return 값을 값에 할당할 수 있다는 점이다. 따라서 비동기 처리를 동기적으로 체이닝해서 처리할 수 있게 해주는 then과 같지만 조금 더 깔끔하게 코드를 구성해주는 의의가 있다.

### await도 then과 같다

```js
async function one() {
  await 1
}

function one() {
  return Promise.resolve(1).then(() => {})
}
```

await 뒤에 아무것도 안해주었기 때문에 then에서도 아무것도 안한 것이고 둘은 같다. 간결한 코드를 위한 것

## 3. 중요한 점

1. async에서 await 앞에 뭔가가 있더라도 이는 그냥 동기적으로 실행될 뿐이다.
2. async에서 await가 없다면 비동기처리의 동기적 처리에 대한 의미가 없다.
   만약 await 없이 Promise가 실행되더라도 이는 그냥 다른 비동기가 시작될 뿐이다.
3. await는 변수에 할당할 수 있기 때문에 후에 따로 필요하다면 쓸 수 있다는 장점이 있다.
4. async에서 await를 만나면 하던 함수 진행을 멈추고 await가 끝나길 기다린다.
5. await 뒤에 반드시 Promise 객체가 올 필요는 없다. 근데 await를 쓸 이유는 없다.
6. await 사이에 어떤 코드가 오면 첫 await가 끝나면 두번째 await를 만나기 전까지 동기적으로 실행된다.
7. await를 만나면 함수의 실행이 멈추기 때문에 함수가 실행된 코드로 돌아가서 그 이후의 코드가 실행된다.

## 4. 예제

```js
function wait2s() {
  return new Promise((resolve) => {
    // 9: setTimeout실행
    setTimeout(() => {
      resolve("wait2s resolve") // 10: 2초 뒤 resolve되며 PromiseResult에 "wait2s resolve"이 담겨서 fullfilled state의 Promise 반환
    }, 2000)
  })
}

async function wait1s(result) {
  console.log("wait1s is called") // 4: "wait1s is called" 출력

  // 5: setTimeout 실행
  setTimeout(() => {
    console.log("In only setTimeout, wait1s end") // 6-1: 1초 뒤 실행
    return result + " is completed"
  }, 1000)
}

async function asyncCall() {
  console.log("asyncCall is called") // 2: "asyncCall is called" 출력
  wait1s("wait1s") //3: wait1s 시작
  console.log("asyncCall have called") //6-2: await가 아니기 때문에 병렬로 처리되는 함수는 따로 처리되고 "asyncCall have called" 출력

  const result = await wait2s() // 7: await의 시작, 기다리는 동안 asyncCall은 멈추게 됨
  // 11: fullfilled된 Promise 객체가 반환되었으니 이후의 코드들을 동기적으로 실행

  console.log("after wait2s is ended") // 12: "after wait2s is ended" 출력
  console.log("result :" + result) // 13: result의 값에는 wait2s의 return 값인 "wait2s resolve"가 할당되어있다.

  const one = await wait1s(result) // 14: 이번에 호출한 wait1s 함수는 await

  // 15: setTimeout은 단순한 비동기 처리 method이기 때문에 바로 "after wait1s is ended, wait2s is ended"가 출력
  console.log("after wait1s is ended, wait2s is ended")

  // 16: setTimeout의 return 값은 setTimeout의 return 값이지 wait1s의 return값은 undefined이다.
  console.log("one :" + one)
  // 17: 때문에 1초를 기다려도
  setTimeout(() => {
    console.log("one :" + one) // 17: one의 결과는 변하지 않는다.
  }, 1000)

  return "hello"
}

let hi = "hi"

hi = asyncCall() //1 : async 시작

// 8: asyncCall이 await를 만나서 멈췄기 때문에 이후의 코드가 실행
console.log("after asyncCall is called")
console.log(hi) // hi는 'hi'가 아니다. Promise 객체가 생성된 상태이다. 단지 settled되지 않아서 pending 상태인 Promise일 뿐이다.
```

결과는
asyncCall is called
wait1s is called
asyncCall have called
after asyncCall is called
Promise { <pending> }
In only setTimeout, wait1s end
after wait2s is ended
result :wait2s resolve
wait1s is called
after wait1s is ended, wait2s is ended
one :undefined
In only setTimeout, wait1s end
one :undefined
