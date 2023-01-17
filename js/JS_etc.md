### 비구조화 할당시 이름 변경

```js
const userInfo = {
  email: "tlsdnrng@gmail.com",
  nickname: "vinitus",
}

const { email } = userInfo
const { email: githubEmail } = userInfo

console.log(email)
console.log(githubEmail)
```

객체 구조분해할당에 따라 object 형태의 객체를 다른 객체를 선언하며 객체로 감싸 할당해줄 경우 해당 변수명에 따라 해당 변수명을 Key로 가지는 Value값이 할당되는데

이때 : 변수명을 통해 해당 값을 다른 변수명으로 바꿀 수 있다.
