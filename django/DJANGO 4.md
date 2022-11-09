# DJANGO 4

인증과 권한

인증 - 신원 확인 // 권한 - 권한 부여 ( 인증된 사용자가 수행할 수 있는 작업을 결정 )

로그인 / 로그인한 사용자에게 권한 부여

**사전설정**

두번째 app accounts 생성 및 등록

```python
# settings.py

INSTALLED_APPS = [
		...
		'accounts',
		...
]
```

include랑 urls 다 해주기

### Substituting a custom User model

django는 User model을 User 모델로 대체를 강력하게 권장

django에서 built-in User model의 기본 인증 요구사항이 적절하지 않을 수 있음

django의 user model이 기본적으로 username을 식벽 값으로 사용 → user model 수정이 쉽지 않음

그래서 Django는 현재 프로젝트에서 나타낼 User를 참조하는 AUTH_USER_MODEL 설정 값을 제공하여 default user model을 재정의(override)할 수 있도록 함

base user model이 프로젝트 요구에서 충분하더라도 강력하게 권장

base user model과 custom user model이 동일하게 작동. BUT 나중에 필요시 커스텀이 가능하기 때문

⭐ 첫 migrate하기 전에 해둬야 함

### 대체하기

```python
# accounts/models.py

from django.contrib.auth.models import AbstractUser

class User(abstractUser):
		pass
```

User model도 AbstractUser class를 상속받기 때문에

내가 만들 custom user class도 상속만 받으면 댐

미리 해두는게 나음!

상속 관계 : models.Model → class AbstractBaseUser → **class AbstractUser** → class User

```python
# settings.py
AUTH_USER_MODEL = 'accounts.User'

# accounts/models.py
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

# accounts/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

admin.site.register(User, UserAdmin)
# custom user model 등록
```

### DB 초기화

migrations 폴더 및 **init**.py 빼고 다 삭제

db.sqlite3 삭제

## HTTP Cookies

데이터를 저장하는 작은 공간

HTTP : Hyper Text Transfer Protocol

HTML 같은 리소스들을 가져올 수 있도록 해주는 프로토콜

웹에서 이뤄지는 모든 데이터 교환의 기초

**요청과 응답**

요청 - 클라이언트에 의해 서버로 전송되는 메시지

응답 - 서버에서 클라이언트의 요청에 의해 응답으로 전송되는 메시지

### HTTP 특징

1. 비 연결 지향

   서버는 응답을 보내고 연결을 끊음

2. 무상태

   연결은 끊는 순간 클라이언트와 서버 간의 데이터 통신이 끝나며 상태 정보가 유지되지 않음

→ 로그인은 어떻게 유지할까? 쿠키와 세션

### 쿠키(Cookie)

HTTP쿠키는 상태가 있는 세션을 만들어줌

사용자가 웹사이트를 방문할 경우 해당 웹사이트의 서버를 통해 사용자의 컴퓨터에 설치되는 작은 기록 정보 파일

1. 브라우저는 dict형태로 데이터 저장
2. 동일 서버에서 재요청시 쿠키를 함께 전송

쿠키는 두 요청이 동일 브라우저에서 들어왔는지 아닌지 판단할 때 주로 사용 → 로그인 상태 유지 가능

1. 브라우저에서 웹 페이지로 요청을 보냄
2. 서버에서 페이지와 쿠키를 보냄
3. 브라우저에서 쿠키와 함께 요청을 보냄

쿠키 사용 목적

1. 세션관리 → 로그인, 자동완성 등
2. 개인화 → 사용자 선호, 테마 등의 설정
3. 트래킹 → 사용자 기록 및 분석

### 세션(Session)

사이트와 브라우저 사이의 상태를 유지시키는 것

클라이언트가 서버에 접속하면 서버가 특정 session id를 발급하고 클라는 session id를 쿠키에 저장

→ 클라가 다시 동일 서버에 접속하면 요청과 함께 session id 값이 담긴 쿠키를 서버에 전달

→ 쿠키는 요청때마다 서버에 함께 전송되므로 서버에서 session id를 확인해 알맞은 로직을 처리

