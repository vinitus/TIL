# Error와 Exception

### Syntax Error = 문법에러

## Exception

ZeroDivisionError = 0으로 나눔

NameError = 정의되지 않은 변수를 호출

TypeError = 자료형이 올바르지 않은 경우, 필수 parameter의 argument가 주어지지 않은 경우

              parameter의 갯수가 초과한경우

ValueError = 자료형은 올바르나 값이 잘못된 경우, 존재하지 않은 값을 찾을 경우

IndexError = 존재하지 않은 index를 조회

KeyError = 존재하지 않은 Key로 접근

ModuleNotFoundError = 존재하지 않은 Module import

ImportError = 모듈 내의 존재하지 않은 함수/클래스 찾을 경우

KeyboardInterrupt = 사용자가 임의로 실행 중단한 경우

IndentaionError = 들여쓰기 잘못씀

## 예외처리

```python
try:
	실행할 구문
except 예외:
	예외발생시 실행할 구문
except 예외 2:
	예외발생시 실행할 구문
else:
	에러가 발생되지 않으면 실행할 구문
finally:
	try에 관련된 모든 코드가 종료되고 실행할 구문
```

```python
raise <Error>('메시지') => 예외를 무조건 일으킴
assert <bool 타입으로 나올 조건문>, '에러 메시지'
```

