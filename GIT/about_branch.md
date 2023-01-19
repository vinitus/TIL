# git

3가지 영역

Working Directory → Staging Areat → git Repository

                add                  commit

add, commit, push, clone, status

### git undoing

== Git 작업 되돌리기

1. WD

   Working Directory에서 수정한 것 이전 커밋상태로 되돌리기

```bash
   git restore
```

2. SA

   SA에 반영된 파일 WD로 되돌리기

```bash
   git restore --staged

   git rm --chached
```

3. Repo

   커밋 완료 파일 SA로 되돌리기

```bash
   git commit --amend
```

---

1.  git restore {파일 이름}

    WD에서 수정한 파일을 수정 전으로 되돌리기

    이미 버전 관리가 되고 있는 파일만 됨

    git restore를 통해 되돌리면 → 복원이 안돼버림

    ```bash
    # a.md
    # (empty)

    git add .

    # update a.md
    # hi

    git add .

    $ git status
    On branch master

    No commits yet

    Changes to be committed:
      (use "git rm --cached <file>..." to unstage)
            new file:   a.md

    Changes not staged for commit:
      (use "git add <file>..." to update what will be committed)
      (use "git restore <file>..." to discard changes in working directory)
            modified:   a.md

    $ git restore a.md

    $ git status
    On branch master

    No commits yet

    Changes to be committed:
      (use "git rm --cached <file>..." to unstage)
            new file:   a.md

    # a.md
    # (empty)
    ```

2.  SA 작업단계 되돌리기 (WD로)

    git rm --cached ⇒ root-commit 없는 경우

    git restore --staged ⇒ root-commit 있는 경우

    1.  git rm --cached

        root commit 없는 경우 → commit 한번도 안했을 때

        ```bash
        $ git status
        On branch master

        No commits yet

        Changes to be committed:
          (use "git rm --cached <file>..." to unstage)
                new file:   a.md

        $ git rm --cached a.md
        rm 'a.md'

        $ git status
        On branch master

        No commits yet

        Untracked files:
          (use "git add <file>..." to include in what will be committed)
                a.md

        nothing added to commit but untracked files present (use "git add" to track)

        $ git rm --cached .
        fatal: not removing '.' recursively without -r

        $ git rm --cached -r .
        rm 'a.md'
        ```

    2.  git restore --staged {파일 이름}

        root-commit이 있는 경우 (git 저장소에 한 개 이상의 커밋이 있는 경우)

        ```bash
        # a.md는 commit이 되어있는 상태

        $ git add .

        $ git status
        On branch master
        Changes to be committed:
          (use "git restore --staged <file>..." to unstage)
                modified:   a.md

        $ git restore --staged .

        $ git status
        On branch master
        Changes not staged for commit:
          (use "git add <file>..." to update what will be committed)
          (use "git restore <file>..." to discard changes in working directory)
                modified:   a.md

        no changes added to commit (use "git add" and/or "git commit -a")
        ```

    3.  git commit --amend

        SA에 새로운 내용 x → 직전 커밋 메시지 수정

        있으면 커밋 덮어쓰기

        이정 커밋을 수정해서 새 커밋으로 만드는 것!

        커밋 내용 수정하거나 수정 사항을 새로 커밋에 추가하고 싶을 때 사용한다. → 버전이 바뀌지 않았는데 새롭게 버전 추가를 하고 싶지 않으면 쓰면 될듯

        ```bash
        $ git commit --amend

        amend first commit

        # Please enter the commit message for your changes. Lines starting
        # with '#' will be ignored, and an empty message aborts the commit.
        #
        # Date:      Fri Oct 28 09:48:53 2022 +0900
        #
        # On branch master
        #
        # Initial commit
        #
        # Changes to be committed:
        #       new file:   test.md
        #
        ```

        i 눌러서 insert mode 진입 → esc로 탈출 → :wq로 저장 후 나가기

        ```bash
        Author: vinitus <tlsdnrng@gmail.com>
        Date:   Fri Oct 28 09:56:00 2022 +0900

            modify test.md

            엄청난 기능을 제가 만들었습니다.

        Author: vinitus <tlsdnrng@gmail.com>
        Date:   Fri Oct 28 09:56:00 2022 +0900

            modify test.md

            엄청난 기능을 제가 수정했습니다.
        ```

        파일을 수정하고 add 후 git commit --amend 하면 마지막 commit에 수정하며 add 된 파일을 commit할 수 있다.

        → commit id가 변경됨

        ```bash
        Author: vinitus <tlsdnrng@gmail.com>
        Date:   Fri Oct 28 09:56:00 2022 +0900

            modify test.md - bug

            엄청난 기능을 만들었음
            엄청난 버그를 잡았습니다.........

        Author: vinitus <tlsdnrng@gmail.com>
        Date:   Fri Oct 28 09:56:00 2022 +0900

            modify test.md - bug

            엄청난 기능을 만들었음
            엄청난 버그를 잡았습니다.........
            ?
        ```

