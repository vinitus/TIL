```html
<body>
  <div id="number">0</div>
  <div id="first_box">
    <div class="box red"></div>
    <div class="box blue"></div>
    <div class="box green"></div>
  </div>

  <script>
    let number = document.querySelector("#number")
    
    //version 1
    box.forEach((element) => {
      element.addEventListener('mouseover', function (event){
        console.log(event.target.classList)
        // number.setAttribute('style',`color: ${event.target.classList[1]};`)
        number.style.color = event.target.classList[1]
      })
    })
    
    //version 2
    document.querySelector('red')
      .addEventListener('mouseover', function () {
        number.style.color = 'red'
      })
    document.querySelector('blue')
      .addEventListener('mouseover', function () {
        number.style.color = 'blue'
      })
      document.querySelector('green')
      .addEventListener('mouseover', function () {
        number.style.color = 'green'
      })
  </script>
</body>
```
version 2를 통하면 요소 하나하나에 접근해서 eventListener를 달아줘야하지만

version 1을 통하면 nodeList형태로 접근하여 불필요한 중복을 줄일 수 있다.

 

querySeletor를 하면 node 객체 하나를 가져오지만

querySeletorAll을 하면 nodeList 형태로 가져오고 .forEach 같은 배열 메서드를 사용 할 수 있다.

forEach를 통해 요소 하나씩 가져오고 요소 하나마다 addEventListener를 추가하여 요소마다 이벤트 발생을 알 수 있고

event.target을 하면 이벤트가 일어난 node를 알 수 있고 event.target.classList를 통해서 이벤트가 일어난 tag의 class list를 알 수 있고 해당 리스트의 인덱스에 접근하여 string 형태의 class를 가져오고 number의 style의 color를 할당해줘서 색을 변경할 수 있다.