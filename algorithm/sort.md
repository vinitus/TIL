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


        ### 선택 알고리즘

        저장되어있는 자료로부터 k번째로 크거나 작은 원소를 찾는 방법

        ```python
        def selectionSort(arr,k):
            for i in range(k):
                minIdx = i
                for j in range(i+1,len(arr)):
                    if arr[minIdx] > arr[j]:
                        minIdx = j
                arr[i], arr[minIdx] = arr[minIdx], arr[i]
        ```

        ```python
        N, M = 3, 4

        arr1 = [0] * N

        arr2 = list([0] * M for _ in range(N))

        arr3 = [[0]*M]*N    # 이러면 얕은복사임 ㄴㄴ

        arr = [list(map(int,input().split())) for _ in range(N)]
        ```

    ⭐ arr3 중요

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
        
        완전 이진 트리로 이루어진 자료구조
        
        - 최소, 최대 힙
            
            부모노드가 자식노드보다 크면 최대힙이고 반대면 최소힙
            
        
        이진 트리 = 자식노드가 최대 2개인 트리
        
        완전 이진 트리 = 왼쪽부터 오른쪽 아래로 순서에 맞게 꽉 채워진 이진 트리
        
        힙에서 자식index에서 부모 index에 접근하려면 (자식idx - 1) // 2를 하면됨
        
        힙정렬은 최대힙에서 기반
        
        최대힙이면 배열 중 가장 큰 값이 맨위로 올라감 → 이를 마지막 요소와 바꿈
        
        다시 최대힙으로 만들고 이를 마지막 전 요소와 바꿈
        
        → for문 최대에서 0까지 순회하는 구조
        
        다시 최대힙으로 만들기
        
        → 1부터 바꾼 요소 전까지 = for (1,i)
        
        ```jsx
        import random
        
        def make_heap(num_list):
            pass
            for i in range(1, len(num_list)):
                while i > 0:
                    target = (i - 1) // 2
                    if num_list[i] > num_list[target]:
                        num_list[i], num_list[target] = num_list[target], num_list[i]
                    i = target
            return num_list
        
        def heap_sort(num_list):
            for i in range(len(num_list)-1,-1,-1):
                num_list[i],num_list[0] = num_list[0],num_list[i]
                for j in range(1, i):
                    while j > 0:
                        target = (j - 1) // 2
                        if num_list[j] > num_list[target]:
                            num_list[j], num_list[target] = num_list[target], num_list[j]
                        j = target
            return num_list
        
        n = 100
        a = list(random.randint(1,n) for _ in range(n))
        
        print(a)
        a = make_heap(a)
        print(heap_sort(a))
        ```
        
    3. **퀵 정렬(Quick sort)**
        
        평균적인 상황에서 최고의 성능
        
        리스트 전체를 for문으로 순회하며 피벗을 기준으로 리스트의 요소가 피벗보다 작으면 피벗보다 작은 list에 넣고 크면 큰 list에 넣고 같으면 equal list에 넣음
        
        그럼 equal list가 기준이 되어 작은 리스트들을 다시 퀵정렬하고 큰리스트도 퀵정렬
        
        ```jsx
        import random
        import time
        import psutil
        
        def quick_sort(num_list):
            if len(num_list) < 2:
                return num_list
            
            pivot = num_list[len(num_list)//2]
            
            smaller_pivot = []
            bigger_pivot = []
            equal_pivot = []
            for num in num_list:
                if pivot > num:
                    smaller_pivot.append(num)
                elif pivot < num:
                    bigger_pivot.append(num)
                else:
                    equal_pivot.append(num)
            return quick_sort(smaller_pivot) + equal_pivot + quick_sort1(bigger_pivot)
        
        n = 1000000
        a = list(random.randint(1,n) for _ in range(n))
        
        p = psutil.Process()
        print(p.memory_info())
        
        b = a[:]
        start = time.time()
        a = quick_sort(a)
        end = time.time()
        print(end - start)
        
        p = psutil.Process()
        print(p.memory_info())
        ```
        
        문제는 리스트를 계속 만들다보니까 메모리를 많이 먹는다
        
        메모리 많이 안먹는 버전
        
        ```jsx
        import random
        import time
        import psutil
        
        def partition(arr, start, end):
            pivot = arr[start]
            lower_point = start + 1
            higher_point = end
            stop_flag = False
            while not stop_flag:
                while lower_point <= higher_point and arr[lower_point] <= pivot:
                    lower_point += 1
                while lower_point <= higher_point and pivot <= arr[higher_point]:
                    higher_point -= 1
                if higher_point < lower_point:
                    stop_flag = True
                else:
                    arr[lower_point], arr[higher_point] = arr[higher_point], arr[lower_point]
            arr[start], arr[higher_point] = arr[higher_point], arr[start]
            return higher_point
        
        def quick_sort(arr, start, end):
            if start < end:
                pivot = partition(arr, start, end)
                quick_sort(arr, start, pivot - 1)
                quick_sort(arr, pivot + 1, end)
            return arr
            
        n = 1000000
        a = list(random.randint(1,n) for _ in range(n))
        
        p = psutil.Process()
        print(p.memory_info())
        
        start = time.time()
        a = quick_sort(a,0,n-1)
        end = time.time()
        print(end - start)
        
        p = psutil.Process()
        print(p.memory_info())
        ```
        
        아래의 경우 몇바이트 안먹음 4000bytes정도??
        
        위는 8470528 bytes나 먹는다