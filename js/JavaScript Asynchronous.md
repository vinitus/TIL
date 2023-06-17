JS 그 자체는 싱글 스레드 언어라고 하지만, 우리는 흔히들 아는 Promise나 axios, setTimeout등을 통해 비동기 처리를 하고 있다.

어떻게 할 수 있을까?

### JS의 런타임 환경

JS의 비동기 로직을 알아보기 위해선 JS의 런타임 환경을 봐야한다. **런타임 환경**이라는 것은 언어가 실행되는 환경이다. js는 보통 **브라우저**에서 많이 실행되며 **node.js**라는 환경에서도 실행된다.

나는 브라우저를 통해 살펴보려고 한다.

브라우저는 기본적으로 JS를 구동할 수 있는 환경을 가지고 있다. 지금 크롬이라면 F12만 눌러봐도, 다른 브라우저라면 개발자 도구의 콘솔창에서 console.log("Hi!"); 를 통해 곧바로 JS 코드를 동작시킬 수 있다.

이렇듯 언어를 실행시킬 수 있는 환경을 **런타임 환경**이라고 한다.

## 런타임 환경에서 지원해주는 것

JS는 싱글 스레드 언어이기 때문에 그 자체로는 비동기 처리가 불가능하다.

하지만 브라우저는 queue와 브라우저 환경을 통해 지원해주고 있다. 예를 들어, axios 같이 HTTP 통신을 해야하는 작업들은 언제 끝날지 모른다. 또한, setTimeout같은 타이머 역시도 언제 끝날지 모른다. 만약 지금 당장 실행할 코드가 0ms만에 끝나는 것이라고는 해도, 다른 코드에서 언제끝날지 모르는 것은 마찬가지이다.

그렇기 때문에 브라우저는 이를 브라우저 환경에서 실행시키고 있다. 그리고, 이런 함수들은 call back 함수를 인자로 받고, 브라우저 환경에서 진행되는 함수들이 끝나면 queue에 callback 함수를 집어넣어 차례차례 진행되게 해준다.

![image](https://github.com/vinitus/TIL/assets/97886013/503afe11-b908-4264-ab2e-f22ec85493b7)

이러한 구조를 지닌다고 볼 수 있다. web api나 timer가 실행되는 "브라우저 환경"에서 동작하는 원리는 나중에 기회가 되면 알아보고 싶다. 일단은 mdn의 공식문서에서 설명된 그 작업들이 수행된다.

1. 브라우저 환경에서 실행되고 있는 함수가 종료되면 콜백함수가 Task 큐에 차례대로 쌓인다.

2. Task 큐에 있는 콜백함수들은 스택이 없는 경우에만 실행된다.

즉, Task 큐는 스택의 상태에 의존적인 관계를 지니고 있다고 볼 수 있다.

```js
function funcA() {
  console.log('funcA 1');
  setTimeout(() => {
    console.log('setTimeout');
  }, 1000);
  console.log('funcA 2');
}

console.log('global 1');
funcA();
console.log('global 2');

// result
// global 1
// funcA 1
// funcA 2
// global 2
// setTimeout
```

중요한 것은, setTimeout은 브라우저 환경에서 실행된다는 것이다. 실행 완료 이후, Task 큐에 콜백함수를 넘긴다.

큐에 담긴 콜백함수는 콜 스택이 빌때까지 기다린다. 그 이후, 스택에 담겨 실행되는 것이다.

정리해보자면,

1. 브라우저 환경에서 실행되지 않는 **일반 함수**들은 실행될 때마다 **콜 스택**에 쌓이며 해당 함수가 완전히 종료되기 전에는 없어지지 않는다.

2. **브라우저 환경에서 실행되는 함수**들은 호출되면 콜 스택에서 브라우저 환경으로 이동하여 **브라우저에서 따로 실행**된다.

   2-1. 그러면서 **JS 구문은 그대로 실행**되며 차례대로 콜 스택에 쌓인다.

   2-2. 브라우저 환경에서 실행된 비동기 함수들은 종료되면, 인자로 받았던 **콜백함수들을 Task 큐에 쌓는다**.

3. 콜 스택이 비어있다면, Task 큐의 콜백 함수들이 쌓인 **순서대로** 실행된다.

### 이벤트 루프

위의 일련의 과정들을 이벤트 루프라고 한다.

이벤트 루프는 콜 스택을 모니터링 하고 있다가, 콜 스택이 비어있다면 큐의 작업들을 콜 스택으로 푸쉬시킨다.

푸쉬시키게 되면 콜 스택은 다시 비어있지 않으니 대기하고 다시 푸쉬한다.

즉, 이벤트 루프는

1. 콜 스택이 비어있는가 (이는 사실 Task 큐에서 콜 스택으로 푸쉬된 작업이 실행중인지를 확인하는 것과 다르지 않다.)

2. Task 큐에 콜 스택으로 푸쉬시킬 작업이 있는가

를 계속 확인하는 것이다.

#### **reference**

[https://developer.mozilla.org/ko/docs/Learn/JavaScript/Asynchronous/Introducing](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Asynchronous/Introducing)

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Event_loop](https://developer.mozilla.org/ko/docs/Web/JavaScript/Event_loop)
