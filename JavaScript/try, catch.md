# try ... catch 문

## 개념

`try`의 코드 블록이 실행 중에, 예외가 발생하면 `catch`문의 코드 블록이 실행되는 코드문이다.

```js
const doSomething = () => {
  throw new Error('Just Error');
};
try {
  doSomething();
} catch (e) {
  handlingError(e);
}
```

`doSomething`의 메서드 실행 중에 에러가 발생한다면 catch문이 실행된다. 에러 메시지를 읽으려면 반드시 `catch` 문의 인자를 받아야한다.

```js
const doSomething = () => {
  throw new Error('Just Error');
};

const handlingError = (e) => {
  console.log(e);
};

try {
  doSomething();
} catch (e) {
  handlingError(e);
}
```

물론 `catch`가 계속 인자를 받을 필요는 없다.

```js
try {
  doSomething();
} catch {
  handlingError('Error?');
}
```

## 특징

특이한 점은 에러를 처리하는 방식이다.

호이스팅, 실행 컨텍스트와 함께하는 유명한 예시로, `const` TDZ 에러 예시가 있다.

```js
console.log(a);
const a = 1;
console.log('Hi!');
```

이렇게 하면 당연하게도 `Hi!`라는 메시지가 출력되지 않는다.

```js
try {
  console.log(a);
  const a = 1;
} catch {}

console.log('Hi');
```

이렇게 하면? 당연하게도 출력이 된다.

즉, `try ... catch` 문은 `try` 문 내에서 발생할 수 있고 예상할 수 있는 오류에 대한 핸들링을 하기 위해서 `catch` 문을 만들기위한 것이다. 때문에 기존의 에러와는 다르게, 런타임이 멈추지 않고 계속 실행되는 특징이 있다.

만약 멈추기를 원한다면, `catch` 문에서 `throw`를 통해 에러를 던지면 된다.

```js
try {
  throw new Error('Some Error');
} catch (e) {
  console.log(e);
  throw e;
}
```

이를 이용해서 try ... catch 문의 중첩을 만들 수 있다.

## try ... catch 문의 중첩

```js
try {
  try {
    throw new Error('Some Error');
  } catch (e) {
    console.log('Inner Catch', e);
    throw new Error(e + ' raised in inner catch!');
  }
} catch (e) {
  console.log(e, 'But now outer.');
}
```

![image](https://github.com/vinitus/TIL/assets/97886013/81d07ed9-8c86-4faa-8187-07be74ba84a2)

## finally

```js
try {
  throw new Error('Some Error');
} finally {
  console.log('finally');
}
console.log('Hi');
```

`finally`는 해당 try 문에서 어떤 에러가 발생하더라도, 런타임이 즉시 중단되는 것이 아니라 `finally` 문까지 실행한 뒤에 중단된다는 특징이 있다.

방금 전의 `try ... finally` 문보다 `try ... catch ... finally` 가 의미있다고 생각한다.

```js
try {
  doSomething();
} catch (e) {
  console.log(e);
} finally {
  console.log('finally');
}
```

### finally의 사용 사례

API를 하나 만들었을 때 할 수 있을 것 같다.

```js
const get = (req) => {
  try {
    const res = doBusinessLogic();
    req.response = makeSomeReponse(res);
  } catch (e) {
    req.response = makeSomeReponse(e);
    makeErrorLog(e);
  } finally {
    sendResponse(req.response);
  }
};
```

`express.js`를 통해 API를 제대로 만들어본 적은 없지만, 만약 에러 핸들링을 한다면 이렇게 할 수 있지 않을까?

### finally 문의 return에 대해

`finally` 문에 `return`이 존재한다면 좀 특별하다.

[mdn의 문서](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch#the_finally_block)에 따르면

> Control flow statements (return, throw, break, continue) in the finally block will "mask" any completion value of the try block or catch block. In this example, the try block tries to return 1, but before returning, the control flow is yielded to the finally block first, so the finally block's return value is returned instead.

마지막으로 블록의 제어 흐름 문(return, throw, break, continue)은 try 블록 또는 catch 블록의 완료 값을 "마스킹"합니다. 이 예제에서 try 블록은 1을 반환하려고 하지만 반환하기 전에 control 흐름이 먼저 finally 블록에 반환되므로 finally 블록의 반환값이 대신 반환됩니다.

**1. try, catch 문에서 return이 존재하는 경우**

```js
console.log(
  (() => {
    try {
      return 1;
    } finally {
      return 2;
    }
  })()
); // 2
```

`try`의 `return`도 존재하지만, `finally`의 `return`이 출력되는 모습

즉, `finally`의 반환값이 존재하면 무조건 이 반환값이 return된다.

```js
const doTryCatch = () => {
  try {
    throw new Error('Some Error');
  } catch {
    return 1;
  } finally {
    return 2;
  }
};

console.log(doTryCatch()); // 2
```

**2. 중첩된 try ... catch 문에서 안의 catch에서 thorw를 할 때**

```js
const doTryCatch = () => {
  try {
    try {
      throw new Error('Some Error');
    } catch (e) {
      console.log('Inner Catch', e);
      throw new Error(e + ' raised in inner catch!');
    } finally {
      console.log('Run finally');
      return 1;
    }
  } catch (e) {
    console.log(e, 'But now outer.');
  }
};

console.log(doTryCatch());
```

```
Inner Catch Error: Some Error
    at doTryCatch (<anonymous>:4:13)
    at <anonymous>:17:13
Run finally
1
```

#### **Reference**

[mdn - try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
