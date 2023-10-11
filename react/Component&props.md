# Component

컴포넌트는 리액트의 전부와 같다.

모든 사용자 인터페이스들은 컴포넌트로 구성된다. 컴포넌트는 스타일을 만드는 html, css, js코드의 결합이며 재사용이 가능하다.

그렇다고 해서 재사용이 가능한 것들만 컴포넌트로 할 필요는 없다. 이는 유용한 기능일 뿐이다.

컴포넌트를 구축하고 리액트에게 유저 인터페이스를 어떻게 구성할 것인지 구현하는 것

리액트가 컴포넌트를 도입한 이유는 재사용성, 우려사항을 분리할 수 있기 때문

재사용성 - 반복을 피하기 위해
우려사항들을 분리하는 것 - 코드들을 작고 관리 가능한 단위로 유지할 수 있게 해준다
모든 HTML, CSS, JS 코드들을 하나의 거대한 파일에 작성하는 것 보단, 컴포넌트를 도입함으로써 여러 파일로 나눠서 구현이 쉬워지고 유지와 관리하기 쉽게 만드는 것

언어를 떠나 프로그래밍에 대해서 생각해본다면 각 언어에는 함수가 존재한다.

기능을 함수로 나누거나 외부의 로직을 가져와서 쉽게 사용할 수 있는 것처럼 리액트도 컴포넌트로 나눠서 필요할 때 사용하고 다시 사용할 수 있고 기능 단위로 분리하여 필요할 때 짜맞춰서 전체 사용자 인터페이스를 구축하는 것이다.

## React와 Component

따라서 React.js를 통해서 Component를 어떤 상태로 어떤 상황에서 사용하는지 정의하는 것이 중요하다.

직접 DOM에 접근할 필요는 없다. Component를 평가하는 과정에서 DOM에 반영해주기 때문

## JSX

React PJT에서 사용되는 특수 문법이다.

컴포넌트의 return 값으로 하나로 된 HTML tag를 넘길 수 있다.

js의 변수를 {}를 통해 할당할 수 있고 .map같은 메서드도 사용가능하다.

JSX는 사실 React.createElement를 쉽고 가독성있게 사용하게 해주는 장점이 있다.

```js
const JSXExample = () => {
  return (
    <div>
      <h2>hello</h2>
    </div>
  )
}

const methodExample = () => {
  return React.createElement(
    "div",
    null,
    React.createElement("h2", null, "주제")
  )
}
```

위의 JSX문법을 활용하면 쉽게 사용가능하다.

### JSX의 className

HTML tag에 css class를 부여하는 것으로 className="클래스명" 이렇게 할 수 있다.

여기에 2개 이상의 class를 하고 싶다면 className="클래스명1 클래스명2" 이렇게 하면 된다.

return에서 {}를 통해 변수를 할당하듯, className도 {}를 통해 동적으로 할당 할 수 있다.

### eventhandler

HTML의 eventhandler와 같다.

### 조건식

{}안에 JS 조건을 걸 수 있다.

```js
...
  {isToggleOn ? 'ON' : 'OFF'}
...
```

# props

react에서는 부모에서 자식으로 props라는 객체를 통해 데이터를 넘길 수 있다.

중요한 규칙은 자식 컴포넌트에서는 컴포넌트 함수 인자로 props 객체를 받아야하고

부모 컴포넌트의 return 값 중에서 자식 컴포넌트를 사용할 때 속성 값으로 넘길 수 있다.

이때 속성명은 key가 되고 값은 value가 된다.

```js
const props = {
  key: value,
  ...
}
```

이것이 결국 props의 형식이 되는 것이다.

## props가 받을 수 있는 것

props는 변수 뿐만이 아니라 String값을 받고 className에 할당할 수도 있다!

또한 부모요소의 메서드를 가르키는 포인터를 넘겨서 부모 컴포넌트의 메서드를 사용할 수도 있다.