session id는 세션을 구별하기 위해 필요! 쿠크에는 session id만 저장

**쿠키의 수명**

1. session cookie

   현재 세션 종료시, 브라우저 종료시

2. persistent cookies

   expires 속성에 지정된 날짜나 max-age 속성에 지정된 기간이 지나면 삭제

**Session in Django**

django는 database-backed sessions 저장 방식을 기본 값으로 사용

→ session 정보는 django db의 django_session 테이블에 저장 (설정으로 다른 저장방식 변경 가능)

django는 특정 session id를 포함하는 쿠키를 사용 → 각 브라우저와 사이트가 연결된 session을 알아냄

### Login

로그인은 Session을 **Create**하는 과정!

로그인을 위한 built-in form

- 로그인하고자 하는 사용자 정보를 입력받고 기본적으로 username과 pw를 받아 데이터가 유효한지 검증
  request는 첫번째 인자임.

```python
# accounts/urls.py
urlpatterns = [
    path('login/', views.login, name='login'),
]

# accounts/views.py
from django.shortcuts import render
from django.contrib.auth.forms import AuthenticationForm

def login(request):
    if request.method == 'POST':
        pass
    else:
        form = AuthenticationForm()     # username과 password를 입력받는 form
    context = {
        'form':form,
    }

    return render(request, 'accounts/login.html', context)

# accounts/templates/accounts/login.html
{% extends 'base.html' %}
{% block content %}
  <h1>로그인</h1>
  <form action="{% url 'accounts:login' %}", method="POST">
    {% csrf_token %}
    {{ form.as_p }}
    <input type="submit" value="로그인">
  </form>
{% endblock content %}
```

**login(request,user,backend=None)**

인증된 사용자를 로그인 시키는 로직으로 view에서 사용

현재 세션에 연결하려는 인증된 사용자가있는 경우 사용

HttpRequest 객체와 User 객체 필수

```python
# accounts/views.py

from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login as auth_login

def login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, request.POST) # request로 입력을 받고 POST 방식으로 온 데이터도 argument로 받음
        if form.is_valid():   # form data 유효성 검사
            auth_login(request, form.get_user())   # 로그인처리.
            return redirect('articles:index')
    else:
        form = AuthenticationForm()     # username과 password를 입력받는 form
    context = {
        'form':form,
    }

    return render(request, 'accounts/login.html', context)
```

중요한 점.

보통 login으로 함수를 정의하니까 보통 auth_login으로 이름을 바꿔줌

form class의 get_user method를 통해 User 객체를 가져올 수 있음

세션 데이터 확인 f12 - application - cookies

### Authentiction with User

템플릿에서 인증 관련 데이터를 출력하는 방법

context 데이터 없이 user변수로 사용

→ settings.py의 context processors 덕분에 가능한거임

**context processors**

템플릿이 렌더링 될 때 호출 가능한 context data list

작성된 context data는 기본적으로 template에서 사용 가능한 변수로 포함!!

```python
# settings.py
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

**django.contrib.auth.context_processors.auth**

현재 로그인한 사용자를 나타내는 User 클래스의 인스턴스가 template 변수 user에 저장됨

→ 로그인 하지 않은 경우 AnonymousUser 클래스의 인스턴스로 생성

### Logout

session을 delete 하는 과정

**logout(request)**

HttpRequest 객체를 인자로 받고 반환 값이 없음

사용자가 로그인하지 않은 경우 오류를 발생시키지 않음!

1. 요청에 대한 session data를 db에서 삭제
2. 클라이언트의 쿠키에서도 session id를 삭제

→ 다른 사람이 동일 웹 브라우저를 사용하여 로그인하여 이전 사용자의 세션 데이터에 접근하는 것을 방지하기 위함

```python
# accounts/urls.py
app_name = 'accounts'
urlpatterns = [
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
]

# views.py
from django.contrib.auth import logout as auth_logout
def logout(request):
    auth_logout(request)
    return redirect('articles:index')

# base.html
<form action="{% url 'accounts:logout' %}" method="POST">
  {% csrf_token %}
	<input type="submit" value="로그아웃">
