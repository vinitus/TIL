js의 모든 글은 모든 정보는 mdn의 공식문서에 기반한다.

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)

promise에 들어가기 전에 용어정리를 할 필요가 있다.

---

위의 글을 읽다보면 state, fate, fulfilled, rejected, resolved, pending 등이 있다.

영어로 된 글이어서 구글 번역에 의존하다 보니 헷갈리기도 하고 **같이, 자주 등장**하기 때문에 한번 나만의 언어로 정리하고자 한다.

[https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md)

States와 Fates에 관한 글이다. wdn promise에서 발견한 링크이며 states, fates 뿐 아니라 reject 같은 용어에 대한 설명이 잘 되어 있다.

해당 글을 기반으로 내가 따로 공부한 내용을 정리하는 글이다.

---

3줄요약

1\. promise는 3가지 states(fulfilled, resolved, pending)를 가지며 2가지 fates(resolved, unresolved)를 가진다.

2\. fulfilled, resolved되지 않은 상태를 pending이라고 하며 promise의 parameter로 전달되는 executor 함수에서 resolve, reject로 promise를 어떻게 할 것인지 state를 결정지을 수 있다.

3\. promise 내부에서 실행되는 함수가 resolve나 reject 로직을 포함하여 해당 메서드가 실행되면 resolved된 것이고 없다면 unresolved라는 운명을 가진다.

---

### States

promise는 상호 베타적인 3가지 상태(States)를 가진다 -> fulfilled, rejected, pending

1.  promise가 fulfilled(이행)된 상태라면 "가능한 빨리" promise.then(f)에서 f를 실행한다.
2.  promise가 rejected(거부)된 상태라면 "가능한 빨리" promise.then(undefined, r)에서 r을 실행한다.
3.  promise가 pending(대기)중인 상태라면 이는 fulfilled(이행)되거나 rejected(거부)된 상태가 아님을 의미한다.

### settled ?

promise가 settled(해결)되었다는 것은 pending(대기)중이 **아닌** 것이다. 이는 fulfilled(이행)되거나 rejected(거부)된 것이다.  
중요한 것은 settled는 **상태가 아니다.** 언어적 편의를 위한 것이다.

### Fates

promise는 상호 베타적인 2가지 운명(Fates)를 가진다. -> resolved, unresolved

1.  resolved

promise가 resolved(해결)되었다는 것은 해결하거나 거부하려고 시도했지만 효과가 없는 경우를 말한다.

a. 즉, 다른 promise가 promise를 resolve하기 위해 현재 promise가 "locked-in"된 경우나  
b. 현재 promise가 fulfilled(이행)되거나 rejected(거부)된 상태인 경우를 말한다.

직역하면 어려운데 해당 원본 promise가 fulfilled되거나 rejected되어 원본 promise에 연결된 다른 promise, 대표적인 예로 .then()을 resolve하러 떠난 것이다.

그렇기 때문에 해당 promise를 다시 resolve하려고 해도 안되는 것이라고 표현한 것이다.

그렇다면 굳이 왜 locked-in이라고 표현한 것일까?  
promise가 resolved되어 then이라는 promise으로 chaning하게 되면 그 fates는 chained fate로 묶이게 된다.

나는 여지껏 then chaining이 promise의 단순한 동기적 처리라고 여겼는데 chaining인 이유가 있었다.

한 promise의 then chaining이 시작되면 그 promise의 fates는 이미 resolved된 상태이고 더 이상 바꿀 수 없는 상태가 된다.  
다른 promise를 따르겠다는 promise를 "locked-in"으로 만듬으로 인해서

특정 순서로 실행되는 비동기 chaining을 형성하고 오류나 예외를 더 쉽게 처리할 수 있게 된다.

2.  unresolved

promise가 unresolved(미해결)이라는 것은 resolved되지 않은 fates.

즉, promise를 해결하거나 거부하려고 시도했을 시 효과가 있는 상태를 말한다.

여기까지 왔다면 states의 pending과 fates의 unresolved는 무엇이 다를까? 하고 생각이 든다.

### pending과 unresolved

기본적으로 unresolved된 운명을 가진다는 것은 이 promise가 해결될지 안 될지를 판가름하는 것이다.

unresolved라는 것은 이 promise의 미래를 알 수 없는 것이다.

