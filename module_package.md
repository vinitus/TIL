## 모듈

다양한 기능을 하나의 파일로 묶은 것 = module

다양한 모듈을 하나의 폴더로 묶은 것 = package

다양한 패키지를 하나로 묶은 것 = libary

이를 관리하는 관리자 = pip

패키지의 활용 공간 = 가상환경(vscode)

### 모듈

특정 기능을 하는 코드를 하나의 파이썬 파일 단위로 만든 것

- 불러오기

```python
import module
from module import var,function,Class
from package import module
from package.module import var,function,Class
```

### 파이썬 패키지 관리자

- pip install numpy
- pip install numpy==1.1   ← > 이런거도 사용댐
- pip uninstall numpy
- pip list
- pip freeze > requirements.txt
- pip install -r requirements.txt
