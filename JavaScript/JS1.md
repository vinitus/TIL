# JavaScript

### 세미콜론

JS는 세미콜론 선택적 사용이 가능하나 ASI에 자동으로 세미콜론이 삽입됨

### 들여쓰기

2칸. if, for, funtion은 중괄호로 감싼다.

```js
if (isClean) {
	console.log('clean!')
}
```

### 코딩 스타일 가이드

Airbnb Style Guide, Google Style Guide, standardJavaScript

### 주석

// or /* */

```js
// 하이
/*
하이
*/
```

### 변수와 식별자

식별자 = 변수를 구분할 수 있는 **변수명.** 문자 $ _로 시작, 대소문자 구분, 스타일 가이드에 따른 소문자로 시작.

1. 카멜 케이스 - 변수, 객체, 함수
    
    iAmVinitus
    
2. 파스킬 케이스 - 클래스 생성자
    
    IAmVinitus
    
3. 대문자 스네이크 케이스 - 상수에만 사용
    
    I_AM_VINITUS
    

### 변수 선언 키워드

전부 다 선언시 값이 초기화 됨

1. let - **블록** 스코프 지역 변수
    
    재할당은 가능하나 재선언은 불가하다.
    
    ```js
    let x = 10
    x = 20
    
    let x = 10
    let x = 20  // 이게 안됨
    ```
    
2. const - **블록** 스코프 상수
    
    재할당, 재선언 불가능
    
    → 반드시 선언과 동시에 초기값 설정해야함
    
3. var - 변수 선언, **함수** 스코프를 가진다
    
    재할당, 재선언 가능
    
    ES6 이전 변수 선언 키워드 → **호이스팅**되는 특성으로 인해 문제 발생 가능
    

### 호이스팅

변수 선언 이전에 참조가 가능해지는 현상

```js
console.log(x)

var x = 100

// JS는 이걸 이렇게 본다
var x  // undefined
console.log(x)

var x = 100
```

= 변수 선언은 코드의 최상단으로 끌어올려지게 되어서 선언시 undefined로 값이 초기화 되버림

선언 = 변수를 생성하는 시점

할당 = 변수에 값을 저장하는 시점

초기화 = 선언된 변수에 처음으로 값을 저장하는 시점

블록 스코프 = if, for, funtion 등의 중괄호 내부를 가르킨다

```js
let x = 1

if (x === 1) {
	let x = 2
	console.log(x) // 2
}
console.log(x)   // 1
```

### 데이터 타입

참조 타입(Reference type) : objects = [’Array’, ‘Function’, ‘…etc’]

원시 타입 (Primitive type) = [’Number’, ‘String’, ‘Boolean’, ‘undefined’, ‘null’, ‘Symbol’]

1. Number - 정수, 실수형 **숫자**

```js
const a = 13
const b = -5
const c = 3.14
const d = 2.998e8 // 2.998 * 10^8
const e = Infinity
const f = -Infinity
const g = NaN // Not a Number
```

**NaN - Not a Number**

숫자로서 읽을 수 없음

결과가 허수인 수학 계산식

피연산자가 NaN

정의할 수 없는 계산식 - 0 * Infinity

문자열 포함하면서 덧셈이 아닌 계산식 - “가” * 3

1. String - 문자열
    
    작은 따옴표, 큰 따옴표 다 가능 ‘, “
    
    사칙연산 중 +만 가능하다~~
    
    ```js
    const one = "vinitus"
    const two = 'github'
    const three = one + two
    ```
    

선언 중 따옴표 안에서 줄바꿈을 하려면 \n을 해야한다.

```js
// const one = "vin
// itus"         // 이게 안됨

const two = "vin \ntus" 이건 됨
```

**Template Literal**

Template Literal(` `)을 사용시 여러 줄에 걸쳐 문자열 정의가 된다.

${변수명}을 통해 문자열 사이에 값을 넣을 수 있다.

```js
const one = `안녕
하세요`

const two = 10
const three = `과자 ${two}개`
```

1. Empty Value
    
    값이 존재하지 않음을 표현하는 값으로 JS에서는 두개가 존재한다 = null, undefined
    
    JS 설계자의 실수임.. 그냥 interchangeable하게 둘 다 사용 권장
    
    3-1. null
    
    변수의 값이 없음을 **의도적으로** 표현할 때 사용한다
    
    3-2. undefined
    
    변수 선언 후 직접 값을 **할당하지 않으면 자동으로** 할당
    
    ```js
    let go = null   // null
    let gogo        // undefiend
    ```
    

### null과 undefined

typeof 연산자를 통해 타입 확인시

```js
typeof null      // "object", 원시 타입임에도 object인 이유는 버그다
typeof undefined // "undefined"
```