어떤 상황일까?

```
const unresolvedPromise = new Promise((resolve, reject) => {
  // resolve나 reject를 하지 않는 promise
});
```

이 함수는 resolve되거나 reject되지 않는다.

실제로 unresolvedPromise뒤에 then chaining을 하여 console.log를 찍어봐도 아무것도 나오지 않는다.

이러한 상태가 바로 unresolved

resolved의 의미를 다시 생각해보면 promise가 fulfilled되거나 rejected라는 상태를 가지게 되는 경우이다.

unresolved가 resolved가 아닌 운명을 말한다면 pending과 같지 않을까? 하는 생각이 든다.

pending은 fulfilled나 rejected와 상호 베타적인 관계를 가지기 때문이다.

하지만, 조금은 다르다.

우선! 결론적으로 pending이라는 상태는 unresolved에 포함되는 개념이다.

pending의 경우 promise 내부의 **함수가 실행되어 이 결과를 기다리는 상황**을 pending이라고 할 수 있다.

unresolved는 내부의 함수 중에서 resolve나 reject하는 경우가 없는 상황을 말한다.

unresolved가 **fates**의 하나임을 기억해야 한다.

그럼 두가지 상황을 이해할 수 있게 된다.

```
const unresolvedPromise = new Promise((resolve, reject) => {
  // This promise will never be resolved or rejected
  // because there is no asynchronous operation here
});

const timeoutPromise = new Promise((resolve, reject) => {
  // This promise resolves after a certain timeout
  setTimeout(() => {
    console.log("1")
  }, 1000);
})
```

i) unresolvedPromise의 경우에는 내부적으로 실행되는 로직 자체가 없다.

fates는 unresolved이며 이 promise executor의 내부 함수에 비동기 함수가 없기에 pending 상태가 아니다.

ii) timeoutPromise는 내부적으로 실행되는 비동기 로직이 있다.

fates는 unresolved이다. resolve, reject가 실행되지 않기 때문이다.

비동기 함수가 실행되는 동안 states는 pending 상태가 된다.

그렇다고 해서 unresolved인 promise는 영원히 unresolved된 상태임은 아니다.

위에서 unresolved는 "즉, promise를 해결하거나 거부하려고 시도했을 시 효과가 있는 상태를 말한다."라고 정리했다.

unresolvedPromise.resolve()를 promise의 resolve메서드를 호출하면 가능하다.

여기까지 왔다면 그럼 좀 더 복합적인 개념으로 들어갈 수 있다.

```
const unresolvedPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const tmp = Math.random()
    if (tmp < 0.4) {
      resolve('Success!');
    } else if (tmp < 0.8) {
      reject(new Error('Failed!'));
    } else {
      console.log("it is unresolved");
    }
  }, 1000);
});

unresolvedPromise.then(
  result => console.log(result),
  error => console.error(error)
);
```

1초가 지나기 전에는 unresolved인 운명을 가지며 pending상태에 들어간다.

1초가 지난 후 random()을 통해 나온 결과가

i) 0.4보다 작다면 fate는 resolved가 되고 state는 resolve

ii) 0.4 이상이고 0.8보다 작다면 fate는 resolved가 되고 state는 reject가 된다.

iii) 0.8 이상이라면 resolve나 reject되지 않기에 unresolved인 fate를 가지며 state도 pending 상태 그대로 간다.

---

promise는 promise나 [thenable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#thenables)로 "해결"될 수 있다.

이 경우, promise로 포장 해체 가능한 promise 객체나 thenable 객체로 저장할 수 있다. <- promise의 결과는 promise 객체로 감싸진 결과이기 때문에 unwrapping이라는 단어를 채용한 것 같다.

혹은 이 결과는 fulfuilled된 경우 promise 객체가 아닌 값으로 resolved될 수도 있다. <- promise의 return에는 다른 promise가 올 수도 있고 non-promise가 올 수도 있다.

이는 무엇을 의미하냐면, 이어지는 chaining에서 인자로 들어오는 값은 이전 promise의 return값인데 이 return에는 다른 promise가 와서 또 다시 promise의 resolved를 기다려야할 수도 있고 아니면 일반적인 value가 와서 바로 chaining이 이어질 수도 있다.

#### **reference**

[https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md)
