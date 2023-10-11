# JS2

브라우저로써의 JS

## Browser API

1. DOM
2. Geolocation API → 지리 정보 (구글 맵, 네이버 지도 같은 것)
3. WebGL → 그래픽

### DOM

Document Object Model → **문서** **객체** 모델

문서의 구조화된 표현 제공, **프로그래밍 언어가 DOM 구조 접근 방법을 제공**

HTML 문서를 조작하기 위해 접근 ← 필요하다

문서의 요소를 **객체(object)**로 취급 = h1, h2 tag 이런거 하나하나 객체로 취급할 수 있게 DOM API가 지원해준다.

→ 객체 지향으로써 웹 페이지를 접근할 수 있음

**DOM Tree**

문서를 **논리 트리**로 표현한다

```jsx
document
	html
		head
			title
		body
			p
			a
```

즉, 웹 페이지는 하나의 문서로 분류할 수 있고 이 문서는 웹 browser를 통해 화면에 나타나거나 HTML 코드로 나타내기도 한다.

### DOM의 주요 객체

1. window
    
    최상위 객체! 브라우저에서는 각각의 탭이다.
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/261c4d0c-42b6-4754-86d1-4b1fc92d4e8a/Untitled.png)
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2c588aa7-9184-4da9-9d5b-597334ac8a55/Untitled.png)
    
    window.open()
    
    window.print()
    
    window.alert()
    
    최상위 클래스이니깐 window를 생략할 수 있다.
    
2. document
    
    window.document 명령어 입력시 html 전체를 가르킨다
    
    → 즉 window 객체 하위인 document에 대한 접근은 브라우저 각 탭의 HTML 문서를 가르킨다
    
    window는 보통 생략함
    
    document.title ⇒ HTML header tag 안의 title 태그에 대한 접근
    
    document.tite = value로 변경시 HTML title 태그가 수정된다.
    

⭐ 파싱 (parsing)

구문 분석, 해석이라는 의미

브라우저가 문자열을 해석하여 DOM Tree로 만드는 과정

브라우저가 웹 페이지를 만들 때! 파싱을 통해 문자열을 읽어서 문서를 만들고 STYLE 태그를 통해 꾸미고 요소에 배치하는 것

### DOM 조작

⭐ **선택** 후 **조작**

1. document.querySelector(selector)
    
    css selector를 만족하는 **첫 번째** element 객체를 반환 (없다면 null)
    
2. document.querySelectorAll(selector)
    
    제공한 선택자와 일치하는 **여러** element 선택
    

id 선택자 → ‘#’

class 선택자 → ‘.’

```jsx
<script>
  console.log(document.querySelector('#title'))
  console.log(document.querySelectorAll('.text'))
  console.log(document.querySelector('.text'))
  console.log(document.querySelectorAll('ul > li'))
  console.log(document.querySelector('body > ul > li:nth-child(2)'))
</script>
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0e2e4ffa-b96c-466a-a26e-e64a74e6e8ec/Untitled.png)

**NodeList**

배열은 아닌데 index로만 각 항목 접근 가능

배열의 forEach method 및 다른 메서드 사용 가능

```jsx
const arr = document.querySelectorAll('ul > li')
  arr.forEach(element => {
    console.log(element)
});
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c8ce8401-564b-4253-97c8-69db2c328efd/Untitled.png)

근데 실시간으로 반영되는 것은 아님 → 의도적인 것!

도중에 변경된다면 문제가 생길 수도 있는 요소들에 반영 (순회 or 길이를 cache할 때(임시 저장할 때))