### git reset, revert

1.  git reset [options] {commit ID}

현재 commit에서 과거로 돌아가는 것.

**해당 커밋 이후 커밋 전부 삭제**

options : soft, mixed(default), hard

--soft : 되돌아간 커밋 이후 파일들은 SA로

--mixed : 되돌아간 커밋 이후 파일들은 WD로

--hard : 되돌아간 커밋 이후 파일들은 WD에서 삭제

        Untracked파일은 사라지지 않고 그대로

? git reflog

reset 하기 전의 과거 커밋 내역을 모두 조회 가능하다

근데 이거쓸꺼면 hard쓰면안됨

```bash
$ git log --oneline
20d320d (HEAD -> master) third
1eb059e second
6baf32f first

# soft
$ git reset --soft 6baf32f

$ git log --oneline
6baf32f (HEAD -> master) first

$ git status
On branch master
Changes to be committed:
    (use "git restore --staged <file>..." to unstage)
        new file:   2.txt
        new file:   3.txt

Untracked files:
    (use "git add <file>..." to include in what will be committed)
        untracked.txt

# mixed
$ git reset --mixed 6baf32f

$ git log --oneline
6baf32f (HEAD -> master) first

$ git status
On branch master
Untracked files:
    (use "git add <file>..." to include in what will be committed)
        2.txt
        3.txt
        untracked.txt

# hard
$ git reset --hard 6baf32f
HEAD is now at 6baf32f first

$ git status
On branch master
Untracked files:
    (use "git add <file>..." to include in what will be committed)
        untracked.txt

nothing added to commit but untracked files present (use "git add" to track)

$ ls
1.txt  untracked.txt
```

2.  git revert {commit ID}

이전 커밋을 **취소한다는 새로운 커밋**을 생성

해당 커밋의 해당 파일은 **삭제**된다

```bash
$ git log --oneline
20d320d (HEAD -> master) third
1eb059e second
6baf32f first

$ git revert 1eb059e
[master e5d7944] 이거 잘못했어요..
1 file changed, 1 deletion(-)
delete mode 100644 2.txt

$ git log --oneline
e5d7944 (HEAD -> master) 이거 잘못했어요..
20d320d third
1eb059e second
6baf32f first

$ ls
1.txt  3.txt  untracked.txt
```

revert 하다보면 충돌이 날 수가 있다

```bash
# 지금은 1 2 3 인데 1 4 5로 revert시도

4f24c15 (HEAD -> master) 1.txt 2 3
ad9f732 1.txt 4 5
a18d1a8 1.txt 6 7
20d320d third
1eb059e second
6baf32f first

$ git revert ad9f
Auto-merging 1.txt
CONFLICT (content): Merge conflict in 1.txt
error: could not revert ad9f732... 1.txt 4 5
hint: After resolving the conflicts, mark them with
hint: "git add/rm <pathspec>", then run
hint: "git revert --continue".
hint: You can instead skip this commit with "git revert --skip".
hint: To abort and get back to the state before "git revert",
hint: run "git revert --abort".

1
<<<<<<< HEAD
2
3
=======
6
7
>>>>>>> parent of ad9f732 (1.txt 4 5)

# 파일 수정
1
2
3
6
7

$ git status
On branch master
You are currently reverting commit ad9f732.
    (fix conflicts and run "git revert --continue")
    (use "git revert --skip" to skip this patch)
    (use "git revert --abort" to cancel the revert operation)

Unmerged paths:
    (use "git restore --staged <file>..." to unstage)
    (use "git add <file>..." to mark resolution)
        both modified:   1.txt

no changes added to commit (use "git add" and/or "git commit -a")

$ git commit -ㅁm "revert conflict 수정"
[master 9e9b239] revert conflict 수정
1 file changed, 3 insertions(+), 1 deletion(-)

$ git log --oneline
9e9b239 (HEAD -> master) revert conflict 수정
4f24c15 1.txt 2 3
ad9f732 1.txt 4 5
a18d1a8 1.txt 6 7
20d320d third
1eb059e second
6baf32f first
```

### git branch

나뭇가지 ⇒ 여러 갈래로 작업 공간을 만들고 독립적으로 작업할 수 있게 해줌

지금까지의 커밋한 것들을 건들이지 않고 이어서 따로 개발하고 싶을 때 사용한다

