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

