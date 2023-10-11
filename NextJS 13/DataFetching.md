컴포넌트에서 데이터를 어떻게 가져오는가

# Date Fetching In NextJS 13

우선 fetch API를 사용한다고 한다. axios는 미뤄둬야겠다..

## `fetch`로 데이터 가져오기

> Next.js extends the native fetch Web API to allow you to configure the caching and revalidating behavior for each fetch request on the server. React extends fetch to automatically memoize fetch requests while rendering a React component tree.<br/>
> You can use fetch with async/await in Server Components, in Route Handlers, and in Server Actions.

React는 `fetch` 메서드를 확장했고, NextJS는 이를 렌더링하는 동안 `fetch` 요청을 자동으로 memoize한다고 한다.

```tsx
async function getData() {
  const res = await fetch('https://api.example.com/...');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  return <main></main>;
}
```

주의할 점은 API Routes는 리액트 컴포넌트 트리에 포함되지 않기에, 가져오기 요청이 memoize되지 않는다.

헤더와 쿠키에 관한 것도 다룰 수 있다.

## `Caching Data`

캐싱기능도 제공한다. 데이터를 메모리에 저장하기 때문에 요청할 때마다 데이터 소스에서 데이터를 다시 가져올 필요가 없다.

```js
// 'force-cache' is the default, and can be omitted
fetch('https://...', { cache: 'force-cache' });
```

POST methor를 사용한 경우, 캐시되지 않는다.

### 캐시된 데이터 유효성 검사

Revalidation은 데이터 캐시를 지우고 최신 데이터를 다시 가져오는 프로세스이다.

시간 기반 / 특정 이벤트를 기반으로 revalidate를 진행한다.

1. Time-baesd Revalidation

```js
fetch('https://...', { next: { revalidate: 3600 } });
```

아니면 어떤 페이지에서 이뤄지는 모든 `fetch`에 대한 캐싱 시간을 지정하려면,

```jsx
// ap/blog/page.js
export const revalidate = 3600; // 3600 second
```

정적 라우팅에서 유효 시간이 다른 캐싱 데이터들이 있다면, 가장 짧은 시간으로 동기화된다.

동적 라우팅에서는 각 유효 시간이 유효하여 독립적으로 revalidate가 진행된다.

2. On-demand Revalidation

tags를 지정하고, 해당 tag를 호출하는 경우에만 재검증이 이뤄진다.

```js
export default async function Page() {
  const res = await fetch('https://...', { next: { tags: ['collection'] } });
  const data = await res.json();
  // ...
}
```

재검증 로직 호출은 `revalidateTag(tag네임)`이나 `revalidatePath(path네임)`으로 호출한다.

중요한 것은, 재검증 중에 오류가 발생하면 마지막으로 성공한 데이터가 캐시된채로 제공된다.

### 대표적인 캐싱이 안되는 경우

1. `cache: 'no-store'`
2. `revalidate: 0`
3. `POST` 메서드를 사용하는 경우

### Multiple `fetch` Requests

여러 `fetch` 요청이 있는 경우, page 컴포넌트에서 모든 데이터 요청을 핸들링할 수 있다.

```jsx
// page.js
export const dynamic = 'force-dynamic';
```

## Data Fetching Patterns

### 순차적 데이터 fetching

```tsx
// ...

async function Playlists({ artistID }: { artistID: string }) {
  // Wait for the playlists
  const playlists = await getArtistPlaylists(artistID);

  return (
    <ul>
      {playlists.map((playlist) => (
        <li key={playlist.id}>{playlist.name}</li>
      ))}
    </ul>
  );
}

export default async function Page({ params: { username } }: { params: { username: string } }) {
  // Wait for the artist
  const artist = await getArtist(username);

  return (
    <>
      <h1>{artist.name}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Playlists artistID={artist.id} />
      </Suspense>
    </>
  );
}
```

이 경우, getArtist가 완료된 후에, Playlists 컴포넌트를 생성하기 위한 getArtistPlaylists가 실행된다.

하지만, Suspense를 통해 이미 렌더링된 요소들과 상호작용할 수 있게 할 수 있다.

### 병렬 데이터 fetching

`Promise.all`를 사용하는 것

