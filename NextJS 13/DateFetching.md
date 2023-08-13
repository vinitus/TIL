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
