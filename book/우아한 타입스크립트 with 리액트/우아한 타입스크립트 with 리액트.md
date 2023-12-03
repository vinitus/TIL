# 우아한 타입스크립트 with 리액트

[우아한 타입스크립트 with 리액트](https://product.kyobobook.co.kr/detail/S000210716282)

이 책을 읽고 정리한 것이며, 모든 내용을 담진 못했고 내가 몰랐거나 헷갈렸던 부분만 정리했음

## 2. 타입

1. 집합으로서의 타입

> 타입은 값이 가질 수 있는 유효한 범위의 집합을 말한다.
> 출처 : 우아한 타입스크립트 with 리액트

2. 강타입과 약타입

- 강타입: 서로 다른 타입끼리 연산을 시도하면 에러가 발생되는 것
- 약타입: 서로 다른 타입끼리 연산을 시도하면 내부적으로 판단하여 특정 값의 타입을 변환하는 것

```javascript
'1' - 1; // 0
```

```python
"1" - 1  # Error
```

자바스크립트에서는 서로 다른 타입간의 연산이 어느정도 작동하지만, 파이썬 같은 강타입 언어는 에러가 난다.

이는 좋을 때도 있지만, 안전성 측면에서는 매우 불리할 수 있다.

3. 타입 애너테이션

값에 대한 타입이나 함수의 인자와 반환 값에 대한 타입을 명시적으로 선언하여 컴파일러에게 직접 알려주는 것

```typescript
let flag: boolean = true;
let num: number = 10;
let str: string = '10';
let numArr: number[] = [];
let strArr: string[] = ['a', 'b', 'c'];
```

4. 구조적 타이핑

타입을 구분하는 것을 구조로서 타입을 구분하는 것

```typescript
interface Foo {
  name: string;
}

interface Honey {
  name: string;
}

let foo: Foo = { name: '곰돌이 푸' };
let honey: Honey = { name: '푸가 가진 꿀' };

foo = honey; // OK
```

두 interface의 이름은 다르지만, 구조적으로 name이라는 속성 하나만 존재하고 둘 다 가지고 있기에 타입에러가 나지 않고 재할당이 되는 것

5. 구조적 서브타이핑

사실 구조적 타이핑과 다른 것을 모르겠음.. 객체가 가지고 있는 속성을 바탕으로 타입을 구부하는 것

6. 덕 타이핑

> "만약 어떤 새가 오리처럼 걷고, 헤엄치며 꽥꽥거리는 소리를 낸다면 나는 그 새를 오리라고 부를 것이다."

자바스크립트 자체가 덕 타이핑을 기반으로 타입을 다루기 때문에, 이 언어의 슈퍼셋 언어인 타입스크립트는 자바스크립트와의 유사성을 지키기 위해 구조적 타이핑을 채택했다.

7. enum과 class

두 키워드는 조금 특별하게 작동하낟.

- enum

  enum은 타입스크립트의 열거형을 지원하는 것이다.
  문제는 자바스크립트에서 이를 사용할 수 있다는 것이다.

  ```typescript
  enum DaysOfWeek {
   MON = "monday"
   TUE = "tuesday"
   WED = "wendesday"
   THU = "thursday"
   FRI = "friday"
   SAT = "saturday"
   SUN = "sunday"
  }

  const today = "MON";
  console.log(DaysOfWeek[today]);
  ```

  이게 작동한다는 것이다. 그런만큼 번들링된 파일에서 남아 있게 된다. 대부분의 타입스크립트 코드는 트랜스파일시 사라지지만, enum은 예외이다. 그대로 자바스크립트 코드로 남게 된다.

- class

  자바스크립트의 class 예약어는 객체를 쉽게 더 만들고 다룰 수 있게 해주는 문법 기능이다. enum과 같이 특이하게도 이 class는 타입스크립트에서의 타입 애너테이션에 활용될 수 있다.

  ```typescript
  class Foo {
    name: string;

    constructor(name: string) {
      this.name = name;
    }
  }

  const foo: Foo = new Foo('곰돌이 푸');
  const sayHello = (fooInstance: Foo) => {
    console.log('Hello, ' + fooInstance.name);
  };
  ```

배민에서는 enum과 유니온 타입에 대해서 어떻게 다루냐면 ... 책에서 더보기

8. 타입스크립트의 typeof

자바스크립트의 typeof는 해당 변수의 타입을 문자열로 반환한다. 타입스크립트의 타입 할당시에도 typeof를 사용할 수 있다.

```typescript
class Foo {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const foo = new Foo('곰돌이 푸');

type T1 = typeof Foo; // typeof Foo
type T1 = typeof foo; // Foo
```

위와 같이 클래스에서 사용시에는 주의해야 한다. 인스턴스에 대한 typeof와 클래스 생성자에 대한 typeof의 결과가 다르다.

`typeof class명`은 `new (args): class`명과 같다. 즉, 생성자 키워드인 `new`가 붙을 수 있는 타입이기 때문이다.