</form>
```

로그아웃이 post → DB의 session을 지우는 작업이니깐

### 회원가입

User을 **Create!**

UserCreationForm built-in form

**UserCreationForm**

주어진 username과 pw로 권한이 없는 새 user을 생성하는 ModelForm

3개의 필드 - username, password1, password2

```python
# accounts/urls.py
urlpatterns = [
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('signup/', views.signup, name='signup'),
]

# accounts/views.py
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm

def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('articles:index')
    else:
        form = UserCreationForm()
    context = {
        'form':form
    }
    return render(request, 'accounts/signup.html', context)

# signup.html
{% extends 'base.html' %}
{% block content %}
  <h1>회원가입</h1>
  <form action="{% url 'accounts:signup' %}" method="POST">
    {% csrf_token %}
    {{ form.as_p }}
    <input type="submit" value="회원가입">
  </form>
{% endblock content %}
```

django의 UserCreationFrom는 base User Model로 작성된 클래스이기에 AttributeError가 남

### Custom user & Built-in auth forms

아래 클래스는 User 모델이 custom됐더라도 사용가능

1. AuthenticationForm
2. SetPasswordForm
3. PasswordChangeForm
4. AdminPasswordChangForm

왜 와이 → 기존 User model을 참조하는 Form이 아니기 떄문

Custom User Model 사용시 다시 작성 or 확장해야하는 forms

1. UserCreationForm
2. UserChangeForm

두 form 모두

```python
class Meta:
		model = User
```

가 등록된 form → **반드시 custom**해야함!!!

**UserCreationForm() 커스텀 하기**

```python
# accounts/forms.py
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

class CustomUserCreationForm(UserCreationForm):

    class Meta(UserCreationForm.Meta):
        model = get_user_model()

class CustomUserChangeForm(UserChangeForm):

    class Meta(UserChangeForm.Meta):
        model = get_user_model()
```

**get_user_model()**

현재 프로젝트에서 활성화된 사용자 모델(active user model)을 반환

model을 직접 참조하지 않는 이유 (from accounts.models import User)

→ base User Model이 아닌 User Model을 커스텀 한 상황에서는 Custom User Model을 자동으로 반환해주기 때문..

Django는 User class를 직접 참조하는 대신 get_user_model()을 통해 참조하라고 강조

```python
# accounts/views.py
from .forms import CustomUserChangeForm, CustomUserCreationForm
def signup(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()         # DB 저장 후 user반환
						auth_login(request, user)  # 바로 로그인
            return redirect('articles:index')
    else:
        form = CustomUserCreationForm()
    context = {
        'form':form
    }
    return render(request, 'accounts/signup.html', context)
```

UserCreationForm의 save메서드는 저장도하고 user도 반환함

### 회원 탈퇴

유저를 **Delete!**

```python
# accounts/urls.py
urlpatterns = [
		...
		path('delete/', views.delete, name='delete'),
]
# accounts/views.py
def delete(request):
    request.user.delete()
    auth_logout(request)    # 탈퇴와 동시에 세션 정보도 삭제. 탈퇴 -> 로그아웃의 순서중요!
    return redirect('articles:index')

# base.html
<form action="{% url 'accounts:delete' %}" method="POST">
  {% csrf_token %}
  <input type="submit" value="회원탈퇴">
</form>
```

articles의 모델도 request.user처럼 request에서 바로 정보를 가져오려면

```python
# settings.py

**# 여기를 수정하면 request.~로 데이터를 가져올 수 있음
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]**
```

### 회원정보 수정

유저를 **Update! →** UserChangeForm built-in form

**UserChangeForm**

사용자의 정보 및 권한 변경을 위한 admin 인터페이스에서 사용되는 ModelForm

UserChangeForm 또한 ModelForm이기 떄문에 instace 인자로 base user 객체를 받는 구조 또한 동일함 → custom 필요

⭐UserChangeForm에서 argument로 instance를 넘겨줘야하는 이유

→ 안해주면 인스턴스를 변경하는게 아니라 그냥 만들어버리는거임

```python
# accounts/urls.py
urlpatterns = [
		...
		path('update/', views.update, name='update'),
]
# accounts/views.py
def update(request):
    if request.method == 'POST':
        pass
    else:
        form = CustomUserChangeForm(instance=request.user)
    context = {
        'form': form,
    }
    return render(request, 'accounts/update.html', context)

