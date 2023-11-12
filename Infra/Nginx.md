# NGINX

웹 사이트의 서버인 WAS를 도와주는 웹 서버 프로그램

1. 클라이언트에게는 요청에 맞는 정적 파일을 응답해주는 HTTP Web Server로 활용
2. 리버스 프록시 서버로써 클라이언트의 요청을 백엔드로 전달하는 역할
3. 로드 밸런서로써 백엔드 서버가 여러개라면, 클라이언트들의 요청을 분산시켜 부하를 분산

### Nginx의 작동방식

를 보기전에..

## Apache와 Nginx

`Apache`가 어떤 문제점을 겪고 왜 Nginx가 나왔는지를 봐야한다.

### Apache의 특징

`Apache`는 **요청이 들어오면 들어오면 새로운 프로세스를 생성**한다.

![image](https://github.com/vinitus/TIL/assets/97886013/8d9431e6-1bce-462a-8a8a-9eb42cf2a76e)

하지만, 프로세스를 생성하는 과정은 요구되는 **시간과 비용**이 크기 때문에, 이를 미리 만들어두는 `Prefork` 방식을 사용했다. 미리 만들어둔 프로세스를 가지고 요청이 들어온다면 여기에 할당하여 처리하는 방식이다.

![image](https://github.com/vinitus/TIL/assets/97886013/8b2c3b1b-477e-4205-9e87-a960fad959a3)

여기에 다양한 모듈들을 통해 동적 컨텐츠에 대한 처리에서 높은 확장성을 지녔다.

### 하지만 찾아온 한계

`C10K(Connection 10000)`의 문제

`Apache`의 동작방식인 **요청마다의 새로운 프로세스를 생성**하는 방식으로 인해, 무거웠다. 즉, 컴퓨터 리소스를 많이 요구했다.

이 문제는 많은 요청이 생기기 시작하면서 큰 문제가 되었다. 임계치 이상의 요청이 들어오면 제대로 처리를 하지 못하는 것.

![image](https://github.com/vinitus/TIL/assets/97886013/2089685d-7c03-48c1-af8a-1565c3c6fd11)

한마디로 많은 요청들을 처리하기에는 부적합했다.

### 이를 해결하기 위한 Nginx

`Nginx`는 많은 요청을 적절하게 처리하지 못하는 `Apache`의 문제점을 해결하기 위해 개발되었다. 수많은 클라이언트들과 Apache Server 사이에서 **정적 파일들만 Nginx가 제공하고, 동적 파일들은 Apache에서 제공하도록** 하여 Apache의 부하를 줄였다.

![image](https://github.com/vinitus/TIL/assets/97886013/6ca2a1cc-3db6-460c-970d-b654e3820075)

하지만, 이 `Nginx`는 웹 서버 기능을 강화하고 모듈 시스템 등을 도입하며, 점차 발전하여 독자적인 웹 서버가 되었다.

## Nginx의 구조와 작동 방식

### Nginx의 구조

- Master process: 설정 파일을 읽고 `Worker process`를 생성하고 관리하는 역할

- Worker process: `Master process`가 설정 파일을 읽고 생성한 프로세스
  이 프로세스는 1개 이상이며 각각의 프로세스는 독립적으로 동작

- Listen socket: `Master process`가 설정 파일을 통해 지정한 포트를 listen하는 소켓으로써, 해당 포트로 요청이 들어오면 `Master process`에 전달한다.

### 작동방식

1. `Listen socket`에 요청이 들어오면, `Matser process`로 요청을 전달한다.
2. 요청을 전달받은 `Master process`는 소켓에 맞는 `Worker process`로 요청을 전달한다.
3. 각 `Worker process`는 각자 로직에 따라 요청을 처리한다.

---

### reference

[[10분 테코톡] 피케이의 Nginx](https://www.youtube.com/watch?v=6FAwAXXj5N0)
