# 객체지향 프로그래밍
추상화 다형성 상속 캡슐화

### 클래스
관련있는 변수 + 함수를 묶어서 만든 사용자 정의의 __자료형__
하나의 변수에 다양한 정보를 담기 위함

```java
public class Person {
    String name;
    int age;
    String hobby;

    public void info() {
        System.out.printIn("나의 이름은 " + name + "입니다.");
        System.out.printIN("나이는 " + age + "세, 취미는 " + hobby + " 입니다.");
    }
}
```

1. 모든 객체들의 생산처
2. 클래스는 객체를 생성하는 툴이라고 할 수 있다.
3. 프로그래밍이 쓰이는 목적을 생각하여 객체를 만들어야함
4. 객체들의 속성과 동작을 결정
5. 클래스를 통해 생성된 객체 == 인스턴스
6. 객체들 사이 메시지를 주고 받도록 해줌

객체 : 하나의 역할을 수행하는 '메서드와 변수'의 묶음

속성 (attribute) = 필드,  동작 (behavior) = 메소드, 생성사 (constructor)

__클래스 선언__
접근제한자 활용제한자 class 클래스명 {      public / default   final / abstract
    속성, 동작 정의
    생성자
}

__클래스 변수__
- 클래스가 메모리에 올라가는 순간 생성.
- 모든 인스턴스가 공유

__인스턴스 변수__
- 인스턴스가 생성될 때 생성
- 인스턴스 별로 생성

__지역 변수__
- 클래스 영역 외

__메서드__
- 객체의 행동 정의

### 메서드 선언
public (static) void 메서드명(매개변수) {
    static이 붙은 경우는 클래스 메서드이다
}

p.메서드명(인자)

__메서드 오버로딩__
- 이름이 같고 매개변수가 다른 메서드를 여러개 정의 = printIn

### static
1. static 영역에서는 non-static 영역 직접 접근 불가능
2. 반대는 가능

### 생성자
```java
public class Dog{
    public Dog() {
        System.out.printIn("기본 생성자!");
    }
}
```

this.속성 => 자기 자신의 속성을 가르킴
this([인자]) => 생성자 호출

### 캡슐화
객체의 속성과 메서드를 하나로 묶고 일부는 외부에 감추어서 숨김

__접근 제한자__
1. public - 모든 위치
2. protected - 같은 패키지와 상속 관계 다른 패키지에서 접근 가능
3. default - 같은 패키지. 접근 제한자가 선언 안되었으면 기본값임
4. private - 자신 클래스에서만 접근 가능

### 상속
```java
public class Person {
    String name;
    int age;

    public void eat() {
        System.out.printIn("음식을 먹는다.");
    }
}
public class Student extends Person {
    String major;

    public void study() {
        System.out.printIn("공부");
    }
}
```
```java
// 생성자는 상속하려면 super을 사용해야함
public class Person {
    String name;
    int age;

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

    public Student(String name, int age, String major) {
        super(name,age)
        this.major = major;
    }

    public void study() {
        System.out.printIn("공부");
    }

    //오버라이딩
    @Override
    public void eat() {
        System.out.printIn("지식을 먹는다.")
    }
}
```