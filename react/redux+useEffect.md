##### reducer에서 비동기나 http request 등의 side effect를 다루지 못하는 문제

reducer는 기본적으로 `async&await`나 `promise`, `fetch`, `axios`, `setTimeOut` 등의 부가적인 기능 없이 순수한 state를 변경하는 함수로써 해야한다.

하지만 로그인을 한다면 보통 인증 정보를 redux에 저장하고 싶을 것이다.

그렇다면 이런 로직을 어디서 처리해야할까?

# useEffect with Redux

사실 reducer에서 해서는 안되는 기능들은 side effect에 해당한다.

때문에 react에서는 해당 기능을 처리할 수 있는 hook이 있다. -> `useEffect`

컴포넌트에서 useEffect 훅을 사용하고 해당 내부 함수를 async로 선언하면서 비동기를 쉽게 처리할 수 있다.

해당 비동기 함수 내에서 비동기로 redux의 state를 불러오거나 값을 변경하는 리듀서 함수를 실행 할 수 있다.

```js
const someComponent = () => {
  const dataInRedux = useSelector((state) => state.value)
  useEffect(() => {
    const asyncFunc = async () => {
      let number = 0
      number += 2
      const firstAwait = await setTimeout(() => {
        number + 3
      }, 100)
      someActions.changeData({
        changeTo: firstAwait,
      })
      console.log(dataInRedux)
    }
  })
}
```

##### action creator

redux-toolkit에서 reducers에 선언된 함수를 사용하면 dispatch할 작업 객체를 자동으로 생성하는데 이것이 thunk이고 함수는 action creator가 되는 것이다.

## thunk

단순하게 말하자면 작업이 진행되는 동안 다른 작업을 지연시키는 함수이다.

결국, 다른 함수를 반환하는 함수가 되는 것

그래서 실제 작업 객체를 디스패치 하기 전에 다른 코드를 실행할 수 있다.
