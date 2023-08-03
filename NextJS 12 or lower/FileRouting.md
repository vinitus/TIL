# 앱 라우팅을 하는 방법

NextJS에서는 react-router-dom 라이브러리를 사용할 필요가 없다고 하였다. 어떻게 라우팅을 할까?

폴더와 파일에 기반하여 라우팅을 한다.

### 예시

src라는 폴더가 있다.

![image](https://github.com/vinitus/TIL/assets/97886013/ba628040-0183-4336-bd9e-13ef84ce4cff)

해당 폴더는 React의 컴포넌트들이 담길 파일이다. 여기서 page.js라는 파일을 만든다.

![image](https://github.com/vinitus/TIL/assets/97886013/a3d1e2ce-e1b8-427d-b412-9c94c47d4aea)

이렇게 된다면, 이는 우리의 도메인으로 접속하면 page의 컴포넌트가 렌더링된다.
즉, page.js는 해당 디렉토리의 기본 컴포넌트이다.

<br>

여기서 1.js라는 파일을 만든다면, domain/1에 접속하면 1.js의 컴포넌트가 렌더링된다.

![image](https://github.com/vinitus/TIL/assets/97886013/3d9daa4a-b26c-4358-b2a1-7ed5c1c74592)

<br>

post라는 폴더를 만들고 page.js를 만들면, domain/post 에 접속하면 page.js의 컴포넌트가 렌더링된다.

![image](https://github.com/vinitus/TIL/assets/97886013/101f6a56-019a-46f7-8183-98adadb879a1)

1을 만들면, domain/post/1로 접속할 수 있다.

<br>

여기까지가 기본 라우팅이다.

## 동적 라우팅

백엔드에서 데이터를 가져와서 블로그 글을 렌더링하는 페이지가 있다고 가정해보면, 이를 어떻게 해야할까?

보통 DB에 저장된 글의 데이터의 pk 번호를 가져와서 url에 할당할 것이다.
만약 1, 2번 포스트 글이 있다면 -> domain/post/1 or domain/post/2로 접속할 수 있다.

그렇다면 NextJS에서

![image](https://github.com/vinitus/TIL/assets/97886013/39b1cf0a-6e1b-4549-9678-ae875b16810d)

이렇게 해야할까? 포스트마다 하나씩 추가하는 것이다. 근데 지금은 2개지만 2000개라면??

이를 해결해 주는 것이 동적 라우팅이다.

### 파일에 라우팅 설정

post/1,2,3,4 ...을 라우팅하려면 방법이 총 두가지가 있는데, 일단 이 파일에 대한 라우팅이다.

위의 그림에서 1.js, 2.js를 없애고 [postNumber].js라는 파일을 만들어주면 된다.

![image](https://github.com/vinitus/TIL/assets/97886013/31c437b8-1711-416e-812c-7307b01dfd5a)

이렇게 한다면, domain/post/1은 물론 10000까지도 가능하다.

대괄호 사이의 이름은 변수명이다. 즉, 컴포넌트 안에서 useRouter를 사용하고 이를 사용할 수 있다.

```javascript
import { useRouter } from 'next/router';

const Post = () => {
  const router = useRouter();
  const { postNumber } = router.query;
  ...
};
```

이렇게 해서 우리가 대괄호 사이에 넣어둔 변수명을 꺼내서 사용할 수 있다. domain/post/1로 갔으면 1이 될 것이고, new라면 new가 될 것이다.

### 폴더에 라우팅하기

이번에는 폴더이다. 위의 예시대로 해도 되지만, 다른 예시가 좀 더 적절하다고 생각한다.

블로그 글을 요리와 프로그래밍으로 분류하려고 한다. 그리고 new라는 것을 통해서 새로운 포스트를 만들고자 한다.

이러면 어떻게 할까?

1. src/post 디렉토리까지는 고정으로 가져가고 싶다.
2. food와 programming이라는 폴더를 또 생성한다.
3. 그리고 new라는 파일을 통해 해당 글을 생성하는 페이지를 렌더링할 것이다.

결과적으로 domain/post/food/new, domain/post/programming/new 두 가지가 접속가능해야한다.

![image](https://github.com/vinitus/TIL/assets/97886013/8f617a4d-0085-4153-84b8-f89a799de90a)

이렇게 될 것이다. 근데 내 블로그가 엄청 커져서 다양한 것을 다룬다. 컴퓨터 부품이라던가, CS 지식이라던가, 자동차라던가, 프로그래밍을 node, react, next로 나누게 되었다.
즉, 카테고리를 막 수정하고 추가하고 삭제해야한다면 우리는 이럴때마다 NextJS 프로젝트에서 폴더를 계속 삭제하고 추가하고 수정해야할까?

이를 해결하기 위한 것은 바로 폴더 라우팅이다. 파일 라우팅과 마찬가지로 대괄호 안에 변수명을 작성하여 폴더 기반 동적 라우팅을 생성할 수 있다.

![image](https://github.com/vinitus/TIL/assets/97886013/cfef7fc2-0cbe-4387-a910-578242ced395)

이렇게 하면 domain/post/아무거나/new로 접속할 수 있고, new.js에 해당하는 컴포넌트가 렌더링된다.

여기서, 해당 카테고리에서 동적 라우팅을 통해 블로그 글을 볼 수 있는 페이지를 만드려면, 아까와 같이 파일 기반 동적 라우팅을 설정하면 된다.

![image](https://github.com/vinitus/TIL/assets/97886013/d8078bd3-ec02-4806-82c0-7e4688bd1002)

이렇게 하면 domain/post/[category]/[postNumber]으로 접속할 수 있게 된다.

<br>

여기까지 공부하다가 갑자기 아까 예시에서 궁금점이 생겼다. 아까도 그럼 \[postNumber] 디렉토리를 만들고 page.js로 파일을 생성하면 되는 것 아닌가??? 라는 생각이 들었다.

**? post/[postNumber]/page.js와 post/[postNumber].js의 차이**

일단 가장 궁금했던 성능상의 차이는 찾지 못했다. 내가 검색 실력이 부족한 것일 수도 있다..

일단 파일 기반의 라우팅을 하게 된다면, 그 이후에 어떤 것도 오지 못한다는 것이 된다. 그러니까, post/[postNumber]을 하면 pathname에 어떤 것들이 추가되더라도 의미가 없는 것이다.

반면에 폴더 기반 라우팅을 하게 된다면, pathname에 다른 경로가 추가되면 이에 반응할 수 있다.

아까 말했던 new를 추가한다거나, 혹은 domain/post/1/update 같이 수정 페이지에 진입하는 것으로 분기를 잡을 수 있다.

즉, 추가 라우팅 뒤에 무언가를 해야한다면 반드시 폴더 라우팅을 해야하지만, 그게 아니라면 팀의 컨벤션을 따르는 것이 낫다고 생각한다.

## 동적 라우팅의 전개식

배열이나 Object 형태에서 전개연산자를 통해서 배열을 복사하듯이, 동적 라우팅에서 사용할 수 있다.

![image](https://github.com/vinitus/TIL/assets/97886013/71b6331c-cd1a-4bba-a915-fd0a4fb7a55e)

이렇게 하면, domain/post/20230803 으로 접속하게 되면, [...YYYYMMDD].js 컴포넌트에 할당되는 것은 당연하다.

하지만, domain/post/2023/08/03으로 접속하게 되어도 [...YYYYMMDD].js 컴포넌트가 렌더링된다.
