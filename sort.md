# 정렬

정렬이란 데이터를 정해진 순서대로 나열하는 것

왜 해야하는가 → 탐색을 위해서

데이터가 정렬되어 있따면 이진 탐색 알고리즘을 사용할 수 있음

정렬된 데이터에게 추가/삭제가 이뤄지면 정렬되지 않은 데이터보다 시간이 더 걸리지만 데이터를 조회하는 것이 압도적으로 더 많음

1. 시간복잡도가 O(n^2)인 것
    1. **버블 정렬(Bubble Sort)**
        
        k번째와 k+1번째 원소를 비교하며 n-1, n번째까지 정렬하고
        
        다시 처음으로 돌아가서 n-2,n-1까지 비교하고 정렬
        
        ```python
        import random
        
        def bubble_sort(L_list):
            for i in range(len(L_list)-1):
                for j in range(len(L_list)-i-1):
                    if L_list[j] > L_list[j+1]:
                        L_list[j], L_list[j+1] = L_list[j+1], L_list[j]
            return L_list
        
        a = list(random.randint(1,100) for _ in range(100))
        
        print(a)
        print(bubble_sort(a))
        ```
        
        우선 버블 정렬의 정의에 따르면 길이 n-1 만큼의 사이클이 돌아가야함
        
        첫 사이클은 n-1만큼 k와 k+1번째 인덱스를 가진 요소를 비교하는 것을 반복함
        
        두번째 사이클은 n-2만큼, 세번째는 n-3만큼…
        
        → 이는 바깥 for문의 index를 n-1에서 빼준 것과 같다
        
        ### 최적화
        
        만약 정렬이 일어나지 않았으면 이미 전부 정렬된 것이기에 종료할 수 있음
        
        ```python
        import random
        
        def bubble_sort(L_list):
            for i in range(len(L_list)-1):
        				swap_flag = False
                for j in range(len(L_list)-i-1):
                    if L_list[j] > L_list[j+1]:
                        L_list[j], L_list[j+1] = L_list[j+1], L_list[j]
        								swap_flag = True
        				if not swap_flag:
        					break
            return L_list
        
        a = list(random.randint(1,100) for _ in range(100))
        
        print(a)
        print(bubble_sort(a))
        ```
        
    2. **선택 정렬(Selection Sort)**
        
        처음부터 끝까지 훑어서 가장 작은 것부터 0,1,2,3,4,… index에 정렬하는 방식 → 버블 정렬보다 빠르다
        
        ```python
        import random
        
        def selection_sort(L_list):
            for i in range(len(L_list)-1):
                min_idx = i
                for j in range(i+1,len(L_list)):
                    if L_list[j] < L_list[min_idx]:
                        min_idx = j
                L_list[i], L_list[min_idx] = L_list[min_idx], L_list[i]
            return L_list
                    
        
        a = list(random.randint(1,100) for _ in range(100))
        
        print(a)
        print(selection_sort(a))
        ```
        
    3. **삽입 정렬(Insertion sort)**
        
        k번째 원소를 k-1부터 0까지 비교해가며 n까지 반복하는 정렬
        
        O(n^2)의 시간복잡도를 가지는 정렬 중에선 빠른 편이다.
        
        그러나 뒤쪽에 작은 데이터가 몰려있거나 자료구조에 따라 뒤로 밀어내는 시간이 클 수도 있다
        
        ```python
        import random
        
        def insert_sort(L_list):
            for i in range(1,len(L_list)):
                for j in range(i,0,-1):
                    if L_list[j] < L_list[j-1]:
                        L_list[j], L_list[j-1] = L_list[j-1], L_list[j]
            return L_list
                    
        
        a = list(random.randint(1,100) for _ in range(100))
        
        print(a)
        print(insert_sort(a))
        ```
        
        ### 최적화
        
        만약 k번째 요소를 k-1부터 0까지 비교하는 도중에 바뀌지 않는다면 그 아래 index와 비교할 필요가 없음
        
        → 이미 k-1번째 요소까지는 정렬되있기 때문임
        
        ```python
        import random
        
        def insert_sort(L_list):
            for i in range(1,len(L_list)):
                for j in range(i,0,-1):
                    if L_list[j] < L_list[j-1]:
                        L_list[j], L_list[j-1] = L_list[j-1], L_list[j]
                    else:
                        break
            return L_list
                    
        
        a = list(random.randint(1,100) for _ in range(100))
        
        print(a)
        print(insert_sort(a))
        ```
        
        else를 추가한 것 뿐임
        
    
    ### 최적화된 sort와 그냥 sort의 차이
    
    ```python
    import random
    import time
    
    def insert_sort(L_list):
        for i in range(1,len(L_list)):
            for j in range(i,0,-1):
                if L_list[j] < L_list[j-1]:
                    L_list[j], L_list[j-1] = L_list[j-1], L_list[j]
        return L_list
                
    def insert_sort2(L_list):
        for i in range(1,len(L_list)):
            for j in range(i,0,-1):
                if L_list[j] < L_list[j-1]:
                    L_list[j], L_list[j-1] = L_list[j-1], L_list[j]
                else:
                    break
        return L_list
    
    a = list(random.randint(1,10000) for _ in range(10000))
    b = a[:]
    
    start = time.process_time()
    insert_sort(a)
    end = time.process_time()
    print(end - start)                # 8.125초
    
    start = time.process_time()
    insert_sort2(b)                   # 최적화 sort
    end = time.process_time()
    print(end - start)                # 5.875초
    ```
    
    time 모듈을 통한 프로그램 실행 시간을 비교해보면
    
    8.125초와 5.875초
    
    몇번을 실행해도 최적화된 코드가 더 빠르다 → 불필요한 정렬연산이 없기 때문
    
2. 시간복잡도가 O(n log n)인 것
    1. **병합 정렬/합병 정렬(Merge sort)**
        
        1.모든 원소를 1개가 될때 까지 반으로 쪼개어 나눈다
        
        2.2개의 쌍(1+1)일 때 대소를 비교하여 정렬
        
        3.4개의 쌍(2+2)일 때 대소를 비교하여 정렬
        
        …
        
        n.마지막으로 합치며 정렬
        
        ```python
        import random
        
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
        
        a = list(random.randint(1,100) for _ in range(100))
        
        print(a)
        print(merge_sort(a))
        ```
        
    2. **힙 정렬(Heap sort)**