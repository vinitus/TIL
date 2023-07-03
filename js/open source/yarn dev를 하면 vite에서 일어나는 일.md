이 글은 2023년 5월 1일자 커밋인 1ee0014caa7ecf91ac147dca3801820020a4b8a0헤드를 기준으로 작성하였습니다.

![image](https://github.com/vinitus/TIL/assets/97886013/119c1476-2de9-4742-96ab-ba6ea030b7e4)

## **yarn dev를 하면 vite에서 일어나는 일**

자신의 프로젝트에서 yarn dev를 하면 **package.json**에서 **scripts**의 "**dev**"가 실행된다.

#### **우리 프로젝트의 package.json**

```json
// package.json
...
"scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
  ...
```

그렇다면 vite가 실행된다. 이는 [vite의 package.json](https://github.com/vitejs/vite/blob/1ee0014caa7ecf91ac147dca3801820020a4b8a0/packages/vite/package.json#L8)으로 이동된다.

여기서 "**bin**"이 우리를 반겨준다.

#### **vite의 package.json**

```json
// vite's package.json
...
  "bin": {
    "vite": "bin/vite.js"
  },
...
```

"bin"의 "vite"는 우리가 **yarn dev에서 vite로 이어져온 결과이다**. 그럼 [bin/vite.js](https://github.com/vitejs/vite/blob/1ee0014caa7ecf91ac147dca3801820020a4b8a0/packages/vite/bin/vite.js#L43)가 실행된다.

vite.js에서 **start()**라는 메서드가 있다.

```js
// bin/vite.js
...
function start() {
  return import('../dist/node/cli.js')
}
...
```

여기서 [../dist/node/cli.js](https://github.com/vitejs/vite/blob/1ee0014caa7ecf91ac147dca3801820020a4b8a0/packages/vite/src/node/cli.ts#L103)가 실행된다.

**근데? 디렉토리가 조금 다르다.**

github상에서는 디렉토리가 ../src/node/cli.ts로 바뀌어있다. 하지만 node_modules상에서는 디렉토리가 정확하다.

![image](https://github.com/vinitus/TIL/assets/97886013/939d2c66-bfc2-4595-a41b-a0e073c9fc32)

코드는 유사해서 진행!

#### **cli의 메인 부분**

여기서 [// dev](https://github.com/vitejs/vite/blob/1ee0014caa7ecf91ac147dca3801820020a4b8a0/packages/vite/src/node/cli.ts#L102)라는 주석이 달린 줄이 있다. 아마도 밑의 **// build**가 있는 것을 보면 **dev모드에서 실행되는 코드**인듯

```ts
// cli.ts
...
// dev
cli
  .command('[root]', 'start dev server') // default command
  .alias('serve') // the command is called 'serve' in Vite's API
  .alias('dev') // alias to align with the script name
...
```

쭉 내려가다보면 cli.ts 파일 중 [143번째 줄에서](https://github.com/vitejs/vite/blob/1ee0014caa7ecf91ac147dca3801820020a4b8a0/packages/vite/src/node/cli.ts#L143) 우리가 아는 그 문구가 나온다.

```ts
// node/cli.ts
...
      const startupDurationString = viteStartTime
        ? colors.dim(
            `ready in ${colors.reset(
              colors.bold(Math.ceil(performance.now() - viteStartTime)),
            )} ms`,
          )
        : ''
...
```

그럼 여기가 **실행되는 메인**인 것 같은데 어떤 로직이 있을까? 를 봐야한다.

[121번째 줄에서](https://github.com/vitejs/vite/blob/1ee0014caa7ecf91ac147dca3801820020a4b8a0/packages/vite/src/node/cli.ts#L121) 중요한 것이 나온다.

```ts
// node/cli.ts
...
    const { createServer } = await import('./server')
...
```

즉, **vite는 우리의 터미널에서 웹 소켓 서버를 연다.**

#### **소켓 서버의 생성**

저 [createServer](https://github.com/vitejs/vite/blob/1ee0014caa7ecf91ac147dca3801820020a4b8a0/packages/vite/src/node/server/index.ts#L336)는 다음과 같다.

```ts
// node/server/index.ts
...
export async function createServer(
  inlineConfig: InlineConfig = {},
): Promise<ViteDevServer> {
  return _createServer(inlineConfig, { ws: true })
}
...
```

\_createServer에서 [웹 소켓을 여는 부분](https://github.com/vitejs/vite/blob/1ee0014caa7ecf91ac147dca3801820020a4b8a0/packages/vite/src/node/server/index.ts#L361)이 있고, [연결을 여는 부분](https://github.com/vitejs/vite/blob/1ee0014caa7ecf91ac147dca3801820020a4b8a0/packages/vite/src/node/server/index.ts#L428)도 있다.

이를 통해서 **우리는 vite가 적어도 소켓통신을 하고 있다는 것**을 알 수 있게 되었다.

그럼 우리의 프로젝트의 개발자 도구에서 웹 소켓을 봐야한다.

![image](https://github.com/vinitus/TIL/assets/97886013/2f3c61dd-99f4-4338-a45e-58cc0f1cefe5)

여기서 중요한 점은 **{type: "connected"}**하는 메시지가 온다는 것이다.

![image](https://github.com/vinitus/TIL/assets/97886013/0f7b86c2-430f-4af3-bc0d-13c1685a35e5)

[{type: 'connected'}를 보내는 부분](https://github.com/vitejs/vite/blob/main/packages/vite/src/node/server/ws.ts#L156)은 server/ws.ts라는 파일에 있다.

```ts
// server/ws.ts
...
    socket.send(JSON.stringify({ type: 'connected' }))
...
```

#### **서버에서 보내는 신호 type**

클라이언트는 **[이를 감지할 수 있는 부분](https://github.com/vitejs/vite/blob/1ee0014caa7ecf91ac147dca3801820020a4b8a0/packages/vite/src/client/client.ts#L132)**이 있다.

```ts
// client/client.ts
...
  switch (payload.type) {
    case 'connected':
      ...
    case 'update':
      ...
```

보면, connected라는 부분 말고도 **update**라는 부분이 있다. [client.ts에서 update.type을 분기하는 처리](https://github.com/vitejs/vite/blob/1ee0014caa7ecf91ac147dca3801820020a4b8a0/packages/vite/src/client/client.ts#L156)가 있다.

```ts
// client/client/ts
...
      await Promise.all(
        payload.updates.map(async (update): Promise<void> => {
          if (update.type === 'js-update') {
            return queueUpdate(fetchUpdate(update))
          }

          // css-update
          // this is only sent when a css file referenced with <link> is updated
...
```

업데이트가 **단순 js-update냐는 것도 분기하고 css-update냐는 것도 분기**한다.

그럼, 이는 어디서 update type을 달아주냐는 것인가와 js와 css를 따로 분기한다는 것인지는 어디서 볼까?

서버 디렉토리에 hmr.ts라는 파일이 있다. **vite는 HMR**을 지원한다. [vite 레퍼런스](https://vitejs-kr.github.io/guide/why.html#slow-updates)

HMR은 간단하게 소스가 변경된 부분만 업데이트하는 것이다.

[hmr.ts 여기서](https://github.com/vitejs/vite/blob/1ee0014caa7ecf91ac147dca3801820020a4b8a0/packages/vite/src/node/server/hmr.ts#L161) 이를 구분하고 타입을 지정해주는 코드가 있다.

```ts
// server/hmr.ts
// js-update와 css-update를 구분하는 부분
...
    updates.push(
      ...boundaries.map(({ boundary, acceptedVia }) => ({
        type: `${boundary.type}-update` as const,
        timestamp,
        path: normalizeHmrUrl(boundary.url),
        explicitImportRequired:
          boundary.type === 'js'
...
// 웹 소켓으로 update를 보내는 부분
  config.logger.info(
    colors.green(`hmr update `) +
      colors.dim([...new Set(updates.map((u) => u.path))].join(', ')),
    { clear: !afterInvalidation, timestamp: true },
  )
  ws.send({
    type: 'update',
    updates,
  })
...
```

위에는 **js와 css 업데이트**인지를 구분하는 코드이고,

그 밑에는 **{type: update, updates}를 보내주는 부분이** 있다. -> ws이 연결되었을 때 {type: "connected"}가 연결된 것과 유사한 형태이다.

---

#### **정리**

여기까지를 정리하면 다음과 같다.

1.  vite는 **웹소켓으로 우리의 vscode를 서버로 두고 브라우저를 클라이언트로**하여 소켓통신을 연다.
2.  서버는 { type: ? } 을 통해 브라우저에게 보내는 요청의 타입을 분기한다.
3.  이 타입은 여러가지가 있지만, 대표적으로 연결이 성공한 connected와 파일을 업데이트를 해야하는 update가 있다.
4.  이 요청은 ws에서 보내는 것이며, **update는 또 js-update와 css-update**로 나뉜다.
5.  이는 **HMR에서 구분하는 것**이다.

---

#### **서버에서 보내는 요청**

이제는 이 요청을 어떻게 감지하냐는 것이다. 고맙게도 vite의 코드명은 상당히 좋다. 따라서 **server/index.ts에서 ViteDevServer 타입의 [server](https://github.com/vitejs/vite/blob/1ee0014caa7ecf91ac147dca3801820020a4b8a0/packages/vite/src/node/server/index.ts#L382)를 발견할 수 있다.**

이 코드 중에서 설정과 관련된 로직과 터미널에 프린트해주는 부분을들 지니가다보면 **watcher**라는 것이 보인다.  
[watcher.on에 여러 옵션들](https://github.com/vitejs/vite/blob/1ee0014caa7ecf91ac147dca3801820020a4b8a0/packages/vite/src/node/server/index.ts#L540)이 있다.

```ts
// server/index.ts
...
  watcher.on('change', async (file) => {
    file = normalizePath(file)
    // invalidate module graph cache on file change
    moduleGraph.onFileChange(file)

    await onHMRUpdate(file, false)
  })

  watcher.on('add', onFileAddUnlink)
  watcher.on('unlink', onFileAddUnlink)
...
```

여기서 watcher의 **change 부분**이다. 반가운 글씨인 [onHMRUpdate](https://github.com/vitejs/vite/blob/1ee0014caa7ecf91ac147dca3801820020a4b8a0/packages/vite/src/node/server/index.ts#L521)가 있다. 여기서 try 부분의 **handleHMRUPdate**로 가면 긴~코드가 있다. 여기서 config나 기타 예외에 대한 처리를 빼다보면 [updateModules](https://github.com/vitejs/vite/blob/1ee0014caa7ecf91ac147dca3801820020a4b8a0/packages/vite/src/node/server/hmr.ts#L134)에 도착한다.

```ts
// node/server/hmr.ts
...
export function updateModules(
  file: string,
  modules: ModuleNode[],
  timestamp: number,
  { config, ws, moduleGraph }: ViteDevServer,
  afterInvalidation?: boolean,
): void {
  const updates: Update[] = []

  for (const mod of modules) {
    moduleGraph.invalidateModule(mod, invalidatedModules, timestamp, true)
    const boundaries: { boundary: ModuleNode; acceptedVia: ModuleNode }[] = []

    updates.push(
      ...boundaries.map(({ boundary, acceptedVia }) => ({
        type: `${boundary.type}-update` as const,
        timestamp,
        path: normalizeHmrUrl(boundary.url),
        explicitImportRequired:
          boundary.type === 'js'
            ? isExplicitImportRequired(acceptedVia.url)
            : undefined,
        acceptedPath: normalizeHmrUrl(acceptedVia.url),
      })),
    )
  }
  ...
  ws.send({
    type: 'update',
    updates,
  })
}
...
```

결국 이 함수는 **클라이언트로 보낼 updates 배열을 만드는 함수**였던 것이다.

1.  서버는 **watcher**라는 것을 통해서 우리 **프로젝트의 변화를 감지**하고
2.  이 변화는 **HMR에 의해 어떤 변화인지 감지한 결과를 handleHMRUppdate함수에서 처리하고 배열로 저장**하고
3.  **웹소켓으로** **클라이언트에게** 보낸다.

---

#### **클라이언트에서 확인해보기**

Home.tsx만 변경해서 보냈더니, 다음과 같이 클라이언트에서 신호를 받았다.

![image](https://github.com/vinitus/TIL/assets/97886013/8e35c9cf-7c0a-483b-a5c0-06ec5aa50a6d)

우리가 본 대로, **{"type": "update", "update": \[...\]} 형태로 보내졌다**. 정확하게 Home.tsx가 온 모습

index.css는 tailwind css를 사용중이라 같이 보내진 것이다.

그럼 클라이언트는 이를 어떻게 처리할까? 바로 **handleMessage**이다.

#### **클라이언트의 handleMessage**

client/client.ts에서 [handleMessage](https://github.com/vitejs/vite/blob/1ee0014caa7ecf91ac147dca3801820020a4b8a0/packages/vite/src/client/client.ts#L130)가 있다. 여기서 **case 'update'**를 볼 것이다.

```ts
// client/client.ts
...
async function handleMessage(payload: HMRPayload) {
  switch (payload.type) {
    case 'connencted':
      ...
    case 'update':
      ...
      await Promise.all(
        payload.updates.map(async (update): Promise<void> => {
          if (update.type === 'js-update') {
            return queueUpdate(fetchUpdate(update))
          }
       ...
}
...
```

여기서 [queueUpdate](https://github.com/vitejs/vite/blob/1ee0014caa7ecf91ac147dca3801820020a4b8a0/packages/vite/src/client/client.ts#L298)는 다음과 같은데,

```ts
// client/client.ts
let pending = false;
let queued: Promise<(() => void) | undefined>[] = [];

async function queueUpdate(p: Promise<(() => void) | undefined>) {
  queued.push(p);
  if (!pending) {
    pending = true;
    await Promise.resolve();
    pending = false;
    const loading = [...queued];
    queued = [];
    (await Promise.all(loading)).forEach((fn) => fn && fn());
  }
}
```

**단순하게 하나의 큐를 만들고 순서대로 실행하기 위한 코드**이다. 이유는, 하나를 처리하는 동안 여러 요청이 올 수도 있기 때문인 듯 하다.

그럼 **fetchUpdate**로 가야한다. **[fetchUpdate](https://github.com/vitejs/vite/blob/1ee0014caa7ecf91ac147dca3801820020a4b8a0/packages/vite/src/client/client.ts#L412)**는 다음과 같은데 하나씩 보려고 한다.

```ts
// client/client.ts
...
async function fetchUpdate({
  path,
  acceptedPath,
  timestamp,
  explicitImportRequired,
}: Update) {
  const mod = hotModulesMap.get(path)            // path는 아까 hmr에서 만든 path이다. 위의 사진에서 /src/Pages/Home.tsx
  const isSelfUpdate = path === acceptedPath     // path와 acceptedPath가 같은지 보는 것. 나의 경우에는 같다.

  const qualifiedCallbacks = mod.callbacks.filter(({ deps }) =>
    deps.includes(acceptedPath),
  )

  ...

  if (isSelfUpdate) {
    ...
    try {
      fetchedModule = await import(
        /* @vite-ignore */
        base +
          acceptedPathWithoutQuery.slice(1) +
          `?${explicitImportRequired ? 'import&' : ''}t=${timestamp}${
            query ? `&${query}` : ''
          }`
      )
    } catch (e) {
      warnFailedFetch(e, acceptedPath)
    }
  }

  return () => {
    for (const { deps, fn } of qualifiedCallbacks) {
      fn(deps.map((dep) => (dep === acceptedPath ? fetchedModule : undefined)))
    }
    ...
  }
}
...
```

fetchedModule에서 **경로를 import해오는 것을 await로 기다리는 코드를 볼 수 있다**. 근데 임포트를 해오면 붙여야하는 것 아닌가? 싶었다.

더 따라가보려면 솔직히 **qualifiedCallbacks**가 뭔지는 알아야하는 것 같다.

#### **qualifiedCallbacks가 뭔지를 찾아서**

코드를 따라가면,

**qualifiedCallbacks**는 **mod**에서 온 것이고,

```ts
  const qualifiedCallbacks = mod.callbacks.filter(({ deps }) =>
```

**mod**는 **hotModulesMap**에서 온 것이다. 이 **[hotModulesMap](https://github.com/vitejs/vite/blob/1ee0014caa7ecf91ac147dca3801820020a4b8a0/packages/vite/src/client/client.ts#L481)**은 단지 빈 맵이다.

```ts
const hotModulesMap = new Map<string, HotModule>();
```

이 빈 **Map** 객체를 **get**이 아닌 **set**을 하는 곳은 **[acceptDeps](https://github.com/vitejs/vite/blob/1ee0014caa7ecf91ac147dca3801820020a4b8a0/packages/vite/src/client/client.ts#L517)**이다.

```ts
// client/client.ts
...
  function acceptDeps(deps: string[], callback: HotCallback['fn'] = () => {}) {
    const mod: HotModule = hotModulesMap.get(ownerPath) || {
      id: ownerPath,
      callbacks: [],
    }
    mod.callbacks.push({
      deps,
      fn: callback,
    })
    // 여기가 우리가 찾는 빈 맵 객체를 set하는 부분이다.
    hotModulesMap.set(ownerPath, mod)
  }
...
```

여기서도 이는 함수인데, 이를 불러오는 곳을 찾아야 한다. 근데 찾아보니 바로 밑에 있음! 바로 [hot](https://github.com/vitejs/vite/blob/1ee0014caa7ecf91ac147dca3801820020a4b8a0/packages/vite/src/client/client.ts#L529)에서 불러온다.

```ts
// client/client.ts
...
  const hot: ViteHotContext = {
    get data() {
      return dataMap.get(ownerPath)
    },

    accept(deps?: any, callback?: any) {
      if (typeof deps === 'function' || !deps) {
        // self-accept: hot.accept(() => {})
        acceptDeps([ownerPath], ([mod]) => deps?.(mod))
      } else if (typeof deps === 'string') {
        // explicit deps
        acceptDeps([deps], ([mod]) => callback?.(mod))
      } else if (Array.isArray(deps)) {
        acceptDeps(deps, callback)
      } else {
        throw new Error(`invalid hot.accept() usage.`)
      }
    },

    // export names (first arg) are irrelevant on the client side, they're
    // extracted in the server for propagation
    acceptExports(_, callback) {
      acceptDeps([ownerPath], ([mod]) => callback?.(mod))
    },
    ...
```

이 **hot**은 더이상 어디서 쓰이는지를 찾아야하는데.. 이 **hot**은 **createHotContext**에 속해있고 이는 **export**되어 어디선가 또 쓰인다..

그래서 **vite를** 클론받고 **vscode**의 폴더를 정규식으로 검색하는 것을 이용했다.

[##_Image|kage@cNr70j/btsdG9WZMkP/DAX0TItsF5KTOchuvaGzQ0/img.png|CDM|1.3|{"originWidth":235,"originHeight":180,"style":"alignCenter","caption":"하이 ㅋㅋ"}_##]

**[importAnalysis.ts](https://github.com/vitejs/vite/blob/1ee0014caa7ecf91ac147dca3801820020a4b8a0/packages/vite/src/node/plugins/importAnalysis.ts#L727)**에서 쓰인다. 바로 출동

```ts
// node/plugins/importAnalysis.ts
...
        str().prepend(
          `import { createHotContext as __vite__createHotContext } from "${clientPublicPath}";` +
            `import.meta.hot = __vite__createHotContext(${JSON.stringify(
              normalizeHmrUrl(importerModule.url),
            )});`,
        )
...
```

**import.meta.hot**으로 사용된다?? **import.meta**는 뭘까?

**[mdn import meta](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta)**

mdn의 import meta에 대한 문서이다. **컨텍스트별 메타데이터를 JS 모듈에 노출시킨다는 것**

이걸 왜 쓸까??는 vite 공식문서에 있다.

[vite의 HMR API docs](https://vitejs-kr.github.io/guide/api-hmr.html#hmr-api)

> Vite는 HMR API 설정을 import.meta.hot 객체를 통해 노출합니다

즉, **HMR API를 javascript 모듈에 노출시켜서 어디서든 사용할 수 있게 한다는 것**

---

#### **클라이언트가 udate 타입의 메시지를 받고 처리하는 과정**

1.  웹 소켓을 통해 메시지를 받으면, **type에 따라서 client.ts에서 이를 처리하고 fetchUpdate가 실행**된다.
2.  fetchUpdate는 path를 await를 붙여서 우리가 업데이트해서 **updates 배열에 담긴 path의 파일을 import** 해오고 있다.
3.  그 함수의 리턴으로 함수 리턴하는데 그 함수안에서는 **qualifiedCallbacks를 순회**를 하고 있다.
4.  **qualifiedCallbacks**는 사실 **빈 맵**이며 이는 **hot이라는 플러그인에서 set할 수 있으며**
5.  **이 hot은 HMR API를 import.meta.hot을 통해서 다른 js 모듈에서 전역적으로 이 플러그인에 접근할 수 있게 되었다.**

#### **reference**

[https://github.com/vitejs/vite/tree/1ee0014caa7ecf91ac147dca3801820020a4b8a0](https://github.com/vitejs/vite/tree/1ee0014caa7ecf91ac147dca3801820020a4b8a0)

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta)

[https://vitejs-kr.github.io/guide/api-hmr.html#hmr-api](https://vitejs-kr.github.io/guide/api-hmr.html#hmr-api)

[https://vitejs-kr.github.io/guide/why.html#slow-updates](https://vitejs-kr.github.io/guide/why.html#slow-updates)