[https://developer.mozilla.org/ko/docs/Web/API/NodeList](https://developer.mozilla.org/ko/docs/Web/API/NodeList)

이거 보고 정리 꼭 하기

1. **생성**
    
    document.createElement(tagName)
    
    작성한 tagName의 HTML 요소 생성 후 **반환**
    
2. **입력**
    
    Node.innerText
    
    Node 객체와 그 자손 텍스트 컨텐츠를 표현
    
3. **추가**
    
    Node.appendChild()
    
    어떤 부모 tag의 자식 tag로 넣을 때 쓴다
    
    이미 주어진 Node가 문서에 존재하는 다른 Node 참조시 현위치에서 새로운 위치로 이동해버림…
    
    추가된 Node객체 반환
    
4. **삭제**
    
    Node.removeChild()
    
    DOM에서 자식 노드 제거 후 반환
    

```jsx
<body>
  <div></div>
  
  <script>
    const h1Tag = document.createElement('h1')
    h1Tag.innerText = 'DOM 조작'
    const divTag = document.querySelector('div')
    divTag.appendChild(h1Tag)
    document.body.appendChild(divTag)
  </script>
</body>
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d08927f0-c97b-4a4e-b8e0-216e8506dbfa/Untitled.png)

Element.getAttribute(attributeName)

해당 요소의 지정 값 반환. parameter는 값을 얻고자하는 속성 이름

Element.setAttribute(name, value)

name 값을 갱신 or 지정된 이름과 값으로 속성 추가

Node.classList

현재 노드에 적용된 class들을 보여줌

toggle을 통해 클래스 단 뒤쪽에 클래스를 추가

[https://developer.mozilla.org/ko/docs/Web/API/Element/classList](https://developer.mozilla.org/ko/docs/Web/API/Element/classList)

한번 보기! add, remove도 있음

```jsx
<head>
	...
	<style>
    .red { 
      color: red;
    }
    .blue {
      color: blue;
    }
  </style>
</head>
<body>
  <h1 class="red">안녕하세요</h1>
  <div></div>

  <script>
    const aTag = document.createElement('a')
    aTag.setAttribute('href','https://www.google.com/')
    aTag.innerText = '구글'
    const divTag = document.querySelector('div')
    divTag.appendChild(aTag)
    const h1Tag = document.querySelector('h1')
    h1Tag.classList.toggle('blue')
  </script>
</body>
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f00a9af9-2f93-49c8-8dde-0182c9e2fcd5/Untitled.png)

---

### Event

클릭 or 마우스 on 등의 **사건**에 대한 **결과**를 받거나 **조작**을 할 수 있다.

+ 키 입력, 브라우저 닫기, 데이터 제출, 텍스트 복사 등도 **사건의 일부**

아니면 특정 메서드를 호출하여 프로그래밍 적으로 만들어낼 수도 있다.

DOM 요소는 Event를 1. **받고** 2. **처리**

addEventListener()라는 Event 처리기를 **부착**해서 처리

EventTarget.addEventListener(type, listener)

대상                              이벤트타입  할 일(콜백함수)

대표 이벤트 type = input, click, submit, …

[https://developer.mozilla.org/ko/docs/Web/Events](https://developer.mozilla.org/ko/docs/Web/Events)

event가 발생하면 수신할 funtion 객체

### addEventListener

**버튼 클릭**

```jsx
<body>
  <button id="btn">버튼</button>
  <p id="counter">0</p>
  
  <script>
    const btnTag = document.querySelector('#btn')
    let cnt = 0

    btnTag.addEventListener('click', function (event) {
      const pTag = document.querySelector('#counter')

      cnt += 1

      pTag.innerText = cnt
    })
  </script>
</body>
```

**키보드 입력**

```jsx
<body>
  <input type="text" id="text-input">
  <p></p>
  <script>
    const inputTag = document.querySelector('input')

    inputTag.addEventListener('input', function (event) {
      // event.target은 event가 발생된 요소를 가르킨다
      // console.log(event.target)
      // console.log(event.target.value)

      const pTag = document.querySelector('p')
      pTag.innerText = event.target.value
    })
  </script>
</body>
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/999093c8-b4fe-44fe-9046-7a5780f9caf0/Untitled.png)

여러개 해보기

```jsx
<head>
	<style>
    .blue {
      color: blue;
    }
  </style>
</head>
<body>
  <h1></h1>
  <button id="btn">클릭</button>
  <input type="text">

  <script>
    const btn = document.querySelector('#btn')
    btn.addEventListener('click', function (event) {
      document.querySelector('h1').classList.toggle('blue')
    })
    const inputTag = document.querySelector('input')
    inputTag.addEventListener('input', function (event) {
      document.querySelector('h1').innerText = event.target.value
    })
  </script>
</body>
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/52b6a9ff-a465-424d-89e4-3cd93f21ba5e/Untitled.png)

event.preventDefault()

현재 Event의 기본 동작 중단 → HTML 요소의 작동하지 않게하는 거임

→ 예를 들어 복사하는 ‘copy’ event 막기

```jsx
<body>
  <div>
    <h1>정말 중요한 내용</h1>
  </div>
  
  <script>
    const h1Tag = document.querySelector('h1')
    h1Tag.addEventListener('copy', function (event) {
      event.preventDefault()
      alert('Do not copy.')
    })
  </script>
</body>
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/018bbb11-e699-458b-af4d-b8cc177e105d/Untitled.png)

```jsx
<head>
	<style>
    /* 스타일은 수정하지 않습니다. */
    .ball {
      width: 10rem;
      height: 10rem;
      margin: .5rem;
      border-radius: 50%;
      text-align: center;
      line-height: 10rem;
      font-size: xx-large;
      font-weight: bold;
      color: white;
    }
    .ball-container {
      display: flex;
    }
  </style>