1. Boolean
    
    true, false 참과 거짓
    
    조건문, 반복문에서 사용한다! boolean이 아닌 데이터 타입은??
    
    **자동 형변환 규칙**에 따라 true false로 변환
    
    | data type | true | false |
    | --- | --- | --- |
    | undefined | x | always |
    | null | x | always |
    | String | anything else | empty String |
    | Number | anything else | 0, -0, NaN |
    | Object | always | x |

### 연산자

1. 할당 연산자
    
    = += -= *= ++ —
    
2. 비교 연산자
    
    < >
    
    문자열 비교시 유니코드 값 사용하여 표준 사전 순서 기반 비교
    
3. **동등 연산자** 
    
    == . 이 연산자의 특징은 **암묵적 타입 변환**이 이뤄지는 것이다.
    
    ```js
    const a = 1
    const b = '1'
    
    console.log(a == b) // true
    ```
    
4. **일치 연산자**
    
    === . 이는 **타입과 값** 모두 같아야 true
    
    ```js
    const a = 1
    const b = 1
    const c = '1'
    
    console.log(a == b) // true
    console.log(a == c) // false
    ```
    
5. 논리 연산자
    
    and = &&
    
    or = ||
    
    not = !
    
    + 단축 평가를 지원한다!
    
    ```js
    true && false // false
    true || false // true
    !true // false
    
    1 && 0 // 0
    0 && 1 // 0
    4 && 7 // 7
    
    1 || 0 // 1
    0 || 1 // 1
    4 || 7 // 4
    ```
    
6. 삼항 연산자
    
    3개의 피 연산자 사용하여 조건에 따라 값을 반환
    
    전자 참 → 앞의 값 반환, 후자 참 → 뒤의 값 반환
    
    ```js
    true ? 1 : 2 // 1
    false ? 1 : 2 // 2
    
    const result = Math.PI > 4 ? 'yep' : 'nope' // nope
    ```
    

### 조건문

if = 조건 표현식 결과값 boolean을 참, 거짓으로 판단

1. if = 어느 값(case)에 해당하는지 판별
    
    ```js
    const name = 'manager'
    
    if (name === 'admin') {
    	console.log('관리자님 환영합니다.')
    } else if (name === 'manage') {
    	console.log('매너지님 환영합니다.')
    } else {
    	console.log(`${name}님 환영합니다.`)
    }
    ```
    

1. switch = 중괄호 {} 안에 작성되는 것을 블록 스코프라고 함
    
    ```js
    const order = "first"
    
    switch(order) {
    	case 'first': {
    		console.log('first')
    		break
    	}
    	case 'second': {
    		console.log('second')
    		break
    	}
    	default: {
    		console.log('default')
    	}
    }
    ```
    
    break 안적으면 전부 실행돼버림
    

1. if switch
    
    조건이 많다면 switch가 가독성이 좋다.
    
    if, else if 구문은 유지보수가 힘들기도 함
    

### 반복문

1. while
    
    조건문이 참이면 문장 계속 수행
    
    ```js
    let i = 0
    while (i < 6) {
    	console.log(i)
    	i += 1
    }
    // 0\n 1\n 2\n 3\n 4\n 5\n
    ```
    

1. for
    
    특정 조건이 거짓이기 전까지 반복
    
    ```js
    for (let i = 0; i < 6; i++) {
    	console.log(i)
    }
    // 0\n 1\n 2\n 3\n 4\n 5\n
    ```
    

1. for ~ in
    
    **객체순회**시 사용
    
    배열도 순회 가능하나 인덱스 순으로 순회한다는 보장이 없음 → 권장 X
    
    ```js
    const abcde = { a: 'apple', b: 'banana' }
    
    for (const key in abcde) {
    	console.log(key) // a, b
    	console.log(abcde[key]) // apple, banana
    }
    ```
    
2. for ~ of
    
    **반복 가능 객체 순회**시 사용
    
    array, set, string
    
    ```js
    const abcde = ['a', 'b', 'c', 'd', 'e']
    
    for (const alphabet of abcde) {
    	console.log(alphabet) // a,b,c,d,e
    }
    ```
    
3. for + in vs of
    
    in은 속성 이름을 통해 반복하고 = (index)
    
    of는 속성 값을 통해 반복 = 값
    

반복문에서 중요한 것은 일반 for 문 사용시 index를 const로 선언해서는 안된다. 왜 와이 → index++연산이 불가하기 때문

### 함수

참조 타입 중 하나로써 function 타입에 속한다

JS에서 함수 정의법

1. 함수 선언식
    
    일반적인 프로그래밍 언어의 함수 정의 방식
    
    ```js
    function add(a, b) {
      return a + b
    }
    add(1,2) // 3
    ```
    