1. branch는 독립 공간을 형성하기 때문에 원본에 대해 안전
2. 하나의 작업(기능)은 하나의 branch로 나누어 진행 → 체계적인 개발
3. Git은 branch를 만드는 속도가 굉장히 빠르고, 적은 용량을 소모

동기적 개발에서 비동기적 개발이 가능하다

branch는 commit을 가리키는 일종의 pointer다.

1. 조회

git branch [-r] → -r : 원격저장소 확인

2. 생성

git branch {브랜치 이름} [commit ID]

3. 삭제

git branch {options} {브랜치 이름}

options : -d 병합된 branch 삭제, -D 강제 삭제

4. 이동

git switch [options] {branch name} [commit ID]

options : none 이동, -c 생성+이동

commit ID : none 최신,특정 커밋 기준

```bash
# a.txt
# 123

(master)
$ git add .

(master)
$ git commit -m "a.txt 생성"
[master (root-commit) f22a41f] a.txt 생성
    1 file changed, 1 insertion(+)
    create mode 100644 a.txt

(master)
$ git log
commit f22a41f3a35b4fd876c5616cdef1c5f4bf19e4f3 (HEAD -> master)
Author: vinitus <tlsdnrng@gmail.com>
Date:   Fri Oct 28 11:55:07 2022 +0900

    a.txt 생성

# a.txt
# 123
# 수정

(master)
$ git commit -am "a.txt 수정"
[master 5d81176] a.txt 수정
    1 file changed, 2 insertions(+), 1 deletion(-)

(master)
$ git log
commit 5d811761d6ff68fa8d4620b3b514993e18503120 (HEAD -> master)
Author: vinitus <tlsdnrng@gmail.com>
Date:   Fri Oct 28 11:56:09 2022 +0900

    a.txt 수정

commit f22a41f3a35b4fd876c5616cdef1c5f4bf19e4f3
Author: vinitus <tlsdnrng@gmail.com>
Date:   Fri Oct 28 11:55:07 2022 +0900

    a.txt 생성

(master)
$ git branch feature/signup

(master)
$ git switch feature/signup
Switched to branch 'feature/signup'

(feature/signup)
$ touch git.txt

(feature/signup)
$ git add .

(feature/signup)
$ git commit -m "add git.txt"
[feature/signup 8c61b85] add git.txt
    1 file changed, 0 insertions(+), 0 deletions(-)
    create mode 100644 git.txt

(feature/signup)
$ git log
commit 8c61b850f490d6a3e14b2797d8b46df27d33361c (HEAD -> feature/signup)
Author: vinitus <tlsdnrng@gmail.com>
Date:   Fri Oct 28 11:58:06 2022 +0900

    add git.txt

commit 5d811761d6ff68fa8d4620b3b514993e18503120 (master)
Author: vinitus <tlsdnrng@gmail.com>
Date:   Fri Oct 28 11:56:09 2022 +0900

    a.txt 수정

commit f22a41f3a35b4fd876c5616cdef1c5f4bf19e4f3
Author: vinitus <tlsdnrng@gmail.com>
Date:   Fri Oct 28 11:55:07 2022 +0900

    a.txt 생성

(feature/signup)
$ git switch master
Switched to branch 'master'

(master)
$ touch c.txt

(master)
$ git add
Nothing specified, nothing added.
hint: Maybe you wanted to say 'git add .'?
hint: Turn this message off by running
hint: "git config advice.addEmptyPathspec false"

(master)
$ git add .

(master)
$ git commit -m "master_c.txt"
[master 382f9d3] master_c.txt
    1 file changed, 1 insertion(+)
    create mode 100644 c.txt

(master)
$ git log
commit 382f9d3019ae192369a4bdc92ac61a6c9b0220c9 (HEAD -> master)
Author: vinitus <tlsdnrng@gmail.com>
Date:   Fri Oct 28 11:59:06 2022 +0900

    master_c.txt

commit 5d811761d6ff68fa8d4620b3b514993e18503120
Author: vinitus <tlsdnrng@gmail.com>
Date:   Fri Oct 28 11:56:09 2022 +0900

    a.txt 수정

commit f22a41f3a35b4fd876c5616cdef1c5f4bf19e4f3
Author: vinitus <tlsdnrng@gmail.com>
Date:   Fri Oct 28 11:55:07 2022 +0900

    a.txt 생성

(master)
$ git switch feature/signup
Switched to branch 'feature/signup'

(feature/signup)
$ git log
commit 8c61b850f490d6a3e14b2797d8b46df27d33361c (HEAD -> feature/signup)
Author: vinitus <tlsdnrng@gmail.com>
Date:   Fri Oct 28 11:58:06 2022 +0900

    add git.txt

commit 5d811761d6ff68fa8d4620b3b514993e18503120
Author: vinitus <tlsdnrng@gmail.com>
Date:   Fri Oct 28 11:56:09 2022 +0900

    a.txt 수정

commit f22a41f3a35b4fd876c5616cdef1c5f4bf19e4f3
Author: vinitus <tlsdnrng@gmail.com>
Date:   Fri Oct 28 11:55:07 2022 +0900

    a.txt 생성
```