```tsx
import Albums from './albums';

async function getArtist(username: string) {
  const res = await fetch(`https://api.example.com/artist/${username}`);
  return res.json();
}

async function getArtistAlbums(username: string) {
  const res = await fetch(`https://api.example.com/artist/${username}/albums`);
  return res.json();
}

export default async function Page({ params: { username } }: { params: { username: string } }) {
  // Initiate both requests in parallel
  const artistData = getArtist(username);
  const albumsData = getArtistAlbums(username);

  // Wait for the promises to resolve
  const [artist, albums] = await Promise.all([artistData, albumsData]);

  return (
    <>
      <h1>{artist.name}</h1>
      <Albums list={albums}></Albums>
    </>
  );
}
```

마찬가지로 Suspense를 사용하여 둘 중 하나가 먼저 나와도 상관없게 할 수 있다.

### preloading data

waterfall를 방지하기 위한 방법으로써, 선택적으로 preload 함수를 통해 병렬 데이터 fetching을 더욱 최적화할 수 있다.
이 방식의 장점은, Promise를 전달할 필요가 없다는 것이다.

```tsx
// components/item.tsx
import { getItem } from '@/utils/get-item';

export function preload(id: string) {
  // void evaluates the given expression and returns undefined
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void
  void getItem(id);
}
export default async function Item({ id }: { id: string }) {
  const result = await getItem(id);
  // ...
}

// app/items/[id]/page.tsx
import Item, { preload, checkIsAvailable } from '@/components/Item';

export default async function Page({ params: { id } }: { params: { id: string } }) {
  // starting loading item data
  preload(id);
  // perform another asynchronous task
  const isAvailable = await checkIsAvailable();

  return isAvailable ? <Item id={id} /> : null;
}
```

preload기능을 사용한 예시코드인데.. 잘 모르겠다.

우선, preload를 했다고 해서 getItem이 다시 실행되지 않지는 않는다. 그리고 checkIsAvailable가 나는 프레임워크라서 자동적으로 만들어지는 메서드인 줄 알았는데, 직접해보니까 아니였다.

그래서 어떻게 구현할까 계속 생각했는데, 다음과 같은 코드일 듯 싶다.

```jsx
// @/test/[id]/Item.tsx
let flag = false;

async function getItem(id: string) {
  // ...
  flag = true;
  // ...
}

export async function checkIsAvailable() {
  await new Promise((resolve) => {
    function checkFlag() {
      console.log('check');
      if (flag === true) {
        console.log('flag is true');
        resolve(true);
      } else {
        console.log('flag is false');
        setTimeout(checkFlag, 100);
      }
    }
    checkFlag();
  });

  return true;
}
```

그래서 최종적으로 고안해낸 코드는 다음과 같다.

```jsx
// @/test/[id]/Item.tsx
let flag = false;

async function getItem(id: string) {
  console.log('In getItem before promise');
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log('Promise in getItem');
      flag = true;
      resolve(id);
    }, 100);
  });
  console.log('In getItem after Promise');

  return id;
}

export const preload = (id: string) => {
  // void evaluates the given expression and returns undefined
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void
  console.log('In preload before getItem');
  void getItem(id);
  console.log('In preload after getItem');
};

export default async function Item({ id }: { id: string }) {
  console.log('Item component before getItem');
  const result = await getItem(id);
  console.log('Item component after getItem');

  return <div>{result}</div>;
}
```

그런데 preload를 했다고 해서 getItem이 두번 실행되지 않는 것은 아니었다.. preload를 하면 캐싱이 되어야하니까 fetch로 바꿔야될 듯하여, API routes를 해보기로 했다.

```tsx
// @/api/number/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  console.log(111111111);
  const time = new Date().getMilliseconds();

  return NextResponse.json({ time });
}

// @/test/[id]/Item.tsx
let flag = false;

async function getItem(id: string) {
  console.log('In getItem before promise');
  const time = await fetch('http://localhost:3000/api/number')
    .then((prev) => {
      console.log('fetch is done');
      return prev;
    })
    .then((prev) => prev.json());
  console.log('In getItem after Promise');
  flag = true;

  return `${id} ${time.time}`;
}
```

계속 고민해봤는데 잘 모르겠다..
