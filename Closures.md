[https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures](https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures)

### ? 어휘적 환경이란,

함수가 실행될 때, 함수에서 사용되는 변수를 캡처하여 참조할 수 있는 **환경**을 말한다.  
"캡처"라는 것은 그 당시의 변수를 참조 가능한 것 + 그리고 언제든지 그 변수를 참조 가능하기에 캡처라고 하는 것이다.

즉, 내가 실행 중인 함수에서 선언되지 않은 변수더라도, 함수는 변수를 참조할 수 있다는 것이다.

```js
const sayHi = () => {
  console.log(hi);
};

const hi = 'Hello!';
sayHi();

// result
// Hello!
```

이를 이해하기 위해선, 언어에서 흔히 쓰이는 "스코프"라는 개념을 알아야 한다.

스코프란, 변수를 참조할 수 있는 유효한 범위라고 생각할 수 있다.  
ES6 이전, var로 변수를 선언할 때는 함수스코프와 전역스코프만 존재하였다. 하지만 const와 let이 도입되며 시간상의 사각지대가 만들어져서 호이스팅 현상이 일어나지 않게 되었다. 때문에 블록 스코프가 존재하게 되었다.

블록스코프와 전역스코프는 [이 글에서](https://velog.io/@fromzoo/%ED%95%A8%EC%88%98%EC%8A%A4%EC%BD%94%ED%94%84-vs-%EB%B8%94%EB%A1%9D%EC%8A%A4%EC%BD%94%ED%94%84) 잘 설명해주셨다.  
요약하면, 함수 스코프 이외에도 중괄호가 { } 쓰이는 경우에도 스코프가 적용된다는 것이다. 그래서 for문이 가능한 것이다.

# 클로저

**  
클로저**는 함수와 함수가 선언된 어휘적 환경의 조합이다.  
왜 함수와 어휘적 환경의 조합일까? 를 생각해 본다면, 어휘적 환경이 캡처된 시점에서 한 함수가 그 함수의 스코프 밖의 **변수를 참조하는 현상**을 말한다. 그리고 그렇게 외부를 참조하는 함수를 **클로저 함수**라고 말한다.

렉시컬 스코프(어휘적 환경)는 **환경**, 클로저는 그 **현상**임을 기억해야한다. << 내가 헷갈렸음...  
클로저는 다시 말해서 어휘적 환경이 생성되고 함수가 실행되는 것이다.

클로저가 형성되는 방법은 두가지가 있다.  
1\. **실행되는 함수**의 스코프 밖의 변수를 참조하는 경우가 있고.  
2\. 고차함수를 통해 함수가 설정되는 순간, 함수 스코프 밖을 참조하는 경우가 있다.

[고차함수(mdn 공식문서)](https://developer.mozilla.org/ko/docs/Glossary/First-class_Function)  
고차함수는 다른 함수를 return하여 함수로 할당해주는 것이다. JS를 변수처럼 취급하기 때문이다.

```js
const funcA = () => {
  a -= 1;
  const funcB = () => {
    console.log(a);
  };
  funcB();
};

let a = 10;
funcA(); // 9
funcA(); // 8
console.log(a); // 8
```

funcA에서든 funcB에서든 a는 선언되지도, 인자로 받지도 않았으나 **전역 스코프에서 참조**할 수 있게 되어 클로저 현상이 일어난다.

여기서 funcB를 클로저 함수라고 한다.  
a는 전역으로 선언되었기 때문이다.

그 다음, 고차함수의 예시이다.

```js
const makeFunctionFunction = (a) => {
  console.log(a);
  const willBeReturnedFunction = () => {
    a -= 1;
    console.log(a);
  };
  return willBeReturnedFunction;
};

const madeFunctionA = makeFunctionFunction(10);
const madeFunctionB = makeFunctionFunction(100);
madeFunctionA();
madeFunctionA();
madeFunctionB();

// 10
// 100
// 9
// 8
// 99
```

함수를 만드는 함수인 makeFunctionFunction에 인자 a를 주고 실행하면 madeFunctionA에 willBeReturnedFunction이 할당된다. 이 과정에서, **함수 밖의 인자 a를 참조**하게 되어 클로저 현상이 발생하게 되고 madeFunction에 할당되게 된다. madeFunction들을 **클로저 함수**라고 한다.

### 뭔지는 알겠는데, 어디에 쓰일까?

#### 1\. 생성자

mdn의 예제이다.

```js
function makeSizer(size) {
  return function () {
    document.body.style.fontSize = size + 'px';
  };
}

const size12 = makeSizer(12);
const size14 = makeSizer(14);
const size16 = makeSizer(16);
```

그리고 생성된 size 함수들을 버튼의 이벤트 리스너로 추가하여 변경할 수 있게 하였다. 나는 좀 실용적인 예시라고 생각한다.

이를 직접 구현하려면,

```js
const size12 = () => {
  document.body.style.fontSize = '12px';
};
const size14 = () => {
  document.body.style.fontSize = '14px';
};
const size16 = () => {
  document.body.style.fontSize = '16px';
};
```

이렇게 해야한다. 지금은 3개지만, 이런 것이 여러개라면 ...

근데 솔직히 잘 안 와닿을 수도 있다. 일단 내가 그렇다. 이런걸 얼마나 쓸까?  
좀 더 생각해보자면, ajax 요청에 대해서 생각해볼 수 있겠다.

```js
const axiosCreate = (url, data) => {
  const newAxios = axios(url, {
    data
  })
  ...
  return newAxios
}
```

이렇게 **생성자**로써 사용할 수 있을 듯 싶다. 아마 프로젝트 진행하기 전에 클로저를 좀 더 알아보고 어떻게 사용할지 생각했다면, 더 좋았을 듯 싶어서 아쉽다..

#### 2\. 접근의 제한

[프라이빗으로써의 클로저 - mdn](https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures#%ED%81%B4%EB%A1%9C%EC%A0%80%EB%A5%BC_%EC%9D%B4%EC%9A%A9%ED%95%B4%EC%84%9C_%ED%94%84%EB%9D%BC%EC%9D%B4%EB%B9%97_%EB%A9%94%EC%86%8C%EB%93%9C_private_method_%ED%9D%89%EB%82%B4%EB%82%B4%EA%B8%B0), 여기서 보면,

```
프라이빗 메소드는 코드에 제한적인 접근만을 허용한다는 점 뿐만 아니라
전역 네임 스페이스를 관리하는 강력한 방법을 제공하여
불필요한 메소드가 공용 인터페이스를 혼란스럽게 만들지 않도록 한다.
```

라고 하고 있다. 좀 중요한 부분인 것 같은데, 지금 당장 이 페이지에서 f12를 눌러서 "콘솔"에서 보면 일반적으로 사용 가능한 메서드밖에 사용할 수 없고, tistory를 이루는 어떤 전역 변수도 사용할 수 없다.

github는 순수 JS로 만들어졌다. 하지만 github 역시도 아무것도 접근할 수 없다.

만약 본인이 react나 vue를 사용하였고, 각 프레임워크나 라이브러리에서 권장하는 사항을 지켰다면, 우리는 우리가 만든 어떤 변수나 메서드에도 접근할 수 없다.

클로저를 활용하여 **프라이빗 메서드처럼** 사용할 수 있다.  
프라이빗 메서드는 쉽게 말해, 클래스 내부에서만 접근 가능한 함수들을 말한다.  
JS에서도 클래스는 지원하지만, 함수나 객체에서 프라이빗 메서드처럼 활용할 수 있는 방법으로 사용할 수 있다.

그렇기에 우리는 **콘솔창을 통해 전역에서 접근 가능한 변수나 메서드를 찾을 수 없는 것**이다.

```js
function makePerson(name, age) {
  let myName = name;
  let myAge = age;

  function privateMethod() {
    return `나의 이름은 ${myName}이고, 나이는 ${myAge}입니다.`;
  }

  return {
    getName: function () {
      return myName;
    },
    getAge: function () {
      return myAge;
    },
    introduce: function () {
      return privateMethod();
    },
  };
}

const person = makePerson('자바스크립트', 28);
console.log(person.getName()); // "자바스크립트"
console.log(person.getAge()); // 28
console.log(person.introduce()); // "나의 이름은 자바스크립트이고, 나이는 28입니다."
console.log(person.privateMethod()); // 에러남
console.log(getName()); // 얘도 에러남
```

이 밖에도 axios 요청에 대해 고차함수로 axios 생성자를 만들 수도 있다.  
혹은 console.log도 가능하다.

```js
const createConsoleLog = (value) => {
  return function () {
    console.log(value);
  };
};

const printA = createConsoleLog('first');
const printB = createConsoleLog('second');

printA(); // first
printB(); // second
```

#### **reference**

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures](https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures)

[https://developer.mozilla.org/ko/docs/Glossary/First-class_Function](https://developer.mozilla.org/ko/docs/Glossary/First-class_Function)