</head>
<body>
  <h1>로또 추천 번호</h1>
  <button id="lotto-btn">행운 번호 받기</button>
  <div id="result"></div>

  <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
  <script>
    const lottoBtn = document.querySelector('#lotto-btn')
    lottoBtn.addEventListener('click', function (event) {

      const ballContainer = document.createElement('div')
      ballContainer.classList.add('ball-container')

      const numbers = _.sampleSize(_.range(1, 46), 6)
      numbers.forEach((number) => {
        const ball = document.createElement('div')
        ball.innerText = number
        ball.classList.add('ball')
        ball.style.background = 'crimson'
        ballContainer.appendChild(ball)
      })
      document.querySelector('#result').appendChild(ballContainer)
    })
    
  </script>
</body>
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3e0df597-05bd-4f72-aa04-3e3e17f37dfc/Untitled.png)

lodash

모듈, 성능, 추가 기능 제공 JS 유틸리티 라이브러리

[https://loash.com/](https://loash.com/)

**콜백 함수 외부에서 만들어서 호출하기**

```jsx
<body>
  <form action="#">
    <input type="text" class="inputData">
    <input type="submit" value="Add">
  </form>
  <ul></ul>

  <script>
    const formTag = document.querySelector('form')
		const addTodo = function (event) {
      event.preventDefault()
      
      const inputTag = document.querySelector('.inputData')
      const data = inputTag.value
      
      if (data.trim()) {
        const liTag = document.createElement('li')
        liTag.innerText = data
  
        const ulTag = document.querySelector('ul')
        ulTag.appendChild(liTag)
      } else {
        alert('내용을 입력하세요!')
      }

      // event.target.reset()
      inputTag.value = ""
    }
    formTag.addEventListener('submit', addTodo)
  </script>
</body>
```

### this

object를 가르키는 keyword (java, js에선 this, python self = 인스턴스 자기 자신을 가리킴)

JS 함수는 호출시 this를 암묵적으로 전달 받는다.

함수 선언시 this에 객체가 결정되는 것 X → **함수 호출시 어떻게 호출되었는지에 따라 동적으로 결정**

같은 함수라도 this가 가르키는게 달라질 수 있다???

1. 전역 문맥 this
    
    전역 객체인 window
    
2. 함수 문맥 this
    1. 단순 호출
        
        전역 객체를 가리킴
        
    2. method (객체의 메서드)
        
        해당 객체가 this가 된다. 이렇게 하면 this를 통해 객체의 key로 접근할 수 있음
        
        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b9d4be60-ca79-44e5-bf93-83aad69f7b42/Untitled.png)
        
    3. nested (function 키워드)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bb6152e8-53c0-4fba-b3a2-c8f0ef9cc907/Untitled.png)

첫 번째 this → method 자기 자신을 가리킴

두 번째 this → myObj를 가리킴

세 번째 this → window

→ 왜 와이 여기서 this는 콜백 함수가 직접 this를 호출함 → 단순호출 = a

**화살표 함수**는 세 번째 this의 문제를 해결하기 위해 나왓음

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/524f738f-2a21-4da4-a14a-31a5f2ca3e75/Untitled.png)

바인딩 되는 범위가 다르다. → 한 단계 상위 scope를 바인딩해줌

여기서는 myObj 안을 바인딩해준다

lexcial scope → 어디서 호출이 아닌 어디에 선언하였는지에 따라 결정됨

그래서 함수 내의 함수는 보통 화살표 함수로 권장됨

근데 addEventListener의 경우 화살표 함수에서 화살표 함수를 통해 선언하면 한단계 상위 scope인 window를 가리키기 때문에 function 키워드로 사용

일반 함수로 하면 this가 event.target을 가리킨다.

this가 호출되는 순간에 결정되는 것

장점

1. 함수를 하나만 만들어서 여러 객체에서 재사용할 수 있다.

단점

1. 실수로 이어질 수 있다.

### 배치하기

parent.appendChild(child)

만약 괄호 안의 node가 기존의 node라면 기존 node를 이동 시킴

1. parent.prepend(child)
    
    prepend → 부모 요소 가장 앞쪽에 자식 요소로 추가
    
2. parent.append(child)
    
    append → 부모 요소 가장 뒤쪽에 자식 요소로 추가
    
3. brother.before(me)
    
    before → 형제 요소의 바로 뒤에 형제 요소로 추가
    
4. brother.after(me)
    
    after → 형제 요소의 바로 앞에 형제 요소로 추가
    

### css 선택자 복습

parent > childtag:nth-child(n)