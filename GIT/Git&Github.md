# Git

분산 버전 관리 **프로그램**

변경사항 + 작성자, 메일, 시간 저장

# GIT 기본기

폴더에 우클릭하고 git bash here하면 편함

*윈도우에서 .폴더명 << 숨김처리           .git을 지우면 기록이 다 없어짐

(master) << master branch    git으로 버전관리 되고있는 곳이라는 뜻

## README.md 만들기

→ 특정 버전으로 남긴다 = 커밋(commit)한다

- 커밋은 3가지 영역으로 동작함

  working directory - 내가 작업하고 있는 실제 디렉토리

  staging area - 커밋(=version)으로 남기고 싶은, 즉, 특정 버전으로 관리하고 싶은 파일이 있는 곳

  repository - 커밋들이 저장되는 곳 = .git

# Github

**git** **기반**의 저장소 **서비스**를 제공 ( 다른 서비스도 있음 ← gitlab, github, bitbucket )

깃허브는 MS가 인수해서 MS가 볼 수 있음

→ 대신 깃랩은 저장하는 서버를 마음대로 구축할 수 있음!

★깃허브는 공개적인 서비스라서 전 세계의 사람들이 볼 수 있음 → 포트폴리오로 활용가능!

잔디밭 : commit 하루라도 안하면 **구멍**남 → 성실하게 매일매일

협업 = soical coding → github의 장점

깃허브는 코드를 활용한 **sns**이다

# Git 기본기

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/0d5b698a-a18d-4f60-9e19-260d3e5952a8/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220715%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220715T041752Z&X-Amz-Expires=86400&X-Amz-Signature=7c94543c23193b35f5d86da5d8ce3008ffd3d3fe87d84bf9b6f697983ba802f7&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

[D2Coding font](https://github.com/naver/d2codingfont)

## git status

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/0ae88e18-4c8c-4c12-863f-80176ffc16cd/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220715%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220715T041834Z&X-Amz-Expires=86400&X-Amz-Signature=d381b199216fa2c6aaebe31ea0a9867f4e213030a0bb1dd0b17791e5aa62b5a1&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

Untracked files → commit 되지 않은 파일

## git add

git add 파일명or.

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/bac0b43f-7184-4fbc-94cc-97ac43babd31/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220715%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220715T041850Z&X-Amz-Expires=86400&X-Amz-Signature=45012ac470d75286aeedf0f19d5532578550d0f637e1e2ef0604f6e5e789872c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

이러면 staging area에 올라간거임

## git commit

이메일과 이름을 입력해야지 commit이댐

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/75157bc3-99c8-48cb-9e75-54bebfab2b50/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220715%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220715T041859Z&X-Amz-Expires=86400&X-Amz-Signature=5a78624839e4ae3e3cde1a00e335a6e83ab50adde3f2de6e5b436940b73b798f&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

정상적으로 작동하면

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/665643b7-7330-4849-b7d8-cff6b2659893/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220715%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220715T041923Z&X-Amz-Expires=86400&X-Amz-Signature=7da2a0373decbef3df79d37879431bdbe3936bf9f8fdc60e24c39949e038ee71&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

이렇게 CLI 환경에서 TEXT EDIT을 할 수 있는 창이 뜸

나가는 법 : <<<이거 입력하면댐 그다음 q   :q하고 엔터

commit 메세지를 한 줄만 남기려면 git commit -m “남길말”

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/1bd990cf-7416-4142-9cce-2ffe958e9add/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220715%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220715T041934Z&X-Amz-Expires=86400&X-Amz-Signature=29c58e3083a00ea7d0e213ac331b37672fab5c804557e8f5a04b86b8041fef1b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

잘 제출된 모습



## git log

commit 메시지랑 commit을 누가 언제했는지 볼 수 잇음

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/175cf415-2153-4a4f-a979-8e6d6d7ac1ca/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220715%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220715T042005Z&X-Amz-Expires=86400&X-Amz-Signature=7fe928771d73270b229251f0128a91c2bfca918b080f62873fe7cb964b9a70b8&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

## add를 하는 이유??

변경사항이 여러개가 있겠지만 특정하게 변경된 사항들만 commit하고 싶은거임

Staging Area는 커밋으로 **남기고 싶은** 특정 버전으로 **관리하고 싶은 파일**이 있는 곳

## git diff A B

git diff 고유ID 고유ID <<앞의 4글자만 써도댐

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/575e5e2f-7912-47cd-8c58-5c12274da863/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220715%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220715T042021Z&X-Amz-Expires=86400&X-Amz-Signature=5f6d0382644caaf086b8fc6d6c58df220d8b8f4c15422d9c7d71e3b50a6afe6c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

A는 B에 비해서 무엇이 변했는지 알려주는거임

# github

Local Repository : 내 컴퓨터의 Repositoy

Remote Repositoy : 어떤 서버의 Repositoy

## git remote

Local Repositoy와 Remote Repositoy의 연결

**git remte add origin remote_repo**

remote_repo : 깃허브 Repositoy의 주소

origin : 변경은 가능한데 다들 origin으로 쓰니까 그냥 origin으로 두죠



## git push

- vscode에서 gitbash 터미널을 열기

​		컨트롤 + ` 누르면 터미널 뜸

​		우측 상단 bash인게 중요!! bash가 아니면 옆에  +누르면 댐

**git push origin branch**

branch → commit들이 쌓이고 있는 flow 지금은 master

![Untitled]([https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6a5dbeda-0859-438f-b465-d969cdbcb24a/Untitled.png](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/07ef63b5-6a1c-44d0-9d86-49aa04efa904/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220715%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220715T044014Z&X-Amz-Expires=86400&X-Amz-Signature=caf873cfca425a01c4986ee723e40ecb21d6b52b42b1d28eed0ae8c64747112c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject))



- origin과 master 묶기

git push --set-upstream origin master

= git push -u origin master

후에 git push만 쳐도 git push origin master과 같음

## git clone

remote repo를 local repo로 복사

github에서 repo를 만들고 gitbash에서 git clone git주소

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ab538570-a4d1-4063-8d1a-8fe0d5b44024/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220715%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220715T042148Z&X-Amz-Expires=86400&X-Amz-Signature=a1b242f5cc9db6040da14c9dbc63cc72483538675df78b70b61c4b844fd5309a&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

이렇게하면 git으로 버전관리가 되어있는 폴더가 만들어짐

- TIP

git bash에서 code .하면 현재 디렉토리를 VSCode로 열음

아니면 폴더에서 우클릭하고 code로 열면

⇒ VSCode가 열림
