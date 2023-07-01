타입스크립트를 배우면서 리액트에 적용해가며 프로젝트를 진행하고 있는데, 구글링하다보니까 Object 타입을 선언하는데 있어서 두 개가 모두 나오길래 뭐가 다른지 궁금해서 정리해두려고 한다.

#### **예시**

```ts
type TypeA = {
  name: string;
  age: number;
};

interface InterfaceA {
  name: string;
  age: number;
}
```

type와 interface는 동일하게 작동하는 것처럼 보인다. 하지만 다른 점은 **interface는 Object 객체에만 적용된다는 것**이다.

그렇다는 것은 interface는 적어도, 특별한 기능이 있어야한다고 생각한다.

---

## **둘의 차이점**

고맙게도 공식문서에 어느정도 정리되어 있다.

[타입스크립트 공식문서 #interface](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces)

### **interface는 선언적으로 새로운 타입을 확장할 수 있다.**

#### **예시**

```ts
interface Person {
  name: string;
  age: number;
}

const person1 = {
  name: 'Ipsum',
  age: 27,
};

interface Person {
  job: string;
}

const person2 = {
  name: 'lorem',
  age: 27,
  job: 'developer',
};
```

하지만, type은 할 수 없다.

#### **type은 안된다**

```ts
type Person = {
  name: string;
  age: number;
};

// Error
type Person = {
  job: string;
};
```

---

### **interface의 extends와 type의 &을 통한 머지**

둘은 또 속성을 merge하는 방식이 다르다.

```ts
interface Person {
  name: string;
  age: number;
}

interface Developer extends Person {
  fe: boolean;
}
```

class를 사용할 때처럼 머지를 하려면 extends를 사용해야한다.

```ts
type Person = {
  name: string;
  age: number;
}

interface Developer = Person & {
  fe: boolean;
}
```

type은 & 연산을 통해 머지할 수 있다.

---

사실 이게 끝이진 않을 것 같아서 더 찾아봤다.

[https://yceffort.kr/2021/03/typescript-interface-vs-type](https://yceffort.kr/2021/03/typescript-interface-vs-type)

### **interface는 computed value를 사용할 수 없다.**

```ts
type sports = 'soccer' | 'baseball';

type SportsLike = {
  [sport in sports]: boolean;
};

const likedA: SportsLike = { soccer: true, baseball: false };

// Error
interface SprotsInterface {
  [sport in sports]: boolean;
}
```

---

### **성능상 interface가 더 좋다?**

[https://github.com/microsoft/TypeScript/wiki/Performance#preferring-interfaces-over-intersections](https://github.com/microsoft/TypeScript/wiki/Performance#preferring-interfaces-over-intersections)

#### **머지에서의 차이점**

- interface는 프로퍼티의 충돌을 감지할 수 있다.
- type은 프로퍼티를 재귀적으로 병합하기 때문에 프로퍼티가 생성되지 않을 수 있다.

```ts
interface A {
  a: string;
}

// Error
interface B extends A {
  a: number;
}

type A2 = {
  a: string;
};

type B2 = A2 & {
  a: number;
};
```

type은 에러가 나지 않으나, interface는 충돌을 감지하고 에러를 나타내준다.

---

#### **컴파일에서의 성능**

> A final noteworthy difference is that when checking against a target intersection type, every constituent is checked before checking against the "effective"/"flattened" type.

type은 모든 구성요소에 대한 타입을 평탄화 작업 후 체크하고 합성 유효성을 판단하기에 성능이 상대적으로 낮다.

---

결론

Object 객체에는 interface를 사용하는 것이 좋아보인다. 하지만, 필수는 아니기에 type을 사용하는 컨벤션이라면 컨벤션 따라서 사용해도 무방할 것이라고 생각한다.

reference  
[https://github.com/microsoft/TypeScript/wiki/Performance#preferring-interfaces-over-intersections](https://github.com/microsoft/TypeScript/wiki/Performance#preferring-interfaces-over-intersections)  
[https://yceffort.kr/2021/03/typescript-interface-vs-type](https://yceffort.kr/2021/03/typescript-interface-vs-type)  
[https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces)
