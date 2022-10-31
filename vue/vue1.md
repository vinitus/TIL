# vue.js

### Web App

개발자 도구 > 디바이스 모드하면 보이는데

디바이스에 설치된 App처럼 보이는 것

### SPA (Single Page Application)

SPA는 최초 1장의 HTML만 받고 모든 요청에 대응

CSR (client Side Rendering) 방식 처리

클라이언트 단에서 웹 페이지를 구성하는 방식

SSR (Server Side Rendering)은 서버에 부담을 준다

1. 필요 페이지를 서버에 AJAX로 요청
2. 서버는 화면에 그림을 그리기 위한 JSON 파일을 준다
3. JSON 데이터를 JS로 처리하고 DOM 트리에 반영

CSR 왜 써

모든 HTML 페이지를 서버로 부터 받지 않아도 된다.

→ 클라 - 서버간 트래픽 감소

필요한 부분만 고쳐나가므로 JS를 통해 요청이 끊김 없이 진행

→ UX 향상

근데 CSR의 문제점

첫 구동시 필요 데이터가 많으면 최초 작동 시간까지 시간이 많이 필요하다.

검색 엔진 최적화(SEO)가 어렵다.

SPA 서비스 중 SSR 지원 Framework 

Vue의 Nuxt.js, React의 Next.js

MVVM

sw 아키텍처 패턴

View - 보이는 부분 DOM

Model - 실제 데이터 = JSON

View Model (Vue) - View를 위한 Model

View 와 바인딩되어 Action을 주고 받는다

Model이 변견되면 View Model도 변경되고 바인딩된 View도 변경

Vue의 문법들

1. el은 쿼리셀렉터같은 것
2. data
    
    Vue instance의 데이터 객체 혹은 인스턴스 속성
    
    **데이터 객체는 반드시 기본 객체 { } Object여야 한다**
    

```jsx
<div id="app">
  {{ message }}
</div>

const app = new Vue({
	el: '#app',
  data: {
    message: 'Hello, Vue!'
  },
})
```

1. methods
    
    ```jsx
    <div id="app">
      {{ message }}
    </div>
    
    const app = new Vue({
    	el: '#app',
      data: {
        message: 'Hello, Vue!'
      },
    	methods: {
        print: function () {
          console.log(this.message)
        },
    		bye: function () {
          this.message = 'Bye, Vue!'
        },
    		arrowBye: () => {
          this.message = 'Arrow Function?'
          console.log(this)
        }
    	}
    })
    ```
    
    Object 처럼 선언할 수 있음
    
    this 사용에 주의할 것!
    
    data는 data.~를 통해서 키값에 접근할 필요가 없다
    
    data값을 함수를 통해 바꿀 수 있음
    
    ⭐ arrow function을 사용하면 Arrow Function을 사용해선 안된다
    
    this가 바인딩되었기에 app의 한단계 위 스코프인 window를 가리키기 때문
    

Interpolation

data key를 통해서 html의 {{ }} 안에 객체의 키를 넣는 것

RAW HTML → **v-html** directive를 사용하여 data와 바인딩

Directives

v - 접두사가 있는 특수 속성에는 값 할당 가능

값에는 JS 표현식 작성 가능

directive의 역할은 표현식 값이 변경될 때 반응적으로 DOM에 적용

v-on:submit.prevent=”onsubmit”

v-text ⇒ {{ }} 와 동일해보이는 역할

v-html ⇒ xss 공격에 대한 취약으로 인해 사용자가 입력, 제공하는 컨텐츠에서 절대 사용 금지

v-show ⇒ 표현식에 작성된 값에 따라 element를 보여줄지말지 결정

요소 자체는 DOM에 렌더링 돼있다.

표현식 결과와 관계 없이 렌더링 → 초기 렌더링 비용이 비싸다

그러니 toggle은 비용이 작다

v-if ⇒ v-show와 동일하나 false면 DOM에서 사라진다

v-if v-else-if v-else로 사용

표현식 결과가 false인 경우 렌더링 조차 되지 않으므로 렌더링 비용이 낮을 수 있다. 그런데 바뀌면 재 렌더링으로 비용이 증가

```jsx
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <!-- 1. Text interpolation -->
  <div id="app">
    <p>메시지: {{ msg }}</p>
    <p>HTML 메시지 : {{ rawHTML }}</p>
    <p>HTML 메시지 : <span v-html="rawHTML"></span></p>
    <p>{{ msg.split('').reverse().join('') }}</p>
  </div>

  <!-- 2. v-text & v-html -->
  <div id="app2">
    <!-- 2-1. v-text & {{}} -->
    <p v-text="message"></p>
    같음
    <p>{{ message }}</p>

    <!-- 2-2. v-html -->
    <p v-html="html"></p>
  </div>

  <!-- 3. v-show && v-if -->
  <div id="app3">
    <p v-show="isActive">보이니? 안보이니?</p>
    <p v-if="isActive">안보이니? 보이니?</p>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    // 1. Text interpolation
    const app = new Vue({
      el: '#app',
      data: {
        msg: 'Text interpolation',
        rawHTML: '<span style="color:red"> 빨간 글씨</span>'
      }
    })

    // 2. v-text && v-html
    const app2 = new Vue({
      el: '#app2',
      data: {
        message: 'Hello!',
        html: '<a href="https://www.google.com">GOOGLE</a>'
      }
    })

    // 3. v-show && v-if
    const app3 = new Vue({
      el: '#app3',
      data: {
        isActive: false
      },
      methods: {
        toggle: function () {
          if (this.isActive === true) {
            this.isActive = false
          } else {
            this.isActive = true
          }
        }
      }
    })
  </script>
</body>

</html>
```

