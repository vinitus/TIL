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
