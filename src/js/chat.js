"use strict"

const socket = io();  //io 호출 하여 소켓 객체 생성

const nickname = document.querySelector("#nickname")
const chatList = document.querySelector(".chatting-list")
const chatInput = document.querySelector(".chatting-input")
const sendButton = document.querySelector(".send-button")
const displayContainer = document.querySelector(".display-container")

chatInput.addEventListener("keypress", (event) => {
    if (event.keyCode === 13) {
        send()
    }
})

function send() {
    const param = {
        name: nickname.value,
        msg: chatInput.value
    }
  socket.emit("chatting", param)  
}

// emit 통해서 보냄!
sendButton.addEventListener("click", send)

// app.js 의 io.emit()에서 보낸  메시지 받음
socket.on("chatting", (data)=> {
    //ul에 넣을 챗리스트 li 엘레먼트형태로 js에서 만들어서 넣음!
    // li.innerHTML = `${data.name}님이 - ${data.msg}`;
    // chatList.appendChild(li);
    const { name, msg, time } = data;
    const item = new LiModel(name, msg, time);  //인스턴스화
    item.makeLi()
    displayContainer.scrollTo(0, displayContainer.scrollHeight)
})

function LiModel(name, msg, time) {
    this.name = name;  //초기화, 할당! 
    this.msg = msg;
    this.time = time;

    this.makeLi = () => {
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent" : "recevied")
        const dom = `<span class="profile">
                <span class="user">${this.name}</span>
                <img src="https://placeimg.com/50/50/any" alt="">
            </span>
            <span class="message">${this.msg}</span>
            <span class="time">${this.time}</span>`;
    li.innerHTML = dom;
    chatList.appendChild(li)
    }
}