# 메모이제이션

> 메모이제이션(memoization)은 컴퓨터 프로그램이 동일한 계산을 반복해야 할 때, 이전에 계산한 값을 메모리에 저장함으로써 동일한 계산의 반복 수행을 제거하여 프로그램 실행 속도를 빠르게 하는 기술이다. 동적 계획법의 핵심이 되는 기술이다.
> 출처 : [위키피디아 - 메모이제이션](https://ko.wikipedia.org/wiki/%EB%A9%94%EB%AA%A8%EC%9D%B4%EC%A0%9C%EC%9D%B4%EC%85%98)

리트코드 자바스크립트 30일 챌린지하면서 들었던 개념인데, 정확하게 말로 설명하려니 조금 헷갈려서 시작

## 메모이제이션의 목표

메모리를 희생하여 동일한 계산을 제거하고 바로 반환하는 기술로써, 메모리 사용량을 높여, 최적화를 진행하는 것이다.

구현을 어떻게 하는가? 는 기존의 인자로 들어온 것들이 이미 계산했던 값인가를 체크해야한다. 배열로 하는 방법도 있지만, 효율을 위해서 `Map`이나 `Set`, `Object`형태를 주로 사용한다.

주로 알고리즘에서 사용하던 그런 개념이 맞다. 클로저와 고차함수를 사용하여 구현할 수 있다.

```js
function sum(a, b) {
  return a + b;
}

sum(1, 2);
sum(1, 2);
sum(1, 2);
sum(1, 2);
```

이렇게 하면 1 + 2를 4번 연산해야하지만

```js
function makeSumFn() {
  const cache = new Map();
  return (a, b) => {
    const serializedParams = makeStringKey(a, b);

    if (cache.has(serializedParams)) return cache.get(serializedParams);
    cache.set(serializedParams, a + b);

    return a + b;
  };
}

function makeStringKey(...args) {
  return args.reduce((prev, value, idx) => {
    return prev + ` ${idx}:${value}`;
  }, '');
}

const sum = makeSumFn();

sum(1, 2);
sum(1, 2);
sum(1, 2);
sum(1, 2);
```

이렇게 구현하면 1번만 수행하고, 나머지는 바로 반환되는 메모이제이션 형태로 만들 수 있다. 더 추상화를 진행해보면

```js
function memoization(fn) {
  const cache = new Map();
  return (a, b) => {
    const serializedParams = makeStringKey(a, b);

    if (cache.has(serializedParams)) return cache.get(serializedParams);

    const result = fn(a, b);

    cache.set(serializedParams, result);

    return result;
  };
}

function makeStringKey(...args) {
  return args.reduce((prev, value, idx) => {
    return prev + ` ${idx}:${value}`;
  }, '');
}

function sum(a, b) {
  return a + b;
}

const memoizationSum = memoization(sum);

memoizationSum(1, 2);
memoizationSum(1, 2);
memoizationSum(1, 2);
memoizationSum(1, 2);
```

이런 형태가 memoization이다.
