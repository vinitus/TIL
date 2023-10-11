[https://react.dev/learn/preserving-and-resetting-state](https://react.dev/learn/preserving-and-resetting-state)

## UI 트리

리액트가 컴포넌트들을 어떻게 구조화하고 평가할지 판단하기 위해 리액트가 트리 구조로 만든 UI들이다.

이 UI 트리를 바탕으로 React DOM을 구성하는 것! **UI 트리와 React DOM트리는 같지 않다.**

![image](https://github.com/vinitus/TIL/assets/97886013/e1c6ec9b-b5e6-4721-96c0-409674121929)

컴포넌트 A의 자식 요소로 B와 C가 들어있고 이를 리액트 DOM트리로 구성한다.

### 상태는 그러면 어디에 존재할까?

구성 요소 안에 상태가 존재한다고 할 수 있지만, 사실 react 자체에 속해있다. 이를 기반으로, 리액트는 UI 트리 위치에 따라 상태를 연결한다.

때문에, 만약 B와 C가 같은 컴포넌트로 인해서 렌더링이지만 A에서 동시에 렌더링되어 위의 그림같은 UI트리를 갖게 된다면, react는 컴포넌트 B와 컴포넌트 C를 구분하고 상태를 따로 관리한다.

흔한 예제인 counter 예제이다.

![image](https://github.com/vinitus/TIL/assets/97886013/68caebf1-39c7-407c-acb5-105e67dfe50c)

```js
...
const counter = <Counter />;
  return (
    <div>
      {counter}
      {counter}
    </div>
...
```

Counter 컴포넌트는 두번 사용되기에 위의 그림같은 UI트리를 구성하게 된다.

각자의 트리를 구성하기 때문에 둘은 분리된 상태이며, 상태 또한 공유하지 않게 된다.

이 구조에서 하나의 컴포넌트를 제거했다가 다시 렌더링을 한다면, **UI트리에서 사라지기 때문에 상태가 초기화된다.**

즉, 리액트는 구성 요소 UI 트리의 어떤 위치에서 렌더링되는 동안, 구성 요소의 상태를 유지한다.

---

### UI 트리에서 위치의 중요성

조금 흥미로운 예제인데,

```js
import { useState } from 'react';

export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? <Counter isFancy={true} /> : <Counter isFancy={false} />}
      <label>
        <input
          type='checkbox'
          checked={isFancy}
          onChange={(e) => {
            setIsFancy(e.target.checked);
          }}
        />
        Use fancy styling
      </label>
    </div>
  );
}
```

Counter가 어떻게 생겼나는 중요하지 않다. 중요한 것은 삼항연산자로 인한 조건을 가진 렌더링이다.

isFancy의 값에 따라, css가 다르게 렌더링 되는 함수인데 다르게 렌더링 되더라도 **상태는 유지**된다.

즉, App 컴포넌트의 자식 컴포넌트로 Counter 컴포넌트가 있기에, 사라지지 않는 한 상태는 유지되는 것!

또한, 동일한 위치에 다른 구성 요소가 오게 된다면, 이전의 상태는 초기화된다.

```js
 ...
      {isFancy ? (
        <div>
          <Counter isFancy={true} />
        </div>
      ) : (
        <section>
          <Counter isFancy={false} />
        </section>
      )}
...
```

![image](https://github.com/vinitus/TIL/assets/97886013/f06e1b33-f2d1-45f7-9b23-fda0894eac8f)

section이 사라지고, div가 생기는 것이기에! Counter도 사라졌다가 나타나는 것!

---

### React에서 key의 역할

```js
...
    {isPlayerA ? (
      <Counter key="Taylor" person="Taylor" />
    ) : (
      <Counter key="Sarah" person="Sarah" />
    )}
...
```

이렇게 한다면, 같은 UI 트리에서 렌더링되지만, 상태는 초기화할 수 있다. **key가 컴포넌트를 구분하는 key가 되는 것이다!**

![image](https://github.com/vinitus/TIL/assets/97886013/2232ed3e-c71d-4dff-8939-da9f914bd62c)

정리

React는 **같은 컴포넌트가 같은 위치**에 렌더링되는 한, 상태를 유지한다.

상태는 JSX 태그에 보관되지 않고 react에 보관한다.

key를 사용하여 같은 UI트리의 위치더라도 구분할 수 있다.

---

## 리액트에서 key는 어떤 역할을 하는가

그럼 조금 호기심이 생긴다.

위치에 관련된 부분인데, counter가 두개라면?? 리턴 부분을 다음과 같이 바꿔봤다.

```js
...
      {isFancy ? (
        <>
          <Counter isFancy={true} />
          <Counter isFancy={false} />
        </>
      ) : (
        <>
          <Counter isFancy={false} />
          <Counter isFancy={true} />
        </>
      )}
...
```

![image](https://github.com/vinitus/TIL/assets/97886013/2232ed3e-c71d-4dff-8939-da9f914bd62c)

둘을 구분하지 못하기에, UI트리의 위치에 따라서 상태가 유지되는 모습이다.

이번에는 조금은 다르게 key를 줬다.

```js
...
      {isFancy ? (
        <>
          <Counter key="A" isFancy={true} />
          <Counter key="B" isFancy={true} />
        </>
      ) : (
        <>
          <Counter key="B" isFancy={false} />
          <Counter key="A" isFancy={false} />
        </>
      )}
...
```

![image](https://github.com/vinitus/TIL/assets/97886013/c7335683-426f-4e95-b418-7c46bf31f19d)

key를 사용한다면 컴포넌트의 위치가 변경되더라도 이를 추적할 수 있다.

---

좀 더 나아가서, 이번에는 Counter 컴포넌트가 아니라 다른 요소를 렌더링할 것이다.

```js
...
      {isFancy ? (
        <>
          <Counter isFancy={true} />
          <div>하이</div>
        </>
      ) : (
        <>
          <div>하이</div>
          <Counter isFancy={false} />
        </>
      )}
...
```

![image](https://github.com/vinitus/TIL/assets/97886013/a537413f-1d91-4d48-aea7-06bc65d11225)

내 생각에는 key를 주면 이 상태를 유지할 것 같았다.

![image](https://github.com/vinitus/TIL/assets/97886013/7862a9ff-9137-4bb3-ae9a-7d33cb85f5d0)

key는 UI 트리에서 컴포넌트를 구분지을 수 있는 것이다.

---

&&연산과 삼항 연산자의 차이

[https://react.dev/learn/preserving-and-resetting-state#option-1-rendering-a-component-in-different-positions](https://react.dev/learn/preserving-and-resetting-state#option-1-rendering-a-component-in-different-positions)

이것도 너무 신기했는데, &&를 사용하면 렌더링 되는 위치가 달라진다.

```js
// && 활용
...
      {isPlayerA &&
        <Counter person="Taylor" />
      }
      {!isPlayerA &&
        <Counter person="Sarah" />
      }
...

// 삼항 연산자
...
      {isPlayerA ? (
        <Counter person="Taylor" />
      ) : (
      {!isPlayerA &&
        <Counter person="Sarah" />
      )}
...
```

&&를 사용하면 UI트리에서 위치가 바뀐다고 한다. 하지만 삼항 연산자는 위치가 바뀌지 않기에 달라지진 않는 것!

![image](https://github.com/vinitus/TIL/assets/97886013/45cd4c29-06d6-42dc-a1c8-e8687dde02ce)

진짜 신기하다. 입사해서 이런거 만들 기회가 있으면 좋겠다

#### **reference**

[https://react.dev/learn/preserving-and-resetting-state](https://react.dev/learn/preserving-and-resetting-state)
