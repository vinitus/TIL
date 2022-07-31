# 데이터 구조

데이터 구조 (= 자료구조) 란 데이터에 효율적인 접근 및 수정을 가능케 하는 데이터의 구성, 관리 및 저장 형식을 의미

### ordered data structure

1. 리스트
2. 문자열
3. 튜플

### unordered data structure

1. 셋
2. 딕셔너리

### 변경 불가능한 데이터

1. 리터럴
2. range
3. tuple

### 변경 가능한 데이터

1. list
2. dict
3. set

### str method

```python
.find(value)
# 못찾으면 -1
.index(value)
# 못찾으면 valueerror!
.startswith(value)   # True, False
.endswith(value)     # True, False
```

.is ~ method는 조건에 해당하는 검증

```python
.isalpha() # 문자열이 글자만 인가
.isspace() # 문자열이 공백만 인가
.isupper() # 문자열이 대문자만 인가
.istiltle()# 타이틀 형식인가
.islower() # 소문자만 인가
.isdecimal() # 0~9까지의 수로만 인가
.isdigit() # 문자열이 숫자만 인가
.isnumberic() # 문자열을 수로 볼 수 있는가
```

문자열 변경

```python
.replace(old,new[, count] # 대상 글자를 새로운 글자로 바꿔서 반환
.strip() # 공란 제거
.strip("str") # 양쪽에서 부터 str값이 안나올 때 까지 str을 삭제
print("abc a de afera".strip("a"))
# .lstrip, .rstrip은 양쪽이 아닌 한쪽에서 부터 시작하는 것
.split('str') # 특정한 단위로 나누어 리스트로 반환. default = " "
"separator".join(iterable) # 문자열을 구분자로 이어 붙임
.capitalize() # 앞글자를 대문자
.title() # apostrophe ` 나 공백 이후를 모두 대문자
.upper() # 모두 대문자
.lower() # 모두 소문자
.swapcase() # 대 <-> 소문자 변경
```

## list method

```python
.append(value)
a[len(a):] = x 는 같다
.extend(iterable) # 리스트에 list,range,tuple,string 값을 붙일 수 있음
a += iterable과 같다
.insert(idx,x)
.remove(X) # x 제거, ValueError
.pop(idx)  # idx위치 값 제거, 그 항목을 반환
.clear()
.index(x)
.count(x)
.sort(reverse) # reverse의 default는 False. 반환은 None이니깐 a = a.sort()하면 안됨
.reverse() # 정렬이 아닌 그냥 뒤집는 것
```

## tuple method

불변형 자료형 ⇒ tuple.append(x)하면 AttributeError

```python
.index(x[, start[, end]])   # 없으면 ValueError
.count(x)

```

## set method

```python
.add(x)
.update(iterable)
.remove(x)  # KeyError
.discard(x) # 에러 발생 안함
```

## dict method

```python
.get(key,[, default]) # a['b']와는 다르게 KeyError 발생 안함, 반환값은 None or default
.setdefault(key[, default]) # get과 비슷하지만 값이 없으면 key : default를 삽입하고
# default를 반환. default의 기본값은 None임
.pop(key[, default]) # dict의 pop에서는 값이 없으면 default를 반환, default가 없으면 KeyError
.update(iterable) # iterable은 key, value 쌍이어야함

```

