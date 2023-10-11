[https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model/Introduction](https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model/Introduction)

# DOM - The Document Object Model

**HTML 문서의 프로그래밍 interface**이다. DOM은 구조화된 **표현**을 제공하고 DOM 구조에 **접근**하고 **변경**할 수 있는 방법을 제공한다. 즉, 웹 페이지는 일종의 문서이다. **웹 페이지**라는 **문서**는 웹 브라우저를 통해 내용이 **해석**되고, 웹 브라우저 화면에 나타나거나 HTML 소스 그 자체로 나타나기도 한다. 즉, **DOM은 브라우저가 내부적으로 웹 페이지를 표현하는 방법**이기도 하다.

DOM은 웹 페이지의 객체 지향이다. 개발자는 JS같은 **스크립트 언어**를 통해 DOM 구조에 접근하고 수정할 수 있다.

웹 페이지를 생성, 수정하는데 사용되는 모든 property, method, event 들은 하나의 객체로로 구성된다. 예를 들어 document 객체는 document 자체를 의미하고, table object 는 HTML table 에 접근하기 위한 HTMLTableElement DOM 인터페이스를 구현한 것이다.

### DOM and JS

DOM은 프로그래밍 언어는 아니지만, DOM이 없다면 JS는 웹 페이지의 HTML 요소들에 접근조차 할 수 없게 된다. 문서의 요소들은 모두 **웹 페이지라는 문서를 위한 DOM의 한 부분**이다. DOM을 제공함으로써 요소에 접근하고 수정할 수 있게 되는 것이다.

DOM은 JS로 주로 접근하지만, 프로그래밍 언어와 DOM은 독자적인 발전을 해왔다. 때문에 python에서도 DOM을 구현할 수 있다.

### HTML의 표준과 DOM 표준

HTML 문서를 DOM으로 파싱하는 방법은 HTML 표준에 정의되어 있다. 그리고 개발자는 DOM을 사용하기 위해 특별히 해야할 일은 없다. **각각의 브라우저는 자신만의 방법으로 DOM을 구현**하였다. 각자만의 방법으로 구현하였기에 어떻게 접근하는가에 대해서 옛날에는 고생했지만, DOM 표준이 생긴 후에는 이런 일은 거의 없다.

### DOM의 중요 데이터 타입

먼저, DOM 트리인 만큼 각각의 객체들은 **node**가 된다.

1. document

- 루트 문서 객체(= 브라우저가 불러온 하나의 웹 페이지)를 뜻한다. DOM 트리의 루트이기에 루트 문서 객체라고 하는 것!
- body뿐만이 아니라 헤더나 쿠키, 도메인 등을 포함하는 객체이다.

2. element

- HTML element를 나타내는 노드를 말한다. p, a, h1 태그 등이 있다.

3. nodeList

- 일반적인 배열들의 방식을 가져온 node배열이다. nodeList에는 **item() 메서드 밖에 없다**.

- `list.item(1)`과 `list[1]`은 같다. 즉, 인덱스로 접근할 수도 있고, item으로도 접근할 수 있다.

4. attribute

- element의 속성을 나타내는 노드이다. class, id, style, href 등, element의 추가적인 정보들을 담고 있다.

- **DOM은 결국, 어떤 프로그래밍 언어가 HTML의 요소들에 접근하고 수정할 수 있는 인터페이들을 제공하는 것**이다.

- DOM은 주로 JS로 쓰이는데, JS와 DOM이 같은 것은 아니다. HTML 문서가 DOM으로 표현되지 않고 DOM 프로그래밍 인터페이스도 없다면, HTML을 만들거나 수정할 수 없다.

---

## Virtual DOM

리액트는 실제로 DOM을 제어하는 것이 아니라 가상의 DOM인 **Virtual DOM**을 두어 개발의 편의성과 성능을 개선했다.

리액트는 [createRoot()](https://react.dev/reference/react-dom/client/createRoot#createroot)함수를 통해 Virtual DOM을 만들기 시작하고, JSX 문법을 해석하며 JS 코드가 만들어진다. 또한, React에서 사용하는 타입의 컴포넌트를 생성한다. 이를 활용하여 렌더링 프로세스를 최적화하고, 필요한 부분의 직접 DOM만을 조작하여 업데이트를 최소화하려고 한다. -> 리액트 파이버

**? 개발의 편의성과 개선은 왜 나올까**

DOM을 직접 조작하는 것은 비용적으로 많은 자원이 들어간다. 그렇기에 추상화된 가상 DOM을 만들고 이를 기반으로 필요한 DOM 요소 조작을 하고자 하는 것이다.

**하지만, DOM 자체가 비효율적인 것은 아니다**. DOM은 굉장히 빠르지만, 동적인 작업들이 자주 일어나게 되면, HTML, CSS, Scripts를 전부 다시 분석하고 재 렌더링 된다. **동적인 작업들이 많을수록**, 렌더링되고 계산되는 양이 많을 수록 오래걸리게 되는 것이다.

리액트에서 가상 돔은 결국 **DOM 트리를 JS 메모리에서 관리하는 것**이다. 기존의 가상 돔과 새로운 가상 돔에 대한 **스냅샷을 비교**하며 변경되는 가상 돔 트리에서 변한 부분에 대한 DOM에서만 업데이트가 일어난다.

브라우저에서 DOM을 분석하는 것보다, 일부의 DOM 요소만 업데이트하는 것이 효율적이기에 DOM보다 효율적이라고 하는 것이다.

**다시 말해서, 정적인 컨텐츠들만 보여주는 페이지라면, 가상 돔이 더 느리다.**

**리액트에서 main.jsx에 대해**

```js
// main.jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

React 앱의 컨테이너 역할을 해줄 DOM 요소를 createRoot로 지정해준다.

render()을 통해서 렌더링을 트리거하는데 [React에서의 렌더링](https://react.dev/learn/render-and-commit#step-1-trigger-a-render)은 웹 브라우저에서 HTML 문서를 화면에 보여준다는 뜻의 렌더링과는 조금 다르다.

간단히 말하면, React의 렌더링은 상태가 업데이트 되는 것을 뜻한다.

React는 render() 함수 호출을 통해서 초기 렌더링이 진행되고 각 컴포넌트를 재귀적으로 실행하며 가상 돔의 변경 요소를 파악하고 DOM을 업데이트하는 것이다.

---

## 결론

DOM은 HTML 문서의 요소들에 접근할 수 있게 만든 **API(application programming interface)이다**. 프로그래밍 언어와 DOM API는 따로 존재한다. 뿐만이 아니라, 브라우저가 내부적으로 웹 페이지를 표현하기는 방법이다.

Virtual DOM은 DOM 트리의 동적인 동작들을 효율적으로 관리하기 위해서 관리하는 것이다. 리액트의 가상 돔은 렌더링을 통해서 기존의 가상 돔과 새로운 가상 돔을 업데이트하고, 기존의 돔과 비교하여 commit 과정을 통해 변화된 부분의 실제 DOM만 변경되는 것이다.

### Reference

[https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model/Introduction](https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model/Introduction)  
[https://d2.naver.com/helloworld/9297403](https://d2.naver.com/helloworld/9297403)  
[https://react.dev/learn/render-and-commit](https://react.dev/learn/render-and-commit)  
[https://react.dev/reference/react-dom/client/createRoot](https://react.dev/reference/react-dom/client/createRoot)  
[https://react.dev/learn/state-as-a-snapshot](https://react.dev/learn/state-as-a-snapshot)
