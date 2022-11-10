# JavaScript Date 객체

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
