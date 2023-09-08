HTTP, TCP/IP에 들어가기 앞서 인터넷부터

## 인터넷

### 인터넷이란?

전 세계 컴퓨터들을 하나로 연결하는 거대한 **컴퓨터 통신망**

### 특징

1. 쌍방향 통신

2. 시공간에 제약받지 않고 원하는 정보를 얻을 수 있음

### 구성요소

1. 클라이언트와 서버
2. 라우터
3. 웹 브라우저 - 웹 페이지를 가져오거나 서버로 정보를 보낼 때 사용하는 프로글매
4. IP 주소, 도메인 네임, DNS 서버
5. 프로토콜

프로토콜은 **컴퓨터와 장치 간의 통신 규칙**

# TCP/IP

TCP/IP는 Internet Protocol Suite(인터넷에서 컴퓨터들 간의 프로토콜) 중 가장 많이 쓰이는 2가지이다. **둘은 별개**이다.

IP - 패킷 통신 방식, **패킷 전달 여부는 보증하지 않음**
TCP - IP 위에서 동작하는 프로토콜, 데이터 전달을 보증하고 순서도 **보증**한다.

> TCP/IP를 사용하겠다는 것은 IP 주소 체계를 따르고 IP Routing을 이용해 목적지에 도달하여 TCP의 특성을 활용해 송신자와 수신자의 논리적 연결을 생성하고 신뢰성을 유지할 수 있도록 하겠다는 것을 의미합니다.

출처 : [TCP/IP 쉽게 이해하기](https://aws-hyoh.tistory.com/entry/TCPIP-%EC%89%BD%EA%B2%8C-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0)

즉, TCP/IP는 **IP 주소를 기반으로 한 데이터 통신**과 **TCP를 통한 데이터 전달 보증**을 해준다.

OSI 7 계층의 Transport 계층에서 TCP 동작하고, Network 계층에서 IP가 엔드포인트(라우팅)로써 활용된다.

## TCP

TCP는 OSI 7 계층의 4 계층인 Transport 계층에 해당한다.

**IP**는 엔드포인트를 가리키는 라우팅의 역할이라면, TCP는 이들의 데이터 통신 성공 여부, 패킷 손실 등을 점검하며 **신뢰성을 보증**한다.

또한, TCP는 IP뿐만 아니라 **port**도 사용한다. 이유는 해당 IP에 도착하게 되면 그 IP 내부에서 어떤 곳으로 가야할지를 모르기 때문이다. TCP 헤더 내에서 해당 포트에 대한 정보까지 들어있다.

![TCP 헤더의 구조(출처 : 위키백과)](https://github.com/vinitus/TIL/assets/97886013/b7a3c44c-5611-495e-8bfa-0a9610bbd4bb)

### TCP의 작동

1. 클라이언트가 "SYN"을 보내 통신 가능 여부 확인
2. 서버가 "SYN"을 받고 "SYN/ACK"를 클라이언트에게 보내 응답
3. 클라이언트가 "SYN/ACK"를 받고 "ACK"를 날려 전송 시작을 알림

이를 `3-way handshake`라고 한다.

그렇다면 종료는 어떻게 할까?

1. 클라이언트가 연결을 종료한다는 "FIN"을 보낸다.
2. 서버가 "FIN"을 받고, 클라이언트에게 "ACK"를 보낸다. 이는 종료 요청을 수락했다는 의미이다.
3. 다시, 서버는 "FIN"태그를 보낸다. 이는 데이터 전송이 완료되었고 종료할 준비가 되었다는 의미이다.
4. 클라이언트는 "FIN"태그를 받고 "ACK"를 보내서 종료 요청을 수락한다.

이를 `4-way handshake`라고 한다.

### TCP의 특징

1. 신뢰성
   3-way handshake를 통해 서로가 연결됨을 확인
   Sequence Number: 데이터를 잘게 나눈 패킷들에 할당되는 번호
   Acknowledgement Number: 지금까지 몇번째 패킷을 받았는지 송신자에게 알려줌<br>
   데이터를 패킷으로 나누면서 Sequence Number를 통해 보낼 순서를 정하고, 수신자는 Acknowledgement Number를 통해 나눠둔 패킷들 중 몇번째 패킷이 왔는지를 알려줌
   <br>
2. 혼잡 제어 알고리즘
   네트워크의 혼잡 상태를 모니터링하고 데이터 전송 속도를 조절
   TCP 연결 시작 후 전송 속도를 점진적으로 늘려가는 방식 -> 그래서 Slow Start

# HTTP

HTTP는 사실, TCP/IP 위에서 작동하는 방식이다. **웹**에서 특화된 방식이며, **비연결성** 프로토콜이다.

클라이언트가 서버에 요청을 보내고, 서버는 응답을 보내는 것에 성공하면 **연결을 바로 끊어버린다**. 이를 통해서 서버 자원을 효율적으로 관리한다.

OSI 7 계층의 7 계층인 Application 계층에 해당하며, 웹 브라우저와 웹 서버 간의 통신에 사용된다.

## 작동 방식

TCP를 통해 연결을 하고, 응답과 요청이 끝나면 바로 연결이 끊어지는 것이다.

**3-way handshake, 4-way handshake가 전부 일어나고, 서로 간의 데이터 송수신도 TCP를 활용하여 진행된다.**

## 그럼 둘이 뭐가다를까?

TCP/IP를 사용하여 통신하려면 TCP Socket을 이용한다. 그리고, **이 연결은 종료요청이 없는 한 계속 유지된다.**

반면에 HTTP 통신을 하게 된다면, 요청이 이뤄지고 난 뒤 TCP 연결이 종료된다.

즉, HTTP는 TCP/IP 위에서 동작하여 아예 다르다라고 할 수는 없지만, TCP/IP 통신(TCP Socket)과 HTTP 통신의 차이라고 한다면 연결을 바로 끊는 것이 HTTP 통신의 특징이다.

---

**reference**

[https://velog.io/@fall031/TIL-13.-%EC%9D%B8%ED%84%B0%EB%84%B7%EC%9D%98-%EA%B5%AC%EC%84%B1-%EC%9A%94%EC%86%8C-%EB%B0%8F-%EB%8F%99%EC%9E%91-%EC%9B%90%EB%A6%AC](https://velog.io/@fall031/TIL-13.-%EC%9D%B8%ED%84%B0%EB%84%B7%EC%9D%98-%EA%B5%AC%EC%84%B1-%EC%9A%94%EC%86%8C-%EB%B0%8F-%EB%8F%99%EC%9E%91-%EC%9B%90%EB%A6%AC)
[https://aws-hyoh.tistory.com/entry/TCPIP-%EC%89%BD%EA%B2%8C-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0](https://aws-hyoh.tistory.com/entry/TCPIP-%EC%89%BD%EA%B2%8C-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0)
[https://hwan-shell.tistory.com/271](https://hwan-shell.tistory.com/271)
