## vue routing

### Routing

네트워크에서 경로를 선택하는 프로세스로써 웹 서비스에서는 유저가 방문한 URL에 대한 적절한 결과를 response하는 것이다.

**in SSR**
Server가 모든 라우팅을 통제함
URL로 요청이 들어올시 응답으로 완성된 HTML을 제공한다 <- 결론적으로 Routing에 대한 결정권을 **서버**가 가짐

**in SPA / CSR**
하나의 URL만 가질 수 있다. 왜 와이 ? 서버는 하나의 HTML만 제공하고 그 후의 모든 동작은 JavaScript코드를 활용한다.

근데 routing을 꼭 해야하냐?? 그건 아님.. 근데 UX적 측면에서는 필요하다.

1. 페이지의 변화를 감지할 수 없고
2. 새로 고침을 하면 처음 초기 상태 페이지로 돌아가고
3. 링크 공유시 역시 초기 상태 페이지가 나와버리고
4. 브라우저의 뒤로 가기 기능을 사용할 수 없다

### Vue Router

SPA (Single Page Application) 상에서 라우팅을 쉽게 개발할 수 있게 해주는 API

라우트에 컴포넌트 매핑 후 어떤 URL에서 렌더링 할지 알려주는 역할 << SPA를 MPA처럼 URL을 이동하면서 사용 가능
따라서, SPA의 단점인 URL이 변하지 않는 것을 결해줌

### vue의 URL 분기 처리 방식

```js
<router-link :to="..."></router-link>
// 이런 형식으로 이뤄지는데 이는 사실
$router.push(...)와 같다
```

왜 push와 같냐면 history stack에 url을 push하는 형식이기 때문!
근데 왜 stack이냐?? 왜 와이 >> 기록이 남아서 뒤로 가기가 구현할 수 있기 때문임

### History Mode

브라우저의 History API를 활용한 방식으로 새로고침 없이 URL 이동 기록을 남길 수 있다.

### Lazy Loading

모든 파일을 한 번에 로드시도시 오래걸림 -> 미리 로드를 하지 않고 특정 라우트에 방문시 매핑된 컴포넌트 코드 로드

```js
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
```

## Navigation Guard

### 전역 가드

다른 url 주소 이동시 항상 실행되는 것으로써 router/index.js에 router.beforeEach(to, from, next)를 사용하여 설정

1. to -> 이동할 URL 정보가 담긴 route 객체
2. from -> 현재 URL 정보가 담긴 route 객체
3. next -> 지정한 URL로 이동하기 위해 호출하는 함수
   반드시 한 번만 호출되어야 함

URL이 변경되어 화면이 전환되기 전 router.beforeEach()가 호출된다 -> 화면 전환 x. 대기 상태
변경된 URL로 라우팅하기 위해서는 next()를 호출해줘야 함. -> 호출시 화면 전환

### router guard

전체 route가 아니라 특정 route에만 가드를 설정하고 싶을 때 사용
beforeEnter(to,from,next)
route 진입시 실행! 근데 BUT 매개변수, 쿼리, 해시 값 변경시 실행 X -> 다른 경로에서 탐색시에만 실행

### component guard

특정 컴포넌트 내에서 가드를 지정하고 싶을 때 사용
beforeRouteUpdate(to, from, next)
해당 컴포넌트 렌더링 경로 변경시 실행

### make 404 response

views에 404.vue를 만들고 routes 최 하단에 path를 \*을 통해 다른 루트로 이동하지 않았다면 404 vue를 보여주는 형식으로 만듬
그러나 parameters를 url 인자로 받는 경우에는 해당 데이터가 없을 때 이에 대한 요청의 응답이 없을 경우 404 vue가 렌더링 되는 것이 아니라 해당 url의 인자가 없는 것으로 응답이 와서 정상적으로 렌더링되지 않는다.

그래서 axios promise 객체에서 catch를 통한 에러 처리 부분에서 this.$router.push('/404')로 history stack에 넣는다
