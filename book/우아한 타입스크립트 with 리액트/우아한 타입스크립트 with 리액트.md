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

   두 키워드는 조금 특별하게 작동한다.

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

9. `Object.prototype.toString.call(...)`

   타입을 확인하기 좋은 함수이다.

   ```javascript
   function typeChecker(value) {
     return Object.prototype.toString.call(value);
   }

   console.log(typeChecker('A')); // [object String]
   console.log(typeChecker(123)); // [object Number]
   console.log(typeChecker([])); // [object Array]
   console.log(typeChecker({})); // [object Object]
   console.log(typeChecker(new Map())); // [object Map]
   console.log(typeChecker(() => {})); // [object Function]
   ```

## 3. 고급 타입

1. void 타입

   void는 undefined의 상위 집합 타입이지만 함수의 반환에서만 사용되는 타입이다.

   해당 함수가 어떤 값도 반환하지 않을 경우에 사용된다.

2. never 타입

   never 타입도 함수와 관련하여 많이 사용한다. never은 단어 뜻 그대로 **어떤 값도 반환할 수 없는 함수**에 사용한다.

   - 에러

     에러를 던지면 해당 함수가 중단되는데, 이는 반환하는 개념이 아니다.

     ```typescript
     function raiseError(res: Response): never {
       throw new Error(res.errorMessage);
     }
     ```

   - 무한히 함수가 실행되는 경우

     ```typescript
     function neverEnding(): never {
       while (true) {
         // 어떤 로직
       }
     }
     ```

3. Array 타입

   타입스크립트에서 Array를 다루는 것은 좀 세밀하다. 우선 자바스크립트에서의 배열은 사실 객체에 속하는 타입으로 분류한다. 단지 key는 0부터 증가하는 숫자이며, value는 해당 인덱스 위치에 저장된 값이다.

   그리고 타입스크립트에서 Array로 직접 타입 애노테이션을 하는 것은 제네릭과 함께 사용해야한다.

   보통 타입스크립트에서 배열에 대한 타입을 선언할 때는 `[]` 대괄호로 사용한다.

   ```typescript
   const numArr: number[] = [1, 2, 3];
   const numStr: string[] = ['1', '2', '3'];
   ```

   Array라는 키워드로 타입을 선언하려면 제네릭을 사용해야한다.

   ```typescript
   const numArr: Array<number> = [1, 2, 3];
   const numStr: Array<string> = ['1', '2', '3'];
   ```

   유니온으로 엮으려면

   ```typescript
   const mixedArr1: (number | string)[] = [1, '2', 3];
   const mixedArr2: Array<number | string> = [1, '2', 3];
   // const mixedArr3: number[] | string[] = [1, '2', 3]; // 배민 책의 오타인듯
   ```

4. Tuple 타입

   사실 튜플이라고 명시적으로 선언하진 않지만, Array와 유사한 방식으로 선언한다.

   ```typescript
   let tuple: [number, string] = [1, '1'];

   tuple = [2, '23'];
   tuple = [1, 2]; // Error: '[number, number]' 형식은 '[number, string]' 형식에 할당할 수 없습니다.
   tuple = ['1', '2']; // Error: 'string' 형식은 'number' 형식에 할당할 수 없습니다.ts(2322)
   ```

   기존의 타입스크립트나 자바스크립트의 Array는 **길이와 타입의 순서**에 대한 제한이 없지만, tuple은 이런 길이를 제한한다.

   이를 통해 보다 더 안정적인 코드를 만들 수 있다. 예를 들어 `useState`가 있다.

   useState의 타입은 다음과 같다.

   ```typescript
   function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];
   ```

   리턴이 tuple형태로 되어있다. 리액트 같은 경우에는 잘 만들어진 라이브러리이기에 튜플을 통해서 변수 이름을 바꾸기 쉬운 유연한 구조로 만들 수 있다.

   tuple과 Array를 섞어고 전개연산자를 통해 좀 더 유연하게 사용할 수 있다.

   ```typescript
   const responseState: [number, string, ...string[]] = [404, 'not found', '/blog/post/1', '/blog/post/2', '/blog/post/3'];
   ```

5. optional

   `?`를 통해 해당 속성이 있을 수도, 없을 수도 있음을 의미한다.

   ```typescript
   interface Props {
     modalOpenFlag: boolean;
     showModal: () => void;
     className?: string;
   }

   const oneTwoQuestion1: [number, number, number?] = [1, 2, 3];
   const oneTwoQuestion2: [number, number, number?] = [1, 2];
   ```
