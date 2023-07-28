# react 조건문

{}안에서 조건문과 관련된 로직을 처리할 수 있다.

첫번째 예제처럼 조건문 뒤에 ? 를 통해서 true일때의 값과 : 을 통해서 else일 때의 값을 지정할 수 있다.

```js
...
  {isTrue === true ? (
  <p>True</p>
  ) : (
    <p>False</p>
  )}
...
```

혹은 한 줄로

```js
...
  {isTrue === true && <p>True</p>}
  {isTrue === false && <p>False</p>}
...
```

이렇게 할 수도 있고

아니면 따로 변수에 조건에 따른 HTML tag를 할당하여 미리 전처리된 값을 return해도 된다.
