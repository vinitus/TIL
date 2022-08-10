# search

원하는 항목을 찾는 작업

탐색 키 : 자료를 구별하여 인식할 수 있는 키

순차검색, 이진검색, 해쉬

### 순차검색

일렬로 되어 있는 자료를 순서대로 검색

순차 구조로 구현된 자료구조에서 유용, 구현이 쉬움

but 검색 대상 수가 많으면 수행시간이 급격히 증가하여 비효율적

**검색과정**

첫번째 원소부터 순서대로 검색 대상과 키 값이 있는지 비교

동일한 원소를 찾으면 인덱스 반환

끝까지 갔는데 못찾으면 실패

⭐ 평균 비교 횟수 = (n+1), 시간 복잡도 = O(n)

```python
def seq(a,n,key):
	i = 0
	while i < n and a[i] != key:
		i += 1
		if i < n:
			return i
		else:
			return -1
```

정렬된 경우는 key값보다 큰 값에 도달할 때까지 못찾으면 종료

좀 더 효율적임

```python
def seq(a,n,key):
	i = 0
	while i < n and a[i] < key:
		i += 1
		if i < n and a[i] == key:
			return i
		else:
			return -1
```

## 이진탐색

자료의 가운데에 있는 항목의 키 값과 비교하여 다음 검색의 위치를 결정하고 검색을 진행

범위 줄이기

⭐ 자료가 정렬된 상태여야만 할 수 있음

1. 자료 중앙에 있는 원소를 고르고 목표 값과 비교
2. 크다면 오른쪽으로 작다면 왼쪽 방향의 반에 대해서 1부터 다시시작

```python
def binarySearch(a, N, key):
	start = 0
	end = N-1
	while start <= end:
		middle = (start + end) // 2
		if a[middle] == key:
			return True
		elif a[middle] > key:
			end = middle - 1
		else:
			start = middle + 1
	return False

def binarySearch2(a, low, high, key):
	if low > high:
		return False
	else:
		middle = (low + high) // 2
		if a[middle] == key:
			return True
		elif a[middle] > key:
			return binarySearch2(a, low, middle - 1, key)
		elif a[middle] < key:
			return binarySearch2(a, middle + 1, high, key)
	return False
```

### 인덱스

database에서 유래함. 테이블에 대한 동작 속도를 높여주는 자료 구조

id와 name과 number을 요소로 같는 데이터가 있으면

각각을 배열로 만들고 인덱싱을 통해 연결해주면 됨

대각선 탐색

```python
s1 = s2 = 0
for i in range(N):
	s1 += arr[i][i]
	s2 += arr[i][N-1-i]
```

대각선 탐색 한줄씩

```python
s = [0] * (2 * N - 1)
for i in range(N):
	for j in range(N):
		s[i+j] += arr[i][j]

print(s)
```

.