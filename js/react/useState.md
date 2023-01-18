## state

state는 컴포넌트 구성요소의 특정한 데이터가 담긴다.
**모든 컴포넌트에 state를 써야할 이유는 없으며** state를 사용하게 된다면 해당 state는 const인 것처럼 다뤄서 **임의로 재할당을 하면 안된다.**

### 언제 사용해야 하는가

1. 시간이 지남에 따라 변경될 수 있는 구성 요소
2. 구성 요소가 렌더링 후 변화되어 UI에 변화를 주는 경우

이럴 때 사용하여 state를 활용해 리액트 컴포넌트를 재평가하거나 새로운 컴포넌트를 생성하거나 할 수 있다.

어떤 구성 요소가 렌더링이나 데이터의 흐름에 영향을 주지 못한다면 state를 사용할 이유가 없다.

# useState

state를 관리하기 위한 메서드로써 이를 통해서 state를 업데이트하고 컴포넌트를 재평가할 수 있다.

React Component의 특성에 따라 동적으로 웹페이지를 만들기 위해 component를 재평가하기 위한 메서드

## 선언

useState 메서드를 사용하면 길이가 2인 배열이 반환된다.

첫번째 값은 useState가 관리하는 상태이고, 두번째 값은 상태를 업데이트하기 위해 호출할 수 있는 함수이다.

JS의 구조분해할당을 통하여 값, update메서드 로 할당할 수 있다.

```js
const [value, func] = useState("초기값")
```

useState의 parameter는 초기값이 들어간다.

### 왜 const로 사용하는가?

useState로 나온 값과 함수는 오버라이딩되서는 안된다.

어차피 해당 변수와 함수는 해당 컴포넌트에서만 유효하기 때문이고 굳이 따로 해당 값을 사용할 이유가 없기 때문이다.

```js
...
  const [greet, sendGreet] = useState('Hello!')

  const btnHandler = () => {
    sendGreet('Welcome')
  }

  return (
    <div>
      <button onClick={btnHandler}>Hello!</button>
      <div>{greet}</div>
    </div>
  )
...
```

greet가 변경될 때 component를 재평가하고 싶고 greet의 값을 변경할 수 있는 메서드도 존재하는데 바꿀 이유는 없기 때문에

실수를 방지하기 위한 차원으로 const를 사용한다.

## update 함수

useState의 반환값으로 나온 함수는 실행될시 **component를 재평가**한다.

때문에 기존의 컴포넌트는 그 안의 변수들이 변경되어도 웹페이지에는 반영되지 않았지만

useState를 활용해 재평가하면 변화된 것이 반영된 컴포넌트가 웹페이지에 반영된다.

## 이전의 값을 사용하는 State Update

스케줄을 추가하는 어플리케이션이 있다고 하고 useState를 통해서 component를 update하여 추가로 하고 싶다면!

useState의 반환되는 값이 배열형태로 존재하여야하고 기존의 값을 기억해야한다.

기존에는 새로운 값을 할당했다면 이번에는 update 메서드에 익명 화살표 함수를 통하여 인자로 기존 값을 가져갈 수 있다.

```js
...
  updateMethod((prevObj) => {
    return {...prevObj, key4: value4}
  })
...
```
