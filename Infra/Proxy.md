forward-proxy와 reverse-proxy에 대한 글

# proxy

클라이언트와 서버 사이의 중계 서버

![image](https://github.com/vinitus/TIL/assets/97886013/5ed75562-de9d-4966-b282-dd43f6c1b0dd)

서로 간의 요청과 응답을 목표로 보내기 전에 `proxy` 서버를 거쳐서 내부 로직에 따라 도달하게 된다.

\* 이렇게 설명한 이유는, `proxy`를 `forward proxy`와 분리하기 위해서이다.

## without proxy

`proxy server`가 없다면, 클라이언트, 인터넷, 서버만이 존재하는 구조를 지닌다.

## forward proxy

`forward proxy`는 클라이언트에서 보낸 요청을 서버에 바로 보내지 않고, `forward proxy server`에 먼저 도달한다. 내부 로직에 따라 요청을 처리하고, 인터넷을 거쳐 서버에 도달한다.

![image](https://github.com/vinitus/TIL/assets/97886013/4c4f0f0b-384a-4b54-9e44-4fc0243dbd11)

이렇게 된다면, 클라이언트가 요청하는 엔드포인트는 실제 서버가 있는 도메인이 된다. proxy는 이 사이에서 밑의 기능들을 수행하며, 둘 사이의 통신을 도와준다.

### forward proxy의 기능

1. 접근 제어: 특정 사이트에 대한 접근을 제어할 수 있다. 학교에서 차단하던거 ㅋㅋ
2. 클라이언트의 익명화: 클라이언트의 IP 주소를 proxy 서버 IP로 대체해서 전달
3. 개발 서버의 CORS 에러
   프론트엔드 프로젝트를 개발하다보면 CORS에러를 만나게 된다. 이를 간단하게 해결하는 방법은 서버를 로컬에서 돌리는 방법도 있지만, 좀 더 프론트엔드 개발자가 프로페셔널 하게 해결하는 방법은 `proxy server(forward proxy)`를 생성하는 것이다.

## reverse proxy

이 `proxy`는 인터넷과 `proxy server`의 위치를 바꾸면 된다.

![image](https://github.com/vinitus/TIL/assets/97886013/3c683120-179e-42c9-8458-08d545f18e2c)

클라이언트는 `reverse proxy`에게 요청을 보내게 되는 것이고, DNS서버와 라우터가 들어있는 인터넷을 거쳐서 `reverse proxy`에게 도달하게 된다.

즉, 클라이언트에서 보내는 요청의 엔드포인트는 `reverse proxy` 서버이다. 이 `proxy server`는 다양한 기능들을 활용하여 효율적으로 처리할 수 있다.

### reverse proxy의 기능

1. Caching: 응답 결과를 캐싱하여 동일한 자원을 필요로하는 요청을 서버의 자원을 소모시키지 않고 proxy 서버에서 처리할 수 있다.
2. 로드밸런서: 백엔드 서버가 2개 이상이라면, `reverse proxy`는 하나의 서버에만 요청을 보내지 않고 적절하게 분배하여 요청을 효율적으로 처리하고 소수 서버에만 과부하가 걸리는 것을 완화해준다.
3. SSL 처리: HTTP에서 HTTPS가 될 수 있는 SSL 인증을 `reverse proxy`가 처리할 수 있다.
4. WAS 서버의 익명화: `forward proxy` 서버가 클라이언트의 직접적인 IP 주소를 익명화하는 것처럼, `reverse proxy` 서버도 백엔드 서버의 포트를 포함한 IP 주소를 `reverse proxy` 서버의 주소로 대체할 수 있다.

---

### reference

[https://bcp0109.tistory.com/194](https://bcp0109.tistory.com/194)
[https://sujinhope.github.io/2021/06/13/Network-%ED%94%84%EB%A1%9D%EC%8B%9C(Proxy)%EB%9E%80,-Forward-Proxy%EC%99%80-Reverse-Proxy.html](<https://sujinhope.github.io/2021/06/13/Network-%ED%94%84%EB%A1%9D%EC%8B%9C(Proxy)%EB%9E%80,-Forward-Proxy%EC%99%80-Reverse-Proxy.html>)
[https://losskatsu.github.io/it-infra/reverse-proxy/#3-%EB%A6%AC%EB%B2%84%EC%8A%A4-%ED%94%84%EB%A1%9D%EC%8B%9Creverse-proxy-%EC%84%9C%EB%B2%84%EB%9E%80](https://losskatsu.github.io/it-infra/reverse-proxy/#3-%EB%A6%AC%EB%B2%84%EC%8A%A4-%ED%94%84%EB%A1%9D%EC%8B%9Creverse-proxy-%EC%84%9C%EB%B2%84%EB%9E%80)
