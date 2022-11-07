## Vuex

### State Management
상태 관리. 상태는 App이 가지고 있는 Data로 표현할 수 있다.
각 component는 독립적 -> 각각의 상태를 가진다. 이런 component가 모여서 같은 상태를 유지할 필요가 있다.

Pass Props, Emit Event를 통해서 상태 관리를 하게 되면
직관적이지만 <-> Component의 중첩이 깊어진다면 복잡한 구조가 된다.

depth가 많이 깊다면 쉽게 전달할 방법이 없을까? 그래서 나온 것이 Vuex

### Centralized Store
중앙 저장소에 데이터를 모아 상태 관리 << 각 Component는 중앙 저장소의 데이터를 사용
규모가 크거나 depth가 깊은 프로젝트의 데이터 관리가 쉬워진다

### Vuex
```js
// vuex/index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
```
1. State
  vue instance의 data -> 중앙 관리 **모든 상태 정보**가 있음
  **$store.state를 통해 state 데이터에 접근**

2. Mutations
  실제 **state 변경** 방법 (유일)
  Mutations에서 호출되는 핸들러 함수는 반드시 **동기적**이어야 함!!
  왜 와이 비동기 로직으로 mutations를 사용해서 state를 변경하는 경우 state 변화 시기를 특정할 수 없다
  첫 인자로 state를 받고 component나 Actions에서 commit() 메서드로 호출

3. Actions
  mutations과 비슷하지만 **비동기 작업 포함 가능**
  state를 직접 변경하지 않고 commit() 메서드로 **mutations**를 호출해서 state 변경
  context object를 인자로 받고 이를 통해 store.js의 모든 요소 & 메서드에 접근 가능 -> state 직접 변경은 가능, BUT 하면 안됨
  component에서 dispatch() 메서드에 의해 호출
  **state 변경 외의 모든 로직 수행**

? Mutations 와 Action
  component -> actions(BE API와 통신) -> mutations -> state 변경 -> component 변경
  **mutaions는 state만 바꾼다**

  state -> getters -> component

4. Getters
  vue 인스턴스의 computed에 해당
  state를 활용하여 **계산된 값**을 얻고자 할 때 사용
  결과는 캐시되며 종속된 값 변경시 재계산(computed 특징)
  getters 계산된 값은 state에 영향 x, state, getter이 argument

