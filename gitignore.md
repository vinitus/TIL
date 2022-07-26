# git .ignore

vscode에서도 add commit push를 한번에 할 수 있음

+commit message도 여러줄 보낼 수 있음

프레임워크를 배울 때 비밀번호나 api key를 git에 올리면 안됨

이를 제외하기 위해서 add에서 파일을 하나하나 올리는 수도 있지만

git ignore를 통해 올리지 않을 파일을 뺄 수 있음

.gitignore 파일을 만들기

1. 내용은 파일명+확장자를 적고 저장 ⇒ example.txt
2. 디렉토리를 ignore하려면 파일명/ or 파일명/*  ⇒ folder1/*
3. 확장자로 숨기기 *.확장자  ⇒ *.txt

### 만약 폴더 안에 commit 할 파일이 없다면

폴더 자체가 안올라감..

→ .gitkeep을 통해 올릴 수 있음

### gitignore.io

프로그래밍하고 실행하다보면 생기는 부산물들은 굳이 repo에올릴 필요가 없음

일일이 .gitignore에 올리기 힘드니까 이를 해주는 사이트

window 부터 시작해서 python django등등을 추가