# Protal

fragement를 통해서 작업하면 div soup에 빠지지 않고 깔끔하게 인접한 요소들을 랜더링할 수 있지만

modal창과 함께 할 경우가 문제이다. 실질적으로 웹페이지 구동에 있어서는 modal은 오버레이 되어서 수행되지만

modal창의 의미를 보면 페이지 위에 표시되는 오버레이 이기 때문에 모든 요소들 위에 있어야 한다.

CSS를 통해서 modal 창처럼 보이게 했어도 만약 깊이 중첩된 곳에 있다면 문제가 생길 수 있다.

또한 다른 오버레이 컨텐츠나 네비게이션 바, 스크롤 바, top Button은 HTML DOM에서 구조적으로 위치해야할 곳이 있다.

이를 도와주는 것이 Portal 포탈 모듈이다.

## 어떻게 쓰는가

컴포넌트를 이동시켜야할 장소와 이를 명시해줘야 한다.

1. index.html에서 태그와 id를 지정해주고
2. 컴포넌트에서 빼고자 하는 JSX 구문을 다른 컴포넌트로 만들어 주고
3. react-dom 모듈에서 createPortal 메서드를 사용하면 된다.

createPortal의 첫번째 인자는 컴포넌트 or JSX 구문, 두번째 인자는 포인터로써 DOM API를 사용하여 요소를 지정해줘야한다

```js
...
  {ReactDom.createPortal(<NavBar />, document.getElementById('navbar'))}
...
```
