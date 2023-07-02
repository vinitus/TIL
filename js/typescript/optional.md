이 글은 왜 쓰냐면 ..

```ts
interface Props {
  tag: '포인트' | '참여설문' | '제작설문';
  quantity: number;
  modalOpenFunc?: React.Dispatch<React.SetStateAction<string | boolean>>;
}

export default function MyPageCard({ tag, quantity, modalOpenFunc }: Props) {
  ...
    <button type="button" disabled={tag === '포인트'} onClick={() => modalOpenFunc(tag)}>
  ...
```

이게 안된다.. 우선 `modalOpenFunc?`에서 eslint가 화낸다..

#### propType "modalOpenFunc" is not required, but has no corresponding defaultProps declaration. (eslintreact/require-default-props)

modalOpenFunc가 필수가 아니니까 default 프롭스를 명확하게 해야한다는 것

---

뭔 말인지는 알았지만 혹시 모르니까 링크부터 가봐야한다..

[https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-default-props.md](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-default-props.md)

eslint는 컴포넌트 함수가 **항상 동일하게 작동하기를 권장**하기 때문에, 이런 오류를 주는 것

사실 나는 `modalOpenFunc`가 없다는 것에 대한 분기 처리를 하려고 했는데, eslint가 권장하는 해결방법이 있을 것이라고 생각해서 해결해보려고 한다.

#### 깃허브의 예시

```js
const HelloWorld = ({ name }) => (
  <h1>
    Hello, {name.first} {name.last}!
  </h1>
);

HelloWorld.propTypes = {
  name: PropTypes.shape({
    first: PropTypes.string,
    last: PropTypes.string,
  }),
};

HelloWorld.defaultProps = {
  name: 'john',
};

// Logs:
// Invalid prop `name` of type `string` supplied to `HelloWorld`, expected `object`.
ReactDOM.render(<HelloWorld />, document.getElementById('app'));
```

보면, defaultProp으로 프롭스의 기본 값에 대해 선언해주고 있다.

또 다른 점이 props를 propTypes로 지정해주고 있다. -> 다른 모듈에서 가져오는것

```js
import PropTypes from 'prop-types';
```

근데 나는 이것보다는 interface로 정의한 Props 타입으로 해결하고 싶었다. 애초에 근본적인 해결법이 있을 것이라고 생각했다. 그래서 defaultProp으로 해결하기로 했다.

```ts
MyPageCard.defaultProps = {
  modalOpenFunc: undefined,
};
```

일단 이렇게 default값을 지정해주니까 사라진다. 애초에 옵셔널 심볼을 사용하면 | undefined가 들어가는데 왜 굳이 사용해야하는지 잘 모르겠다.

---

그래서 지우고 인자 자체에도 해봤다.

```ts
export default function MyPageCard({ tag, quantity, modalOpenFunc = () => 1 }: Props) {
  ...
}
```

근데 이러면 안사라짐 ㅋㅋㅋ

![image](https://github.com/vinitus/TIL/assets/97886013/84f9ebc9-aac0-40a7-a7cd-2624eb4ba594)

아마도 명시적으로 해결해야하는 것 같다.

---

결론

react의 컴포넌트 props 중 어떤 것을 옵셔널하게 쓰고 싶다면 defaultProps로 명시해줘야한다.

#### **reference**

[https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-default-props.md](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-default-props.md)
