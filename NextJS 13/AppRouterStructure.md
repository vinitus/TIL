App Router에서 어떤 컴포넌트들이 폴더의 하위에 적용되는가

# App Router's file

그 전에 앞서, page router와는 다르게 파일명은 이제 라우팅의 분기가 될 수 없다. 폴더명만이 분기가 된다. 즉, app/hi/hello/page.tsx가 domain/hi/hello url에서 렌더링되는 컴포넌트이다.

Next.JS 팀은 url의 pathname에서 슬래쉬(/)를 기준으로 `url 세그먼트`로 나눴다. 각 세그먼트는 폴더명만이 올 수 있다.

### 1. page

페이지는 세그먼트 경로에 고유한 UI

**\<head> 태그 수정하기**

```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next.js',
};

export default function Page() {
  return '...';
}
```

### 2. layout

세그먼트 및 해당 하위에 대한 공유 UI
탐색 시 레이아웃은 상태를 유지하고 대화형 상태를 유지하며 다시 렌더링하지 않는 특징
그리고 레이아웃은 중첩될 수 있다.

```tsx
export default function Blog({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <nav />
      {children}
    </section>
  );
}
```

**2-1. Root Layout**

가장 최상위 루트의 Layout을 Root Layout이라고 한다. 즉, 모든 app 경로의 하위 세그먼트들에 전부 적용된다.

1. Root 레이아웃을 사용하면 서버에서 반환된 초기 HTML을 수정할 수 있다.
2. \<head> \<title>을 통해서 SEO 최적화를 할 수 있다.

**2-2. Nested Layout**

![image](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fnested-layouts-ui.png&w=1920&q=75&dpl=dpl_46ncsoiUzpeReYYC8yec1ZDMzFik)

> 출처 : [Next.JS 공식문서](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)

이렇게 중첩된 레이아웃이라면, 어떤 layout 내에서 특정 부분을 다른 layout을 통해서 UI를 구성할 수 있다.

### 3. template

전문적으로 다시 렌더링된 레이아웃 UI

템플릿은 각 하위 레이아웃 또는 페이지를 래핑한다는 점에서 레이아웃과 유사
하지만, 레이아웃은 경로 간에 유지되고 상태를 유지하나, 템플릿은 탐색 시 각 자식에 대해 새 인스턴스를 만듬

언제써야할까? 왜 써야할까?

> CSS 또는 애니메이션 라이브러리를 사용하여 애니메이션을 시작/종료합니다.
> useEffect(예: 페이지 보기 기록) 및 useState(예: 페이지별 피드백 양식) 에 의존하는 기능 .
> 기본 프레임워크 동작을 변경합니다. 예를 들어 레이아웃 내부의 서스펜스 경계는 페이지를 전환할 때가 아니라 레이아웃이 처음 로드될 때만 폴백을 표시합니다. 템플릿의 경우 각 탐색에 폴백이 표시됩니다.

NextJS 팀에서 이렇게 말했다. 거기에 추가로,

> 권장 사항: 템플릿을 사용해야 하는 특별한 이유가 없다면 레이아웃을 사용하는 것이 좋습니다.

이러니깐, 사용해보면서 알아봐야할 듯

### 4. not-found

세그먼트 및 해당 하위에 대한 UI를 찾을 수 없음

### 5. error

세그먼트 및 해당 하위에 대한 오류 UI

### 6. global-error

전역 오류 UI

### 7. route

서버 측 API 끝점

### 8. loading

세그먼트 및 해당 하위에 대한 UI 로드

로딩이라는 이름에 걸맞게 로딩 중에

### 9. default

병렬 경로 에 대한 폴백 UI