# update.html
{% extends 'base.html' %}
{% block content %}
  <h1>회원정보수정</h1>
  <form action="{% url 'accounts:update' %}" method="POST">
    {% csrf_token %}
    {{ form.as_p }}
    <input type="submit" value="수정">
  </form>
{% endblock content %}
```

**UserChangeForm의 문제점**

일반 사용자가 접근해서는 안 될 정보들(fields)까지 모두 수정이 가능해짐

→ 왜 와이? admin 인터페이스라서

따라서 UserChangeForm 을 상속받아 custom한 CustomUserChangeForm에서 접근 가능한 필드를 조정

어떻게 하냐면 공식문서에서 클래스 구조 확인하고 변경해야함 github.com/django/django/blob/main/django/contrib/auth/forms.py#L147

```python
# accounts/forms.py
class CustomUserChangeForm(UserChangeForm):

    class Meta(UserChangeForm.Meta):
        model = get_user_model()
        fields = ('email', 'first_name', 'last_name', )

# accounts/views.py
def update(request):
    if request.method == 'POST':
        form = CustomUserChangeForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            return redirect('articles:index')
    else:
        form = CustomUserChangeForm(instance=request.user)
    context = {
        'form': form,
    }
    return render(request, 'accounts/update.html', context)s
```

### 비밀번호 변경

**PasswordChangeForm**

사용자가 비밀번호를 변경할 수 있도록 하는 Form

이전 비밀번호를 입력하여 비밀번호를 변경할 수 있도록 함

이전 비밀번호를 입력하지 않고 비밀번호를 설정할 수 있는 SetpasswordForm을 상속받는 sub class

```python
# accounts/urls.py
urlpatterns = [
		...
		path('password/', views.change_password, name='change_password'),
]

# accounts/views.py
from django.contrib.auth.forms import AuthenticationForm, PasswordChangeForm
def change_password(request):
    if request.method == 'POST':
        if form.is_valid():
            form.save()
            return redirect('articles:index')
    else:
        form = PasswordChangeForm(request.user)
    context = {
        'form': form,
    }
    return render(request, 'accounts/change_password.html', context)

# templates/accounts/change_password.html
{% extends 'base.html' %}
{% block content %}
  <h1>비밀번호 변경</h1>
  <form action="{% url 'accounts:change_password' %}" method="POST">
    {% csrf_token %}
    {{ form.as_p }}
    <input type="submit" value="비밀번호 변경">
  </form>
{% endblock content %}
```

근데 이렇게하면 비번 바꾸면 로그인 상태가 지속되지못함……….

**암호 변경시 세션 무효화 방지하기**

비밀번호가 변경되면 기존 세션과의 회원 인증 정보가 일치하지 않게 되어 버려 로그인 상태가 유지되지 못함

비밀번호 변경 → 기존 세션 회원 인증정보가 불일치

**update_session_auth_hash(request, user)**

현재 요청과 새 session data가 파생 될 업데이트 된 사용자 객체를 가져오고, session data를 적절하게 업데이트 해줌

```python
# accounts/views.py
from django.contrib.auth.forms import AuthenticationForm, PasswordChangeForm
def change_password(request):
    if request.method == 'POST':
        if form.is_valid():
            form.save()
						update_session_auth_hash(request, form.user)
            return redirect('articles:index')
    else:
        form = PasswordChangeForm(request.user)
    context = {
        'form': form,
    }
    return render(request, 'accounts/change_password.html', context)
```

## 사용자 접근 제한

1. is_authenticated attribute
2. the login_required decorator

### **is_authenticated**

User model의 속성 중 하나로써 사용자가 인증되었는지 여부를 알 수 있는 방법

User 인스턴스에 대해 항상 True ↔ AnonymousUser에 대해서는 항상 False

일반적으로 request.user 속성을 사용 = request.user.is_authenticated → template에서 하는 방법

view에서 하기

```python
class AbstractBaseUser(models.Model):
		...
		def is_authenticated(self):
				return True
