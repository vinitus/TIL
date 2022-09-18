# HTML

## 웹사이트란?

브라우저를 통해 접속하는 웹 페이지들의 모음

1. HTML  → 구조
2. CSS     → 표현
3. JS        → 동작

### 웹표준

웹에서 표준적으로 사용되는 기술, 규칙 → w3

### HTML

Hyper Text Markup Language

웹 페이지를 작성하기 위한 언어

```html
<!DOCTYPE html>
<html lang="en">
html 문서의 최상위 요소
<head>
문서 데코레이터 요소 -> 문서제목<title>,인코딩,스타일,외부파일로딩 등
	<meta charset="UTF-8">
</head>
<body>

</body>
</html>
```

HTML, CSS, JS 코드를 번역해주고 페이지로 나타내주는 것 : 렌더링

### CSS 적용 방법

1. 인라인
2. 내부 style태그
3. 외부 참조 (link태그)

### 요소

여는태그 + 내용 + 닫는태그

위의 3개 전부 다 요소임

### 속성

태그의 부가적인 정보를 설정

<id> : 문서의 유일 고유 식별자 → 문서당 한개만 존재

<class> : 공통으로 접근하고 싶은 요소들을 class로 묶음

<data-*> : 페이지에 개인 사용자 정의 데이터를 저장하기 위해 사용

<style> : inline 스타일

<title> : 요소에 대한 추가 정보

<tapindex> : 요소의 탭 순서(index)

### 태그

<a href=””></a> 링크

<b></b> : 굵은 글씨

<strong></strong> : 강조 (보통 굵은글씨)

<i></i> : 기울임

<em></em> : 기울임으로 강조

<br> : \n

<img src=”파일경로”> 이미지 표현

<span></span> : 의미없는 인라인 컨테이너 ← css나 js를 통해 접근하고 싶은 항목을 이렇게 많이씀

---

<p></p> 문단처리

<hr> : md에서 - - - -랑 같음

<ol></ol> = 순서가 있는

<ul></ul> : 순서가 없는

<pre></pre> : 고정폭글꼴, 공백 유지하는 표현

<blockquote></blockquote> : 들여쓰기

<div></div> : span과 같음

### 인라인 / 블록 요소

ABCDE ← 인라인

AB

C   ← 블록

DE

### form

데이터를 입력받고 서버에 전송하기 위한 태그 → django

**Get** 서버에서 어떤 데이터를 가져와서 보여줄때 사용

**Post** 서버상의 데이터 값이나 상태를 바꾸기 위해서 사용합니다.

### input

사용자가 입력을 하는 곳을 만드는 속성

name : form의 이름

value : form에 적용되는 값

required, autofocus 기타 등등

type : input form의 형태

### domain

ip주소를 직관적인 주소로 나타내는 것

주소에 접근하면 자동적으로 ip주소로 변경하여 서버에 접근한다

### input의 name

input에 입력이 들어와서 name과 value쌍이 만들어지면 name=value

이게 주소에 붙여져서 요청됨

이렇게 주소에 보여지는 요청은 GET method에서만 이뤄짐

**민감정보**는 POST method를 통해 처리

GET : http://example.php?q=hi

POST : http://example.php

### input label

<label for=”input id”>text</label>

input과 라벨은 for속성을 이용하여 연결

label은 input form을 설명해주면서 label을 클릭해도 input에 focus가 되기 때문에 UX가 향상

### input type

input에 입력받을 때 어떻게 입력받은 것을 표시할 것인가

혹은 입력값을 내가 원하는 format인지 검증하는 역할

text, password, email, number, file, submit

퍼블리싱 ⇒ 디자인한 것을 HTML,CSS를 통해 웹페이지로 표현하는 것