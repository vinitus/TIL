# 자바3

### 객체지향 프로그래밍

1. 다형성
2. 추상클래스
3. 인터페이스

클래스 : 관련 있는 필드와 메서드를 묶어 만든 사용자 정의 자료형(int 같은거)

객체 : 하나의 역할을 수행하는 ‘메소드와 변수(데이터)’의 묶음

객체지향 프로그래밍 : 프로그램을 수많은 객체라는 기본단위로 나누고 이들의 상호작용으로 서술

### 다형성

상속관계에 있을 때 조상 클래스의 타입으로 자식 클래스 객체를 참조할 수 있음

1. 다른 타입의 객체를 다루는 배열
2. 매개변수의 다형성 - 조상을 파라미터를 통해 처리한다면 객체 타입에 따라 메서드를 만들 필요가 없음
    
    ```java
    // printIn의 코드
    public void printIn(Object x) {
    		String s = String.valueOf(x);
    		synchronized (this) {
    				print(s);
    				newLine();
    		}
    }
    ```
    
    Object로 파라미터를 받는다 = 모든 객체를 처리하겠다 → 하위 클래스에서 필요시 오버라이딩을 해야함
    
    다형성과 참조형 객체의 형 변환
    
    메모리에 있는 것과 사용할 수 있는 것의 차이! = 메모리에 있떠라도 참조하는 변수의 타입에 따라 접근할 수 있는 내용이 제한됨.
    
    참조형 객체의 형 변환
    
    작은 집에서 큰 집으로 = 묵시적 캐스팅 → 형 생략 가능
    
    반대는 안됨 = 명시적 캐스팅
    
    ```java
    Person person = new Person();
    Object obj = person;
    
    Person person = new Student();
    Student student = (Student)person;
    ```
    
    참조형 객체의 형 변환
    
    무늬만 Student인 Person
    
    메모리의 객체는 study() 없음
    
    조상을 무작정 자손으로 바꿀 수는 없다
    
    참조 변수 레벨에 따른 객체의 멤버 연결
    
    ```java
    SuperClass superClass = new Subclass();
    System.out.printIn(superClass);
    
    public void print(Object obj) {
    		write(String.valueof(obj));
    }
    
    public static String valueOf(Object obj) {
    		return (obj == null) ? "null" : obj.toString();
    }
    
    public String toString() {
    		return getClass().getName() + "@" + Integer.toHexSring(hashCode());
    }
    ```
    
    추상클래스 정의
    
    ```java
    public class Chef {
    		String name;
    		int age;
    		String speciality;
    
    		public void eat() {
    				System.out.printIn("음식을 먹는다.");
    		}
    		// 추상 클래스 정의
    		public abstract void cook();
    }
    
    public class KFoodChef extends Chef{
    		@Override
    		public void cook() {
    				System.out.printIn("한식 요리를 한다.");
    		}
    }
    
    public class JFoodChef extends Chef{
    		@Override
    		public void cook() {
    				System.out.printIn("일식 요리를 한다.");
    		}
    }
    
    public class ChefTest {
    		public static void main(String[] args) {
    				Chef[] chefs = new Chef[2];
    				
    				chefs[0] = new KFoodchef();
    				chefs[1] = new JFoodchef();
    
    				for(Chef chef : chefs) {
    						chef.eat();
    						chef.cook();
    				}
    		}
    }
    ```
    
    추상 클래스의 특징
    
    1. 상속 전용 클래스임
    2. 클래스에 구현부가 없는 메서드가 잇으므로 **객체를 생성할 수 없음**
    3. 상위 클래스 타입으로 자식을 참조할 수는 있음
    
    ```java
    Chef chef2 = new KFoodChef();
    ```
    
    ### 인터페이스
    
    완벽한 추상화된 객체 : 모든 메서드가 abstract 형태
    
    ```java
    public interface MyInterface {    // interface 키워드
    		public static final int MEMBER1 = 10;      // final을 통한 상수
    		int MEMBER2 = 10;
    
    		public abstract void method1(int param);   // 선언되는 메서드는 모두 추상
    		void method2(int param);
    }
    ```
    
    extends를 이용하여 상속 가능 → 다중 상속 가능!
    
    구현부는  x
    
    객체 생성 x
    
    ```java
    public class Main {
    		MyInterface m = new MyInterface();
    }
    ```
    
    인터페이스를 상속받는  하위 클래스는 추상 메서드를 반드시 오버라이딩해야함!!!!!