```

**권한과는 관련이 없음! 활성화상태, 유효세션 검사도 안함!**

```python
# base.html

<div class="container">
  {% if reqeust.user.is_authenticated %}
    <h3>Hello, {{user}}</h3>
    <form action="{% url 'accounts:logout' %}" method="POST">
      {% csrf_token %}
      <input type="submit" value="로그아웃">
    </form>
    <a href="{% url 'accounts:update' %}" style="text-decoration:None;">회원정보 수정</a>
    <form action="{% url 'accounts:delete' %}" method="POST">
      {% csrf_token %}
      <input type="submit" value="회원탈퇴">
    </form>
  {% else %}
    <a href="{% url 'accounts:login' %}" style="text-decoration:None;">로그인</a>
    <a href="{% url 'accounts:signup' %}" style="text-decoration:None;">회원가입</a>
	  <hr>
  {% endif %}

  {% block content %}
  {% endblock content %}
</div>

# articles/index.html
{% if request.user.is_authenticated %}
  <a href="{% url 'articles:create' %}">CREATE</a>
{% else %}
  <a href="{% url 'accounts:login' %}">새 글을 작성하려면 로그인하세요</a>
{% endif %}
```

**login_required**

사용자가 로그인 되어 있으면 정상적으로 view 함수를 실행

로그인 하지 않은 사용자의 경우 settings.py의 login_url 문자열 주소로 redirect

참고! login_url의 기본 값은 /accounts/login

두번째 app 이름을 accounts로 했던 이유 중 하나

인증 성공 시 사용자가 redirect 되어야하는 경로는 “next”라는 쿼리 문자열 매개 변수에 저장됨

/accounts/login/?next=/articles/create/

**next query string**

로그인이 정상적으로 진행되면 이전 요청한 주소로 redirect 하기 위해 django가 제공해주는 쿼리스트링파라미터

```python
# accounts/views.py
def login(request):
    if request.user.is_authenticated:
        return redirect('articles:index')
    if request.method == 'POST':
        form = AuthenticationForm(request, request.POST)
        if form.is_valid():
            auth_login(request, form.get_user())
            return redirect(request.GET.get('next') or 'articles:index')
    else:
        form = AuthenticationForm()     # username과 password를 입력받는 form
    context = {
        'form':form,
    }

    return render(request, 'accounts/login.html', context)
```

return redirect(request.GET.get('next')

근데 next 쿼리 스트링 쓸 때 login.html에서 form action으로 작성되어있으면 동작안함

왜 와이 → action 주소로 next 파라미터가 작성 되어있는 현재 url이 아닌 /accounts/login/으로 요청을 보내기 때문

```python
# accounts/login.html

{% extends 'base.html' %}
{% block content %}
  <h1>로그인</h1>
  <form action="{% url 'accounts:login' %}" method="POST">
    {% csrf_token %}
    {{ form.as_p }}
    <input type="submit" value="로그인">
  </form>
{% endblock content %}
```

두 데코레이터로 인해 발생하는 구조적 문제

1. 먼저 비로그인 상태로 detail 페이지에서 게시글 삭제 시도하면
2. delete view함수의 @login_required로 인해 로그인 페이지로 리다이렉트(next 쿼리 스트링)
3. redirect로 이동한 로그인 페이지에서 로그인 진행 후 next 쿼리 스트링 값으로 redirect
4. delete view 함수의 데코레이터 @require_POST로 인해 405 상태 코드

왜 와이 → url를 타고 이동하는 것이 GET 방식이기 때문에 POST형식이 아니면 허락되지 않은 method라서 그럼

그래서 @login_required는 GET request method를 처리할 수 있는 View 함수에서만 사용

그래서 POST method만 허용하는 delete 같은 함수 내부에서는

```
@require_POST
def delete(request, pk):
    if request.user.is_authenticated:
        article = Article.objects.get(pk=pk)
        article.delete()
    return redirect('articles:index')
```

is_authenticated를 활용하여 처리한다
