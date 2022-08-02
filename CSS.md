# CSS

스타일을 지정하기 위한 언어

1. 선택하고
2. 스타일을 지정한다.

### inline

<tag attribute=””></tag>

### 내부참조

<style></style>

### 외부참조

<link rel="stylesheet" type="text/css" href="/css/style.css"/>

## 선택자 유형

1. 기본선택자
2. 결합선택자
3. 의사 클래스/요소

⭐결합자

1. 자손 결합자

```markup
<style>
  A B {
    
  }
</style>

A 하위의 모든 B
-> 바로 아래가 아니여도 상관없음
```

1. 자식 결합자

```markup
<style>
  A > B {
    
  }
</style>

A 하위의 바로 아래 B
-> 바로 아래에 다른 태그가 오면 적용 안됨
```

1. 일반 형제 결합자

```markup
<style>
  A ~ B {
    
  }
</style>

A 형제의 모든 B
-> 바로 뒤의 형제가 아니여도 상관없음
```

1. 인접 형제 결합자

```markup
<style>
  A ~ B {
    
  }
</style>

A 형제의 바로 뒤 B
-> 바로 뒤에 이상한거 오면 적용 안됨
```

### CSS 적용 우선순위 ⭐

1. !import
2. 인라인
3. id
4. class, 속성
5. 요소

### CSS의 상속

되는거 - text관련요소

안되는거도 있음

### 크기단위

1. px(픽셀) → 고정적인 단위
2. % → 가변적인 단위
3. em → 상속 사이즈에 영향을 받음
4. rem → 상속영향을 받지 않고 최상위 요소 사이즈 기준 배수 단위

vw ← viewport의 width * 0.01

vh ← viewport의 height * 0.01

vmin ← 최소

vmax ← 최대

## Box model

왼쪽 상단에서 오른쪽 아래로 정렬 = normal flow

maring = 박스와 박스 간의 간격

border = 테두리

padding = 테두리와 content간의 간격

content = 내용

⭐⭐⭐

margin → 시계방향

1개면 상하좌우

2개면 상하 - 좌우

3개면 상 - 좌우 - 하

4개면 상 - 우 - 하 - 좌

### box-sizing

content의 크기가 100이 아니라 border까지 box의 크기를 100으로 하고싶다면!

border-box로해야함

### inline, block 요소

inline ⇒ 한 줄을 차지하는게 아닌 남은 공간을 차지하는 것

block ⇒ 한 줄 자체를 차지해버림

display : block

1. **block의 width를 지정해줄 경우 남은 자리는 margin으로 차지해버림**

inline : width, height 지정 불가

inline-block → 블록, 인라인 레벨요소 특징을 모두 가짐

inline처럼 한 줄에 표시할 수 있으면서 block의 width,height,margin 속성 지정이가능

⭐ display : None

화면에 표시도 안하고 공간조차 부여되지않고 생성도 안됨

visibilty : hidden → 공간은 차지하고 표시만 안됨

### CSS Position⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

[https://developer.mozilla.org/ko/docs/Web/CSS/position](https://developer.mozilla.org/ko/docs/Web/CSS/position)

static 그냥 정적임

relative 자신이 있던 공간도 차지하면서 위치만 이동

absolute normal flow에서 벗어나서 부모 기준 위치로 옮겨감

sticky 모니터에 스티커 붙은 것 처럼 안떨어짐