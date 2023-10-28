### **찾아보게된 이유**

생각해보니까 라우터가 큰 기능은 없을 것 같아서?? 그냥 **어떤 상태와 파라메터를 가지고** redux가 필수가 아니니까 **context API** 같은 것으로 무언가를 하는 건 아닐까? 하는 생각에 시작했다.

사실 예전부터 해보고 싶었는데 오픈소스를 읽을 실력이 안됐음... ㅠㅠ

글의 react-router 깃허브의 소스코드 커밋 헤더는 656ebc3c987de5d56d6ac62beb07e18ef6e68381입니다!

버전

```json
"react-dom": "^18.2.0",
"react-router-dom": "^6.10.0",
```

---

### **createBrowserRouter의 진행 과정**

react-router-dom 6.4부터 생긴 createBrowserRouter로 라우터를 생성한다. 여기에 넘겨지는 것은 **Object가 여럿 담긴 array형태이다**. react-router github로 가서 **[createBrowserRouter](https://github.com/remix-run/react-router/blob/656ebc3c987de5d56d6ac62beb07e18ef6e68381/packages/react-router-dom/index.tsx#L215)**를 살펴보려고 한다.

```ts
// packages/react-router-dom/index.ts
...
export function createBrowserRouter(
  routes: RouteObject[],
  opts?: DOMRouterOpts
): RemixRouter {
  return createRouter({
    basename: opts?.basename,
    future: {
      ...opts?.future,
      v7_prependBasename: true,
    },
    history: createBrowserHistory({ window: opts?.window }),
    hydrationData: opts?.hydrationData || parseHydrationData(),
    routes,
    mapRouteProperties,
  }).initialize();
}
...
```

필수 인자로 **RouteObject[]**형태의 배열을 받고 있다. 우리가 넘기는 그것인듯하다.

opts는 옵셔널이기에 필수 인자가 아니다. 우리는 createBrowserRouter의 **routes**에 배열을 넘기고 있던 것이다.

이는 createRouter(인자).initialize()가 리턴에 들어가 있다. 이렇게 되면 **createRouter가 먼저 실행**되고, **initialize가 실행**된 후의 결과가 return된다.

---

#### **createBrowserHistory**

인자로 살펴볼 것은 **createBrowserHistory**를 실행한 결과를 **history**에 **저장**한다는 것이다. **[createBrowserHistory](https://github.com/remix-run/react-router/blob/656ebc3c987de5d56d6ac62beb07e18ef6e68381/packages/router/history.ts#L355)**는 다음과 같다.

```ts
// packages/router/history.ts
...
export function createBrowserHistory(
  options: BrowserHistoryOptions = {}
): BrowserHistory {
  function createBrowserLocation(
    window: Window,
    globalHistory: Window["history"]
  ) {
    let { pathname, search, hash } = window.location;
    return createLocation(
      "",
      { pathname, search, hash },
      // state defaults to `null` because `window.history.state` does
      (globalHistory.state && globalHistory.state.usr) || null,
      (globalHistory.state && globalHistory.state.key) || "default"
    );
  }

  function createBrowserHref(window: Window, to: To) {
    return typeof to === "string" ? to : createPath(to);
  }

  return getUrlBasedHistory(
    createBrowserLocation,
    createBrowserHref,
    null,
    options
  );
}
...
```

보면, createBrowserLocation에서 **window.location**를 사용하고 있다. 이는 지금 당장 개발자 도구의 콘솔창에서도 사용할 수 있다.

![image](https://github.com/vinitus/TIL/assets/97886013/d0646efa-3bc7-405f-b11c-d49a7a614abd)

createBrowerLocation을 보기 전에 createBrowserHref를 보면, 간단하게 **history.pushState** 같은 곳에 **3번째 인자**로 넘기는 값을 만들기 위한 함수이다.

createBrowerLocation는 pathname, search, hash를 **구조분해할당**으로 할당해주고, **createLocation에 인자**로 넘긴다.

[**createLocation**](https://github.com/remix-run/react-router/blob/656ebc3c987de5d56d6ac62beb07e18ef6e68381/packages/router/history.ts#L519)의 코드이다.

```ts
// packages/router/history.ts
...
export function createLocation(
  current: string | Location,
  to: To,
  state: any = null,
  key?: string
): Readonly<Location> {
  let location: Readonly<Location> = {
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: "",
    ...(typeof to === "string" ? parsePath(to) : to),
    state,
    key: (to && (to as Location).key) || key || createKey(),
  };
  return location;
}
...
```

이를 인자로 받아서 **pathname을 새로 지정**해주고, parsePath를 통해서 **to**를 만든다. **[parsePath](https://github.com/remix-run/react-router/blob/656ebc3c987de5d56d6ac62beb07e18ef6e68381/packages/router/history.ts#L558)**는 간단하게 말하면 hash는 #이 붙고 search는 ?가 붙는 것을 이용해서 **새로운 parsedPath를 생성하여 리턴하는 것**이다.

이렇게 location을 만들어 return해주는 createBrowserLocation라는 함수와

href를 만들어주는 createBrowserHref라는 함수

이 두가지를 getUrlBasedHistory라는 **함수에 콜백함수로 넘긴 결과를 리턴**한다.

[**getUrlBasedHistory**](https://github.com/remix-run/react-router/blob/656ebc3c987de5d56d6ac62beb07e18ef6e68381/packages/router/history.ts#L589)는 **window.history를 사용하는 메서드들을 정의하는 함수**이다.

[**mdn history docs**](https://developer.mozilla.org/ko/docs/Web/API/History)를 참고하며 보면 좋다.

getIndex는 history.state를 하는데, **pushState나 replaceState를 하지 않으면 idx가 존재하는 것을 활용한 것이다**. 리액트 라우터는 push, replace, pop 같은 것을 활용하면 history.state가 **{"name": ?}** 형태로 바뀌는데 이렇게 되면 **state.idx가 undefined**가 되어 [**604줄**](https://github.com/remix-run/react-router/blob/656ebc3c987de5d56d6ac62beb07e18ef6e68381/packages/router/history.ts#L604)**의 index == null** 조건문을 활용하기 위한 것이다.

이런 함수들을 선언하고 이를 담은 **리액트 라우터만의 history Object**에 담아서 리턴한다. 여기서도 새로운 함수들을 만들고 있는데, 이건 **바인딩에 가깝다**.

예를 들어, **[698번째 줄](https://github.com/remix-run/react-router/blob/656ebc3c987de5d56d6ac62beb07e18ef6e68381/packages/router/history.ts#L698)**에서

```ts
...
createHref(to) {
  return createHref(window, to);
},
...
```

같은 형태이다.

그렇게 만든 history를 리턴한다!

---

**createBrowserRouter**를 실행하면, **return에 도달하기 전까지의** 정리

1.  createBrowserRouter를 호출하여 배열을 인자로 넘기면, createRouter가 호출된다.
2.  createRouter의 인자 중에 createBrowserHistory를 실행하게 된다.
3.  createBrowserHistory 안에서는 **2가지 함수가 정의**된다. createBrowserLocation과 createBrowserHref
4.  createBrowserHref는 history 인터페이스의 메서드들의 인자 중 **url 값을 만들기 위한 함수이다**.
5.  createBrowserLocation은 **window.locaion**을 이용해 pathname, search, hash를 파싱해서 가져오고 createLocation에 인자로 넘기며 호출한 결과를 리턴하는 함수이다.
6.  createLocation은 인자로 **넘어온 값들을 파싱**하는 함수인데, **현재 주소인 pathname과 이동할 to를 만드는 것**이 핵심이다.
7.  다시 createBrowserHistory로 돌아와서, 만든 두개의 메서드를 getUrlBasedHistory의 콜백함수로 넘기며 호출한다.
8.  getUrlBasedHistory는 **window의 history 인터페이스를 활용하는 함수**이며, **history.replaceState와 history.pushState**를 활용한다.
9.  getUrlBasedHistory의 리턴 값은 **라우터가 직접 만든 history**이며, 여기에 getUrlBasedHistory에서 만든 push, reaplace, handlePop 등의 메서드를 담아 **history** **Object로 리턴한다**.
10. 다시 createBrowserHistory로 돌아와서, getUrlBasedHistory가 만든 history를 리턴하여 createRouter의 history에는 getUrlBasedHistory의 **history**가 담긴다.

---

#### **createBrowser의 리턴의 실행**

그럼 이제 createBrowser의 craeteRouter 차례이다.

**[createRouter](https://github.com/remix-run/react-router/blob/656ebc3c987de5d56d6ac62beb07e18ef6e68381/packages/router/router.ts#L683)**로 가야한다.

```ts
// packages/router/router.ts
...
export function createRouter(init: RouterInit): Router {
  ...
  let router: Router;
  ...
  return router
};
...
```

중요한 것은 router는 **Router라는 타입스크립트 인터페이스를 구현하는 객체이기에**, **Router의 메서드, 속성을 사용할 수** **있다**.

도중에 여러 메서드들로 인해서 변경되는데 천줄이 넘어가도록 너무 길어서 간단하게 어떤 것을 리턴하는가만 적어놨다. 그리고 **[initailize](https://github.com/remix-run/react-router/blob/656ebc3c987de5d56d6ac62beb07e18ef6e68381/packages/router/router.ts#L842)**의 중요한 부분은 다음과 같다.

```ts
// package/router/router.ts
...
  function initialize() {
    // If history informs us of a POP navigation, start the navigation but do not update
    // state.  We'll update our own state once the navigation completes
    unlistenHistory = init.history.listen(
      ({ action: historyAction, location, delta }) => {
        // Ignore this event if it was just us resetting the URL from a
        // blocked POP navigation
        ...
        return startNavigation(historyAction, location);
      }
    );

    if (!state.initialized) {
      startNavigation(HistoryAction.Pop, state.location);
    }

    return router;
  }
...
```

중요한 것은 주석에서 **POP navigation**을 막는다고 되어있다. POP navigation은 브라우저의 뒤로가기 기능이다. 우선 [init.history.listen](https://github.com/remix-run/react-router/blob/656ebc3c987de5d56d6ac62beb07e18ef6e68381/packages/router/history.ts#L686)은 다음과 같다.

```ts
...
    listen(fn: Listener) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }
      window.addEventListener(PopStateEventType, handlePop);
      listener = fn;

      return () => {
        window.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
...
```

listen에 **Listener 타입의 함수** 하나가 들어온다. 즉, **뒤로가기를 막는 함수**일 것이다. 이 기능 자체를 추가하는 것은, 라우터가 정의한 history의 listen 함수 호출에서, **listen의 콜백함수인 Listener라는 타입의 함수를 addEventListener의 콜백함수로 넣어 뒤로가기를 막는 기능을 추가**한다.

initiallize 메서드도 결국에는 어떤 값들을 가공하여 **router를 리턴하는 함수** -> 즉, router를 계속 가공하고 리턴하는 형태이다.

---

**createBrowserRouter 호출 결과 정리**

**createBrowserRouter**는 **window.history**를 **상속**하여 추가적인 메서드와 속성을 담은 **라우터만의 history를 만든 객체를 가지고 router라는 객체를 만든다.**

---

#### **RouterProvide 컴포넌트**

이제 이렇게 만들어진 router 객체를 사용하기 위한 **RouterProvider**는 뭘까?

그 전에, 우리는 **RouterProvider를 컴포넌트로 사용한다**. -> 이것도 컴포넌트이다.

**[RouterProvider](https://github.com/remix-run/react-router/blob/656ebc3c987de5d56d6ac62beb07e18ef6e68381/packages/react-router/lib/components.tsx#L56)**는 리액트 라우터에서 만든 컴포넌트이며, router를 인자로 받고 있다. 컴포넌트이니까 jsx부터 보기로 했다.

```ts
// packages/react-router/lib/components.tsx
...
export function RouterProvider({
  fallbackElement,
  router,
}: RouterProviderProps): React.ReactElement {
  let [state, setState] = React.useState(router.state);
  React.useLayoutEffect(() => router.subscribe(setState), [router, setState]);

  let navigator = React.useMemo((): Navigator => {
    return {
      createHref: router.createHref,
      encodeLocation: router.encodeLocation,
      go: (n) => router.navigate(n),
      push: (to, state, opts) =>
        router.navigate(to, {
          state,
          preventScrollReset: opts?.preventScrollReset,
        }),
      replace: (to, state, opts) =>
        router.navigate(to, {
          replace: true,
          state,
          preventScrollReset: opts?.preventScrollReset,
        }),
    };
  }, [router]);

  let basename = router.basename || "/";

  let dataRouterContext = React.useMemo(
    () => ({
      router,
      navigator,
      static: false,
      basename,
    }),
    [router, navigator, basename]
  );

  return (
    <>
      <DataRouterContext.Provider value={dataRouterContext}>
        <DataRouterStateContext.Provider value={state}>
          <Router
            basename={router.basename}
            location={router.state.location}
            navigationType={router.state.historyAction}
            navigator={navigator}
          >
            {router.state.initialized ? (
              <DataRoutes routes={router.routes} state={state} />
            ) : (
              fallbackElement
            )}
          </Router>
        </DataRouterStateContext.Provider>
      </DataRouterContext.Provider>
      {null}
    </>
  );
}
...
```

DataRouterContext.Provider를 통해 **context API를 사용**한다는 것을 알 수 있다.

[**DataRouterContext**](https://github.com/remix-run/react-router/blob/656ebc3c987de5d56d6ac62beb07e18ef6e68381/packages/react-router/lib/context.ts#L74)를 먼저 봐야한다.

```ts
// packages/react-router/lib/context.ts
...
export const DataRouterContext =
  React.createContext<DataRouterContextObject | null>(null);
...
```

DataRouterContextObject 타입의 **React context**를 생성한다. 기본값은 null 이다.

라우터는 결국 **history**를 라우터 정의의 history를 **router**로 추상화한 것을 **context API를 통해 전역 상태로써 관리**하는 구나.. 를 짐작할 수 있다.

```ts
...
interface NavigationContextObject {
  basename: string;
  navigator: Navigator;
  static: boolean;
}

export interface DataRouterContextObject extends NavigationContextObject {
  router: Router;
  staticContext?: StaticHandlerContext;
}
...
```

router에는 우리가 위에서 보던 Router이다. dataRouterContext는 value에 들어가서 DataRouterContextObject의 타입에 맞게 구조분해할당이 된다.

DataRouterStateContext도 마찬가지이다.

```ts
export const DataRouterStateContext = React.createContext<Router['state'] | null>(null);
```

---

**정리**

RouterProvide는 결국 createBrowserRouter에서 가공한 리액트 라우터만의 **router 객체를 context API를 통해 전역으로 관리**하는 것이다.

---

재밌는 듯??

#### **reference**

[https://github.com/remix-run/react-router/tree/656ebc3c987de5d56d6ac62beb07e18ef6e68381](https://github.com/remix-run/react-router/tree/656ebc3c987de5d56d6ac62beb07e18ef6e68381)

[https://developer.mozilla.org/ko/docs/Web/API/History](https://developer.mozilla.org/ko/docs/Web/API/History)