2. 함수 표현식
    
    ```js
    const sub = function (a, b) {
      return a - b
    }
    sub(1,2) // -13
    ```
    
    표현식에서 함수 이름 명시도 가능하다
    
    ```js
    const sub = function funcSub(a,b) {
    ...
    ```
    
    다만 호출은 불가하고 디버깅 용도로 사용된다.
    
    ⭐ 함수 선언식의 경우 호이스팅이 발생하니깐 표현식을 권장
    

1. 기본 인자
    
    인자 작성시 = 뒤에 선언 가능하다.
    
    ```js
    const greeting = function (name = 'vinitus') {
      return `HI ${name}`
    }
    ```
    
    ```js
    const noArgs = function() {
    	return 0
    }
    noArgs(1,2,3) // 0
    
    const oneArgs = function(a) {
    	return a
    }
    oneArgs(1,2,3) // 1
    
    const threeArgs = function(a,b,c) {
    	return [a,b,c]
    }
    threeArgs() // undefined, undefined, undefined
    threeArgs(1) // [1, undefined, undefined]
    ```
    

1. Spread syntax(…)
    
    전개 구문이라는 것
    
    이를 이용하면 배열, 문자열 같은 반복 가능 객체를 요소로 확장 가능
    
    함수는 인자로 확장 가능
    
    1. 배열과의 사용
        
        ```js
        let parts = ['jeans', 'pants']
        let clothes = ['cap', ...parts, 'shoes']
        // ['cap', 'jeans', 'pants', 'shoes']
        ```
        
    2. 함수와의 사용
        
        ```js
        const rest0pr = function (a,b, ...restArgs) {
        	return [a, b, restArgs]
        }
        
        rest0pr(1, 2, 3, 4, 5) // [1, 2, [3, 4, 5]]
        rest0pr(1,2) // [1, 2, []]
        ```
        
    
    ### 선언식과 표현식
    
    1. 함수 타입
        
        ```js
        const add = function (args) { } // 함수 표현식
        
        function sub(args) { }    // 함수 선언식
        
        console.log(typeof add) // function
        console.log(typeof sub) // function
        ```
        
    
    ### Arrow Function
    
    1. 화살표 함수
        
        함수를 비교적 간결하게 정의할 수 있는 문법
        
        1. function 키워드 생략 가능
        2. 매개변수가 하나면 ( ) 생략 가능
        3. 함수 내용이 한 줄이라면 ‘{ }’ 와 return 생략 가능
        4. 화살표 함수는 익명 함수이다.
        
        ```js
        const arrow1 = function (name) {
        	return `hello, ${name}`
        }
        
        const arrow2 = (name) => { return `hello, ${name}` }
        
        const arrow3 = name => { return `hello, ${name}` }
        
        const arrow4 = name => `hello, ${name}`
        
        // 하지만 인자 주위에는 괄호 사용 권장
        ```
        
        ```js
        let noArgs = () => 'No args'
        
        let returnObject = () => { return { key: 'value'} }
        
        returnObject = () => ({ key: 'value' })
        ```
        
    2. 즉시 실행 함수 (IIFE)
        
        선언과 동시에 실행되는 함수, 함수 선언 끝에 ( argument ) 를 추가
        
        BUT B U T 선언과 동시에 실행 → 다시 호출 안됨
        
        보통 초기화 부분에 많이 사용한다
        
        ```js
        (function(num) { return num ** 3})(2) // 8
        
        (num => num ** 3)(2) // 8
        ```
        
    
    ### Array와 Object
    
    참조 타입에 해당함
    
    객체 안쪽의 속성들은 메모리에 할당 되어있고 해당 객체는 메모리의 시작 주소 값을 가리키는 형태 → push, pop같은 연산들은 배열의 재할당, 재선언에 해당되지 않고 각 객체, 배열의 초기화를 막기 위해 주로 const로 선언한다.
    
    1. .reverse()
        
        배열 요소 순서 반대로 만들어줌. 정렬은 안된다
        
    2. push(a)
        
        마지막에 요소 a 추가
        
    3. pop()
        
        배열 마지막 요소 제거
        
    4. includes(value)
        
        배열에 특정 값 존재 판별 후 true, false 변환
        
    5. indexOf(value)
        
        배열에 특정 값 존재 여부 확인 후 첫 번째로 찾은 요소의 인덱스 반환 → 없으면 -1
        
    6. .join([separator])
        
        배열의 모든 요소를 연결하여 반환
        
        separator(구분자)는 선택적으로 지정가능, 생략 시 쉼표 기본값으로 사용
        
        ```js
        const a = [1,2,3,4,5]
        
        console.log(a.join()) // 1,2,3,4,5
        console.log(a.join(' ') // 1 2 3 4 5 
        ```
        

### 배열 메서드 심화..

