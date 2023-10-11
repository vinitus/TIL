클로저에 관해 정리하고 생각해보면서, 리액트에서 클로저는 어떻게 적용될지를 생각해봤다.

우선, useState가 먼저 떠올랐다.

### useState는 어떤 원리로 동작하는가

이를 살펴보기에 앞서, 내가 리액트를 처음 사용할 때 헷갈렸던 부분이다.

```js
const NewComponent = () => {
  let count = 0;

  const btnClickHandler = () => {
    count += 1;
    console.log(count);
  };

  return (
    <>
      <div>{count}</div>
      <button type='button' onClick={btnClickHandler}>
        +
      </button>
    </>
  );
};
```

버튼을 누르면 절대로 count는 올라가지만, 렌더링된 div태그의 count는 0에서 변하지 않는다.

#### ? 왜일까

널리 퍼져있는 내용이기에 신경쓰지 않았지만, 원리는 있을 것이다.

이는 리액트의 작동방식과 관련이 있다. 컴포넌트 함수가 실행되며 jsx구문이 실행되고 렌더링 된다. 중요한 것은, 이 이후에는 일반적으로 변수를 변경한다고 해서 이 함수가 재 실행되지는 않는다.

변수를 업데이트하기 위해서는 **react를 트리거**하여 JSX 구문을 다시 렌더링해야한다.

이를 위한 대표적인 것은 useState다. useState에서 반환되는 set함수는 react를 트리거하여 해당 컴포넌트가 다시 실행하게 해주는 함수이다. 근데, 신기한 것이 있다. 재평가되는 과정에서 우리는 단지 set함수에 변수를 넘겨주면서 실행하는 것 뿐이었다.

하지만, 컴포넌트는 실행되면서 우리가 넘겨준 변수를 모두 받아온다.

하나만 적용되면 또 모르겠는데, 다른 set함수를 몇 번이던 실행하여도 마찬가지이다.

#### 리액트는 이 값들을 어떻게 이를 기억하고 받아올까?

[이 글](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)에서 useState를 구현해보면서 어떻게 작동하는지 예시를 들어주고 있다.

쉽게 말해서, 리액트는 **상태들을 배열로 관리**하고 있고 이를 참조하여 상태들을 업데이트하는 것이다.

첫 렌더링 : useState가 호출될 때마다 state를 담는 state 배열과 이를 업데이트하는 setters 배열이 생긴다.

그 이후의 렌더링 : useState를 만날 때마다 useState의 인자는 무시되고 state 배열을 참조하여 업데이트 한다.

리렌더링을 하는 이벤트 트리거 : setters 배열의 함수

setters 배열의 한 함수가 호출되면, 인자로 넘어온 값을 같은 index의 state 배열에 업데이트 해주게 된다.

그래서 리액트에서 강조하는 것은 **순서의 보장**이다.

useState를 활용하다가 나왔던 실수 중 하나는, react hook을 조건문 안에서 실행하려고 했던 적이 있다.

![image](https://github.com/vinitus/TIL/assets/97886013/937b61b2-8ee4-40f2-b083-b49d20649f63)

state들을 배열로 관리하고 있기 때문에, 순서가 보장되어야 한다는 것이다. 순서를 어기게 된다면, 이미 선언된 state 배열들의 무결성이 보장되지 않기 때문이다.

다음은 글의 예시 중 useState를 직접 만드는 코드 중 일부이다.

[https://gist.github.com/ryardley/e83bad1985740ab33b18fc578ec1957a#file-hooks-state-pseudocode-js](https://gist.github.com/ryardley/e83bad1985740ab33b18fc578ec1957a#file-hooks-state-pseudocode-js)

```js
let state = [];
let setters = [];
let firstRun = true;
let idx = 0;

function createSetter(idx) {
  return function setterWithIdx(newVal) {
    state[idx] = newVal;
  };
}

// This is the pseudocode for the useState helper
export function useState(initVal) {
  if (firstRun) {
    state.push(initVal);
    setters.push(createSetter(idx));
    firstRun = false;
  }

  const setter = setters[idx];
  const value = state[idx];

  idx++;
  return [value, setter];
}
```

### 리액트는 클로저 개념을 통해 배열을 useState 함수 스코프 밖에서 관리한다.

useState 메서드 밖에서 state 배열이 저장되어 있고, useState의 return값인 state와 set함수는 useState 함수 스코프의 밖의 배열을 참조하기에, **클로저**가 생긴다. useState의 밖에서 존재하기에, useState가 다시 사용되더라도 초기화되는 로직이 없는 한, 이 state 배열은 초기화되지 않는다. 그렇기에 state를 기억하고 업데이트할 수 있는 것이다.

set함수는 고차함수에 의해 생성된 함수이며 클로저의 개념이 들어간다. createSetter인데, 생성되는 순간 idx를 캡처하여 setter 배열의 한 주소를 가르키게 하고, 생성된 set함수가 실행될 때 받아온 인자를 setter 배열 중 가르키고 있는 곳을 인자로 업데이트해주는 멋진 함수이다.

### reference

[https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)

[https://yeoulcoding.tistory.com/149](https://yeoulcoding.tistory.com/149)

[https://ko.reactjs.org/docs/hooks-rules.html#explanation](https://ko.reactjs.org/docs/hooks-rules.html#explanation)

[https://react.dev/learn/state-a-components-memory](https://react.dev/learn/state-a-components-memory)
