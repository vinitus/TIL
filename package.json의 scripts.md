```json
// package.json

...
  "scripts": {
    "dev": "concurrently \"yarn vite\" \"npx tailwindcss -i ./src/index.css -o ./src/output.css --watch\"",
    "build": "vite build",
    "preview": "vite preview"
  },
...
```

---

tailwind css를 도입하니까 css 쪽 관리하기는 편한데 개발 서버를 킬 때마다

```bash
npx tailwindcss -i ./src/index.css -o ./src/output.css --watch
```

를 따로 해줘야했다.

package.json의 scripts의 형태는

```json
...
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
...
```

같이 생겼다.

npm 또는 yarn을 사용하여 실행할 수 있는 스크립트로써, KEY에 해당하는 명령어를 입력하면 해당하는 값이 실행된다.

실제로 yarn dev를 실행하던 yarn vite를 실행하던 같다.

![image](https://github.com/vinitus/TIL/assets/97886013/78f15d8a-54e0-4342-a8db-3e92ffdbaede)

이를 통해서, node 명령어를 활용하여 일반 js 파일도 실행할 수 있다.

```js
// test.js
console.log('hi');
```

```json
// package.json
...
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "normal": "node test.js"
  },
...
```

![image](https://github.com/vinitus/TIL/assets/97886013/36959605-f216-41a6-a3df-782392922955)

그렇다면, 프롬프트를 실행하는 start 같은 것도 되지 않을까? 싶어서 해봤다.

```json
// package.json

...
  "scripts": {
    "dev": "start vite",
    "build": "vite build",
    "preview": "vite preview"
  },
...
```

![image](https://github.com/vinitus/TIL/assets/97886013/ff59026d-4af6-4f98-8185-e3a2ed8905a1)

git도 되나??

```json
// package.json

...
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "git": "git push origin chore/automate-execution"
  },
...
```

![image](https://github.com/vinitus/TIL/assets/97886013/a8be781c-490b-405b-8a01-c98048d885c2)

---

갑자기 의문이 생겼다. git은 yarn git이나, git push ...으로 실행되지만,

yarn vite는 vite만 하면 안된다??

그렇다면, package.json의 scripts의 기본 디렉토리는 어떻게 될까? 싶었다.

이럴때는 docs지

[https://docs.npmjs.com/cli/v9/commands/npm-run-script](https://docs.npmjs.com/cli/v9/commands/npm-run-script)

보니까 node_modules/.bin에 뭔가가 있다.

![image](https://github.com/vinitus/TIL/assets/97886013/8cc66720-b6bb-48a3-862b-f3eba80d1800)

또 읽다보면, 시스템 환경 변수를 참조한다. 나는 vite를 전역적으로 설치하지 않았고, 환경 변수로 설정하지 않았다.

때문에 vite하나로는 실행할 수 없고, node_modules/.bin으로 실행할 수 있다.

**scripts는 시스템 환경 변수를 참조하고 없다면 node_modules/.bin의 명령어를 실행한다.**

그럼 이제, tailwind css랑 리액트 서버 구동을 같이하는 것을 할 차례

[https://pimpdevelop.tistory.com/8](https://pimpdevelop.tistory.com/8)

[npm concurrently (여러개의 명령어를 동시에 실행)

나동빈님의 React와 Node.js로 만드는 고객 관리 시스템 개발 강좌 를 사용해 음악 관리 웹 어플리케이션을 만들고 있다. 그런데 프로젝트 실행을 yarn dev 로 특이하게 해서 package.json을 살펴 봤는데 s

pimpdevelop.tistory.com](https://pimpdevelop.tistory.com/8)

concurrently를 설치하고 같이 실행할 명령어를 아마 정규식을 통해서 하나씩 하는 것 같다.

```json
// package.json

...
  "scripts": {
    "dev": "concurrently \"yarn vite\" \"npx tailwindcss -i ./src/index.css -o ./src/output.css --watch\"",
    "build": "vite build",
    "preview": "vite preview"
  },
...
```

![image](https://github.com/vinitus/TIL/assets/97886013/8e9f0072-a75f-47a4-9861-e73c70eb985b)

#### **reference**

[https://docs.npmjs.com/cli/v9/commands/npm-run-script](https://docs.npmjs.com/cli/v9/commands/npm-run-script)

[https://pimpdevelop.tistory.com/8](https://pimpdevelop.tistory.com/8)
