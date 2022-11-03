<head>
<link href="../css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
</head>
# bootstrap

### CDN

Content Delivery(Distribution) Network

컨텐츠를 효율적으로 전달하기 위해 여러 노드에 가진 네트워크에 데이터를 제공하는 시스템

python의 import와 유사하다

## Bootstrap 기본 구조

spacing - class='{property}{sides}-{size}'  속성을 어느 방향으로 얼마나 줄것인가

m - margin, p - padding

t - top, b - bottom, s - start(left), e - end(right), x - 가로, y - 세로, blank - 4방향다

**0.25rem??**

1rem = 16px, 0.25rem = 4px

1 - 0.25rem, 2 - 0.5rem, 3 - 1rem, 4 - 1.5rem, 5 - 3rem

- example : mx-auto - 수평 중앙 정렬

**color**

bg or text-primary : 파란색

**Text**

text-start,conter,end → 정렬

text-color → 글자색

a태그의 링크 없애기 : class=”text-decoration-none”

fw-bold → 굵기를 굵게

fst-itelic → font style

### position
position-(static, relative,absolute,fixed,sticky)

**arange element**
★부모가 static이 아니여야함
top start bottom end

box fixed-(top, bottom)

__relative - absolute를 부모, 자식간에 써줘야 자식 요소는 부모 요소 내에서 움직임__

### display
d-(inline,block 등등)
inline=요소의 크기만큼 박스 크기가 설정됨

breakpoint를 활용한 반응형 display

### Component
Button
```html
<div class="btn btn-light btn-outline-black">light</div>
```

Dropdown

Form

Carousel 캐러셀
이미지 넘기기

Modal - pop-up창과는 다르게 다른 곳을 클릭해도 닫힘

card

## Grid system
column : 실제 컨텐츠를 포함하는 부분
gutter : 칼럼과 칼럼 사이의 공간
container : column들을 담고 있는 공간

__12개의 col과 6개의 grid breakpoint__

### grid system breakpoints
각각의 breakpoint에서 다르게 동작하는 시스템
xs - 0이상
sm - 576 이상
md - 768 이상
lg - 992 이상
xl - 1200 이상
xxl - 1400 이상

col-n => 12개의 파티션 중 n만큼을 가짐
하나의 row안에 n의 합이 12를 초과하면 다음 줄로 넘어감

하나의 row,col 안의 row,col
바깥의 grid 영역 내에서 다시 12분할 하는거임

offset => 왼쪽부터 비우고 싶은 영역

