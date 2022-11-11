[Vue 단방향 데이터 흐름 공식문서](https://vuejs.org/guide/components/props.html#one-way-data-flow)

우선 vue는 기본적으로 단방향 데이터 통신을 지원한다. 부모에서 자식 component로의 데이터 통신은 지원하지만 자식에서 부모 component로 data를 보낼 수 없다. 막아둔 이유는 자식 component가 실수로 부모 component를 변경하여 앱의 데이터 흐름을 이해하기 어렵게 만드는 것을 방지할 수 있다고 한다.

그래서 자식 component에서 부모 component에게 데이터 변경을 전달하기 위해서는 emit event를 발생시켜야 하고 부모 컴포넌트에서는 이런 event 요청을 받아주는 처리를 해줘야 한다.

중요한 규칙

1. props로 자식 component에 전달할 때는 자식 component에서 props로 받아야함
2. props로 부모 component에서 넘겨줄시 vue instance에 변수를 넘기려면 :를 통해서 바인딩을 해줘야하고 그냥 문자열을 넘기려면 안해도 된다.
3. props에서 넘겨줄 때는 kebab-case로 선언하고 받을때는 camelCase로 받아야 함
4. emit의 첫번째 인자로 넘어갈 event이름은 kebab-case, 받는 쪽도 kebab-case, 받고 실행할 함수는 camelCase

[props와 emit 예제](https://github.com/vinitus/tistory_example/tree/master/props-emit-app)
