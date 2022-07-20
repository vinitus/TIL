## 제어문

파이썬은 기본적으로 위에서 아래로 차례대로 명령 수행

### 조건문

참 / 거짓을 판단할 수 있는 조건식과 함께 사용

if / else로 구성

참인경우 if문 거짓인경우 else문

★ 들여쓰기 해야함

```python
a = 5
if a > 5:
	print('5 초과')
else:
	print('5 이하')
print(a)
```

- 홀수 짝수 구분은 % 2를 통해서

### 복수 조건문

elif 이거에요

if → elif → else

```python
a = 10
if a > 10:
	print("10보다 큼")
elif a == 10:
	print("10")
else:
	print("10보다 작음")
```

### 중첩 조건문

if 조건:

if 조건:

else:

### 조건 표현식

```python
a = 10
print("10") if a == 10 else print("10이아님")
```

## 반복문

### while문

```python
while 종료 조건:
	반복할내용
```

보통 while문 바깥에 변수를 선언하고 while 문 내에서 변수에 변화를 주고

종료 조건에 변수에 대한 조건을 걸어줌

아무것도 안하고 True하면 무한반복

### for문

- 처음부터 끝까지 순회하므로 별도의 종료 조건이 필요하지 않음
    
    → range,enumerate나 순회가능자료형을 순회
    

```python
for i in tmp_list:

for i in range(10):
```

1. 문자열 순회시 한글자씩 순회함
2. 딕셔너리 순회시 key를 순회함
    
    → key를 활용한 순회가능!!
    
    keys, values, items() —> items는 (key, value)로 이루어진 튜플로 반환
    
3. enumerate → (index, value)형태의 튜플로 반환

### List comprehension

```python
a = [i for i in range(10)]   # a = [0,1,2,3,4,5,6,7,8,9]
b = [i**2 for i in range(1,5)] # a = [1,4,9,16]
```

### Dictionary Comprehension

```python
A_dict = {}
for i in range(1,4):
	A_dict[i] = i ** 3

A_dict = {i : i ** 3 for i in range(1,4)}
```

### 반복문 제어

1. break - 반복문 종료
2. countinue - 이후의 코드 블록은 수행하지 않고 다음 반복으로 넘어감
3. for-else - 끝까지 반복문을 실행한 이후 else실행
    
    → break를 통해 종료시 else도 실행안댐
    
4. pass - 아무것도 하지않음
