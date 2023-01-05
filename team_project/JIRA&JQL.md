# JIRA

## Why?

1. 이슈 트래킹(프로젝트 관라)
2. Agile
3. DevOps
4. SRE

### 1. Issue Tracking

팀원들 개개인이 수행할 수 있는 할 일, 그 자체를 Issue라고 함

이슈를 트래킹한다 == 어떻게 진행되었고 어떤 상태를 가졌고 언제 끝날 것인지를 나타내줌

`+ Project Management

팀과 프로젝트가 어떻게 나아가야할지 관리하는 것

전체적인 프로젝트의 진행상황, 커뮤니케이션 등을 JIRA에서 관리하기 쉽게끔 도와줌

### 2. Agile

[Agile 선언](https://agilemanifesto.org/iso/ko/manifesto.html)을 따르기 위한 방법론 2가지

**SCRUM 방법론**
backlog라는 곳에 이슈를 쌓아두고 이슈에 대해 스프린트 기간을 설정하고 해당 이슈를 해결하기 위해 몰두함

Scrum meeting - 아침에 모여서 오늘 할 일이 무엇이고 어제 한 일은 무엇인지 공유
burn down chart ?
백로그을 벽난로에서 태우는다는 느낌의 용어로써 남은 해야할 일을 나타내줌<br/>
**KANBAN 방법론**
이슈가 어떤 상태(In progress, done)인지 구분하고 상태를 나타내줌

### 3. DevOps

Agile과 유사한 개념 >> Development + Operations

사일로(silo) 현상 - 각자 자신 팀의 영역만을 지키겠다(성과 등)는 조직간의 이기주의

JIRA에서는 팀원 모두가 알고 있는 하나의 공유된 지표를 제공하고
장애나 이슈가 있을 때 혼자만 아는 것이 아닌 팀원과 공유하는 기능을 제공한다

'+ 더 많은 기능을 제공

근데 데브옵스를 하다 보면은 개발팀은 코드도 짜고 베포도 하고 테스트도 다하는데? 운영팀은 뭐함

구글에서 이를 해결하기 위한 방향 발표 (SRE)

### 4. SRE - Site Reliability Engineering

신뢰성 공학 - 운영팀이 할 일
장애가 나지 않기 위해 지표 관리와 모니터링 등을 함

DevOps를 잘하기 위해서 SRE가 등장했음

장애를 누구에게 책임전가하지 않고 팀 전체가 장애를 해결하기 위해 노력한다.

## How?

### Create Issue

project에 들어가서 Create를 눌러서 이슈를 만들 수 있음

? Issue Type
Epic - 큰 틀
Task - 유저 스토리가 아닌 경우
Story - User 스토리. 사용자가 어떤 행위를 할 때 어떤 반응을 한다
Bug - 버그가 일어나면

Status - To Do, In progress, Done
Summary - 제목
Epic Name - 에픽만 있음
components - 정하기 나름! 프로님은 역할로 했음
labels - 컴포넌트와 유사하지만 라벨은 생성창에서 만들 수 있음 (대소문자 구별)

# JQL

Jira Query Language
Jira Issue를 구조적으로 검색하기 위해 제공하는 언어
SQL과 비슷한 문법

### Basic Query, Advanced Query

### JQL Operators

=, !=, >, >=
in, not in
~ (contaions), !~ (not contaions)
is empty, is not empty, is null, is not null

### JQL Keywords

AND, OR, NOT, EMPTY, NULL, ORDER BY

### JQL Dates

Relative Dates => 어제는 -1d, 한주뒤는 -1w, 내일은 1d
상대적인 날짜를 볼 수 있음
created나 updated 등에 쓸 수 있다

### JQL Functions

일주일의 시작은 일요일, 끝은 토요일이다!
endOfDay(), endOfWeek(), endOfMonth(), endOfYear()
startOfDay(), startOfWeek(), startOfMonth(), startOfYear()

### Agile Board

