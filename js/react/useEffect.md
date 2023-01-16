# useEffect

## react의 main과 sideEffect

### react의 main job

UI를 랜더링하고 User의 입력에 반응하는 것

그 모든 것의 주요 임무는 상호작용하는 것

1. JSX 코드와 DOM을 평가하고 렌더링하는 것
2. 상태와 props를 관리해주는 것
3. 유저의 이벤트와 입력을 처리해주는 것
4. UI를 표현해주는 것

### Side Effect

React의 main job을 제외한 React에 일어나는 모든 것

HTTP request를 보내거나 local storage에 저장하는 것

타이머나 간격을 조정하는 것

그러나 이런 작업들은 적어도 UI적인 측면과는 관계까 없다.

잠재적 오류를 처리하거나 HTTP request를 보내는 것은 react와 관계가 없다.
-> 즉 컴포넌트 밖에서 일어나야하는 것이다.

만약, component에서 axios요청 보냈을 때 만약 어떤 state가 바뀌고 해당 state가 변경됐을 때 다시 axios가 실행되는 로직이 있다면 무한 루프에 빠지게 된다.

따라서 Side Effect를 처리하는 함수는 component안에 들어가선 안된다.

이런 상홍에서 쓰는 Hook => useEffect

## useEffect

```js
useEffect(() => { ... }, [ dependencies ])
```

첫 번째 인수는 함수로써 모든 컴포넌트 평가 후 실행되어야 하는 함수 -> 저장된 의존성 변수가 변경된 경우
두 번째 인수는 의존성 변수가 담긴 배열 -> 이 변수가 변경될 때마다 첫번째 함수가 실행된다.

함수의 실행 조건은 의존성 변수가 **변경된 경우**에만 실행된다. 컴포넌트가 다시 렌더링 되더라도 실행되지 않는다.

두 번째 인자가 아예 없을 경우에는 모든 state가 변경될 때마다 useEffect의 함수가 실행된다.
-> useEffect의 함수는 모든 컴포넌트 렌더링 후에 실행되기 때문에(처음 마운팅됐을 때를 포함)

빈 배열 추가시 마운트되고 렌더링 됐을 때만 실행된다!

배열에 요소가 추가되면 요소의 state가 변경될 때마다 실행된다.

여기에 return에 함수, 클린업 함수가 생긴다면 state가 변경될 때마다 useEffect의 함수가 실행되며 return의 함수도 실행된다.

빈 배열에 return이 있다면 useEffect 함수 실행은 한 번만 실행되며 컴포넌트가 제거되는 경우에만 return의 함수가 실행된다.
