# Jest

사실 취업하고 공부하고 싶었는데 ㅋㅋ 너무 길어져서 못참아서 시작

## Jest란

> Jest is a delightful JavaScript Testing Framework with a focus on simplicity.

Jest는 단순성에 중점을 둔 유쾌?한 JavaScript 테스트 프레임워크입니다.

## Test는 왜 해야하는가

우리가 만든 어플리케이션이 예상대로 동작하는지 확인하기 위해서 사용한다. 어플리케이션을 동작시키기 위해서 함수의 결과가 예상대로 동작해야하고, UI를 만들거나 UI와 상호작용하는 함수가 있다면 이 함수가 정상적으로 동작하는지 확인하는 것이다.

특히, Test Code 작성을 염두하고 프로그래밍을 진행하면, 함수나 변수 간의 의존성이 줄어드는 코딩을 할 수 있다.

-> 이는 Jest의 테스트코드를 어떻게 작성하는 가를 생각하면 알 수 있다.

```javascript
// sum.js
function sum(a, b) {
  return a + b;
}

module.exports = sum;

// sum.test.js
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

1. 만들어둔 `sum.js`를 가져온다.
2. `test` 메서드의 첫 인자는, 테스트의 이름이다.
3. `test` 메서드의 두번째 인자는 콜백함수이다. 이 함수 내에서 테스트가 실행되어야한다.

위의 코드에서 `expect` 메서드 안에, 만들어둔 `sum`이라는 함수가 있다. 이 함수는 인자가 있으며, 상위 스코프에 가지 않고 자신의 스코프 내에 존재하는 변수만으로 이를 처리한다.

여기서 `sum`메서드를 다음과 같이 변경하면

```javascript
// sum.js
const a = 1;
const b = 2;
function sum() {
  return a + b;
}

module.exports = sum;
```

테스트 코드를 다음과 같이 잘 변경하면, 테스트에는 문제가 없다.

```javascript
// sum.test.js
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum()).toBe(3);
});
```

하지만, `a`와 `b`가 `let` 키워드로 선언되었으며 다른 함수에 의해 변경될 수도 있는 함수라고 해보면, 저 테스트 코드는 의미가 있는 것일까? add는 인자로 받은 두 숫자를 더한 것을 return하는 것인데, 이렇게 코드를 만들면 사실상 `aAddB`와 다름이 없으며 결과를 항상예측할 수 없다. 때문에 테스트 코드를 만드는 의미나 방법이 매우 복잡해진다.

물론 변화되는 변수에 대해서 이를 설정하여 테스트할 수 있지만, 옳은 테스트는 아니다. 좋은 테스트코드는 `FIRST`라는 원칙을 따르는 것이며, I는 Independent로써 의존성을 지녀서는 안된다는 것이다.

```javascript
// sum.js

let a = 1;
let b = 2;

function addOne(n) {
  return ++n;
}

function multiplyTwo(n) {
  return n * 2;
}

function sum() {
  return a + b;
}

module.exports = sum;
```

여기서 어떤 UI의 상호작용이나 특정 이벤트로 인해서 addOne이 한번 실행됐고 `a`나 `b`에 할당 됐다면, 이에 맞춰서 Test Code를 작성해야하는 것이다.

-> **즉, 테스트코드를 고려하면 입력과 결과를 고려하여 코드를 작성할 수 밖에 없다.**

## Test 피라미드

Test 피리미드는 총 3단계로 이뤄진다.

1. Unit Test: 함수, 모듈, 클래스 등의 작은 단위에서 이뤄지는 테스트
2. Integration Test: 모듈들 간이나 클래스들 간의 테스트
3. E2E Test: End-to-End 테스트. 예를 들어 웹 어플리케이션이라면 FE의 UI 상호작용으로 시작된 HTTP 요청이 BE까지 잘 도착하고, 옳은 API 응답이 리턴되어 FE에 잘 반영이 되는가

1번에서 3번으로 갈 수록 테스트하는 단위가 커지며, 동시에 테스트 비용도 올라간다.
