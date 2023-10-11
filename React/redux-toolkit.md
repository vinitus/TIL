# reduxjs/toolkit

##### redux만을 활용하면 문제되는 점

1. return되는 객체의 크기가 커지게 되면 이를 복사하는 과정이 오래걸림
2. 새로운 state가 추가될 대마다 return되는 객체의 속성을 추가해줘야함
3. action의 type이 많아져서 중복되거나 오타의 위험이 있음
   <br>

이를 해결하기 위해 나온 것으로써

4. 내부에서 변경되는 것만 다루면 해당 변경사항이 반영된 객체의 모든 값이 복제되어 자동으로 변환
5. 때문에 새로운 state가 추가되어도 변경해야하는 것은 없다.
6. reducers의 value에서 선언되는 함수들로 자동으로 생성되고 action.type이 자동으로 매핑되어 접근이 매우 쉬워지기에 중복이나 오타에 대한 위험이 없다.
   <br>

## 1. method

##### example

```js
import { createSlice, configureStore } from "@reduxjs/toolkit"

const initialState = { counter: 0, showCounter: true }

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.counter += 1
    },
    decrement(state) {
      state.counter -= 1
    },
    increase(state, action) {
      state.counter += action.payload
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter
    },
  },
})

const store = configureStore({
  reducer: { counter: counterSlice.reducer },
})

const counterActions = counterSlice.actions

export default store

// use.js

import { counterActions } from "./store.js"
import { useSelector } from "@reactjs/toolkit"
import { useDispatch } from "redux"

const state = useSelector((state) => state.counter.counter)
const dispatch = useDispatch()

dispatch(counterActions.increment())
dispatch(counterActions.increase(10))
console.log(state)
```

<br>

###### createSlice

reducer function을 대체하는 것으로써

1.기존에는 if문과 action의 property를 통해 동작을 제어했지만 이번에는 원하는 **함수를 실행함**으로써 제어할 수 있다.

2.또한 기존에는 state값을 변경해서는 안됐지만 redux-toolkit은 immer이라는 패키지를 통해서 자동으로 변경점을 찾고 기존 state가 변경되지 않게 자동으로 새로운 객체를 만들어준다.

3.때문에 **모든 state를 다시 작성해야할 필요가 없다.** 원하는 부분만 바꿔주면 되기 때문!

4.초기값 설정은 같지만 다른 점은 **name**을 통해 이름을 지정해줘야하고 **reducers**에서 객체 형태로 reducer함수들을 선언해줘야한다.
<br>

###### configureStore

`configureStore`는 `createStore`처럼 저장소를 연결해주는 역할을 한다.

`createStore`는 인자로 reducer를 받고 연결하게 되는데 `createSlice`로 만들어진 객체에 reducer property를 통해서 reducer를 넘길 수 있다.

하지만 `createStore`에는 하나의 reducer만 전달해야하지만 slice가 여러개라면 전달되는 reducer도 여러개가 되기 때문에 `configureStore`를 쓰는 것이다.

`configureStore`를 사용하면 여러 reducer를 하나의 reducer로 합쳐준다. `configureStore`에 객체를 넘기게 되는데 key값에 reducer를 사용하고 넘길 `createSlice` 객체의 reducer 속성을 넘겨주면 된다.

```js
const store = configureStore({
  reducer: someSlice.reducer,
})
```

혹은 reducer를 key로 하고 바로 넘길수도 있지만 다시한번 객체로 이름을 key, 붙이고자 하는 `configureCreate`로 생성된 객체.reducer를 넘겨서 여러 객체를 넘길 수 있다.

```js
const store = configureStore({
  reducer: {
    one: oneSlice.reducer,
    two: twoSlice.reducer,
  },
})
```

이렇게 다수의 slice를 넘기게 되면 후에 `useSelector` hook을 사용하여 state에 접근한다면, property이름으로 접근하여 특정 Slice에 접근하고 내부의 state에 접근할 수 있다.

```js
const oneState = useSelector((state) => state.one.valueOne)
const twoState = useSelector((state) => state.two.valueTwo)
```

## 2. reducers에 있는 함수의 실행

`configureStore`를 통해 `createSlice` 객체가 매핑되면 reducers의 메서드가 자동으로 생성되고 해당 메서드를 actions 객체를 통해서 접근할 수 있다.

해당 메서드를 실행하면 action 객체가 생성되고 `useDispatch` hook을 통해 action을 dispatch 할 수 있다.

```js
// store.js
const someSlice = createSlice({
  name: "some",
  initalState: { number: 1 },
  reducers: {
    sumOne(state) {
      state.number++
    },
    sumN(state, action) {
      state.number += action.payload
    },
  },
})

const store = configureStore({
  reducer: someSlice.reducer,
})

export const someAction = someSlice.actions
export default store

// in another js file
import { someAction } from "./store.js"
import { useDispatch } from "redux"

const dispatch = useDispatch()

dispatch(someAction.sumOne)
```

생성된 action 객체는 type이라는 property가 자동으로 생성되어 있고 다른 고유 식별자(type)도 함께 들어있다.

때문에 action 식별자를 구분할 필요가 없다.
<br>

##### payload

만약 `createSlice`의 reducers 메서드 중에 action 인자가 필요한 곳이 있다면 실행시 인자로 값을 넘겨주면 된다. 넘어온 값은 객체인 action으로 들어가며 값은 key를 payload로 가지고 value에 인자로 넘어온 값이 저장된다.

따라서 slice된 reducer에서 해당 값을 사용하기 위해선 actino.payload로 사용할 수 있다.
