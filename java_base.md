# 자바

## 변수와 자료형

### 변수

데이터를 저장할 메모리 위치를 나타내는 이름

1. 대소문자 구분
2. 공백 X
3. 숫자로 시작 X
4. $ _를 변수이름에 사용 가능
5. 예약어 사용 X
6. 합성어는 camelCase (코드 작성 방법 - 띄어쓰기나 _ 대신 대문자로 공백구분)
7. 한글 변수명 가능

### Data type

boolean - True false

char - 문자,

정수형 - byte short int long

실수형 - float double

short와 char은 크기가 같음!

```java
선언법!
자료명 변수명;
int a;

값 할당
a = 30;

초기화
int a = 40;

형변환
byte b = (byte) a;
```

## 연산자

파이썬과 동일

++과 —가 존재함!

객체 타입 비교 연산 : instanceof

## 제어문

### if문

조건식의 결과에 따라 실행여부 결정

파이썬과 같다

### switch 문

독같아

## 반복문

```java
for (초기화식; 조건식; 증감식){
	반복 수행할 문장;
}

for (int i=0; i<10; i++){
	Sysyem.out.printIn(i);
}

while (조건식) {
	반복 수행할 문장;
}

do {
	반복 수행할 문장;
} while (조건식);
// 블록 수행 후 조건식 판단

break; => 반복문 빠져나올 때 사용
continue => 반복문의 특정지점에서 하단 코드 실행 x하고 처음으로보냄
```

## 배열

```java
int[] iArr;
char[] cArr;
int[] points = new int[3];
등등

int[] intArray = {3,27,13,8,235}
int min = 1000;
int max = 0;
for(int num: intArray) {
	if(num>max) {
		max = num;
	}
	if(num<min) {
		min = num;
	}
}
System.out.printf('min: %d, max: %d%n',min,max);
```

## 다차원배열

```java
int[][] iArr;
int iArr[][];
int[] iArr[];
int[][] iArr = {{1,2,3},
								{4,5,6}};
int[][] scores = new int[3][];

for(int [] row: grid) { //grid라는 2차원 배열의 배열 한줄씩 꺼냄
	for(int num: row) {   // row라는 배열의 원소 num을 하나씩 꺼냄
    }
}
```