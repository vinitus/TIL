### **iterable 객체**

iterable은 영어 뜻 그대로라면, "반복 가능한", "반복 가능"이라는 뜻이다. **[mdn의 내장 iterable 타입 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Iteration_protocols#%EB%82%B4%EC%9E%A5_iterables)**에 따르면,

> String, Array, TypedArray, Map and Set 는 모두 내장 iterable이다.

iterable 객체는 **iterable protocol**을 따른다.

#### **iterable protocol**

1. 이 타입들은 for ... of 구문을 사용할 수 있다는 특징이 있다.

2. 전개 연산자 `[...]`을 사용할 수 있다.

3. 또한, `[Symbol.iterator]`를 적용할 수 있다는 것이다.

**Symbol.iterator**는 [mdn의 문서에서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol)다음과 같이 설명하고 있다.

> object를 반환하는, arguments 없는 function. iterator protocol 을 따른다.

iterator protocol은 내장 iterable 객체들도 이를 따르고 있다. 이는 무엇일까?

### **iterator protocol**

[mdn의 문서에서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol)

> iterator protocol 은 value( finite 또는 infinite) 들의 sequence 를 만드는 표준 방법을 정의합니다.

**iterator protocol**을 따르는 iterable 객체는 **next()** 메서드를 가지고 있고, 이 next()의 리턴은 다음과 같아야한다.

```js
{
  value: any,    // iterator로 인해 반환될 수 있는 모든 자바스크립트의 값
  done: boolean  // Iterator가 반복 작업을 마쳤을 경우 true, 아니라면 false
}
```

그렇다면, iterator는 무엇일까?

### **iterator**

**next() 메서드를 가진 객체를 iterator**라고 할 수 있겠다. 그럼 Symbol은 왜 붙었냐면, Symbol은 null 같이 원시 데이터 유형들을 말하며, 이들은 Javascript가 아닌 언어들로 구성되어 있는 것들이다.

#### **for ... of와 전개 연산자**

이들은 Symbol.iterator의 next()를 활용하는 것이다. 이들은 iterable한 객체들만 이를 활용할 수 있는 특징(iterable protocol)이 있다. 그 이유는 다음과 같다.

1. Object는 for ... of가 안된다.

```js
const obj = { a: 1, b: 2, c: 3 };

for (let i of obj) {
  console.log(obj);
}
```

![image](https://github.com/vinitus/TIL/assets/97886013/72c30f62-ad65-4d72-a106-0cc6d1aefe94)

2. next() 오버라이딩

```js
const a = [1, 2, 3, 4, 5];

a[Symbol.iterator] = function () {
  const len = this.length;
  let index = 0;
  return {
    next() {
      if (index < len) {
        index += 1;
        return { done: false, value: 1 };
      } else {
        return { done: true, value: undefined };
      }
    },
  };
};

console.log(a);
console.log([...a]);
```

![image](https://github.com/vinitus/TIL/assets/97886013/bace9204-ad11-4f3f-ac1a-8d35872dcd1e)

즉, Array 타입 자체에는 Symbol.iterator가 이미 존재한다.

![image](https://github.com/vinitus/TIL/assets/97886013/aee0f27e-5e4b-4e07-90db-bdf6111617e9)

#### **그래서 왜 써야하는가??**

1. 나의 예시처럼, 기존의 순회 방식을 변경할 수 있다.

2. 시작과 끝을 지정할 수 있다.

3. 지연 평가를 할 수 있다.

---

좀 더 깊게 들어가보면...

### **iterator과 iterable의 차이**

iterator는 iterator 프로토콜을 따르는 객체이다. 즉, 어떤 객체가 next 메서드를 가지고 있다면, 이는 iterator인 것이다.

```js
let iterator = {
  idx: 1,
  end: 5,
  next() {
    if (this.idx <= this.end) {
      return { done: false, value: this.idx++ };
    } else {
      return { done: true };
    }
  },
};

let cur = false;

while (!(cur = iterator.next()).done) {
  console.log(cur.value);
}

// console log
// 1
// 2
// 3
// 4
// 5
```

하지만 이는, iterable은 아니다.

![image](https://github.com/vinitus/TIL/assets/97886013/b9a753ca-c95d-4883-8e8d-1de727c1d4e4)

iterable은 [mdn의 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol)에서 다시 보면..

> iterable 하기 위해서 object는 @@iterator 메소드를 구현해야 합니다. 이것은 object (또는 prototype chain 의 오브젝트 중 하나) 가 Symbol.iterator key 의 속성을 가져야 한다는 것을 의미합니다

next() 말고 **Symbol.iterator**를 가져야한다는 것이다. **iterator는 iterable이 아니다.**  
또한, **iterable자체도 iterator라고 할 수 없다**. 이유는 **next() 메서드를 가지고 있지 않기 때문**이다.

iterable을 iterator로 만들기 위해서는 **Symbol.iterator 메서드를 실행**하여 iterator로 만들 수 있다.

잘 만든 iterable은 for ... of 같은 것을 수행할 수 있다. 이유는 iterator 메서드를 가지고 있기 때문!

즉, iterable과 iterator는 다음과 같은 관계를 지니고 있다.

![image](https://github.com/vinitus/TIL/assets/97886013/8c60ed68-70b5-4963-8aef-13b82187f0f8)

---

### **좀 더 재밌는 예시?**

더 재밌는게 생각나서 예시를 한번 들어보려고 한다.

```js
const obj1 = {
  cal: ({ comments, likes }) => (comments + likes + 10) ** 2,
  arr: [
    { comments: 10, likes: 38 },
    { comments: 293, likes: 839 },
  ],
};

const makeIterable = (obj) => {
  return {
    [Symbol.iterator]() {
      return {
        cal: obj.cal,
        arr: obj.arr,
        idx: 0,
        end: obj.arr.length,
        next: function () {
          if (this.idx < this.end) {
            const calResult = this.cal(this.arr[this.idx]);
            this.idx += 1;
            return {
              done: false,
              value: calResult,
            };
          } else {
            return {
              done: true,
            };
          }
        },
      };
    },
  };
};
const test = makeIterable(obj1);
const testIterable = test[Symbol.iterator]();

console.log([...test]);

console.log(testIterable.next());
console.log(testIterable.next());
console.log(testIterable.next());
```

![image](https://github.com/vinitus/TIL/assets/97886013/9db8ae47-53a4-4ea4-b80a-c9f8398c5a7b)

makeIterable은 Object를 받아서 iterable로 만들 수 있는 함수이다. 이 Object는 다음과 같아야 한다.

```ts
interface ArticleInfo {
  comments: number;
  likes: number;
}

interface Obj1Type {
  cal: (obj: CommentLike) => number;
  arr: ArticleInfo[];
}
```

말로 설명하자면, Obj1의 arr은 Object들이 담겨있는 배열이며, 이 Object는 comments, likes를 키로 가지고 있어야하며 value는 숫자이다.

cal은 이 Object를 받아서 코멘트수 + 좋아요수 + 10을 하고 제곱을 취하는 형태이니까, Object를 인자로 받고, number를 리턴한다.

중요한 것은, 어떠한 새로운 함수를 iterator 안에서 사용할 수 있다는 것이다. 이처럼, 다양하게 활용할 수 있을 듯하다.

---

### reference

[https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EC%9D%B4%ED%84%B0%EB%9F%AC%EB%B8%94-%EC%9D%B4%ED%84%B0%EB%A0%88%EC%9D%B4%ED%84%B0-%F0%9F%92%AF%EC%99%84%EB%B2%BD-%EC%9D%B4%ED%95%B4](https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EC%9D%B4%ED%84%B0%EB%9F%AC%EB%B8%94-%EC%9D%B4%ED%84%B0%EB%A0%88%EC%9D%B4%ED%84%B0-%F0%9F%92%AF%EC%99%84%EB%B2%BD-%EC%9D%B4%ED%95%B4)

[https://ko.javascript.info/iterable](https://ko.javascript.info/iterable)

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Iteration_protocols](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Iteration_protocols)
