# git

3가지 영역

Working Directory → Staging Areat → git Repository

                             add                  commit

add, commit, push, clone, status

SA에서 WD 로 내리기 = 

commit 수정 → SA로 내려야함 = undo

branch??

### git undoing

== Git 작업 되돌리기

1. WD
    
    Working Directory에서 수정한 것 이전 커밋상태로 되돌리기
    
    git restore
    
2. SA
    
    SA에 반영된 파일 WD로 되돌리기
    
    git restore --staged
    
    git rm --chached
    
3. Repo
    
    커밋 완료 파일 SA로 되돌리기
    
    git commit --amend
    

---

1. git restore {파일 이름}
    
    WD에서 수정한 파일을 수정 전으로 되돌리기
    
    이미 버전 관리가 되고 있는 파일만 됨
    
    git restore를 통해 되돌리면 → 복원이 안돼버림