def backtracking(s,e,sm):
    global answer
    for i in range(s, e):
        if B - sm + lst[i] < 0:
            backtracking(i+1,e,sm+lst[i])
        else:
            answer = min(answer, sm - B)

T = int(input())
for t in range(1,T+1):
    N,B = map(int,input().split())
    lst = list(map(int,input().split()))
    lst.sort()
    tmp = 0
    for i in range(N):
        tmp += lst[i]
        if tmp >= B:
            break
    arr = [tmp]
    answer = tmp - B
    backtracking(0,i,tmp)
    for j in range(i+1,N):
        tmp = arr[-1] + lst[j]
        arr.append(tmp)
        print(tmp)
        backtracking(0,j,tmp)

    print(f'#{t} {answer}')