v-for

for … in … 형식으로 작성

index를 같이 출력하고자 한다면 (char, index) 형태로 가능하다

객체가 요소라면 dot notation으로 접근 가능

특수 속성 key

v-for 사용시 스타일 가이드에 따라 key속성을 각 요소에 작성해야한다

key는 고유해야함 → 고유하지않다면 생략가능

```jsx
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <!-- 3. v-for -->
  <div id="app">
    <h2>String</h2>
    <div v-for="char in myStr">
      {{ char }}
    </div>
    <div v-for="(char, index) in myStr" :key="index">
      <p>{{ index }}번째 문자열 {{ char }}</p>
    </div>

    <h2>Array</h2>
    <div v-for="(item, index) in myArr" :key="index">
      <p>{{ index }}번째 아이템 {{ item }}</p>
    </div>

    <div v-for="(item, index) in myArr2" :key="`arry-${index}`">
      <p>{{ index }}번째 아이템</p>
      <p>{{ item.name }}</p>
    </div>

    <h2>Object</h2>
    <div v-for="value in myObj">
      <p>{{ value }}</p>
    </div>

    <div v-for="(value, key) in myObj" :key="key">
      <p>{{ key }} : {{ value }}</p>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        // 1. String
        myStr: 'Hello, World!',

        // 2-1. Array
        myArr: ['python', 'django', 'vue.js'],

        // 2-2. Array with Object
        myArr2: [
          { id: 1, name: 'python', completed: true },
          { id: 2, name: 'django', completed: true },
          { id: 3, name: 'vue.js', completed: false },
        ],

        // 3. Object
        myObj: {
          name: 'harry',
          age: 27
        },
      }
    })
  </script>
</body>

</html>
```

v-on:(event)=”(value)”

event listener와 유사하다. value에 JS표현식과 메서드가 올 수 있음

@ 를 통해 shortcut 가능 = @(event)=”(value)”

method를 통해 data 조작과 인자도 넘길 수 있다

또한 event 뒤에 특별한 수식어 enter등이 올 수 있다

```jsx
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .red-text {
      color: red;
    }

    .border-black {
      border: solid 1px black;
    }

    .dark-mode {
      color: white;
      background-color: black
    }

    .white-mode {
      color: black;
      background-color: white;
    }
  </style>
</head>

<body>
  <div id="app">
    <button v-on:click="number++">increase Number</button>
    <p>{{ number }}</p>

    <button v-on:click="toggleActive">toggle isActive</button>
    <p>{{ isActive }}</p>

    <button @click="checkActive(isActive)">check isActive</button>
  </div>

  <div id="app2">
    <a v-bind:href="url">Go To GOOGLE</a>

    <p v-bind:class="redTextClass">빨간 글씨</p>
    <p v-bind:class="{ 'red-text': true }">빨간 글씨</p>
    <p v-bind:class="[redTextClass, borderBlack]">빨간 글씨, 검은 테두리</p>

    <p :class="theme">상황에 따른 활성화</p>
    <button @click="darkModeToggle">dark Mode {{ isActive }}</button>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        number: 0,
        isActive: false,
      },
      methods: {
        toggleActive: function () {
          this.isActive = !this.isActive
        },

        checkActive: function (check) {
          console.log(check)
        }
      }
    })

    const app2 = new Vue({
      el: '#app2',
      data: {
        url: 'https://www.google.com/',
        redTextClass: 'red-text',
        borderBlack: 'border-black',
        isActive: true,
        theme: 'dark-mode'
      },
      methods: {
        darkModeToggle() {
          this.isActive = !this.isActive
          if (this.isActive) {
            this.theme = 'dark-mode'
          } else {
            this.theme = 'white-mode'
          }
        }
      }
    })
  </script>
</body>

</html>
```

v-bind

HTML에 Vue data를 연결하는 법

1. 조건부 바인딩
    
    { ‘class Name’: ‘조건 표현식’}
    
    tkagkddustkswkeh rksmdgkek
    
2. 다중 바인딩
    
    [’JS 표현식’, ’JS 표현식’, …]
    

: → v-bind shortcut

