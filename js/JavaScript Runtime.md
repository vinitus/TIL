JS는 그 자체는 **싱글 스레드 언어**이다.

흔히들 검색하면 나오는 그런 그림을 생각하지 않고 JS 엔진 그 자체만 본다면 JS에는 stack과 heap 메모리만 존재한다.

![image](https://github.com/vinitus/leetcode-js-30days-editorial/assets/97886013/41412554-efd3-4b1c-9574-f16190a018eb)

힙은 객체가 할당되는 영역이니까 이벤트 루프와 런타임에선 생각하지 않아도 되어 제외한다면, 스택 하나만 남는다.

스택은 후입선출의 구조를 지녔으며 스택에 쌓이는 것은 호출되는 함수이다.

함수가 실행될 수 영역은 스택 하나이니까 **싱글스레드** 언어라고 하는 것이다.

```
function funcA() {
  console.log("2 step");
  funcB();
  console.log("4 step");
};

function funcB() {
  console.log("3 step");
};

console.log("1 step");
funcA();
```

이 코드는 다음과 같은 콜 스택을 가진다.

![image](https://github.com/vinitus/leetcode-js-30days-editorial/assets/97886013/397499f7-d836-4a2d-a765-c0455ff91c30)

이 모든것에 있어서 anonymous가 있지만, 편의상 적진 않았다.

JS에서 "콜 스택에 쌓인다는 것"은 함수가 실행된다는 것이다. 이 함수가 종료되기 전까지는 스택은 항상 해당 함수로 차있는 상태이다.

클로저를 아는 사람이라면 클로저가 떠오르는 그림일 것이다. 클로저에서 말하는 실행 컨텍스트와 콜 스택, 호출 스택이 바로 런타임에서 말하는 스택과 같다.

중요한 것은 항상 가장 위의 함수가 종료되어야만 그 밑의 함수를 실행할 수 있다는 것이다. 만약 가장 위 함수가 끝나지 않으면 그 밑의 함수는 절대로 실행되지 않는다.

때문에, **JS 그 자체는 싱글 스레드 언어이다.**

#### **reference**

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Event_loop](https://developer.mozilla.org/ko/docs/Web/JavaScript/Event_loop)
