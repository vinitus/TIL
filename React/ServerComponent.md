사실 조금 복잡해서 미뤄뒀는데.. NextJS에서 자꾸 나와서 공부해야함 ㅋㅋ

# React Server Component

## Before Server Component

뭔지 알아보기 전에 앞서, 데이터를 어떻게 가져와야할까는 React에서 가장 큰 문제였다.

```jsx
function Blog({ postId }) {
  return (
    <Post postId={postId}>
      <Title postId={postId} />
      <Contents postId={postId} />
      <Review postId={postId} />
    </Post>
  );
}

export default Blog;
```

이렇게 된 컴포넌트가 있다면, postId를 기반으로 한 데이터는 어디서 불러와야하는가?

저 컴포넌트가 묶인 Blog에서 가져와야할까?
아니면 각 자식 컴포넌트 전부에서 작게 쪼개진 API에서 각각 가져와야할까?

카카오블로그에서는 다음과 같은 문제점을 말하고 있다.

1. 하나의 컴포넌트에서 가져온다면

> 클라이언트에서 서버로 요청하는 API 요청수를 줄일 수 있지만 그로 인해 부모와 자식 컴포넌트가 결속되고 유지보수가 어려워지게 됩니다. 만일 컴포넌트의 구성이 바뀌거나 자식 컴포넌트가 다른 컴포넌트로 이동되는 경우, 해당 API를 다른 컴포넌트에서도 호출해줘야 하며 불필요한 정보를 over-fetching하게 됩니다.
> 출처 : [카카오 기술블로그](https://tech.kakaopay.com/post/react-server-components/#%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%9D%98-data-fetching)

하나의 API로 묶는다는 것은 결국 컴포넌트 개발하는 입장에서의 문제이다. 또한, over-fetching의 경우는 사용자에게 있어서 부정적 경험이 된다고 말하고 있다.

2. 각각의 컴포넌트에서 API를 호출한다면

> high latency를 가진 클라이언트부터의 서버 요청은 늘어나게 됩니다. 또한 부모 컴포넌트는 렌더링 된 후 필요한 데이터를 받아오기 시작하고 이 과정이 끝나기 전까지 자식 컴포넌트의 렌더링과 API 호출 또한 지연됩니다. 결국 연속된 client-server API 요청과 중첩된 컴포넌트 내 API 호출 지연으로 인한 waterfall은 사용자 경험을 떨어트릴 수 있습니다.

페이스북팀도 동일한 문제와 고민 속에 다른 솔루션으로 해결하고 있으나, 결국 근본적인 해결방법은 아니다. 그래서, 리액트만으로 해당 문제를 해결할 수 있는 Server Component를 개발하였다.

## Server Component

Server Component는 서버에서만 작동하는 컴포넌트로써, 다음과 같은 특징을 지닌다.

1. 이벤트 리스너 같은 상호작용을 지원하지 않는다.
2. 함수들을 props로 전달할 수 없다. -> 함수는 serializtion을 할 수 없기 때문
3. Life Cycle Hook을 사용할 수 없다.

가장 중요한 것은, **클라이언트 사이드 번들에 Server Component가 포함되지 않는다.**
서버에서 작동하여 컴포넌트릉 생성하고 클라이언트로 전송하기 때문이다.
위의 특징들을 모두 포함하는 컴포넌트라면, 굳이 Client Component로 만들지 않는 것이 중요하다고 생각한다.

### Server Component와 Client Component를 같이 사용하기

**Client Component는 Server Component를 import할 수 없다.** 생각해본다면, Client Component는 클라이언트 상에서만 존재하는 것이고, 이 컴포넌트가 들어있는 번들링된 파일에는 Server Component가 없기 때문이다.

그래서 A라는 Server Component를 B라는 Client Component의 자식 컴포넌트로 하고 싶다면, 또 다른 Server Component C를 사용해야한다.

```jsx
import ServerAComponent from './ServerAComponent';
import ClientBComponent from './ClientBComponent';

export default function ServerCComponent() {
  return (
    <ClientBComponent>
      <ServerAComponent />
    </ClientBComponent>
  );
}
```

### Server Component와 SSR을 분리하기

공부하면서, 자꾸 헷갈렸다. 둘이 유사한 점이 많은 듯 하지만, 다시 생각하보면 많이 다르다.

**SSR**이 뭔지 다시 생각해보면 ..

1. 클라이언트가 서버에 웹 문서를 요청
2. 서버는 미리 HTML 문서를 만들고, 전송한다.
3. 그 다음, HTML에서 필요하다고 말하는 JS파일을 보낸다.

그리고, NextJS의 SSR은 진짜 SSR과는 많이 다르다. 3번의 JS파일 중에서 React도 포함되어 있고, React 파일이 전송되면 HydrateRoot 메서드가 실행된다. 이로 인해서 이미 만들어진 HTML과 React가 결합하여, CSR로 작동한다.

반면에, Server Component는 직렬화한 JSX 데이터를 보낸다. 이를 클라이언트가 받고 파싱한다.

왜 HTML로 보내지 않을까? 는, 결국 Server Component도 컴포넌트이다. 클라이언트에서는 이를 인지하고, Client Component와 같이 사용하기 때문에, HTML로 보낸다면 HTML을 JSX 엘리먼트로 다시 파싱해야하기 때문에 효율적이라고 생각했을 것이다.

![image](https://github.com/vinitus/my-blog/assets/97886013/9d639a36-dee6-4bf1-903a-582ec6a6e579)

이 사진에 대한 예시는, [저의 미니 프로젝트](https://github.com/vinitus/my-blog/tree/server-component-code)에서 확인하실 수 있습니다.

```jsx
import Image from 'next/image';
import blogLogo from '@/public/blog-logo.png';
import navbarCss from '@/app/navbar.module.css';
import { Suspense } from 'react';
import Link from 'next/link';

async function Data() {
  const res = await fetch('https://dcb7a8e3-965b-4d6a-8a40-ff96b332a2fc.mock.pstmn.io/hi');

  const jsonData = await res.json();

  const { a } = jsonData;

  return <div>{a}</div>;
}

export default function Home() {
  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <Data />
      </Suspense>
      <header className={navbarCss.navbarHeader}>
        <nav className={navbarCss.navbarLayout}>
          <div className={navbarCss.navbarCategoryArea}>
            <Link href='/'>
              <Image src={blogLogo} alt='블로그 로고' />
            </Link>
            <p>Home</p>
            <p>Post</p>
            <p>TEMPT</p>
            <p>TEMPT</p>
            <p>TEMPT</p>
          </div>
          {/* search */}
          <div className={navbarCss.navbarSearchArea}>
            <button className={navbarCss.navbarSearchBox}>
              검색
              <p className={navbarCss.navbarSearchBoxButton}>검색</p>
            </button>
            <a href='' className={navbarCss.navbarContactButton}>
              <p className={navbarCss.navbarContactButtonFont}>Contact</p>
            </a>
          </div>
        </nav>
      </header>
      <main>
        <div className='max-w-screen-xl mx-auto p-10 flex flex-row w-full'>
          {/* sidebar */}
          <div className='sticky h-[100vh] flex-shrink-0 flex-col justify-between w-72'>
            <ul>1</ul>
            <ul>2</ul>
            <ul>3</ul>
            <ul>4</ul>
            <ul>5</ul>
          </div>
          <article className='w-full'>2</article>
          <p>HIHIHIHIHI</p>
        </div>
      </main>
    </>
  );
}
```

이 코드가 저런 json과 유사한 형태로 변환되어 전송된다. 이 데이터를 받은 클라이언트는, 이를 파싱하고 virtual DOM을 형성하여 하나의 리액트 컴포넌트로 형성한다.

정리하면, SSR은 초기 렌더링을 HTML로 대신하고, 그 뒤의 상호작용은 React의 CSR로써 작동한다.
반면에 Server Component는 서버에서 실행되고 있는 컴포넌트이며, 해당 컴포넌트의 결과를 Serialize하여 클라이언트로 보내는 것일 뿐이다.

### 상호작용을 등록할 수 없다면, 왜 사용해야하는가?

결국 이런 기능들이 개발 되는 것은 개발자와 사용자 모두를 위한 성능 향상의 결과이다. 서버 컴포넌트는 서버에서 작동하기에, 물리적으로 WAS나 DB와 가깝다.

서버 컴포넌트 이전으로 다시 돌아가면, 엘리먼트들의 속을 채워주는 컨텐츠를 API나 DB에서 가져와야하는 경우에 네비게이션바와 Footer가 붙어있다가, 동적 컨텐츠를 불러와서 갑자기 떨어지는 현상도 있을 수 있다.

이를 해결하는 것을 생각해보면, 조건문을 통해서 다른 컴포넌트를 렌더링하다가 내용이 채워진 컴포넌트를 렌더링해야했다.

그리고 리액트 팀은 이런 비슷한 것들을 리액트 자체로써 해결하고자 하였고, 그래서 나온 기능이 Suspense이다.

거기에 추가로 데이터를 불러오던 것들도 리액트의 기능으로써 해결하고자하여 나온 기능이 Server Component이다.

동적 컨텐츠들을 불러오는 곳을 서버 컴포넌트로 대체하고, 이벤트 리스너는 클라이언트 컴포넌트에 자리잡게 하였다.

```jsx
function oneConsoleLog() {
  console.log(1);
}

export default function Home() {
  const [number, setNumber] = useState(0);

  useEffect(async () => {
    const res = await fetch('api');
    const data = res.json();

    setNumber(data.id);
  }, []);

  return <div onChang={oneConsoleLog}>{number === 0 ? <Loading /> : <p>{number}</p>}</div>;
}
```

이런 형식의 컴포넌트를

```jsx
// Number.server.js
export default async function Number() {
  const res = await fetch('api');
  const data = res.json();
  const { id } = data;

  return (
    <p>{id}</p>
  )
}

// Home.client.js
function oneConsoleLog() {
  console.log(1);
}

export default function Home() {
  return <div onChang={oneConsoleLog}>
    <Suspense fallback={<Loading />}>
      <Number />
    </Suspense>
  </div>;
}
```

이렇게 바꿀 수 있다는 것이다. 지금은 api가 하나지만, 만약 여러개의 api가 있고 이 api들은 각각의 컴포넌트에서 호출되고 있으며, 이 컴포넌트는 하나의 부모 컴포넌트에 묶이는 경우를 생각한다면, 혁신적인 변화가 아닐 수 없다.

또한, 백엔드가 어쩌면 필요없을 수도 있다. 그냥 DB나 정적 파일 중에서 데이터를 가져와서 서버 컴포넌트에서 처리하고 넘긴다면,

서버 컴포넌트에서 이벤트 리스너 같은 상호작용을 적용할 수는 없어도, 이러한 이유 때문에 큰 변경점이라고 생각한다.

### 그리고 직접해보며 알게된 것들

1. 지금 있는 페이지에 Link 태그가 있다면, 해당하는 컴포넌트에 대한 js파일을 미리 불러온다.
2. use client를 사용했다고 해서, serialize된 데이터를 안받지는 않는다. 아마도 NextJS가 실행되고 있는 서버 자체가 서버 컴포넌트가 아닐까?
3. use client를 선언한 컴포넌트에서 import를 한 컴포넌트는 자동적으로 client component가 된다.
4. 클라이언트 컴포넌트와 서버 컴포넌트를 브라우저 상에서 구분하는 것은 서버 컴포넌트에서 보내고 있는 요청이 브라우저 상에서 일어나지 않는다면, 서버 컴포넌트이다.

### reference

[카카오 기술블로그](https://tech.kakaopay.com/post/react-server-components/#%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%9D%98-data-fetching)
[커리어리 질문](https://careerly.co.kr/qnas/2625)
[2ast님의 velog](https://velog.io/@2ast/React-%EC%84%9C%EB%B2%84-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8React-Server-Component%EC%97%90-%EB%8C%80%ED%95%9C-%EA%B3%A0%EC%B0%B0)
[리액트 팀이 작성한 JS Promise에 대한 Suspense 일급 지원 추가글](https://github.com/acdlite/rfcs/blob/first-class-promises/text/0000-first-class-support-for-promises.md#avoiding-an-uncanny-valley-between-server-and-client)
