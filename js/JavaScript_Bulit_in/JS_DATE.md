# JavaScript Date 객체

정리하는 이유 : FE든 BE든 간에 자주 쓰일 것 같아서

### Date 객체

[mdn JS Date](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date)

공식문서의 정의 : JavaScript 날짜의 기반은 1970년 1월 1일 UTC 자정과의 시간 차이를 밀리초 단위로 나타낸 것으로, 날짜와 시간의 컴퓨터 기록물을 대부분 차지하고 있는 UNIX 시간(UNIX epoch, 1970년 1월 1일 자정과의 시간 차이를 초 단위로 나타냄)과는 다릅니다.

### Date constructor 형태

```js
const date = Date()
const newDate = new Date()

console.log(date) // 'Thu Nov 10 2022 17:55:51 GMT+0900 (한국 표준시)''
console.log(newDate) // Thu Nov 10 2022 17:55:51 GMT+0900 (한국 표준시)
```

Date()는 지금 시간을 string형태로 반환
new Date()는 Date 객체를 생성한다.

### Date static methods

1. Date.now()
   현재 시간을 UNIX 시간 형태인 밀리초 단위를 반환해줌

```js
console.log(Date()) // Thu Nov 10 2022 19:02:26 GMT+0900 (GMT+09:00)
console.log(Date.now()) // 1668074546404
```

2. Date.parse(String)
   인자로 들어온 문자열 형태의 시간을 UNIX 시간으로 바꿔줌
   JavaScript에서는 사용을 권하지 않음

```js
Date.parse(Date()) //1668074672000
```

### Date instance methods

[Date instance methods](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date#%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4_%EB%A9%94%EC%84%9C%EB%93%9C)
다하는 것은 공식문서에 자세히 나왔으니까 중요한 것 몇개

1. Date.prototype.get \*
   인스턴스에 할당된 Date 객체를 기반으로 해당하는 값을 **return**해준다ㅍ. 그래서 인스턴스에는 변경이 없다!

2. Date.prototype.set \*
   set은 해당 인스턴스를 **변경**하면서 **UNIX 시간으로 바꾼 값을 반환**다. 그래서 해당 식을 변수에 할당하면 나오는 값은 Number이다.

```js
let today = new Date()
console.log(today) //Thu Nov 10 2022 19:13:32 GMT+0900 (GMT+09:00)
let a = today.setDate(1)
console.log(a) //1667297612367
console.log(today) //Tue Nov 01 2022 19:13:32 GMT+0900 (GMT+09:00)
```

3. Date.prototype.getTime()
   UTC를 기준으로한 UNIX 시간 반환

4. Date.prototype.toDateString()
   그냥 .toString()과는 다르게 요일 / 월 / 일 / 연도 만 반환해준다.

5. Date.prototype.toISOString()
   UTC 기준으로 ISO 8601 확장 형식으로 바꿈
   그래서 현재 시간을 기준으로 ISO 8601로 바꾸려면

```js
console.log(Date.now()) // 1668076431502
let today = new Date()
console.log(today.getTime()) // 1668076431502
console.log(new Date(today.toISOString()).getTime()) // 1668076431502
console.log(today.toISOString()) // 2022-11-10T10:33:51.502Z
console.log(today.setHours(today.getHours() - today.getTimezoneOffset() / 60)) // 1668108831502
console.log(new Date(today.toISOString()).getTime()) // 1668108831502
console.log(today.toISOString()) // 2022-11-10T19:33:51.502Z
```

UTC와 한국의 타임존인 GMT와 시간차 GMT 기준 UTC에서는 -9
이는 today.getTimezoneOffset()의 -540을 1시간을 구하기 위해 60으로 나눈 값과 같다.

이걸 왜하냐??? HTML의 input type 중 datetime-local의 기본 value속성에 할당해주기 위해서이다..
[datetime-local 공식문서](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local)
[date&time format 공식문서](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats)
