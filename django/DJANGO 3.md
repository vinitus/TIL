# DJANGO 3

## DJANGO FORM

유효성 검증 도구 중 하나로 외부의 악의적 공격 및 데이터 손상에 대한 중요 방어 수단

유효성 검사를 단순화하고 자동화

1. 렌더링을 위한 데이터 준비 및 재구성
2. 데이터에 대한 HTML forms 생성
3. 클라이언트로부터 받은 데이터 수신 및 처리

앱 폴더에 forms.py를 생성 후 AricleForm Class 선언

```python
# articles/forms.py
from django import forms

class ArticleForm(forms.Form):
		NATION_A = 'kr'
		NATION_B = 'ch'
		NATION_C = 'jp'
		NATIONS_CHOICES = [
				(NATION_A, '한국'),
				(NATION_B, '중국'),
				(NATION_C, '일본'),
		]

		title = forms.CharField(max_lenght=10)
		content = forms.CharField(widget=forms.Textarea)   # forms에는 Text필드가 없슴
		nation = forms.ChoiceField(choices=NATIONS_CHOICES)

# widgets : input 요소의 출력 부분을 담당

# views.py
from .forms import ArticleForm

def new(request):
		form = ArticleForm()
		context = {
				'form' : form,
		}

		return render(request, 'articles/new.html', context)

# new.html
{{ form.as_p }}

# 이렇게 하면 알아서 다 해줌 ㅋㅋ
# .as_p = title과 content 사이를 띄워주기
# .as_ul = li태그
# .as_table = 각 필드 테이블로
```

### DJANGO ModelForm

→ form field를 하나씩 해줄 필요가 없음

helper class 사용

```python
# articles/forms.py
from django import forms
from .models import Article

class ArticleForm(forms.ModelForm):
		class Meta:
				model = Article
				fields = '__all__'
				
```

### Meta

데이터를 표현하기 위한 데이터

참조값과 반환 값

호출하지 않고 이름만 작성하는 코드의 차이

print(greeting)     # 참조값(메모리주소)

print(greeting())   # 반환값(return)

언제 참조값을 쓰냐? → 함수를 호출하지 않고 함수 자체를 전달하여 다른 함수에서 **필요한 시점**에 호출

model = Article

→ Article이라는 클래스를 호출하지 않고 작성하는 이유는 ArticleForm이 해당 클래스를 필요한 시점에 사용하기 위함임 + 클래스의 필드나 속성을 내부적으로 참조하기 위한 이유도 있음

```python
# articles/views.py
def create(request):
		form = ArticleForm(request.POST)
		if form.is_valid():
				form.save()
				return redirect('articles:index')
		context = {
				'form' : form,
		}
		return render(request, 'articles/new.html', context)

# new.html
어차피 form에 담김
```

is_valid() ⇒ 유효성검사

save() ⇒ form인스턴스에 바인드(들어간) 된 데이터를 통해 DB에 객체를 만들고 저장

form = ArticleForm(request.POST)

위 코드 뒤에 argument로 instance가 들어오면 update

is_valid() False시 form.errors를 제공 html 로 준다

수정!

```python
# views.py
def edit(request,pk):
		...
		form = ArticleForm(instance=article)
		context = {
				'article':article,
				'form':form,
		}
		...

def update(request,pk):
		...
		form = ArticleForm(request.POST, instance=article)
		if form.is_valid():
				form.save()
				return redirect(~
		context = {
				'form':form,
		}
		return render(request,~
# edit.html
{{form.as_p}]
```

### 위젯

DB에는 영향이 없음. 프론트적인 부분

forms.py에서 widghts dict를 만들거나

이렇게 하기

```python
# articles/forms.py
class ArticleForm(forms.ModelForm):
		title = forms.CharField(
        label='제목',
        widget=forms.TextInput(
            attrs={
								# html의 속성 : 값
                'class': 'my-title',
                'placeholder': 'Enter the title',
                'maxlength': 10,
            }
        )
    )
```

### Handling HTTP requests

request가 POST인지 GET인지를 알아서 구분하기

request.method를 통해 GET인지 POST인지 알 수 있음

```python
# articles/views.py

def create(request):
    if request.method == 'POST':
        # create
        form = ArticleForm(request.POST)
        if form.is_valid():
            article = form.save()
            return redirect('articles:detail', article.pk)
    else:
        # new
        form = ArticleForm()   # 이건 html 구조가 담긴 form
    context = {
        'form': form,
    }
		# 위에서 내려오는 form은 errors, 밑에서 들어오는 form은 만드는 폼
    return render(request, 'articles/create.html', context)

def update(request, pk):
    article = Article.objects.get(pk=pk)
    if request.method == 'POST':
        form = ArticleForm(request.POST, instance=article)
        # form = ArticleForm(data=request.POST, instance=article)
        if form.is_valid():
            form.save()
            return redirect('articles:detail', article.pk)
    else:
        form = ArticleForm(instance=article)
    context = {
        'article': article,
        'form': form,
    }
    return render(request, 'articles/update.html', context)
```

### View Decorator

데코레이터

기존 작성된 함수에 기능을 추가하고 싶을 때 ! → 해당 함수는 수정하지않음

### Allowed HTTP methods

request가 들어왔을 때 method는 GET과 POST말고 다른 메서드가 많음

기존 index만 봐도 모든 method에서 허용됨

1. require_safe
2. require_http_methods()
3. require_POST

공식문서에서 require_GET도 있지만 require_safe를 권장함

```python
from django.views.decorators.http import require_safe, require_http_methods, require_POST

@require_safe            # 데코레이터 먼저 실행. GET 요청에 대해서만 실행
def index(request):
    articles = Article.objects.all()
    context = {
        'articles': articles,
    }
    return render(request, 'articles/index.html', context)

# 데코레이터가 있어서 구조가 의미 없긴 해도 굳이 깨진 않음 == 위젯처럼 없어도 되는녀석
@require_http_methods(['GET', 'POST'])
def create(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST)
        if form.is_valid():
            article = form.save()
            return redirect('articles:detail', article.pk)
    else:
        form = ArticleForm()
    context = {
        'form': form,
    }
    return render(request, 'articles/create.html', context)

@require_POST
def delete(request, pk):
    article = Article.objects.get(pk=pk)
    article.delete()
    return redirect('articles:index')
```

**405 Method Not Allowed**

요청은 잘 되었지만 서버에서 요청을 허락해주지 않음
