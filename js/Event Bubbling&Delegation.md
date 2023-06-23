div 안의 버튼 4개에 이벤트 리스너를 달아두고 버튼을 누를때마다 class를 조정하며 글자와 테두리를 파란색으로 바꿔줘야하는 상황이었다.

```js
// in component
const [cookingTime, setCookingTime] = useState(null);
const cookingTimeRefArr = [useRef(null), useRef(null), useRef(null), useRef(null)];
const cookingTimeBtnHandler = (idx) => {
  cookingTimeRefArr.forEach((ref) => {
    ref.current.classList.remove('border-#2F80ED');
    ref.current.classList.remove('text-#2F80ED');
  });

  cookingTimeRefArr[idx].current.classList.add('border-#2F80ED');
  cookingTimeRefArr[idx].current.classList.add('text-#2F80ED');

  setCookingTime(idx);
};

// jsx
<div className='px-40 mt-24 pb-31 grey-underbar'>
  <div className={subTitle}>예상 소요 시간</div>
  <button
    type='button'
    className='border border-#7F807F p-10 mr-20 border-#2F80ED text-#2F80ED'
    onClick={() => {
      cookingTimeBtnHandler(0);
    }}
    id='time0'
    ref={cookingTimeRefArr[0]}
  >
    15분 컷
  </button>
  <button
    type='button'
    className='border border-#7F807F p-10 mr-20'
    onClick={() => {
      cookingTimeBtnHandler(1);
    }}
    id='time1'
    ref={cookingTimeRefArr[1]}
  >
    30분 컷
  </button>
  <button
    type='button'
    className='border border-#7F807F p-10 mr-20'
    onClick={() => {
      cookingTimeBtnHandler(2);
    }}
    id='time2'
    ref={cookingTimeRefArr[2]}
  >
    45분 컷
  </button>
  <button
    type='button'
    className='border border-#7F807F p-10'
    onClick={() => {
      cookingTimeBtnHandler(3);
    }}
    id='time3'
    ref={cookingTimeRefArr[3]}
  >
    45분 이상
  </button>
</div>;
```

근데 문제는 addEventListner가 4개가 필요한 것이었다. 코드량도 길었고 개선하고 싶었다.

그래서 찾아본 결과, 이벤트 버블링, 이벤트 위임이라는 것이 있었다.

## 이벤트 버블링과 캡처링

[https://developer.mozilla.org/ko/docs/Learn/JavaScript/Building_blocks/Events#%EC%9D%B4%EB%B2%A4%ED%8A%B8\_%EB%B2%84%EB%B8%94%EB%A7%81%EA%B3%BC\_%EC%BA%A1%EC%B2%98](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Building_blocks/Events#%EC%9D%B4%EB%B2%A4%ED%8A%B8_%EB%B2%84%EB%B8%94%EB%A7%81%EA%B3%BC_%EC%BA%A1%EC%B2%98)

### 이벤트 캡처링

어떤 한 요소에서 어떠한 이벤트가 일어나면 가장 외곽요소인 **HTML부터 그 요소에 도달할 때까지** 해당 이벤트가 있는지 검사하고 있다면 실행한다.

### 이벤트 버블링

어떤 한 요소에서 어떠한 이벤트가 일어나면 해당 **요소에서부터 가장 외곽요소인 HTML에 닿을 때까지** 해당 이벤트가 있는지 검사하고 있다면 실행한다.

현대 브라우저들은 주로 **버블링**으로 채택되어 있다.

그래서 어떻게 멈출까? -> event.stropPropagation()을 통해서 멈출 수 있다.

이 이벤트 버블링이 있음으로 인해서 우리는 **이벤트 위임**을 할 수 있다.

## 이벤트 위임

만약 나의 경우처럼, 혹은 더 나쁜 경우에 하나의 부모 요소에 100개가 넘는 자식요소가 있다면 어떻게 될까?

나 같이 한다면 100개를 전부 해줘야한다. 특히, js로 요소를 계속 추가하거나 제거해야한다면? 복잡한 상황이 될 것이다.

그렇기 때문에, 버블링이 상당히 유용한 것이다. 만약, 모든 자식 요소들이 공통된 이벤트를 요구한다면 부모 요소 하나에 이벤트 핸들러를 추가해두면 해당 이벤트가 자식요소에서 발생하여도 부모 요소에서 감지할 수 있다.

중요한 것은 event.target이 정확하게 자식 요소를 가르켜준다는 것이다.

![image](https://github.com/vinitus/TIL/assets/97886013/9a23c4bd-d24e-4270-9f3f-1bcb3de636b9)

내 코드를 변경한 것인데, 공백을 누르면 부모요소를 누르고, 버튼을 누르면 버튼을 가르켜준다.

이를 통해서 이벤트 리스너를 과도하게 추가하는 것을 막을 수 있다!

#### **reference**

[https://developer.mozilla.org/ko/docs/Learn/JavaScript/Building_blocks/Events#%EC%9D%B4%EB%B2%A4%ED%8A%B8\_%EB%B2%84%EB%B8%94%EB%A7%81%EA%B3%BC\_%EC%BA%A1%EC%B2%98](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Building_blocks/Events#%EC%9D%B4%EB%B2%A4%ED%8A%B8_%EB%B2%84%EB%B8%94%EB%A7%81%EA%B3%BC_%EC%BA%A1%EC%B2%98)
