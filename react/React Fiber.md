[https://blog.mathpresso.com/react-deep-dive-fiber-88860f6edbd0](https://blog.mathpresso.com/react-deep-dive-fiber-88860f6edbd0)

공식문서에서 링크된 [깃허브 글](https://github.com/acdlite/react-fiber-architecture) 보다가 이 글이 너무 좋아서 이 글을 메인으로 대체!

![image](https://github.com/vinitus/TIL/assets/97886013/454654e7-ff42-459b-a081-593a4aabc23c)

react fiber의 시작 PR...

### incremental rendering(증분 렌더링)

렌더링에 있어서 싱글스레드 언어인 JS가 비동기처럼 동작하기 위해서 오래걸리는 것을 먼저 처리하기 위해 우선순위를 정하는 것

리액트의 다자인 원칙 글에서 리액트는 pull 스케쥴링을 채택하고 있다고 하였다.  
push 스케쥴링은 요청이 들어오는 즉시 처리되기에, 오래걸리는 작업이 들어 뒤에 여러 작업들이 남아있다면 UX적인 측면에서 좋지 못하다.  
반면, 풀 스케쥴링의 이점은 업데이트가 처리되는 시기와 방법을 더 잘 제어할 수 있다는 것이다. 즉, 우선순위를 지정하기 위해서 채택하는 것이다.

### Reconciliation 재조정

reconciliation - 새로 만들어진 가상 돔 트리와 기존의 가상 돔 트리와 비교한 후 바뀐 부분을 감지하는 것이다.  
render - reconciliation 후 변경된 사항을 실제 DOM 요소에 반영하는 작업

이 두 가지 작업을 해주는 reconciler와 renderer의 모듈이 분리되어있기 때문에 리액트와 리액트 네이티브는 같은 reconciler 코어를 사용하고 다른 renderer 모듈을 사용할 수 있다. -> RN 때문에 분리한 것 같음

### 리액트 파이버 이전의 reconciler

Stack reconciler가 사용되었다. 이는 push 스케쥴러 기반이며, reconciliation과 render 모두를 동기적으로, 한번에 처리했다. 때문에 가벼운 작업 후 오래걸리는 작업이 있다면, 버벅이는 느낌이 들게 하였다.  
또한, 트리 탐색에 있어서 재귀 DFS로 탐색하며 깊은 콜 스택을 만들기도 하였기에 이 중첩된 콜 스택이 끝나기 전에는 이벤트 루프가 마비되기도 했다.

### 리액트 파이버

리액트 팀에서 2년에 걸쳐 재작성한 리액트 코어의 reconciler 알고리즘

pull 스케쥴러를 선택하며, incremental rendering이 가능해지고 렌더링 작업을 잘개 쪼개어 실행할 수 있게 되었다.  
그래서 우선순위를 매겨가며 잘개 쪼개진 작업들을 멈추거나 다시 진행시킬 수 있게 되었다.

Fiber는 Fiber 트리에서는 각 노드가 return, sibling, child 포인터 값을 사용하여 체인 형태의 singly linked list를 이룬다.  
그렇기에, 깊이 우선 탐색이 아닌 Fiber 노드의 각 포인터를 통해서 이동하기 때문에, 도중에 작업이 멈춰도, 지금 작업 중인 Fiber노드만 알고 있다면 다시 돌아와서 재개할 수 있다.

그렇게 탐색하면서 Fiber는 Fiber 노드들의 변경사항에 대한 정보를 저장하고, 모든 탐색 종료 후 commit 단계에서 렌더링에 반영한다. 이렇게 Fiber reconciler는 제어 가능한 가상 스택 프레임 구조를 만들어서 작업을 잘게 나누어 실행한다.

### 파이버 알고리즘

Phase 1  
화면에 반영되진 않은 Fiber 트리와 화면에 반영된 Fiber 트리를 비교하고 변경된 이펙트들을 수집하는 작업  
Phase 1은 중간에 멈추고 재개할 수 있기에 Fiber 트리를 비교하는 동안 수시로 멈춰서 메인 스레드에 user input, animation 같은 더 급한 작업이 있는 확인 해가며 실행

\-> 때문에 아무리 트리가 커도 비교 작업이 메인 스레드를 막을 걱정이 없다.  
Phase 1의 목적은 이펙트 정보를 포함한 새로운 fiber 트리를 만들어내는 것!

Phase 2 Commit  
Phase 1에서 만든 트리에 표시된 이펙트들을 모아 실제 DOM에 반영하는 작업  
이 단계는 동기적으로 일어지기 때문에 일시 정지하거나 취소할 수 없다.

---

링크의 글이 코드까지 보고 설명해주시면 자세하게 적어주셨다. 나는 그렇게 까지 깊게 공부할 수는 없다 ㅠㅠ 취준생이니깐..

후에 시간이 된다면, 꼭 이해해보고 싶다..

정리

1. 리액트 파이버 이전의 reconciler는, push 스케쥴링 방식으로 인해, 모든 작업들을 콜 스택에 들어오는 순서대로 처리해야만 하여, 오래걸리는 작업이 있다면 버벅이는 느낌을 줄 수 있었다.

2. 리액트 파이버는 pull 스케쥴링 방식으로 인해, 작업의 우선순위를 매기고 오래걸리는 순서대로 처리할 수 있다.

3. 리액트 파이버는 링크드 리스트를 활용하기에, 도중에 멈춰도 다시 탐색이 가능하여서 수시로 멈춰서 user input, animation 같은 작업의 유무를 체크하면서 Fiber 트리를 탐색할 수 있다.

#### **reference**

[https://blog.mathpresso.com/react-deep-dive-fiber-88860f6edbd0](https://blog.mathpresso.com/react-deep-dive-fiber-88860f6edbd0)

[https://github.com/acdlite/react-fiber-architecture](https://github.com/acdlite/react-fiber-architecture)