### git merge

master pointer를 원하는 branch commit ID로 옮김

분기된 branch를 하나로 합치는 명령어

주로 main이 되는 master 브랜치에 병합

git merge {합쳐올 브랜치 이름}

1. fast-forword

   브랜치 포인터를 앞으로 이동

   뒤의 브랜치에서 앞의 브랜치 입력

2. 3-way merge

   각 브랜치의 커밋 두 개와 공통 조상 하나를 사용하여 병합하는 방법

3. merge conflict

   같은 파일을 수정해서 두개가 충돌이 나면 직접 해결해야함

```bash
(master)
$ touch 1.txt

(master)
$ git add .

(master)
$ git commit -m "master_1.txt_first"
[master (root-commit) 91b1956] master_1.txt_first
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 1.txt

(master)
$ git switch second
Switched to branch 'second'

(second)
$ git log
commit 91b19562b12f71b705e6e27c4e5cd9d17bd29527 (HEAD -> second, master)
Author: vinitus <tlsdnrng@gmail.com>
Date:   Fri Oct 28 12:17:56 2022 +0900

    master_1.txt_first

(second)
$ git status
On branch second
nothing to commit, working tree clean

(second)
$ touch 2.txt

(second)
$ git add .

(second)
$ git commit -m "second_2.txt_first"
[second db6ba69] second_2.txt_first
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 2.txt

$ git switch master
Switched to branch 'master'

(master)
$ git log
commit 91b19562b12f71b705e6e27c4e5cd9d17bd29527 (HEAD -> master)
Author: vinitus <tlsdnrng@gmail.com>
Date:   Fri Oct 28 12:17:56 2022 +0900

    master_1.txt_first

$ touch 3.txt

$ git add .

(master)
$ git commit -m "master_3.txt_third"
[master bc978bd] master_3.txt_third
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 3.txt

(master)
$ git log
commit bc978bd3e32b23d0b3a7af265c212d5b383a8709 (HEAD -> master)
Author: vinitus <tlsdnrng@gmail.com>
Date:   Fri Oct 28 12:20:29 2022 +0900

    master_3.txt_third

commit 91b19562b12f71b705e6e27c4e5cd9d17bd29527
Author: vinitus <tlsdnrng@gmail.com>
Date:   Fri Oct 28 12:17:56 2022 +0900

    master_1.txt_first

(master)
$ git merge second
Merge made by the 'ort' strategy.
 2.txt | 0
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 2.txt

(master)
$ git log
commit f2542a25b0ef8f10058de66ffac37c680fe44c0d (HEAD -> master)
Merge: bc978bd db6ba69
Author: vinitus <tlsdnrng@gmail.com>
Date:   Fri Oct 28 12:20:43 2022 +0900

    Merge branch 'second'

commit bc978bd3e32b23d0b3a7af265c212d5b383a8709
Author: vinitus <tlsdnrng@gmail.com>
Date:   Fri Oct 28 12:20:29 2022 +0900

    master_3.txt_third

commit db6ba6935c0274e50ec43ec1e7327807ed55c4dc (second)
Author: vinitus <tlsdnrng@gmail.com>
Date:   Fri Oct 28 12:19:17 2022 +0900

    second_2.txt_first

commit 91b19562b12f71b705e6e27c4e5cd9d17bd29527
Author: vinitus <tlsdnrng@gmail.com>
Date:   Fri Oct 28 12:17:56 2022 +0900

    master_1.txt_first

(master)
$ git switch second
Switched to branch 'second'

(second)
$ git log
commit db6ba6935c0274e50ec43ec1e7327807ed55c4dc (HEAD -> second)
Author: vinitus <tlsdnrng@gmail.com>
Date:   Fri Oct 28 12:19:17 2022 +0900

    second_2.txt_first

commit 91b19562b12f71b705e6e27c4e5cd9d17bd29527
Author: vinitus <tlsdnrng@gmail.com>
Date:   Fri Oct 28 12:17:56 2022 +0900

    master_1.txt_first

(second)
$ git merge master
Updating db6ba69..f2542a2
Fast-forward
 3.txt | 0
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 3.txt

(second)
$ git log
commit f2542a25b0ef8f10058de66ffac37c680fe44c0d (HEAD -> second, master)
Merge: bc978bd db6ba69
Author: vinitus <tlsdnrng@gmail.com>
Date:   Fri Oct 28 12:20:43 2022 +0900

    Merge branch 'second'

commit bc978bd3e32b23d0b3a7af265c212d5b383a8709
Author: vinitus <tlsdnrng@gmail.com>
Date:   Fri Oct 28 12:20:29 2022 +0900

    master_3.txt_third

commit db6ba6935c0274e50ec43ec1e7327807ed55c4dc
Author: vinitus <tlsdnrng@gmail.com>
Date:   Fri Oct 28 12:19:17 2022 +0900

    second_2.txt_first

commit 91b19562b12f71b705e6e27c4e5cd9d17bd29527
Author: vinitus <tlsdnrng@gmail.com>
Date:   Fri Oct 28 12:17:56 2022 +0900

    master_1.txt_first

(second)
$ git switch master
Switched to branch 'master'

(master)
$ git log --oneline --graph
*   f2542a2 (HEAD -> master, second) Merge branch 'second'
|\
| * db6ba69 second_2.txt_first
* | bc978bd master_3.txt_third
|/
* 91b1956 master_1.txt_first

$ git switch second
Switched to branch 'second'

(second)
$ git add .

(second)
$ git commit -m "second_1.txt_update"
[second 1e491a9] second_1.txt_update
 1 file changed, 1 insertion(+)

(second)
$ git switch master
Switched to branch 'master'

(master)
$ git add .

(master)
$ git commit -m "master_1.txt_update"
[master a16df7d] master_1.txt_update
 1 file changed, 1 insertion(+)

(master)
$ git merge second
Auto-merging 1.txt
CONFLICT (content): Merge conflict in 1.txt
Automatic merge failed; fix conflicts and then commit the result.

# 1.txt
<<<<<<< HEAD
no..
=======
oh
>>>>>>> second

->
oh
no..

(master|MERGING)
$ git commit -am "1.txt conflict sol"
[master 3600413] 1.txt conflict sol

(master)
$ git log --oneline --graph
*   3600413 (HEAD -> master) 1.txt conflict sol
|\
| * 1e491a9 (second) second_1.txt_update
* | a16df7d master_1.txt_update
|/
*   f2542a2 Merge branch 'second'
|\
| * db6ba69 second_2.txt_first
* | bc978bd master_3.txt_third
|/
* 91b1956 master_1.txt_first

(master)
$ git switch second
Switched to branch 'second'

(second)
$ git log --oneline
1e491a9 (HEAD -> second) second_1.txt_update
f2542a2 Merge branch 'second'
bc978bd master_3.txt_third
db6ba69 second_2.txt_first
91b1956 master_1.txt_first

(second)
$ git log --oneline --graph
* 1e491a9 (HEAD -> second) second_1.txt_update
*   f2542a2 Merge branch 'second'
|\
| * db6ba69 second_2.txt_first
* | bc978bd master_3.txt_third
|/
* 91b1956 master_1.txt_first

(second)
$ git merge master
Updating 1e491a9..3600413
Fast-forward
 1.txt | 3 ++-
 1 file changed, 2 insertions(+), 1 deletion(-)

(second)
$ git log --oneline --graph
*   3600413 (HEAD -> second, master) 1.txt conflict sol
|\
| * 1e491a9 second_1.txt_update
* | a16df7d master_1.txt_update
|/
*   f2542a2 Merge branch 'second'
|\
| * db6ba69 second_2.txt_first
* | bc978bd master_3.txt_third
|/
* 91b1956 master_1.txt_first
```

### git 전략

git flow

[https://techblog.woowahan.com/2553/](https://techblog.woowahan.com/2553/)

다양한 전략이 있지만 어떤 전략을 쓸지는 팀에서 정함

→ 팀 고유 전략도 있따

중요한 것은 branch를 생성하는 것은 **강력 권장**

master만 쓰는건 aut

### HEAD

브랜치를 옮겨다닐 때 그 주체가 HEAD

HEAD는 현재 브랜치를 가리키고 브랜치는 자신의 최신 커밋을 가리키므로 HEAD는 항상 브랜치의 최신 커밋을 본다.

근데 commit ID를 통해 특정 commit으로 이동하면 HEAD는 그것을 가리키지만 branch를 가리키는 건 아님

### At Remote Repository

특정 브랜치 푸쉬하기 : git push origin (branch name)

특정 브랜츠 가져오기 : git checkout -t orgitn/{branch name}
