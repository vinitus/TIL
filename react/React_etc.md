# React 알쓸신잡

## 목차

1. React Component 안의 값이 변경되도 바뀌지 않는 이유

### 1. React Component 안의 값이 변경되도 바뀌지 않는 이유

이벤트 핸들러를 통해서 어떤 값을 변경시키더라도 반영되지 않고 그냥 값만 바뀐 상태로 HTML에는 반영되지 않는다.

이유는 React Component는 Component 안의 값이 변한다고 해서 재평가 되지 않는다.

React는 실행시 React DOM에 JSX를 JS 코드로 변환하여 DOM tree에 반영하는데 이때 실행되는 Component를 평가한 그 상태만 저장되는 것

-> 그렇기에 변수가 바뀌더라도 component는 변경되지 않는다.

-> 재평가, 즉, React를 다시 DOM tree에 반영해야지 요구사항이 반영된다.

useState는 그 대표적인 예시이다.

### 2. JS에서는 return값은 반드시 하나의 객체이어야 한다.

두개의 문자열이 동시에 반환될 수 없다. 배열은 하나의 객체일 뿐, 배열 안에 여러 값들이 있어도 결국 return은 하나의 객체이다.

이 때문에 JSX에서도 하나의 HTML 요소만 반환될 수 있다.
