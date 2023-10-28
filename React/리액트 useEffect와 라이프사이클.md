클래스 컴포넌트에서는 직접적으로 라이프 사이클과 관련된 메서드들과 함께 사용해야했으나, 함수형 컴포넌트에서는 다른 방식으로 라이프 사이클과 관련된 작업들을 할 수 있다.

리액트에서 컴포넌트의 라이프 사이클은 다음과 같은 3단계로 이뤄진다.

1.  mount
2.  update
3.  unmount

이런 라이프 사이클은 useEffect와도 연관이 있고, useEffect 자체로도 라이프 사이클이 있으며, **useEffect**를 통해서 쉽게 활용할 수 있다. 하지만, 그렇다고 해서 useEffect는 컴포넌트의 라이프 사이클을 대변하는 것은 아니다.

#### **useEffect**

**useEffect**는 함수형 컴포넌트의 **라이프사이클과 매우 밀접한 연관**이 있다. useEffect는 다음과 같은 것들을 인자로 받는다.

![image](https://github.com/vinitus/TIL/assets/97886013/25b6cbb8-2d50-4c6d-89b9-590297c32e42)

이름에서도 알 수 있듯이, **EffectCallback이라는 콜백함수와 DependencyList라는 배열**을 인자로 받는다.

EffectCallback에 들어가는 함수는 **특정 조건에서 실행되는 콜백함수**이다. 이 콜백함수가 언제 실행될지는 **라이프사이클과 deps?라는 인자에 들어오는 값에 따라서 결정**된다.

두번째 인자인 **deps가 optional**, 즉 받아도 되고 받아도 되지 않는 이유는...

- 종속성 배열이 있다면 마운트시 1번
- 종속성 배열의 값이 변경될 시 콜백함수가 실행된다.
- deps 자체가 없다면 모든 마운트가 된 이후마다 useEffect의 콜백함수가 실행된다.

이번 글의 목적은, useEffect로 설명하는 함수형 컴포넌트의 라이프 사이클이다.

---

컴포넌트의 라이프 사이클

### **1. mount**

마운트 중이라는 것은 컴포넌트 함수가 실행되는 상태인 것을 말한다. 실행되지 않았다면 마운트 되지 않은 것이고, 마운트 되었다는 것은 그 함수는 실행되고 난 이후, DOM이 그려진 것이다.

**마운트 중에는 컴포넌트 함수의 로직들이 실행**되어 진다. 이는 컴포넌트 함수가 실행 중인 것이다.

**마운트가 되었다는 것**은 컴포넌트의 로직이 끝난 상태이며 JSX가 해석되어 DOM이 그려지고, **useEffect의 콜백함수는 무조건 실행되게 된다.**

\-> useEffect의 콜백함수는 마운트 이후 무조건 실행된다.

```js
import { useEffect } from 'react';
import './App.css';

function App() {
  console.log('In the App');
  useEffect(() => {
    console.log('In useEffect where App');
  });
  return (
    <>
      <div>Hello</div>
      <Hi />
    </>
  );
}

export default App;

function Hi() {
  console.log('In the Hi');
  useEffect(() => {
    console.log('In useEffect where Hi');
  });
  return <div>Hi</div>;
}
```

useEffect는 결국 마운트가 된 후에 실행된다는 것을 생각해보면, 다음과 같이 실행 순서를 생각해볼 수 있다.

```
In the App
In the Hi
In useEffect where Hi
In useEffect where App
```

결과도 같다.

![image](https://github.com/vinitus/TIL/assets/97886013/d2a40ed2-d0a6-4356-ac9a-e1f49fb30bf5)

---

### **2. update**

마운트가 된 이후에, props나 state가 **변경되어** **리렌더링되는 상황**이다.

우선, 컴포넌트 함수 자체가 전부 **재실행되고 난 후에, 실행해야할 useEffect의 콜백함수가 실행**된다.

여기서 useEffect의 deps인자인 **종속성 배열**이 중요해지는데, 이 값에 따라 update 사이클에서 useEffect의 실행여부가 정해진다.

1. 종속성 배열 자체가 **없다면** 콜백함수는 **무조건** 실행된다.
2. 종속성 배열이 **빈 배열**이라면, 콜백함수는 **마운트시에만 실행**되며, 또 다시 실행되지는 않는다.
3. 종속성 배열이 존재하고, 배열 안에 원소들이 있고, 원소 중 하나가 **변경되었다면**, 콜백함수가 실행된다.

그럼 다음의 예시의 콘솔창에 찍힌 로그를 예측할 수가 있다.

```js
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  console.log('In the App');
  useEffect(() => {
    console.log('In useEffect where App');
  }, []);
  return (
    <>
      <button onClick={() => setCount((prev) => prev + 1)}>Hello</button>
      <Hi appCount={count} />
    </>
  );
}

export default App;

function Hi({ appCount }) {
  const [count, setCount] = useState(0);
  console.log('In the Hi');
  console.log('appCount', appCount);
  console.log('hiCount', count);
  useEffect(() => {
    console.log('In useEffect where Hi');
  }, [appCount]);
  return <button onClick={() => setCount((prev) => prev + 1)}>Hi</button>;
}
```

첫 실행시, 마운트의 라이프 사이클이 실행된다.

![image](https://github.com/vinitus/TIL/assets/97886013/5398e363-05a2-48d1-aef3-af678dcb9790)

여기서, Hello 버튼을 누른다면 어떻게 될까?

App 컴포넌트가 재평가가 되며 컴포넌트 함수가 재실행될 것이다. 그러다 jsx의 **Hi 컴포넌트**를 만나 **Hi 컴포넌트 함수가 실행**될 것이다. 그리고 난 뒤에 **useEffect의 실행여부를 따져서 실행한다**.

1. App의 useEffect의 종속성 배열은 빈 값이기에, update시에는 실행되지 않는다.

2. Hi의 useEffect 종속성 배열은 요소가 들어가 있고, props인 App의 count가 변경되었기에 콜백함수가 실행된다.

![image](https://github.com/vinitus/TIL/assets/97886013/f4f7a305-0e46-4cf3-8749-e96719dbc350)

여기서 Hi 버튼을 누른다면 어떻게 될까?

![image](https://github.com/vinitus/TIL/assets/97886013/3d49cf50-c8aa-49c5-a5df-7c2e597d2da3)s

Hi 컴포넌트 자체만 리렌더링 되며, useEffect의 콜백함수는 실행되지 않는다.

---

### **3. unmount**

언마운트는 렌더링된 컴포넌트가 **DOM에서 사라지는 것**을 말한다.

언마운트되는 컴포넌트에서 useEffect의 콜백함수에서 **return에 함수가 존재한다면, 이 함수가 실행**된다.

```js
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  console.log('In the App');
  useEffect(() => {
    console.log('In useEffect where App');
  }, []);
  return (
    <>
      <button onClick={() => setCount((prev) => prev + 1)}>Hello</button>
      {count === 0 && <Hi />}
    </>
  );
}

export default App;

function Hi({ appCount }) {
  const [count, setCount] = useState(0);
  console.log('In the Hi');
  console.log('appCount', appCount);
  console.log('hiCount', count);
  useEffect(() => {
    console.log('In useEffect where Hi');
    return () => {
      console.log('End of useEffect where Hi');
    };
  }, []);

  useEffect(() => {
    return () => {
      console.log('This is second useEffect where Hi');
    };
  }, []);
  return <button onClick={() => setCount((prev) => prev + 1)}>Hi</button>;
}
```

다음은 초기 렌더링이다.

![image](https://github.com/vinitus/TIL/assets/97886013/da7fed45-aa7f-4455-ab30-8c2324a9d58c)

useEffect는 두번사용하던 상관없다. App에서 count가 0이라면 Hi 를 렌더링하지만, 아니라면 렌더링하지 않는다.

==> App의 상태인 count가 0이라면, Hi는 언마운트된다.

언마운트시, useEffect의 return 함수가 실행되는 것을 볼 수 있다.

![image](https://github.com/vinitus/TIL/assets/97886013/ee10ac07-1318-451a-a94b-67941c61665b)

---

#### **4. useEffect와 update**

종속성이 없는 useEffect는 조금 특이하다.

1. 마운트시 실행된다.

2. 업데이트시에도 무조건 실행된다.

3. 언마운트시 return의 함수가 실행된다.

까지는 예측할 수 있는데

4. 업데이트시 useEffect들의 모든 return의 함수가 실행되고 난 뒤에, useEffect의 콜백함수가 차례로 실행된다.

```js
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  console.log('In the App');
  useEffect(() => {
    console.log('In useEffect where App');
    return () => {
      console.log('End of useEffect where App');
    };
  });
  return (
    <>
      <button onClick={() => setCount((prev) => prev + 1)}>Hello</button>
      {count <= 1 && <Hi appCount={count} />}
    </>
  );
}

export default App;

function Hi({ appCount }) {
  const [count, setCount] = useState(0);
  console.log('In the Hi');
  console.log('appCount', appCount);
  console.log('hiCount', count);
  useEffect(() => {
    console.log('In useEffect where Hi');
    return () => {
      console.log('End of useEffect where Hi');
    };
  });

  useEffect(() => {
    console.log('In second useEffect where Hi');
    return () => {
      console.log('This is second useEffect where Hi');
    };
  });
  return <button onClick={() => setCount((prev) => prev + 1)}>Hi</button>;
}
```

![image](https://github.com/vinitus/TIL/assets/97886013/94157ab2-abf4-4826-8c89-ec4c7764844d)

사실 이 뿐만이 아니라, 종속성 배열의 원소가 변경되는 경우에도 return이 실행되는 경우도 있다.

```js
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  console.log('In the App');
  useEffect(() => {
    console.log('In useEffect where App');
    return () => {
      console.log('End of useEffect where App');
    };
  }, [count]);
  return (
    <>
      <button onClick={() => setCount((prev) => prev + 1)}>Hello</button>
    </>
  );
}

export default App;
```

![image](https://github.com/vinitus/TIL/assets/97886013/e300d00c-5066-4d79-beb8-c7b6068d46eb)

위는 실행전이고, 밑은 버튼을 누른 후의 콘솔창이다.

이 예시를 통해서, useEffect는 완전하게 컴포넌트의 라이프사이클을 말해주는 것이 아니라, useEffect만의 라이프사이클이 있는 것임을 알 수가 있다.

---

**왜일까?**

useEffect의 return에 오는 함수를 **클린업함수**라고 한다. useEffect가 왜써야하는지를 생각해본다면, 클린업함수라고 불리는 이유를 알 수 있다.

**side effect를 관리하기 위해 사용**하는 useEffect는, 렌더링하는 이외의 부수적인 로직들을 처리하기 위해 사용한다. 보통, 여기에는 타이머나 API 요청이나 이벤트 리스너와 관련된 것들이 들어간다.

**이전에 호출했던 어떤 side effect들에 대한 처리를 하게 해주는 것이 이 클린업함수이다.**

기존에 실행시켜놓았던 타이머를 해제한다거나, 웹 소켓 연결을 해제하는 로직을 이 클린업함수에 담아서, 그 useEffect에서 행해지는 side effect를 정리할 수 있는 기회를 주는 것이다.

```js
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const btn = document.querySelector('button');
    btn.addEventListener('click', () =>
      setCount((prev) => {
        console.log(prev + 1);
        return prev + 1;
      })
    );
  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log(`${count}번째 렌더링의 setTimeout`);
    }, 1000);
  }, [count]);

  return (
    <>
      <button>Hello</button>
    </>
  );
}

export default App;
```

이 함수는 버튼을 누르면 count가 올라가고, setTimeout에 의해 1초 뒤에 지금 카운트가 나타나진다.

만약, 이를 1초안에 10번 누르면 1~10까지 출력되고, setTimeout들이 1초뒤에 하나씩 실행된다.

내가 이런것을 원치 않고, 지금 당장의 타이머만 하도록 하려면, 다음과 같은 로직으로 할 수 있다.

```js
...
  useEffect(() => {
    const printTimer = setTimeout(() => {
      console.log(`${count}번째 렌더링의 setTimeout`);
    }, 1000);
    return () => clearInterval(printTimer);
  }, [count]);
...
```

clearInterval를 활용하여 타이머를 지우는 기회를 useEffect가 주고있는 것이다.

---

#### **결론**

함수형 컴포넌트에서도 mount, update, unmount의 라이프사이클은 존재한다.

이를 useEffect에서도 활용할 수 있지만, useEffect 자체는 컴포넌트와는 다른 사이클을 가지고 있다.

useEffect의 종속성 배열이 변경되는 경우에 return의 클린업함수가 실행되기도 하는 특징이 있다.

#### **reference**

**[https://react.dev/learn/lifecycle-of-reactive-effects](https://react.dev/learn/lifecycle-of-reactive-effects)**
