이미 리액트 라우터는 잘 써왔고, 6.4에 생긴 기능들도 잘 사용하고 있다.

좋은 기능들이 많이 생겼는데, 나도 좀 더 알아보고 정리해두려고 한다.

모든 것을 짚지는 못하고, 중요하다고 생각하는 기능들만 정리할 것이다.

출발~

---

리액트 라우터가 무엇인지 간단하게 짚고 넘어가려고 한다.

**[react router의 공식문서](https://reactrouter.com/en/main/start/overview#client-side-routing)**에서

> React Router enables "client side routing".

리액트 라우터는 "클라이언트 측 라우팅"을 가능하게 한다. 라고 했다.

지금 당장 프로젝트를 하나 만들어서 실행시켜보면

![image](https://github.com/vinitus/TIL/assets/97886013/8d101f0f-23f7-47c5-a5bc-5fd68991bc8b)

이런 페이지가 나온다. 나는 vite를 사용 중이기에 CRA(createReactApp)과는 조금 다르다.

첫 화면도 다르고 주소도 조금 다른데, vite는 5173 포트를 사용한다.

![image](https://github.com/vinitus/TIL/assets/97886013/9466b098-6933-4ba0-a3f5-ec4b5ee346f2)

여기서 **domain:port** 뒤에 어떤 **path**를 입력해도 **화면은 그대로**이다.

이유는 우리가 이 url을 기반으로 어떠한 처리도 하지 않았기 때문이다. 이런 url에 접근하는 것은 JS에서 API로 제공하고 있는데, 바로 **window.location**이다.

이 window 객체는 지금 실행 중인 브라우저 창 자체를 가르킨다. 지금 보고있는 이 블로그에서 개발자 도구를 눌러서 window.location을 해보면

![image](https://github.com/vinitus/TIL/assets/97886013/0adf294a-deff-45b1-bb1c-de36cb481ae4)

이렇게 나의 주소에 대한 정보를 나타내주고 지금 path인 96이 pathname에 나와있는 것을 알 수 있다.

그럼, 이를 바탕으로 렌더링을 다르게 해주면 되는 것!

SPA 특성상 a 태그보다는 History API를 활용하여 이동시켜야한다. **a 태그로 이동하게 된다면, 페이지가 새로고침되어 리액트 프로젝트가 재실행되기 때문이다.**

이렇게 url을 통해서 무언가를 하려면 신경써줘야하는 것들이 많기 때문에, 리액트 라우터에서 이런 기능들을 제공해주는 것이다.

이것이 리액트 라우터에서 말하는 "클라이언트 측 라우팅"이다.

---

### **[Nested Routes](https://reactrouter.com/en/main/start/overview#nested-routes)**

중첩 라우팅이다. URL 세그먼트라는 것은 아마도 path가 중첩되는 상황을 말하는 듯 싶다.

지금의 예시를 예로 들자면,

1.  https://mystacks.tistory.com/은 내 블로그 주소 도메인 자체만을 나타내는 것이고,
2.  https://mystacks.tistory.com/96 은 내 블로그의 96의 id를 가지는 글일 것이다.

https://mystacks.tistory.com/라는 주소에서 렌더링되는 컴포넌트는 내가 설정한 블로그의 디자인일 것이고,  
https://mystacks.tistory.com/96이라는 주소에서 렌더링되는 컴포넌트는 게시글에 대한 컴포넌트일 것이다.

지금의 티스토리 형식에서 벗어나서, 이 블로그를 PPT라고 가정해봤을 때

3. https://mystacks.tistory.com/96/1이라고 새로운 것을 만들어본다면..

96의 id를 가지는 PPT의 첫번째 슬라이드다.

그럼 리액트 라우터는 어떻게 이를 나타내야하는가?  
https://mystacks.tistory.com/은 블로그의 디자인  
https://mystacks.tistory.com/96에서 렌더링되는 컴포넌트는 슬라이드 기능을 가지고 있고, 제목과 날짜 정도를 나타내줄 것이다.  
https://mystacks.tistory.com/96/1에서 렌더링되는 컴포넌트는 첫번째 슬라이드의 컨텐츠를 렌더링할 것이다.

이런 URL 세그먼트를 리액트 라우터 팀은 중요시여겼고, 이를 적용하기 위해 다음과 같은 형태를 만들었다.

```js
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '96',
        element: <BlogArticle />,
        children: [
          {
            path: '1',
            element: <ArticleSlide />,
          },
        ],
      },
    ],
  },
]);
```

createBrowserRouter가 어떤 메서드 이냐면,

#### **[createBrowserRouter](https://reactrouter.com/en/main/routers/create-browser-router#createbrowserrouter)**

> It uses the DOM History API to update the URL and manage the history stack.

**DOM의 Hitsory API**를 활용하여 **URL을 업데이트하고 히스토리 스택을 관리**한다고 한다. 자세하게는 안나와있어서 위의 예시를 기반으로 + 내가 사용해본 경험을 바탕으로 설명하려고 한다.

createBrowserRouter는 인자로 객체로 이루어진 **배열**을 받는다. 이 배열을 구성하는 객체는 다음과 같은 key들을 가진다.

path, element, children, loader, lazy 등등이 있는데 path, element, children에 대해서만 먼저 설명하려고 한다.

**path**

어떤 URL로 들어왔을 때, element의 컴포넌트가 렌더링된다.

1.  모든 것은 domain이 앞에 붙어있으며 생략된다.
2.  /는 도메인에 대한 절대경로이다.
3.  /가 없다면, 현재 URL주소에서 URL의 Path가 추가되는 것이다.

#### **element**

element는 컴포넌트이다. import로 불러와도 되고, element에 직접 할당해도 된다.

**children**

children은 URL 세그먼트에 의한 분기처리이다.

위의 예시에서는 domain으로만 접속하면 Root Component가 렌더링 되고, domain/96을 접속하면 Root가 렌더링된 상태에서 BlogArticle이 렌더링되고 domain/96/1로 접속하면 Root, BlogArtcile이 렌더링 된 상태에서 ArticleSlide가 렌더링된다.

중첩 라우팅이라는 것은 이렇게 children을 통해서 구현되며, 이의 목적은 다음과 같다.

1.  컴포넌트의 레이아웃을 유지
2.  레이아웃의 데이터 종속성 순서

---

### **[dynamic-segments](https://reactrouter.com/en/main/start/overview#dynamic-segments)**

동적 세그먼트는 path에서 이뤄진다.

위의 예시에서는 나는 3가지 URL로 밖에 접근할 수 없다.

1.  domain/
2.  domain/96
3.  domain/96/1

만약 97번째 글이 생겼다고 하면, 나는 이 리액트 라우터에 새로 추가해야할까?

이런 문제를 해결하기 위한 것이 동적 세그먼트이다.

위의 path를 다음과 같이 바꿀 수 있다.

```js
...
  {
    path: ":articleId"
  ...
  },
...
```

이렇게 바꾼다면, 나는 domain/의 어떤 숫자로 접근하던간에 BlogArticle 컴포넌트가 렌더링되는 것이다.

이 숫자를 바탕으로 API 요청을 보내 해당 id에 맞는 article을 불러와서 BlogArticle 컴포넌트에 매칭시켜주면 되는 것이다.

나는 주로 useParams를 사용했다. 이 useParams에서 리턴되는 객체에 path의 변수명으로 접근할 수 있다.

```js
...
  const param = useParams();
  console.log(param.articleId);
...
```

---

### **[ranked-route-matching](https://reactrouter.com/en/main/start/overview#ranked-route-matching)**

동적 세그먼트에 의한 것이다.

만약 두개의 path가 있을 때,

```js
...
  {
    path="/:articleId",
    element: <BlogArticle />,
  },
  ...
  {
    path="/welcome",
    element: <BlogWelcome />,
  },
...
```

이런 path가 두개가 있을 때, 내가 domain/welcome으로 접속한다면 어떻게 될 것 같은가?

리액트 라우터는 우선 경로 매칭을 통해, welcome path로 접속하여 BlogWelcome가 렌더링된다.

---

### **[data-loading](https://reactrouter.com/en/main/start/overview#data-loading)**

가장 중요한 것 같다. **loader의 비동기 함수가 끝나기 전까지, 렌더링은 이뤄지지 않는다.**

이 기능이 왜 나왔는가를 생각해본다면.. 일반적으로 라우터를 사용할 때, 데이터를 어떻게 불러왔을까부터 시작해야한다.

1.  useState와 useEffect를 통해서 사이드 이펙트인 API 통신을 요청을 보내고,
2.  이 요청의 응답이 오면 state에 업데이트를 하였을 것이다.
3.  그 다음에 태그들이 만들어지던가, 만들어둔 태그의 innerHTML이 업데이트할 것이다.

그럼 사용자는 그 동안 빈화면을 보던가, 어떤 상자들의 모양이 변하는 형태를 보던가, 어떤 텍스트가 잠깐 사이에 다른 텍스트로 바뀌는 경험을 할 것이다.

CSR의 한계이다. 리액트 라우터 팀은, 이를 해결하기 위해서 **loader라는 새로운 대안**을 내놓았다. 마치 SSR처럼 하나의 문서만 렌더링되는 것처럼 보여주는 **UX 적인 측면을 업그레이드 시켜준 것**이다.

loader는 어떻게 사용하냐면,

```js
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: async () => {
      const res = await axios.get("http://어떤서버/blog");
      return res.data
  },
]);
```

같은 형태이다. 저 리턴되는 데이터는 컴포넌트에서 사용할 수 있다.

```js
// Root.jsx

...
  const responseData = useLoaderData();
...
```

같이 사용할 수 있다.

---

### **[error-handling](https://reactrouter.com/en/main/start/overview#error-handling)**

요청한 URL에서 보여줄 페이지가 없다면 나타날 컴포넌트이다.

```js
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorComponent />,
    loader: async () => {
      const res = await axios.get("http://어떤서버/blog");
      return res.data
  },
]);
```

이런식으로 할 수 있겠다.
