# DFS 깊이우선탐색
1. 시작 정점의 한 방향으로 갈 수 있는 곳까지 깊이 탐색
2. 막히면 마지막에 만난 갈림길 정점으로 돌아가서 다른 방향으로 탐색
3. 이렇게 모든 정점을 방문하는 순회방법
-> 가장 마지막에 만난 갈림길의 정점으로 돌아감 = STACK
```python
adjList = [[1,2],
            [0, 3, 4],
            [1, 5],
            [1, 2, 5],
            [3, 4, 6],
            [5]]

def dfs(v, N):
    visited = [0] * N
    stk = [0] * N
    top = -1
    visited[v] = 1
    while True:
        for w in adjList[v]:
            if vsited[w] == 0:      # 방문 안한 정점이 있다면
                top += 1            # push v
                stk[top] = v
                v = w               # w에 방문했다
                visited[w] = 1
                break
        else:
            if top != -1:           # 스택이 비어있지 않으면
                v = stk[top]        # pop
                top -= 1
            else:                   # 스택이 비었으면
                break
```
0부터 V번까지, E개의 간선
```python
V, E = map(int,input().split())
N = V + 1
adjList = [[] for _ in range(N)]
for _ in range(E):
    a,b = map(int, input().split())
    adjList[a].append(b)
    adjList[b].append(a)

visited = [0] * N
stk = [0] * N

```