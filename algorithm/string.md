# 문자열
문자열은 기본적으로 메모리에 저장됨
문자를 그대로 저장하는 것이 아니라 대응되는 숫자를 정해 놓고 이것을 메모리에 저장하는 방법

__영어__는 대소문자 합쳐서 52 -> 6비트면 모두 표현가능

__ASCII__ 는 영어 문자 인코딩 표준

__UNICODE__ 는 다국어 처리 표준

### 유니코드
바이트 순서에 대해 표준화하지 못함
1. UTF-8 => web(8~32)
2. UTF-16 => windows,java(16~32)
3. UTF-32 => unix(32)

### python에서 문자열 처리
char타입 없음
+, * 연산자

```python
replace, split, isalpha, find
```

문자열 뒤집기
```python
s[::-1]
lst.reverse
new_s = ''
for i in range(len(s)-1,-1,-1):
    new_s += s[i]
for ch in s:
    new_s = ch + new_s
```

문자열과 자연수 사이의 변환
```python
def atoi(s):
    i = 0
    for x in s:
        i = i*10 + ord(x) - ord('0')
    return i

def itoa(i):
    a = ''
    while i > 0:
        a = chr(ord('0') + (i % 10)) + a
        i //= 10
    return a
```

### 고지식한 패턴 검색 알고리즘
Brute Force
처음부터 끝까지 전부 탐색

시간복잡도
최악 : O(MN)

### KMP 알고리즘
1. 패턴 전처리를 통한 탐색 시작 최소화 
2. 불일치가 발생한 텍스트의 위치를 기억하고 불필요한 매칭을 수행하지 않음
시간복잡도 : O(M+N)

### 보이어-무어 알고리즘
1. 패턴의 오른쪽 끝 문자와 본문을 비교
2. 만약 본문의 문자가 패턴내의 문자와 일치하면 오른쪽기준 index만큼 이동
3. 그것도아니면 패턴의 길이만큼 이동
4. 일치하면 패턴 전체 비교