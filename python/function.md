## 함수

함수를 사용하는 이유!

Decomposition - 기능을 분해하고! 재사용 가능하게 만들고!

선언

```python
def 함수이름(파라메터):
	내용
```

호출

```python
함수이름(파라메터)
```

### 함수의 종료

함수가 종료됐을 때 return값이 따로 주어지지 않는다면 None을 반환하며 끝이남

함수 도중에 return이 나오면 함수가 바로 종료

```python
return x, y <- x y를 동시에 return하기 위해 튜플 형태로 리턴
```

### 함수의 입력

paramater : 함수 정의시 함수 내에서 사용되는 변수

argument : 함수를 호출할 때 넣어주는 값

```python
def Spam_is_dinner(tmp):     # tmp는 parameter
	return tmp
Spam_is_dinner('spam')       # 'spam'은 argument
```

### keyword argument

keyword argument 다음에 positinal argument 불가

```python
def add(x+y):
	return x+y
add(x=2,y=5) # OK
add(2,y=5) # OK
add(x=2,5) # ERROR
```

### 가변인자 *args

가변인자란 여러개의 positional arg를 하나의 필수 parameter로 받아서 사용

→ 언제 몇개의 positional arg를 받아야할지 모를 때 사용

```python
def add(*args):
	result = 0
	for arg in args:
		result += arg
	return result
add(2) # OK
add(2,3,4,5) # OK
```

### 패킹 언패킹

```python
numbers = (1,2,3,4,5) # 패킹
a,b,c,d,e = numbers   # 언패킹
a,*rest,e = numbers   # 언패킹 with 가변인자
```

### 가변 키워드 인자

**kwargs

```python
def family(**kwargs):
	for key, value in kwargs.item():
		print(key, ":", value)
family(father = "아버지", mother = "어머니")

# father : 아버지
# mother : 어머니
```

*args와 **kwargs는 같이 받을 수 있음

## Scope

함수는 코드 내부에 local scope(함수가 만든 것이기에 함수 내부에서만 접근)를 생성

그 외에는 global scope(코드 어디에서든 참조 가능)로 구분

### 변수의 수명

built-in : 파이썬 실행 후 영원히 유지

global scope : 모듈이 호출된 이후 인터프리터가 끝날 때(실행이 끝날 때)까지 유지

local scope : 함수 호출 ~ 종료

```python
print(sum(range(2))) # 함수인 sum (built-in)
sum = 5              # 변수가 되어버린 sum (global scope)
print(sum(range(2))) # int 변수에 range()를 쓸 수 없슴
```

우선 순위 : local > enclosed(지역 범위 한단계 위) > global > built-in

### global

local scope인 함수 내에서 global scope인 바깥의 변수를 사용하거나 수정하고 싶을 때

global 변수명을 통해 global 변수를 사용하겠다 선언!!

```python
a = 10
def a_fun():
	global a
	a = 3

print(a) # 10
a_fun()
print(a) # 3
```

### nonlocal

global을 제외하고 가장 가까운 scope의 변수를 연결

### map

map(function, iterable)

### filter

filter(function, iterable)

순회 가능한 데이터 구조의 모든 요소를 함수에 적용하고 True인 요소를 반환

### zip

복수의 데이터구조를 모아 튜플을 원소로하는 zip object 반환

```python
a = [1,2]
b = [3,4]
ab = list(zip(a,b))
print(ab)    # [(1,2),(3,4)]
```

### lambda

```python
def add(a,b):
	return a+b
add = lambda a, b : a + b
```

## 재귀 함수

자기 자신을 호출하는 함수

무한한 호출이 목표가 아님
