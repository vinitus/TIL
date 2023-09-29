자바스크립트의 모든 개체는 속성과 메서드를 상속하는 프로토타입이 있다. 객체의 속성이나 메서드에 접근했을 때, 해당 스코프에 값을 확인하고, 없다면 프로토타입 체인을 타고 올라가서 찾거나 끝에 도달할 때까지 프로토타입의 속성이나 메서드를 조회한다.

모든 객체들이 메소드와 속성들을 상속 받기 위한 템플릿인 프로토타입 객체를 가진다. 이 객체들은 상위 프로토타입 객체들로 부터 상속받을 수 있는데, 이렇게 연결되어 참조가능한 형태를 프로토타입 체인이라고 부른다.

쉽게 말해서 Array.map같은 메서드들이 있다.

```javascript
const arr = [1, 2, 3];

const newArr = arr.map((item) => item + 1);
```

우리가 콘솔창에서 `arr.`을 하면 박스에 다음에 이어질 수 있는 속성과 메서드들이 나와있다.

![image](https://github.com/vinitus/TIL/assets/97886013/b6673a36-1f5e-4898-a61b-ef0f98e1a4bb)

이건 new라는 생산자를 통해 Array라는 클래스를 만든 것에서도 해도 동일하다.

![image](https://github.com/vinitus/TIL/assets/97886013/4db90e8c-958f-476d-a565-a7f5df4b8424)

그리고 이건 Array.prototype과 동일하다.

![image](https://github.com/vinitus/TIL/assets/97886013/47644795-17ac-4648-89a5-f3c93e5e65de)

즉 `const arr = [1,2,3]`을 통해서 만든 배열은, `const arr = new Array(1,2,3)`과 동일하고, 둘 다 사용할 수 있는 메서드는 Array.prototype과 같다.

이렇듯, 상속되는 속성과 메소드들은 각 객체 자체가 아니라 객체의 생성자의 prototype이라는 속성에 정의되어 있다.

prototype은 생성자인 constructor를 가진 함수나 클래스에 대해서만 존재한다.

```javascript
const arrowFn = (n) => {
  this.n = n;
};

function FunctionFn(n) {
  this.n = n;
}

class ClassFn {
  constructor(n) {
    this.n = n;
  }
}
```

이 중에서, `new arrowFn(10)`을 해보면 에러가 난다.

`Uncaught TypeError: arrowFn is not a constructor`

화살표 함수는 생성자가 아니라는 뜻

아무튼, 여기서 이제 `FunctionFn.prototype`은 존재하고, `ClassFn.prototype`도 존재한다.

즉, 생성자를 가진 어떤 함수나 클래스에 대해서 prototype이 존재한다.

그리고 해당 생성자로 만들어진 인스턴스에서 `__proto__`를 통해서 접근하면, 해당 prototype과 일치한다.

---

여기까지 정리

1. JavaScript는 프로토타입 기반 언어로써, 모든 객체들은 메서드와 속성을 상속받기 위한 프로토타입 객체를 가진다.
2. 프로토타입에 있는 것들은 인스턴스가 만들어지면서 상속되어 사용가능하다.
3. 인스턴스에서는 `__proto__`를 통해서, 생성자의 prototype에 정의된 속성과 메서드를 사용할 수 있다.
4. 화살표 함수는 생성자가 아니며, `function` 키워드를 사용한 함수나 class는 생성자로써 활용될 수 있다.

---

상속

```javascript
const arr = [1, 2, 3];
```

이런 Array instance가 있다. 우리는 arr에 .map이나 .forEach같은 메서드가 있는 것도 알고 있고, .length 같은 값이 있는 것도 알고 있다.

이는 Array.prototype에 있는 것이라는 것도 알고 있고, `arr.__proto__`로 접근 가능하다는 것도 알고 있다.

여기서 arr.hi라는 메서드를 만들어서, HI!를 출력하고 싶다.

```javascript
arr.hi = () => console.log('HI!');
```

이런 것들이 가능한 이유는, JavaScript의 배열도 객체이기 때문이다. 그 증거로, `.valueOf()`가 가능하다는 점이다.

```javascript
arr.valueof();
```

이는 Array.prototype.valueOf가 가능하기 때문이고, Object.prototype.valueOf가 있다.

```javascript
Array.prototype.__proto__ === Object.prototype; // true
Array instanceof Object;
```

Array.prototype은 Object.prototype을 상속한 것이다.

즉, `arr.valueOf()`를 실행하면, 프로토타입 체이닝을 통해 arr -> Array -> Object로 찾아가서 Object.prototype.valueof()를 실행하는 것이다.

---

상속 활용

배열의 요소 개수가 홀수인지 알고 싶다.

```javascript
const arr = [1, 2, 3];

console.log(arr.length % 2 === 1 ? true : false);
```

확인시의 배열의 요소가 홀수라면, 끝에 0을 추가해야하고, 다음 push시에 이 0을 빼고, 추가해야한다.

```javascript
const arr = [1, 2, 3];
let flag = false;

if (arr.length % 2 === 1) {
  arr.push(0);
  flag = true;
}

function pushEvent(n) {
  flag && arr.pop();
  arr.push(n);
}

pushEvent(10);
```

만약 여러개의 배열에서 해당 로직을 수행해야한다면, 함수로 만들어서 할 수도 있겠지만, 모든 배열마다 실행해야하니 귀찮다.

이를 prototype을 통해서 쉽게 해결할 수 있다.

```javascript
const arr = [1, 2, 3];

Array.prototype.odd = function () {
  if (this.length % 2 === 1) {
    this.flag = true;
    this.push(0);
    return false;
  }
  return true;
};

Array.prototype.newPush = function (...args) {
  if (this.flag) {
    this.pop();
    this.flag = false;
  }
  this.push(...args);
};
```
