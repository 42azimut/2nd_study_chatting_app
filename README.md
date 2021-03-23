# 바닐라 자바스크립트 채팅앱 만들기(socket.io) 

## 1. 설치
```
# package.json 설치
npm init -y
 
#  3개 한번에 설치
npm i express socket.io moment 

# nodemon 변경 있을떄마다 자동으로 listening 하여 서버 읽어온다!
nodemon app.js

# ngrok 설치  - 그런데 왜 설치 오류?? (내컴으로 외부 사람들이 접속 하게하는 라이브러리)
1) 설치 : npm i -g ngrok
2) 서버실행 : npm start
3) 실행방법: ngrok http 5500   //ngrok http 포트번호 

```

## 2. app.js
```
const express = require("express");  
//express 라이브러리를 가져와 담아! 
require함수를 쓰면 노드 모듈에서 자동으로 찾아 온다! 경로 필요 없음

path.join 사용이유! os 마다 경로지정방법이 상이하다!

http를통해서 소켓을 사용해야 한다!
const http = require("http")
```

## chat.js
- `const io = socketIO(server)`  io를 통해서 메시지 전달한다.
- chat.js 에서 위 io를 호츨하여 다른이름, ex.) socket에 담는다. 결국 같은 io!

- chat js 에서 메시지 보냄 : socket.emit() 
- chst js 에서 메시지 받음 : socket.on()

- app.js 에서 메시지 받음 : io.on()
- app.js 에서 메시지 보냄 : io.emit()

```
const socket = io(); 

1. 메시지 보내면 chat.js
socket.emit("채널 아이디", "내용") 아래처럼!
socket.emit("chatting", "내용~~~)

2. 서버에서 받아야 한다.app.js  data에 담아서 받는다! 오브젝트 형태! 이름은 내가 정함! 아래 처럼 메시지를 받는다!
io.on("connection", (socket) => {
    socket.on("chatting", (data)=> {
    console.log(data)
    
    # 답장 전달! 
    io.emit("chatting", `어떤말 이냐? 쨔샤! ${data}`)
    })
})

3. chat.js에서 "어떤말 이냐?"  받아줌 코드 작성
socket.on("chatting", (data)=> {
    console.log(data);
})
```

3. index.html 작성

4. chat.js 에서 DOM 작성
```
    const li = document.createElement("li")  
    //ul에 넣을 챗리스트 li 엘레먼트형태로 js에서 만들어서 넣음!
```