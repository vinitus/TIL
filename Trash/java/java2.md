# 자바2

## 객체지향 프로그래밍

비슷한 기능을 하는 코드들을 추상화하여 묶음으로 만들며 프로그래밍

```java
public class PersonTest {
	public static void main(String[] args) {
		String name1 = "Kang";
		String name2 = "Sin";

		int age1 = 45;
		int age2 = 25;

		String hobby1 = "Youtube";
		String hobby2 = "Golf";

		int size = 2;
		String[] names = new String[size];
		names[0] = "Kang";
		names[1] = "Sin";

		int[] ages = new int[size];
		ages[0] = 45;
		ages[1] = 25;

		String[] hobbies = new String[size];
		hobbies[0] = "Youtube";
		hobbies[1] = "Golf";
```

서로 다른 자료형을 묶어서 관리할 수 없을까?

→ **클래스**

```java
public class Person {
	String name;
	int age;
	String hobby;
}
```

### 함수

```java
import java.util.Random;

public class FunctionTest1 {
	public static void main(String[] args) {
		homework = education();
		if(homeword)
			System.out.printIn("과제를 해결한다.");
		Move("멀캠","지하철");
	}

	public static boolean education() {
		System.out.printIn("아침에 일어난다.");

		return new Random().nextBoolean();
	}

	public static void Move(String where, String vehicle) {
		System.out.printIn(where+"으로"+vehicle+"을 타고 간다.");
	}
}
```

### 클래스

관련 있는 변수와 함수를 묶어서 만든 사용자정의 자료형

모든 객체들의 생산처

클래스는 **객체를 생성**하는 **틀**

각 객체들이 어떤 특징을 가지고 있을지 생각하고 만들어야함(객체 모델링)

클래스를 통해 생성된 객체 == 인스턴스

속성 == 필드

동작 == 메소드

생성자

클래스 선언

[접근제한자] [활용제한자] class 클래스명 {

속성 정의 (필드)

기능 정의 (메소드)

생성자

}

접근제한자 - public / default

활용제한자 - final abstract

### 변수

1. 클래스 변수
    
    클래스 영역 선언 (static 키워드)
    
    생성시기 : 클래스가 메모리에 올라 갔을 때
    
    모든 인스턴스가 공유
    
2. 인스턴스 변수
    
    클래스 영역 선언
    
    생성시기 : 인스턴스가 생성되었을 때 (new)
    
    인스턴스에 **각각** 생성됨
    
3. 지역 변수
    
    클래스 영역 이외
    
    생성시기 : 선언되었을 때
    

```java
public class Person {
	static int personCount;
	String name;
	int age;
	String hobby;

	public void info() {
		System.out.printIn("나의 이름은 "+name+"입니다.");
		System.out.printIn("나이는 "+age+"세, 취미는 "+hobby+"입니다.");
	}
}

public class PersonTest {
	public static void main(String[] args) {
		Person p1 = new Person();

		p1.name = "Kang";
		p1.age = 45;
		p1.hobby = "Youtube";

		Person p2 = new Person();

		p2.name = "Sin";
		p2.age = 25;
		p2.hobby = "Golf";

		System.out.printIn(p1);
		System.out.printIn(Person.personCount);
		System.out.printIn(p1.personCount);
}
```

### 메서드

선언 : {} 안에 해야할 일을 정의

호출 : 클래스이름.메서드

매개변수 (parameter) 함수 정의시 정의되는 것들

인자 (argument) 호출할 시 parameter에 전달되는 값

리턴 타입 = 선언할 때 지정, 없다면 void

메서드 오버로딩

이름이 같고 매개변수가 다른 메소드를 여러 개 정의

parameter 개수, 순서, 타입이 달라야 함 → parameter 이름만 바꾼다고 메서드 오버로딩은 아님

## JVM 메모리 구조

자바는 Garbage Collection에서 메모리를 관리 해줌

| 클래스 영역 | 힙 | 스택 |
| --- | --- | --- |

클래스 영역 → 클래스의 정보를 저장하는 영역

힙 → 인스턴스가 생성되는 공간

스택 → 메서드 수행시 프레임이 할당, 중요 변수나 결과를 임시기억, 메서드 종료시 할당 제거

static → 클래스 로딩시 로딩 / 클래스당 하나의 메모리 공간 / 클래스 이름으로 접근 / static영역에서 non static 영역 접근 불가

non static → 객체 생성시 / 인스턴스당 각 별도 / 객체 생성 후 접근 / 얘는 static 영역으로 접근 가능

## 생성자

new 키워드와 함께 호출

