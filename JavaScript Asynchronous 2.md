이전 글에서 JS의 비동기 처리에 대해 정리했다.

[https://mystacks.tistory.com/71](https://mystacks.tistory.com/71)

하지만, 나는 JS가 완전한 비동기일까 궁금해서 더 파보기로 했다.

---

처음 생긴 궁금증은

Task 큐에 대기 중인 함수가 있고, 콜 스택이 비어있는 상황에서 JS의 코드에서 다음 함수가 실행될 타이밍이라고 하면, 누가 우선일까?

다음의 예시를 보면,

```js
setTimeout(() => console.log('Timeout'), 0);

console.log('Function 1');
console.log('Function 1');
console.log('Function 1');
console.log('Function 1');
console.log('Function 1');
console.log('Function 1');
console.log('Function 1');
console.log('Function 1');
console.log('Function 1');
console.log('Function 1');
console.log('Function 1');
console.log('Function 1');
console.log('Function 1');
console.log('Function 1');
```

어떻게 실행될까? 결국 Timeout은 가장 마지막에 실행된다.

결국, **JS 자체의 엔진은 싱글스레드임**을 다시 생각했을 때, 콜백 함수과 JS 코드의 함수들이 어떻게 실행될지를 생각해야한다.

Task 큐의 함수들은 콜 스택이 비어있어야만 실행된다.

하지만, **콜 스택은 Task 큐에 함수가 대기한다고 해서 안쌓이는 것은 아니다.**

그 예시가 위의 코드이다.

1. 여기서 setTimeout은 즉시 바로 끝나는 함수이지만, 런타임 환경에서 실행되는 함수인 것을 아는 JS는 바로 브라우저 환경으로 이동시킨다.

2. 브라우저는 0초만에 끝나기에 콜백함수인 console.log("Timeout")을 Task 큐로 이동시킨다.

3. 하지만, JS 엔진은 JS 코드를 계속 읽어가며 Task 큐의 작업을 **신경쓰지 않고** 계속 함수들을 실행시켜 콜 스택에 쌓는다.

4. 모든 JS 구문이 끝나서 더 이상 콜 스택에 함수가 쌓이지 않게 되면, 그제서야 Task 큐의 함수를 실행시킨다.

다시 말하면,

1. Task 큐의 함수 실행 조건 === 콜 스택이 비어있어야함

2. 콜 스택이 비어있다. !== Task 큐의 함수가 실행 된다.

3. JS 구문이 끝나서 더 이상 실행시킬 함수가 없고, 콜 스택이 비어있다 = Task 큐의 함수가 실행 된다.

이를 완전한 비동기라고 할 수 있을까? 그래서 앞으로는 JS한테 무거운 연산을 시키면 안될 것 같다고 생각하게 되었고, 모듈화를 신경써야할 것 같다.

필요없는 함수들까지 실행시킨다면, 효율적이지 않을 것이다!

---

두번째 의문은, 런타임 환경에서 실행되는 다양한 함수들은 정말 비동기일까?

setTimeout을 또 쓸껀데 ㅋㅋ 2초, 1.5초, 1초, 0.5초를 실행시킬 것이다.

0.5초 간격으로 setTimeout을 실행시킬 것이다. 브라우저가 JS를 해석하고 실행하는데 각 줄마다 0.5초는 무조건 안넘길 것이고 첫 setTimeout과 마지막 setTimeout을 실행시키는데 0.5초 이상 차이나지 않을 것 같아서이다.

우선, 간단하게 4줄만 console.log로 찍어보기

```js
setTimeout(() => console.log(2), 2000);
setTimeout(() => console.log(1), 1000);
setTimeout(() => console.log(1.5), 1500);
setTimeout(() => console.log(0.5), 500);

// 0.5 1 1.5 2
```

당연하게도 0.5초부터 나온 모습

중요한 것은 순서를 섞었다. 처리되는 방식은 큐나 스택같은 순서가 정해진 것은 아닌 것 같다.

**런타임 환경은 완벽하게 비동기로 처리되는 것 같다.**

---

세번째는 마이크로태스크 큐도 비슷할까?

마이크로태스크 큐는 태스크 큐보다 우선 순위가 높을 뿐, 이벤트 루프의 관점에서 봤을 때 콜 스택이 비어있어야만 실행되는 것은 동일하다.

```js
setTimeout(() => console.log('Timeout'), 0);

Promise.resolve().then(() => console.log('Microtask 1'));
Promise.resolve().then(() => console.log('Microtask 2'));

console.log('Function 1');
console.log('Function 1');
console.log('Function 1');
console.log('Function 1');
console.log('Function 1');
console.log('Function 1');
console.log('Function 1');
console.log('Function 1');
console.log('Function 1');
console.log('Function 1');
console.log('Function 1');
console.log('Function 1');
console.log('Function 1');
console.log('Function 1');
```

---

결론,

1. 우리의 JS는 js 코드를 실행하는데 있어서 Task 큐를 신경쓰지 않는다.

2. Task 큐가 비워지려면 콜 스택이 비어있고, js 코드상 콜 스택이 쌓이지 않는 상황이어야한다.

3. 하지만, setTimeout같은 브라우저 환경에서 실행되는 함수들은 온전하게 비동기이다.
