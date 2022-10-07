# Django Design Pattern
다리를 지을 때 자주 사용되는 방식을 이용해서 다리들을 만드는 것처럼
프로그래밍에서는 이러한 유사점을 **패턴**이라고 함

# 장고의 디자인 패턴

**MVC 디자인 패턴**을 기반으로 한 **MTV** 패턴이다.

### MVC 디자인 패턴

Model - View - Controller의 줄임말

1. model : 데이터와 관련된 로직을 관리
2. view : 레이아웃과 화면을 처리
3. controller : 명령을 model과 view 부분으로 연결

### MTV 디자인 패턴

Model - Template - View

1. model : **데이터**와 관련된 로직을 관리 - DB
2. template : 레이아웃과 **화면**을 처리- HTML,CSS
3. view : 명령을 model과 view 부분으로 **연결** - 중계자