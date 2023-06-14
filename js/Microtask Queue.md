[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)

# Promise

이름 뜻대로 약속이다. 어떤 약속이냐하면 Promise가 생성될 때,

인자로 들어가는 excutor 함수가 어떤 결과가 나올 때 결과를 제공한다는 약속인 것이다.

즉, 생성된 시점에는 알려지지 **"않았을 수도"** 있는 값을 위한 대리 처리자인 것이다.

Promise의 executor함수는 micro task로 대기열에 저장된다.

micro task는 간단히 말하자면 흔히 아는 js에서 비동기작업 처리를 하는 task queue와 비슷하다.

나중에 깊게 다루겠지만 Promise의 비동기 함수는 task queue로 가는 것이 아니라 microtask queue로 이동하게 되고 Promise가 resolved됐을 때 가능한 빨리 실행되는 곳이다.

Promise의 executor 함수에서 인자로 **resolve와 reject**가 들어간다.

로직에 따라 resolve를 할지 reject를 할지 결정할 수 있다.

Promise 뒤에 then이나 catch가 없다면 resolve와 reject를 한다고 해서 그 의미를 지니지 않는다.

즉, Promise는 **then chaining을 통해서 비동기를 동기적으로 처리하기 쉽게 하는 것 뿐**이다.

다시 말해, Promise는 그 자체로 비동기처리가 되는 것이 아니다. **주로** 비동기 함수가 들어가는 것이다.

```javascript
console.log('Start');

const asyncFunction = () => {
  return new Promise((resolve, reject) => {
    console.log('promise log');
    resolve();
  });
};

asyncFunction().then(() => {
  console.log('then log');
});

console.log('End');

// ----result----
// start
// promise log
// End
// then log
```

전혀 문제가 되지 않는다. 단지, promise로의 의미가 없을 뿐이다.

Promise는 결국, 비동기로 처리되는 작업의 결과를 가지고 어떤 작업을 할 때나 작업이 완료되고 난 후에 어떤 작업을 할 때 사용되어야 한다.

비동기로 처리되는 작업들은 오래걸리는 작업이 아니다. 주로, fetch같은 web API나 setTimeout같은 js timer가 있다.

혹은, 비동기가 들어있는 다른 promise나 web worker가 될 수 있다.

### 마이크로태스크 큐

Promise의 콜백함수는, 마이크로태스크 큐로 들어간다. 마이크로태스크 큐는 일반 Task 큐보다 이벤트 루프에 있어서 우선순위가 높다. 중요한 것은 마이크로태스크 큐가 전부 비어야 Task 큐가 실행되기 시작한다는 것이다.

이벤트 루프가 왜 **루프인지**를 생각해야한다. [mdn 이벤트루프](https://developer.mozilla.org/ko/docs/Web/JavaScript/EventLoop#%EC%9D%B4%EB%B2%A4%ED%8A%B8_%EB%A3%A8%ED%94%84)

```javascript
while (queue.waitForMessage()) {
  queue.processNextMessage();
}
```

mdn 문서에 따르면 이벤트 루프를 다음과 같이 말하고 있다.

큐에 대기중인 메시지가 있는 동안, 다음 메시지를 실행시킨다는 것

이젠, 조금은 복잡하지만 태스크 큐와 마이크로 태스크 큐를 살펴보러갈 차례이다.

```javascript
console.log('start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

const promise1 = new Promise((resolve, reject) => {
  console.log('promise 1');
  setTimeout(() => {
    console.log('setTimeout 1');
    setTimeout(() => {
      console.log('setTimeout 2');
    }, 0);
    resolve(1);
    console.log('setTimeout 3');
  }, 0);
  console.log('promise 2');
});

promise1
  .then(() => {
    console.log('then 1');
  })
  .then(() => {
    console.log('then 2');
  });

console.log('end');
```

1. console.log("start")로 인해 start가 출력된다.

2. 다음에는 setTimeout이라는 브라우저 환경에서 실행될 함수가 들어와서 setTimeout은 브라우저에게 맡겨진다. 하지만 즉시 끝나는 함수이기에 콜백함수는 Task 큐에 들어가게 되어 Task queue에 console.log("setTimeout")이 존재하게된다.

   `Task queue = [console.log("setTimeout")]`

3. promise 생성자로 들어간다. 생성자 내에서 실행되는 함수는 큐에 들어가는 함수가 아닌, 즉시 실행되는 함수임을 주의해야한다. 때문에 console.log("promise 1")이 실행되어 promise 1이 출력된다.

4. setTimeout은 브라우저에게 맡겨지나 하지만 즉시 끝나는 함수이기에 콜백함수는 Task 큐에 들어가게 되어 Task queue에 다른 setTimeout이 추가된다.

   `Task queue = [console.log("setTimeout"), setTimeout(...)]`

5. console.log("promise 2")는 콜 스택에 추가되고 즉시 실행되어 promise 2가 출력된다.

6. promise1에 chaining된 then들은 promise 1이 fullfilled되기 전에는 실행되지 않는다.

7. console.log("end")를 만나 end가 출력된다.

여기까지가 js 코드의 동기적 실행이다.

1. 콜 스택이 비어있으니 마이크로태스크 큐를 확인하나 비어있으므로 task 큐로 들어간다.

2. task 큐의 처음은 console.log("setTimeout")이므로 setTimeout이 출력된다.

3. task 큐의 두번째인 setTimeout(...)이 실행될 차례이다. 이로 인해서, Task 큐는 비어있는 상태가 된다. 우선 console.log("setTimeout 1")이 실행되어 출력된다.

4. setTimeout이 실행되고 즉시 끝나서 task 큐에 다시 console.log("setTimeout 2")가 생긴다.

   `Task queue = [console.log("setTimeout 2")]`

5. resolve(1)이 실행되어 then chaining된 콜백함수가 마이크로태스크 큐에 쌓인다. 그렇다고 해서 즉시 실행되진 않는다.  promise 생성자 안의 첫번째 setTimeout의 콜백함수가 종료되지 않았기에 계속 실행된다.

   `Task 큐 = [console.log("setTimeout 2")]`

   `microtask 큐 = [console.log("then 1")]`

6. console.log("setTimeout 3")이 실행되어 출력되고 콜백함수가 종료된다.

7. 방금까진 Task 큐를 이벤트 루프가 실행시켰지만 다시 mircotask 큐에 값이 생겼기에 microtask를 실행시킨다. console.log("then 1")가 실행되고 microtask 큐는 비게 되지만, 다시 then chaining으로 인해 다음 then의 콜백함수인 console.log("then 2")이 다시 추가된다.

   `Task 큐 = [console.log("setTimeout 2")]`

   `microtask 큐 = [console.log("then 2")]`

8. microtask 큐의 콜백함수를 실행시켜 then 2가 출력되고 microtask 큐는 온전히 비게 된다.

9. task 큐의 console.log("setTimeout 2")가 실행된다.

#### **reference**

[https://developer.mozilla.org/ko/docs/Web/API/HTML_DOM_API/Microtask_guide](https://developer.mozilla.org/ko/docs/Web/API/HTML_DOM_API/Microtask_guide)

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)

[https://developer.mozilla.org/ko/docs/Web/JavaScript/EventLoop#%EC%9D%B4%EB%B2%A4%ED%8A%B8\_%EB%A3%A8%ED%94%84](https://developer.mozilla.org/ko/docs/Web/JavaScript/EventLoop#%EC%9D%B4%EB%B2%A4%ED%8A%B8_%EB%A3%A8%ED%94%84)
