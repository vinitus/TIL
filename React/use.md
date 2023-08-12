사실 조금 복잡해서 미뤄뒀는데.. NextJS에서 자꾸 나와서 공부해야함 ㅋㅋ

# React Server Component

우선, 가장 중요한 것

> Adds first class support for reading the result of a JavaScript Promise using Suspense:

Suspense 기능을 사용하여 자바스크립트의 Promise의 결과를 읽기 위한 일급 지원을 추가한다.

라이브러리에서 말하는 일급 지원은, 해당 라이브러리의 핵심 기능이다. 즉, Suspense에 Promise에 관련된 일급 지원을 추가한다는 것이다.

이 글은 두가지 기능에 대한 소개를 하고 있다.

> - Introduces support for async/await in Server Components. Write Server Components using standard JavaScript await syntax by defining your component as an async function.

서버 컴포넌트를 비동기 함수로 정의하여 async/await를 사용할 수 있다는 것

> - Introduces the use Hook. Like await, use unwraps the value of a promise, but it can be used inside normal components and Hooks, including on the client.

`use` 훅을 소개한다고 한다. 이건 await와 유사하지만, 일반 컴포넌트와 Hook에서 사용가능하다고 한다.
<br />
하지만, 캐싱을 사용하진 않는다고 한다. 추후에 `Cache API`로써 추가할 예정이지만, 지금 당장은 React의 server component에는 해당하지 않는다.

## basic example

```jsx
// This example was adapted from the original Server Components RFC:
// https://github.com/reactjs/rfcs/pull/188
async function Note({ id, isEditing }) {
  const note = await db.posts.get(id);
  return (
    <div>
      <h1>{note.title}</h1>
      <section>{note.body}</section>
      {isEditing ? <NoteEditor note={note} /> : null}
    </div>
  );
}
```

> This is the recommended way to access asynchronous data on the server.

리액트 팀은 이것이 서버의 비동기 데이터에 접근하는 권장하는 방법이라고 말하고 있다. 하지만 이에 한계가 있다고 한다. **Hook에 접근할 수 없다는 것**

그래서 이를 `use`라는 훅을 통해서 해결하고자 하였다.

> You can think of use as a React-only version of await

`use`를 await의 react 버전이라고 말하고 있다. await가 비동기 함수 내에서만 사용할 수 있는 것처럼, `use`도 리액트 컴포넌트와 훅 안에서 사용할 수 있다.

> use has a special ability that other Hooks do not — calls can be nested inside conditions, blocks, and loops. This allows you to conditionally wait for data to load without splitting your logic into separate components:

이 `use`는 다른 hook들과는 다르게 조건문, 반복문, 다른 함수 블록 안에서 사용할 수 있다고 한다.

```jsx
function Note({ id, shouldIncludeAuthor }) {
  const note = use(fetchNote(id));

  let byline = null;
  if (shouldIncludeAuthor) {
    const author = use(fetchNoteAuthor(note.authorId));
    byline = <h2>{author.displayName}</h2>;
  }

  return (
    <div>
      <h1>{note.title}</h1>
      {byline}
      <section>{note.body}</section>
    </div>
  );
}
```

이를 통해, promise가 resolve될 때까지 컴포넌트의 실행을 묶을 수 있다.

## [Motivation](https://github.com/acdlite/rfcs/blob/first-class-promises/text/0000-first-class-support-for-promises.md#motivation)

링크 클릭 가능 -> react 팀의 github 페이지로 이동

너무 좋은 글인데, 너무 길어서 인상 깊은 내용 하나만 인용해오기로 했음

> ... <br />However, there is no single implementation of a React architecture, and the React ecosystem has benefited from innovation that happens in third-party libraries and frameworks. If React makes too many assumptions about how data fetching should work, it could inhibit the best solutions from emerging in userspace. On the other hand, if React makes too few assumptions, we forfeit our ability to make across-the-board improvements for everyone.
> ...

리액트 하나만으로 만든 웹 어플리케이션은 존재하지 않고, 리액트는 서드파티 라이브러리들과 프레임워크의 발전 속에서 많은 혜택을 받아왔다. 여기서 리액트가 데이터 불러오기 방식에 너무 많은 가정(제약)을 한다면, 개발자(userspace)들이 최상의 솔루션을 개발하기 어려울 수 있다. 반면에 React가 너무 적은 가정(제약)을 한다면, 모든 개발자를 위한 전반적인 성능을 개선하기 힘들어질 것이다.

## Detailed design

### reference

[https://github.com/acdlite/rfcs/blob/first-class-promises/text/0000-first-class-support-for-promises.md](https://github.com/acdlite/rfcs/blob/first-class-promises/text/0000-first-class-support-for-promises.md)
[위키피디아 일급 객체](https://ko.wikipedia.org/wiki/%EC%9D%BC%EA%B8%89_%EA%B0%9D%EC%B2%B4)