```jsx
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .red-text {
      color: red;
    }

    .border-black {
      border: solid 1px black;
    }

    .dark-mode {
      color: white;
      background-color: black
    }

    .white-mode {
      color: black;
      background-color: white;
    }
  </style>
</head>

<body>
  <div id="app">
    <button v-on:click="number++">increase Number</button>
    <p>{{ number }}</p>

    <button v-on:click="toggleActive">toggle isActive</button>
    <p>{{ isActive }}</p>

    <button @click="checkActive(isActive)">check isActive</button>
  </div>

  <div id="app2">
    <a v-bind:href="url">Go To GOOGLE</a>

    <p v-bind:class="redTextClass">빨간 글씨</p>
    <p v-bind:class="{ 'red-text': true }">빨간 글씨</p>
    <p v-bind:class="[redTextClass, borderBlack]">빨간 글씨, 검은 테두리</p>

    <p :class="theme">상황에 따른 활성화</p>
    <button @click="darkModeToggle">dark Mode {{ isActive }}</button>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        number: 0,
        isActive: false,
      },
      methods: {
        toggleActive: function () {
          this.isActive = !this.isActive
        },

        checkActive: function (check) {
          console.log(check)
        }
      }
    })

    const app2 = new Vue({
      el: '#app2',
      data: {
        url: 'https://www.google.com/',
        redTextClass: 'red-text',
        borderBlack: 'border-black',
        isActive: true,
        theme: 'dark-mode'
      },
      methods: {
        darkModeToggle() {
          this.isActive = !this.isActive
          if (this.isActive) {
            this.theme = 'dark-mode'
          } else {
            this.theme = 'white-mode'
          }
        }
      }
    })
  </script>
</body>

</html>
```

v-model

Vue instance와 DOM의 **양방향 바인딩**

Vue data 변경 시 v-model로 연결된 사용자 입력 element에도 적용된다

근데 한글같은 조합형 문자는 한박자 늦기 때문에 input쓰삼

```jsx
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <div id="app">
    <h2>1. Input -> Data</h2>
    <h3>{{ myMessage }}</h3>
    <input @input="onInputChange" type="text">
    <hr>

    <h2>2. Input <-> Data</h2>
    <h3>{{ myMessage2 }}</h3>
    <input v-model="myMessage2" type="text">
    <hr>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        myMessage: '',
        myMessage2: '',
      },
      methods: {
        onInputChange: function (event) {
          this.myMessage = event.target.value
        },
      }
    })
  </script>
</body>

</html>
```

computed

Vue instance property 중 하나, 미리 계산한 **값**을 ****사용

계산 결과가 변하기 전까진 함수를 재호출하는 것이 아니라 계산된 값을 반환한다.

변하지 않으면 항상 캐싱된 값을 반환

값 ← 이라서 ()를 쓰지 않음

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <h1>data_01 : {{ number1 }}</h1>
    <h1>data_02 : {{ number2 }}</h1>
    <hr>
    <h1>add_method : {{ add_method() }}</h1>
    <h1>add_method : {{ add_method() }}</h1>
    <h1>add_method : {{ add_method() }}</h1>
    <hr>
    <h1>add_computed : {{ add_computed }}</h1>
    <h1>add_computed : {{ add_computed }}</h1>
    <h1>add_computed : {{ add_computed }}</h1>
    <hr>
    <button v-on:click="dataChange">Change Data</button>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        number1: 100,
        number2: 100
      },
      computed: {
        add_computed: function () {
          console.log('computed 실행됨!')
          return this.number1 + this.number2
        }
      },
      methods: {
        add_method: function () {
          console.log('method 실행됨!')
          return this.number1 + this.number2
        },
        dataChange: function () {
          this.number1 = 200
          this.number2 = 300
        }
      }
    })
  </script>
</body>
</html>
```

watch = 감시자

특정 데이터의 변화를 감지하는 기능

함수의 이름을 data의 키값으로 지정

인자 2개 ⇒ (변동 후 data, 변동 전 data)

method를 호출할 수 있다. 대신 key 값을 handler라고 해야함

배열이나 객체를 watch할 때는 deep이라는 옵션을 줘야한다

```jsx
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <div id="app">
    <h3>Increase number</h3>
    <p>{{ number }}</p>
    <button @click="number++">+</button>
    <hr>

    <h3>Change name</h3>
    <p>{{ name }}</p>
    <input type="text" v-model="name">
    <hr>

    <h3>push myObj</h3>
    <p>{{ myObj }}</p>
    <button @click="itemChange">change Item</button>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        number: 0,
        name: '',
        myObj: { completed: true }
      },
      methods: {
        nameChange: function () {
          console.log('name is changed')
        },

        itemChange: function () {
          this.myObj.completed = !this.myObj.completed
        }
      },
      watch: {
        number: function (val, oldVal) {
          console.log(val, oldVal)
        },

        name: {
          handler: 'nameChange'
        },

        myObj: {
          handler: function (val) {
            console.log(val)
          },
          deep: true
        },
      }
    })
  </script>
</body>

</html>
```

filter

| 파이프와 함께 추가되어야 한다. 체이닝 가능