1. **callback 함수**
    
    ```js
    array.forEach((element, index, array) => {
    	// functions do something in here
    })
    
    // 인자는 요소, 인덱스, 배열 자체
    
    const colors = ['red', 'blue', 'green']
    
    printFunc = function (color, idx) {
    	console.log(color, idx)
    }
    
    colors.forEach(printFunc)
    
    // red 0
    // blue 1
    // green 2
    
    colors.forEach(function (color) {
    	console.log(color)
    })
    
    // red
    // blue
    // green
    
    colors.forEach((color, idx, arr) => console.log(color, idx, arr))
    
    // red 0 ['red', 'blue', 'green']
    // blue 1 ['red', 'blue', 'green']
    // green 2 ['red', 'blue', 'green']
    ```
    
    ```js
    array.map((element, index, array) => {
    	// 요소, 인덱스, 배열 자체
    })
    // 콜백 함수의 반환 값을 요소로 하는 새로운 배열 반환
    
    const numbers = [1, 2, 3]
    
    const doubleFunc = function (number) {
    	return number * 2
    }
    
    const doubleNumbers = numbers.map(doubleFunc)
    console.log(doubleNumbers) // [2, 4, 6]
    
    const doubleNumbers = numbers.map(function (number, idx) {
    	return [number * 2, idx]
    })
    console.log(doubleNumbers)
    // [[2, 0], [4, 1], [6, 2]]
    ```
    
    이외에도 filter도 비슷한 방식
    
    find도 비슷하지만 filter는 배열을 반환하지만 find는 만족하는 첫번째 요소 반환 → 없으면 undefined
    
    some은 요소 중 **하나라도** 통과하면 true 못하면 false, 빈 배열이 parameter로 들어가면 false
    
    every는 some과 다르게 **모든** 요소가 통과
    
    ```js
    array.reduce((acc, element, index, array) => {
    	// do something
    }, initialValue)
    // 배열을 하나의 값으로 계싼하는 동작이 필요할 때 사용
    // 인자로 주어지는 함수를 배열의 각 요소에 대해 한번씩 실행해서 하나의 결과 값을 반환
    
    const tests = [90, 90, 80, 77]
    
    const sum1 = tests.reduce(function (total, x) {
    	return total + x
    }, 0)
    // 337
    
    // 0은 생략 가능하다.
    const sum2 = tests.reduce((total, x) => total + x)
    // 337
    
    const sum3 = tests.reduce((total, x) => total + x, 63)
    // 400
    ```
    
2. 배열 순회 비교
    
    일반적 for → 모든 브라우저 지원, index 활용하여 배열 요소 접근, break, continue 사용 가능
    
    for … of ⇒ 일부오래된 브라우저에서 지원 X, 인덱스 없이 배열 요소에 바로 접근, break, continue 사용 가능
    
    forEach ⇒ 대부분 브라우저에서 사용 가능, break,continue 못씀…
    
    forEach === Airbnb Style Guide 권장
    

### 객체

객체는 속성의 집합이며 key-value 쌍으로 표현

ket는 문자열 타입만 가능, 띄어쓰기가 있다면 ‘ ‘로 묶기

value는 모든 타입(함수도 포함됨)

접근은 . 혹은 []

key 이름에 띄어쓰기가 있다면 대괄호만 가능하다

### 객체 관련 문법

1. 속성명 축약
    
    ```js
    const abc = ['a', 'b', 'c']
    const onetwothree = [1,2,3]
    const abconetwothree = {
    	abc,
    	onetwothree,
    }
    console.log(abconetwothree)
    /*
    {
    	abc : ['a', 'b', 'c'],
    	onetwothree : [1, 2, 3]
    }
    */
    ```
    

1. 메서드명 축약
    
    function 키워드 생략 가능!
    

1. 계산된 속성
    
    객체 정의시 key 이름을 표현식을 이용하여 동적 생성 가능
    

```js
const wow = "wowowowow"
const ToT = "ToToToT"
const obj = {
	[wow]: ToT,
}
console.log(obj)
// {wowowowow: 'ToToToT'}
```

1. 구조 분해 할당
    
    ```js
    const obj2 = {
    	name: "vinitus"
    }
    
    // ES5
    const name = obj2.name
    
    // ES6
    const { name } = obj2
    ```
    

1. Spread syntax (…)
    
    ```js
    const btoc = {b: 'b', c: 'c'}
    const atod = {a: 'a', ...btoc, d: 'd'}
    
    console.log(atod)
    // {a: 'a', b: 'b', c: 'c', d: 'd'}
    ```
    

### JSON = JavaScript Object Notation

Key-Value 형태 표기법 Object와 유사하나 BUT B U T Object는 그 자체로 타입, JSON은 Object 형식의 문자열

→ 변환 작업이 필요함 ..

JSON 으로 만들기 = JavaScriptON.stringify(Object)

JSON에서 Object로 만들기 = JavaScriptON.parse(JSON)