### JSX의 한계

return에는 반드시 하나의 HTML 요소로 래핑된 JSX가 반환되어야 한다.
-> 인접한 HTML 요소는 허용되지 않는다.

인접한 HTML 요소를 같이 반환하기 위해서는 다른 태그로 감싸거나 배열로 감싸야한다.

배열로 감싸게 되면 또 key를 하나하나 지정해줘야하는 문제가 있다..

여기서 파생되는 문제

### div Soup

편의를 위해 div로 감싸다보면 div안에 div안에 div안에.. 이렇게 되버린다.

불필요한 div요소들이 너무 많아지는 것 -> 어떤 의미도 없고 구조적인 의미도 없는 텅빈 tag인 것

문제는 css 선택자에서 발생함!
또한 너무 많은 HTML 요소들이 많다면 랜더링하는 과정이 길어지기에 웹이 느려지게 된다.

## 해결 방법

JSX를 쓰지 않고 빈 컴포넌트를 선언하고 return 값을 props.children인 component를 사용하는 것

props.children은 return의 여는 태그와 닫는 태그 사이에 넣어준 모든 코드를 반환하는 것이다.

```js
const Wrapper = (props) => {
  return props.children
}

export default Wrapper
```

이렇게 하면 div를 계속 감써서 의미 없는 요소들을 만드는 대신 인접한 요소들이 오류없이 DOM트리에 반영될 수 있게 해준다.

Wrapper 컴포넌트는 컴포넌트로써의 자격과 JSX의 자격을 충분히 충족하기 때문에 오류가 없고 그저 Wrapper로 시작하여 /Wrapper로 끝나는 JSX에서 변환된 요소들을 반환해주는 역할을 하는 것

# Fragment

이렇게 Wrapper 컴포넌트를 만들필요 없이

```js
...
return (
  <React.Fragment>
    <div>1</div>
    <div>2</div>
  </React.Fragment>
)
...
```

이렇게 하면 위의 Wrapper과 동일한 역할을 수행한다.
