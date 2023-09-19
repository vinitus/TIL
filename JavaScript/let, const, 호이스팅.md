let과 const의 작동방식과 var과는 무엇이 다른가를 살펴본다.

## let에 대한 에러 메시지는 사실 다르다

```javascript
try {
  console.log(a);
  let a = 'a';
} catch (e) {
  console.log(e);
}

try {
  console.log(b);
} catch (e) {
  console.log(e);
}

let c = 1;
console.log(c);

try {
  console.log(c);
  const c = 'c';
} catch (e) {
  console.log(e);
}
```

![image](https://github.com/vinitus/interview/assets/97886013/81317ea2-611d-48cd-805f-9c2280bd525d)

에러의 타입을 보면 좀 다르다.

1. ReferenceError: Cannot access 'a' before initialization

   에러 코드를 보면, 'a'를 초기화하기 전에는 접근할 수 없다는 참조에러이다.

2. ReferenceError: b is not defined

   'b' 자체가 정의되지 않았다.

3. ReferenceError: Cannot access 'c' before initialization

   c를 이미 이전에 초기화하고 선언하였으나, `const c`라는 구문 때문에 에러가 발생한 모습

이는 `TDZ`라는 것과 관련이 있다.

# let, const의 호이스팅

3번의 경우, try라는 실행 컨텍스트 환경에서 const c를 통해 c라는 블록 스코프에서의 변수 선언을 이미 인식하였기에, 외부 스코프의 c를 참조하지 않는 것이다.

결국 호이스팅이 일어난다는 것이다. 하지만, var과는 다르게 에러를 나타내고, `undefined`를 출력하지도 않았고, `is not defined` 에러가 나타나지도 않았다.

이는 TDZ와 연관이 있다.

## TDZ

TDZ(Temporal Dead Zone)라는 것은 선언한 변수가 호이스팅되어 선언 위치까지만 접근할 수 없는 상태를 가지는 것이다.

결국 호이스팅은 일어나지만, **해당 변수는 이제 선언되고 호이스팅 되었으나 초기화는 일어나지 않아서 접근할 수 없는 상태**인 것이다.

V8 엔진의 깃허브에서 이런 것을 찾을 수 있다.

[https://github.com/v8/v8/blob/219b0dc7379363b1a8df7e144c78ca5dc09a8d69/src/ast/variables.h#L308](https://github.com/v8/v8/blob/219b0dc7379363b1a8df7e144c78ca5dc09a8d69/src/ast/variables.h#L308)

```c++
static InitializationFlag DefaultInitializationFlag(VariableMode mode) {
  DCHECK(IsDeclaredVariableMode(mode));  // 조건 검사
  return mode == VariableMode::kVar ? kCreatedInitialized  // Variable의 결과가 mode와 같으면? 에 대한 삼항연산
                                    : kNeedsInitialization;
}
```

그리고 이 kVar은 다음과 같다.

[https://github.com/v8/v8/blob/219b0dc7379363b1a8df7e144c78ca5dc09a8d69/src/common/globals.h#L1705C1-L1706C1](https://github.com/v8/v8/blob/219b0dc7379363b1a8df7e144c78ca5dc09a8d69/src/common/globals.h#L1705C1-L1706C1)

```c++
enum class VariableMode : uint8_t {
  kLet,  // declared via 'let' declarations (first lexical)

  kConst,  // declared via 'const' declarations (last lexical)

  kVar,  // declared via 'var', and 'function' declarations
  ...
}
```

kVar은 var와 function를 통해서 선언돼었는가에 대한 것이다.

그래서 kVar이 아니면 `kNeedsInitialization`라는 것을 리턴하는데, 변수명에 따르면 **초기화가 필요하다**라는 말이다.

즉, 호이스팅은 일어나고, 초기화는 필요한 상태로 두는 것이 바로 let과 const를 통한 선언식인 것이다.

### reference

[https://evan-moon.github.io/2019/06/18/javascript-let-const/](https://evan-moon.github.io/2019/06/18/javascript-let-const/)
[https://github.com/v8/v8/blob/219b0dc7379363b1a8df7e144c78ca5dc09a8d69](https://github.com/v8/v8/blob/219b0dc7379363b1a8df7e144c78ca5dc09a8d69)
