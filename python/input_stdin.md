# input vs stdin

[백준 2751번 문제 - 수 정렬하기 2](https://www.acmicpc.net/problem/2751)

이 문제를 풀려고 sort 공부하고 구현했는데 시간초과가 나서 list.sort()도 써봤는데도 시간초과가 남

```python
# 병합 정렬
N = int(input())

num_list = []

for _ in range(N):
    num_list.append(int(input()))

def merge_sort(L_list):
    if len(L_list) < 2:
        return L_list
    middle_point = len(L_list)//2
    lower_list = merge_sort(L_list[:middle_point])
    higher_list = merge_sort(L_list[middle_point:])
    
    lower_index = higher_index = 0
    merge_result = []
    while lower_index < len(lower_list) and higher_index < len(higher_list):
        if lower_list[lower_index] < higher_list[higher_index]:
            merge_result.append(lower_list[lower_index])
            lower_index += 1
        else:
            merge_result.append(higher_list[higher_index])
            higher_index += 1
    merge_result += lower_list[lower_index:]
    merge_result += higher_list[higher_index:]
    
    return merge_result
        

num_list = merge_sort(num_list)
for i in num_list:
    print(i)
```

```python
# 파이썬 정렬
N = int(input())
num_list = []
for _ in range(N):
    num_list.append(int(input()))

num_list.sort()

for i in num_list:
    print(i)
```

둘 다 시간초과가 났음

해결하기 위해 구글링 하다가 알게 된 것들

### input vs stdin
[python 공식문서 input()](https://docs.python.org/3/library/functions.html#input)
If the prompt argument is present, it is written to standard output without a trailing newline. The function then reads a line from input, converts it to a string (stripping a trailing newline), and returns that. When EOF is read, EOFError is raised.
만약 프롬프트 argument가 존재하면 새로운 줄 없이 쓰여진다(출력된다).
이 함수는 입력으로 부터 한줄을 읽은 뒤, 문자열로 변환하고 반환한다(개행문자를 지우면서). EOF 즉 파일의 끝을 읽으면 EOFError를 일으킨다.

==> 앞에꺼는 모르겠고
이 함수는 입력으로 부터 한줄을 읽은 뒤, 문자열로 변환하고 반환한다.
개행문자를 지우는건 \n같은 것을 지우는 것

그러니깐 input은 입력을 1. 받고 2. 읽고 3. 변환하고 4. 반환한다

[python 공식문서 stdin()](https://docs.python.org/3.10/library/sys.html#sys.stdin)
File objects used by the interpreter for standard input, output and errors:
- stdin is used for all interactive input (including calls to input());
- stdout is used for the output of print() and expression statements and for the prompts of input();
- The interpreter’s own prompts and its error messages go to stderr.

표준 입력, 출력 및 오류에 대해 인터프리터가 사용하는 파일 객체:
- stdin은 모든 대화형 입력에 사용됩니다(input() 호출 포함).
- stdout은 print() 및 expression 문의 출력과 input() 프롬프트에 사용됩니다.
- 인터프리터 자신의 프롬프트와 오류 메시지는 stderr로 이동합니다.

These streams are regular text files like those returned by the open() function. Their parameters are chosen as follows:
이러한 스트림은 open() 함수에서 반환된 것과 같은 일반 텍스트 파일입니다. 매개변수는 다음과 같이 선택됩니다.