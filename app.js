const express = require("express");  //express 라이브러리를 가져와 담아! require함수를 쓰면 노드 모듈에서 자동으로 찾아 온다! 경로 필요 없음
const http = require("http");
const app = express();
const path = require("path");
const server = http.createServer(app);
const socketIO = require("socket.io");
const moment = require("moment")

// 소켓에 서버를 담아 io 객체 생성! 이 io를 통해서 메시지 전달한다!
const io = socketIO(server)

console.log(__dirname);  //현재 경로
console.log(path.join(__dirname, "src")); //현재 경로 + src

app.use(express.static(path.join(__dirname, "src")))

const PORT = process.env.PORT || 5500;  
//프로세스 환경에 포트가 잇으면 그거 사용하고, 없으면 5000 포트 사용한다.

io.on("connection", (socket) => {
    socket.on("chatting", (data)=> {
        const {name, msg} = data;
        io.emit("chatting", {
            name: name,
            msg: msg,
            time: moment(new Date()).format("h:mm A")
        })
    })
})


// app.listen(포트, 명령)
server.listen(PORT, () => console.log(`server is running ${PORT}`))

