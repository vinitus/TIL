# react

## [리액트란](https://ko.reactjs.org/docs/getting-started.html) 사용자 인터페이스를 구축하는 JS 라이브러리

## JSX

JSX => React 프로젝트에서 구동되는 특수한 문법

### why use

React는 컴포넌트로

```js
function hello() {
  return React.createElement("div", {}, React.createElement("div", {}, "hello"))
}
```
