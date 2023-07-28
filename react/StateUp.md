# State Up

부모 컴포넌트에서 자식 컴포넌트로 props를 통해서 데이터를 넘길 수 있다면 자식 컴포넌트에서 부모 컴포넌트로 어떻게 데이터를 줄 수 있을까?

State 끌어올리기(Lifting State Up)을 통해서 할 수 있다.

규칙

1. 부모 컴포넌트에서 자식 컴포넌트에서 발생시킬 props의 custom method를 자식 컴포넌트 선언에서 이벤트 리스너처럼 들어야 한다.
2. 자식 컴포넌트에서 컴포넌트 parameter인 props에 props.으로 이벤트를 발생시켜야 한다.

```js
const parentComponent = () => {
  const changeHandler = (childChangeValue) => {
    alert(childChangeValue)
  }
  return (
    <div>
      <ChildComponent onChangeAtChildComponent={changeHandler} />
    </div>
  )
}
```

```js
const childComponent = (props) => {
  let content = ""
  const submitHandler = () => {
    props.onChangeAtChildComponent(content)
  }

  return (
    <form onSubmit={submitHandler}>
      <input type="text" value={content} />
      <button type="submit">Submit!</button>
    </form>
  )
}
```
