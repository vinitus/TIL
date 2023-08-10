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

## 8월 12일 헤매던 내용 정리..

1. 서버컴포넌트란 정확하게 무엇일까

서버에서만 작동하는 컴포넌트이다. 근데 훅을 못쓴다. 이럴꺼면 리액트를 왜사용하지?

2. use 훅이란 무엇일까

서버컴포넌트에서만 작동하고, 다른 훅을 사용할 수 없다면 왜쓰지?

3. 이벤트리스너도 사용할 수 없다.

이러면 리액트를 왜사용하지?