클래스 명과 이름이 동일(대소문자구분)

반환 타입이 없슴

필드의 초기화, 객체 생성시 실행되어야할 작업 작성

기본 생성자 - 클래스 명() {}

클래스 내에 생성자가 하나도 정의되어 있지 않을 경우 JVM이 자동으로 제공하는 생성자

**parameter가 있는 생성자**

생성자의 목적이 필드 초기화

생성시 호출 시 argument가 필요함

```java
class Dog {
	String name;
	int age;
	Dog( String name, int age) {
		this.name = name
		this.age = age
	}
}

class Main {
	public static void main(String [] a) {
	Dog d1 = new Dog();
	d1.name = "가을이";
	d1.age = 2;
	Dog d2 = new Dog("여름이", 0);
	}
}
```

**this**

this의 활용 → 생성자 호출

### 패키지

패키지는 클래스와 관련 있는 인터페이스들을 모아두기 위한 이름 공간

패키지의 구분은 dot(.) 연산자를 활용

패키지 이름은 시중에 나와있는 패키지들과 구분되게 해야함

### import

다른 패키지에 있는 클래스를 사용하기 위해서는 import 과정이 필요

import시에는 import 뒤 package 이름과 클래스 이름을 모두 입력하거나 *을 통해 모든 클래스를 포함하기도 함

### 캡슐화

객체의 필드와 메서드를 하나로 묶고 실제 구현 내용 일부를 감추고 은닉

### 접근 제한자

클래스, 필드, 메서드 선언부에서 접근 허용 범위를 지정

public : 모든 위치에서 접근 가능

protected : 같은 패키지와 상속관계 패키지에서만 접근 가능

(defalut) : 같은 패키지에서만 접근 가능, 접근제한자가 선언되지 않았을 경우에만 적용

private : 자신 클래스에서만 접근 허용

클래스 외부에서 사용 가능 : public, default, protected, private

동일 패키지 ( 클래스 외부 ) : public, default, protected

하위 클래스 ( 상속 클래스 ) : public, default

다른 클래스 ( 모든 다른곳 ) : public,

### 접근자, 설정자

클래스에서 선언된 변수 중 접근제한에 의해 접근 불가한 변수의 경우 사용

```java
...
	private int speed;

	public void setSpeed(int speed) {
		this.speed = speed;
	}
	public void getSpeed(int speed) {
		return this.speed;
	}
...

...(다른 클래스)
	Car c = new Car();
	c.speed = 100; // 불가능
	c.setSpeed(300)  // set을 통해 접근자로 설정해줬기 때문에
	// 직접 클래스에 있는 speed에 접근할 순 없어도 setSpeed를 통해 접근할 순 있다.
  System.out.printIn(c.getSpeed());
...
```

Boolean 타입의 필드에 접근자는 is를 통해 만듬

### 상속

중복되는 정보들을 상속을 통해 없애기

1. 확장성, 재 사용성 : 부모의 생성자와  초기화 블록 상속 x
2. 클래스 선언 시 extends
3. 다중 상속 지원 X
4. 관계 : 부모 클래스(super), 자식 클래스(Sub)
5. 자식클래스는 부모 클래스의 멤버변수
    
    → 접근 제한자에 따라서 사용 여부
    
6. Object 클래스는 모든 클래스의 조상 클래스

```java
public class Person {
	String name;
	int age;

//	public Person() {   // 기본 생성자
//		System.out.printIn("Person 생성");
//	}

	public Person(String name, int age) {
		this.name = name;
		this.age = age;
	}

	public void eat() {
		System.out.printIn("음식을 먹는다.");
	}
}

public class Student extends Person {
	String major;

	public Student() {   // 기본 생성자
		super("강", 26);
		System.out.printIn("Student 생성");
	}

	public void study() {
		super.eat();
		System.out.printIn("공부를 한다.");
	}

	@Override     //annotation
	public void eat() {
		System.out.printIn("지식을 먹는다.");
	}
}
```

super() ← 인자가 없으면 부모의 기본생성자 호출

annotation : 컴파일러가 보는 주석

@Override = 해당 메서드는 오버라이딩 되었다

파라메터를 바꾸는 등을 추가하면 overloading

부모와 똑같은 것을 바꾼다 → overriding

### overriding

상위 클래스에서의 접근 제한자를 바꿀 순 없음?

메서드의 이름, 반환형, 매개변수가 동일 해야함

### final

해당 선언이 최종 상태가 됨 == 수정할 수 없다

final 클래스 : 상속금지

final 메서드 : 오버라이딩 금지

final 변수 : 상수처리