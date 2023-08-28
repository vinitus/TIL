Next.JS 프로젝트 중 갑자기 생각난 문제

# useRef를 통한 태그 접근과 event listener의 event를 통한 태그 접근

무엇이 다를까? useRef는 왜 써야할까?

리액트 팀의 공식문서인 react.dev에서 다음과 같이 useRef가 움직이는 원리를 설명하고 있다.

```javascript
// Inside of React
function useRef(initialValue) {
  const [ref, unused] = useState({ current: initialValue });
  return ref;
}
```

즉, ref는 useState를 사용한 것이라고 한다. 다른 점은 useState의 상태를 업데이트할 수 있는 dispatch 함수가 `usused`인 것이다.

실제로 react팀의 예시에서, `useRef`를 `useState({current: null})`로 바꿔도 아무런 문제가 없다.

[https://react.dev/learn/referencing-values-with-refs#challenges](https://react.dev/learn/referencing-values-with-refs#challenges)

위 링크의 1번 문제의 정답이다.

```jsx
import { useState, useRef } from 'react';

export default function Chat() {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const timeoutRef = useRef(null);

  function handleSend() {
    setIsSending(true);
    timeoutRef.current = setTimeout(() => {
      alert('Sent!');
      setIsSending(false);
    }, 3000);
  }

  function handleUndo() {
    setIsSending(false);
    clearTimeout(timeoutRef.current);
  }

  return (
    <>
      <input disabled={isSending} value={text} onChange={(e) => setText(e.target.value)} />
      <button disabled={isSending} onClick={handleSend}>
        {isSending ? 'Sending...' : 'Send'}
      </button>
      {isSending && <button onClick={handleUndo}>Undo</button>}
    </>
  );
}
```

여기서 useRef를

```jsx
...
  const [timeoutRef, _] = useState({ current: '' });
...
```

로 바꿔도 잘 동작한다. 하지만 리액트 팀은 useRef를 만들었다. 그리고 이 useRef와 함께 jsx 태그의 속성에 ref를 만들었다. 왜 만들었을까?

> `useRef` is a React Hook that lets you reference a value that’s not needed for rendering.

`useRef`훅은 렌더링에 필요하지 않는 값을 참조할 수 있는 React Hook이라고 한다. useRef로 인해 나온 인스턴스의 current값을 아무리 변경해도 다시 렌더링되는 상황은 발생하지 않는다.

내 생각에는 useState를 통해서 충분하게 할 수 있는 작업이지만, 좀 더 명시적으로 이를 수행하고 보일러플레이트를 줄이고 useState가 상태를 관리하는 것에 초점을 두기 위해서 useRef라는 훅을 만들었지 않았나 싶다.

그래도 사실 이해가 잘 가진 않았다. 그리고 useRef는 보통 dom 조작을 위해서 사용한다. 그리고 우리는 이미 eventListner의 콜백함수의 인자에 자동적으로 event 객체가 넘어오는 것을 알고 있다.

그렇다면, 왜 사용해야할까?

여러 예시들을 테스트해보고 하다보니까, 당연한 것을 놓친 것 같다.. 바로 event의 콜백함수든, 어떤 순수 함수던간에 직접 접근할 수 없는 객체에 접근하고자 할 때이다.

querySelector 같은 것을 활용해서 그 태그 자체를 가져올 수 있겠으나, 리액트 팀은 이를 권장하지 않는다. 때문에 ref를 통해서 dom 요소에 참조를 걸고 이에 접근할 수 있게 하는 것이다.

이와 관련되어 좋은 예시가 있다.

[ref를 사용한 돔 조작에 대한 react.dev 공식문서](https://react.dev/learn/manipulating-the-dom-with-refs#best-practices-for-dom-manipulation-with-refs)

> If you stick to non-destructive actions like focusing and scrolling, you shouldn’t encounter any problems. However, if you try to modify the DOM manually, you can risk conflicting with the changes React is making.

react의 jsx 조건문이 아닌 dom 요소를 직접 파괴하려고 한다면, 문제가 발생한다는 것이다.

```jsx
import { useState, useRef } from 'react';

export default function Counter() {
  const [show, setShow] = useState(true);
  const ref = useRef(null);

  return (
    <div>
      <button
        onClick={() => {
          setShow(!show);
        }}
      >
        Toggle with setState
      </button>
      <button
        onClick={() => {
          ref.current.remove();
        }}
      >
        Remove from the DOM
      </button>
      {show && <p ref={ref}>Hello world</p>}
    </div>
  );
}
```

여기서, 두가지 에러가 나타난다.

1. p 태그가 없는 상태에서 직접 ref.current를 제거하는 경우
2. p 태그를 ref.current를 직접 제거하고 setShow를 토글하는 경우

에러를 없애려고 조건문도 걸고 다 해봤는데, 2번 에러는 절대 없어지지 않는다.

1번 에러를 없애기 위해서 `console.log(ref.current)`를 찍어보면, 재밌는 현상이 나온다.

```jsx
...
  useEffect(() => {
    console.log(ref.current);
  });
...
```

이렇게 렌더링된 후에 console.log를 찍어보면,

p 태그가 사라진 경우 -> ref 속성 할당이 사라진 경우에는 null이다.

![image](https://github.com/vinitus/my-blog/assets/97886013/05e4624a-da0b-47c9-83b3-9666508649a1)

p 태그가 있는 경우 -> ref 속성에 `useRef`로 만든 `ref`를 할당해준 경우에는 HTML Element가 나타난다.

![image](https://github.com/vinitus/my-blog/assets/97886013/dce41a2c-cc8c-4979-bc8b-94396fc1b44d)

즉, 컴포넌트에서 만든 `ref`를 ref 속성에 할당해준 경우에는 자동적으로 그 태그가 들어간다.

---

정리해보면 useRef와 ref는 이런 특징들이 있다.

1. `const ref = useRef(initialValue)`는 `const [ref, usused] = useState({current:initialValue})`와 유사하게 동작한다.
2. 때문에 ref.current를 아무리 변경해도 렌더링은 트리거되지 않는다. ref는 Object 형태이며 React가 ref.current의 변경을 감지하지 않기 때문이다.
3. 이를 이용해서 재평가되어 렌더링되는 상황에서도 어떤 값을 전달해주기 위해 사용된다. -> 이는 내가 자주 사용하던 component 밖에 변수를 선언하는 것을 대체할 수 있는 것이다.
4. useRef를 통해 나온 값을 태그의 ref에 할당해주면, 해당 값은 그 태그가 할당되어 그 태그를 가리킨다.
5. event를 통해 직접 가리킬 수 없거나 순수 함수에서 어떤 태그의 속성을 활용하고자 한다면, 이 ref를 사용하는 것이 `querySelector`보다 권장된다.
