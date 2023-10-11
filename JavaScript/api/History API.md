[https://developer.mozilla.org/ko/docs/Web/API/History](https://developer.mozilla.org/ko/docs/Web/API/History)

[https://developer.mozilla.org/ko/docs/Web/API/History_API](https://developer.mozilla.org/ko/docs/Web/API/History_API)

오늘은 History API에 대해서 알아보려고 한다.

리액트를 못쓰는 상황인 프로젝트에 들어간다면, 리액트 라우터도 못쓸 것 같아서 연습

그걸 떠나서 리액트 라우터를 파헤쳐봤을 때 봤던 이 History API가 궁금했다.

---

## **History**

문서를 보기 전에, 개발자도구에서 history를 출력해보려고 했다.

![image](https://github.com/vinitus/TIL/assets/97886013/bd4e08ea-d455-4d68-9751-6020871fc28f)

이런 형식인 걸 알았으니까 다시 공식문서를 보면,

> **DOM**의 **Window 객체**는 **history 객체**를 통해 **브라우저의 세션 기록**에 접근할 수 있는 방법을 제공합니다. history는 사용자를 자신의 방문 기록 **앞과 뒤로 보내고 기록 스택의 콘텐츠도 조작**할 수 있는, 유용한 메서드와 속성을 가집니다.

출처 - [https://developer.mozilla.org/ko/docs/Web/API/History_API](https://developer.mozilla.org/ko/docs/Web/API/History_API)

중요한 것은 history 객체는 window 객체에 속한다는 것이다. window 객체에 속한다는 것은 **브라우저에서 하나의 탭**을 의미한다.

이는 어떻게 확인할 수 있냐면,

1. 브라우저에서 두개의 탭인 A,B를 열고

2. A탭의 window 객체에 abc라는 프로퍼티를 추가하고

3. B탭에서 window.abc로 접근하면 접근할 수 없다.

즉, 만약 본인이 크롬이라면 뒤로가기 버튼을 우클릭 했을 때 나오는 것들이 history가 관리하고 있는 것이다. 반대로 앞 버튼을 우클릭해도 동일하다.

![image](https://github.com/vinitus/TIL/assets/97886013/566a7785-1821-4b9e-a61e-3b530bb546b3)

그러니깐, history라고 해서 Ctrl + H를 눌러서 나오는 브라우저 방문 기록과는 다르다는 것이다.

즉, history는 **어떤 메서드를 통해서 지금 탭에 대한 조작을 할 수 있는 것**이다.

---

### **History의 메서드**

1. history.length - 현재 페이지를 포함한, 세션 기록의 길이

![image](https://github.com/vinitus/TIL/assets/97886013/eb96b9dc-7fd7-4ffd-a293-c022a957c8e6)

이런 브라우저 세션의 history.length는 4이다.

Ctrl + N을 눌러서 나오는 새 창도 history.length에 포함된다.

![image](https://github.com/vinitus/TIL/assets/97886013/2242a723-0ba9-4491-ba08-3190d3965487)

2. history.scrollRestoration

지금 페이지로 돌아왔을 때, 스크롤의 위치를 기억하고 이 위치로 돌려놓냐고 묻는 것이다.

auto - 돌려놓기

manual - 맨 위로 초기화

예시로 네이버 뉴스가 auto이다. 들어가서 뉴스 아무거나 들어갔다가 뒤로가기로 나오면 돌아온다.

하지만,

```ts
history.scrollRestoration = 'manual';
```

를 하면 돌아오지 않는다. 그리고 우리의 history 객체는 이 페이지에서 이 옵션을 **변경한 것을 기억**한다.

한번 직접 해보면 알 수 있다.

[https://news.naver.com/](https://news.naver.com/)

3. history.state

지금 위치하고 있는 history에 저장된 state를 보여준다.

history.state에는 기본적으로 null이다. 그 이유는, 지금 바로 react 페이지를 만들어서 history.state를 보면 null이기 때문이다. 즉, **개발자가 무언가를 지정해주지 않는다면, 해당 state는 null이 기본값이다.**

![image](https://github.com/vinitus/TIL/assets/97886013/89af1b0e-825b-4ddb-ae35-c98f6e4d8845)

또한, 웹사이트마다 다르다. 어떤 사이트는 url과 pathname 전부를 자세히 나타내주지만, 어떤 사이트는 {idx:0}만 들어있는 경우도 있다.

왜 다르고, 어떻게 왜 쓰일까?

일단 pushState를 적용해봤는데 신기한 것을 발견했다.

```ts
history.pushState({ data: 'test' }, '리액트 초기페이지', 'index.html');
```

바로 history 스택이 추가된 것이다.

![image](https://github.com/vinitus/TIL/assets/97886013/7124f3a9-2c74-4afd-9862-2b5b4a9229cb)

history는 state를 통해 스택을 관리하는 것 같다.

그리고, history.state를 통해 조회할 수 있는 데이터는 pushState의 첫번째 인자인, 객체이다.

4. history.pushState

방금 말했던 pushState 메서드이다.

첫번째 인자로 어떤 데이터를 넘긴 값을 state에 저장한다.

두번째 인자는 과거에는 사용해온 인자이지만 사용하지 않는 **unused**라고 한다.

세번재 인자는 url이다. url은 절대경로일 필요도, 상대경로일 필요도 없다고 한다.

4-1. pushState와 history 스택

pushState를 하면, 히스토리 스택이 하나 새로 쌓인다.

![image](https://github.com/vinitus/TIL/assets/97886013/b3dfb91a-f537-4f97-8951-f1ee62cfdb0c)

새 탭을 열면 아무것도 없는 상태에서

```ts
history.pushState({ data: 'test' }, null, 'index.html');
```

를 입력하면, 새로운 history 기록이 생성되면서 뒤로가기가 활성화된다.

![image](https://github.com/vinitus/TIL/assets/97886013/13e193bb-b339-4f34-b008-707895d5dad5)

조금 특이한 점은, 인자까지 같은 메서드를 입력해도 새로 추가된다는 것이다.

![image](https://github.com/vinitus/TIL/assets/97886013/ff3e85ed-3893-48f3-92a4-be1f217be582)

그리고 **"새 탭"**이 유지되는 것을 보면 알겠지만, 페이지 자체는 변하지 않는다는 것이다.

즉, pushState는 페이지를 변화시키지 않으면서, 어떤 데이터를 변화시키거나 새로운 히스토리 스택으로 이동할 수 있게 된다는 것이다.

5. history.replaceState

이건 pushState와는 다르게, history 스택에 기록을 쌓지 않으면서 state의 값을 변경할 수 있다는 것이다.

![image](https://github.com/vinitus/TIL/assets/97886013/aa481d8d-1bb3-41b0-a471-45ada4a25a4a)

이렇게 변경을 했으나, history 스택에는 쌓이지 않은 모습이다.

![image](https://github.com/vinitus/TIL/assets/97886013/0e2e8e25-50ff-4c70-951b-8cbe291caac5)

6. go와 back

이들은 브라우저의 앞으로가기 (go), 뒤로가기 (back)을 실행시키는 것이다.

---

### **PopStateEvent**

[https://developer.mozilla.org/en-US/docs/Web/API/PopStateEvent](https://developer.mozilla.org/en-US/docs/Web/API/PopStateEvent)

history API는 위에서 끝나지만, 이와 관련된 이벤트로써 존재하는 이벤트이다.

PopStateEvent는 popstate라는 이벤트의 인터페이스이다. 클래스에 해당하여 생성자가 존재한다.

1. PopStateEvent(type, options)

생성자로써 PopStateEvent 객체를 만든다.

options에는 state와 기존 Event 클래스의 옵션들인 bubbles, cancelable, composed가 있다.

2. PopStateEvent.state

PopStateEvent로 만든 객체에 담긴 state를 조회할 수 있는 메서드

```ts
const state = { page: 'index' };
const popStateEvent = new PopStateEvent('popstate', { state });
console.log(popStateEvent.state);
```

이렇게 조회할 수 있다.

3. window.dispatchEvent(popStateEvent)

이제 이렇게 생성한 PopStateEvent 객체를 가지고 window.dispatchEvent 를 사용할 수 있다.

이 메서드에 인자로 이벤트 객체를 넣으면, popstate 이벤트가 일어난다.

#### **reference**

[https://developer.mozilla.org/ko/docs/Web/API/History](https://developer.mozilla.org/ko/docs/Web/API/History)

[https://developer.mozilla.org/ko/docs/Web/API/History_API](https://developer.mozilla.org/ko/docs/Web/API/History_API)

[https://developer.mozilla.org/en-US/docs/Web/API/PopStateEvent](https://developer.mozilla.org/en-US/docs/Web/API/PopStateEvent)
