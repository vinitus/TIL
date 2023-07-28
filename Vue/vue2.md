# vue.js 2

### Node.js

JS를 브라우저 밖에서 구동하기 위한 런타임 환경인 Node.js

NPM (Node Package Manage)

자바스크립트 패키지 관리자

바벨 - 버전 달라도 실행시켜주는 것

### project 구조

index.html - vue앱의 뼈대가 되는 html파일

src - assets : static file

src - components : 컴포너트

src - App.vue : 최상위 컴포넌트 - index.html과 연결

컴포넌트

UI를 독립적으로 재사용한 가능한 조각으로 나눈것

다시 사용할 수 있는 범용성을 위해 개발된 SW 구성 요소를 의미

vue.js를 작성하는 법

1. component에 component 파일을 만들어주고
2. export default에 key 값으로 name을 등록해주고
3. template과 style을 작성한다
4. 상속시킬 다른 컴포넌트(root component인 App.vue 포함)에 import를 해주고
5. components로 등록해주고
6. template에 적용

### Data in components

독립적인 component에서 동일한 data를 보여주는방법

컴포넌트는 부모-자식 관계가 있으므로 데이터를 보내줄 수 있다

부모 → 자식 : pass **props →** props라는 data

자식 → 부모 : **emit** event → 이건 그냥 이벤트임

모든 컴포넌트 독립적이지만 root component는 공통 조상 부모로 갖게 되어있다.

### Pass Props

**요소의 속성** 사용하여 데이터 전달! props는 부모 컴포넌트 정보 전달을 위한 사용자 지정 특성

자식 컴포넌트는 props 옵션을 사용하여 명시적으로 선언해야함

정적인 데이터 전달시 static props

prop-data-name=”value” 형태로 데이터 전달 << kebab-case를 사용해야한다

받는쪽은 propDataName으로 caramel-case

### Dynamic props

변수를 props로 전달할 수 있음

v-bind directive를 사용해 데이터 동적 바인딩 << 이러면 부모 component 데이터가 업데이트 되면 자식도 update

### 단방향 데이터 흐름

모든 Props는 부모에서 자식으로 __단방향__ 바인딩

부모 속성 업데이트시 자식으로 흐름
BUT B.U.T. 자식에서 부모로는 흐르지 않는다.
위에서 아래로만 흐름!

목적 -> 실수방지 + 데이터 유지보수
그래서 하위 component에서 prop을 변경하려고 하면 경고를 보낸다.

근데 원래는 올리고 내리고 할 수 있다고 했는데?
emit event << 그래서 event인거다

### Emit Event
단방향 이벤트이기에 자식 component에서 데이터 전달시 **이벤트**를 발생 시킴

$emit('event-name')

```html
<template>
  <div>
    ...
    <button @click="ChildToParent">클릭!</button>
  </div>
</template>

<script>
export default {
  ...
  methods: {
    ChildToParent : function() {
      this.$emit('child-to-parent', 'child data')
    }
  }
}
</script>
```

```html
<!-- MyComponent.vue -->

<template>
  <div class='border'>
    <h1>This is my componet</h1>
    <MyChild
      ...
      @child-to-parent="parentGetEvent"
      />
  </div>
</template>

<script>
export default {
  ...
  methods: {
    parentGetEvent: function(inputData) {
      console.log("자식 컴포넌트에서 발생한 이벤트!")
      console.log(`child component로부터 ${inputData}를 받음!`)
    }
  }
}
</script>
```

1. 자식 컴포넌트에 있는 버튼 클릭 이벤트 청취(@click)
2. 호출된 함수에서 $emit을 통해 상위 컴포넌트 이벤트 발생 + 자식의 데이터 전달
3. 상위 component는 자식에서 발생시킨 이벤트를 청취하여 연결된 핸들러 함수 호출 + 함수 argument로 전달된 데이터가 포함

### Dynamic Emit Event

```html
<!-- Mychild.vue -->
<template>
  <div>
    ...
    <input
      type="text"
      v-model="childInputData"
      @keyup.enter="childInput">
  </div>
</template>

<script>
export default {
  ...
  data: function() {
    return {
      childInputData: null,
    }
  },
  mehtods: {
    ...
    childInput: function() {
      this.$emit('child-input', this.childInputData)
      this.childInputData = ""
    }
  },
}
</script>
```

```html
<!-- MyComponent.vue -->
<template>
  <div class='border'>
    <h1>This is my component</h1>
    <Mychild
      ...
      @child-input="getDynamicData"
      />
  </div>
</template>

<script>
import MyChild from '@/components/MyChild'

export default {
  ...
  methods: {
    ...
    getDynamicData: function(inputData){
      console.log(`child component로부터 ${inputData}를 입력받음!`)
    }
  }
}
</script>
```

### 헷갈리는 pass props / emit event의 case
1. props
HTML에서 내려주니까 << kebab-case
JS에서 받으니까 << CamelCase

2. emit
JS에서 event를 알리지만 받는 쪽은 HTML이니깐 << CamelCase
HTML에서 받으니깐 << kebab-case