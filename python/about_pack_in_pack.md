# import from

1. from 패키지 import 에는 무조건 모듈
2. 패키지 안의 패키지를 불러오고 싶으면 __init__을 건드려야함

```python
# ./my_pac

from . import math
print('my_pac init 실행됨')
```

```python
# ./my_pac/math

from . import test
print('math init 실행됨')
```

```python
# ./

import my_pac
print(dir())
print(my_pac.math.test.name)
print('end')
```

```python
# ./my_pac/math/test.py

name = '아무이름'
```